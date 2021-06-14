/*
 * Partie remplissage du tableau
 * On prend les données dans la bd avec une rq AJAx
 * Puis on insère les lignes une par une
*/
function remplirTableau(data){
    for (company of data){
        //Conversion de la date en forma php a la date en forma affiché a l'utilisateur
        let elementsDate = company["date"].split('-')
        for (index in elementsDate){
            elementsDate[index] = parseInt(elementsDate[index])
            }
        let dateInsc = elementsDate[2] + '/' + elementsDate[1] + '/' + elementsDate[0];

        
        //Creation d'une ligne de tableau
        let strLigne =  '<tr>'
        strLigne +=     '<td class="remove"><button class="retirer '+ company["siret"] +' ">-</button></td>'
        strLigne +=     '<td>'+ company["name"] +'</td>'
        strLigne +=     '<td>'+ company["siret"] +'</td>'
        strLigne +=     '<td>'+ company["type"] +'</td>'
        strLigne +=     '<td>'+ dateInsc +'</td>'
        strLigne +=     '<td>'
            for (let numEtoile=1; numEtoile<6; numEtoile++){
                let checkStatus = 'un-check'
                if (numEtoile <= company["grade"]){
                    checkStatus = 'check'
                }
                strLigne+=  '<i class="fas fa-star check ' + checkStatus + '"></i>'
            }
        strLigne +=     '</td>'
        strLigne +=     '<td><a href=./fiche_client.html?siret='+ company["siret"] +'>Fiche detaillée</a></td>'
        strLigne +=     '</tr>'

        //On ajoute la ligne au tableau
        $(strLigne).appendTo($('table'))
    }

    $('.retirer').on('click', (e) => {
        //Demande confirmation avant de supprimer l'entreprise
        if(confirm('Êtes vous sûr de vouloir supprimer cet element ?')){
            siret=e.target.classList[1]
            supprimerEntreprise(siret)
            e.target.parentElement.parentElement.remove()
        }
    })
}

//Si la personne connectée a un compte entreprise, on l'empêche de pouvoir créer des données dans la base de données

function modifCompany(data){
    if(data['typeUser'] == "company"){
        $('#nouveau').attr('style', 'display : none');
        
    }
}



function supprimerEntreprise(siretComp){
    $.ajax({
        type: 'GET',
        url: '../php/action_company.php',
        dataType: 'json',
        data : {
            siret : siretComp,
            action : 'supprimer',
        },
        success: (data) => {
            if (typeof data.error === 'undefined'){
                remplirTableau(data);
            } else {
                alert(data.message);
            }
        },
        error: () => {
        alert('Erreur !');
        }
    });
}





//Script principal
$.ajax({
    type: 'GET',
    url: '../php/list_company.php',
    dataType: 'json',
    success: (data) => {
        if (typeof data.error === 'undefined'){
            modifCompany(data[0]);
            remplirTableau(data);
        } else {
            alert(data.message);
        }
    },
    error: () => {
      alert('Erreur !');
    }
  });


  $('#nouveau').on('click', () => {window.location.replace("./fiche_client.html")})

/*
On utilise plus la pop-up mais je laisse le code ici pour l'instant des fois qu'on changerai d'avis
Si c'est pas le cas, je supprimerai se bout de code
/*
//fonctions
function initLiens(){
    $('.trigger-popup').click(function (event) { 
        event.preventDefault();
        //On réinitialise la fenêtre pop-up puis on l'affiche
        $('.pop-up').html('<span class="close">x</span>')
        //On réassocie l'event
        $('.close').click(() => {
            console.log('fonction trigger')
            $('.fermeture_pop-up').toggle();
        });

        $('.fermeture_pop-up').toggle();

        //sélection du conteneur dans lequel on vas placer les infos
        let conteneur=$('.pop-up')

        //On retourne chercher les informations de la ligne
        //on les stocke dans une liste
        let ligneDuTableau = $(this).parent().parent();
        let cases = ligneDuTableau.children();
        let informations = {
            'company' : cases[0].textContent,
            'ape' : cases[1].textContent,
            'prenom' : cases[2].textContent,
            'nom' : cases[3].textContent,
            'email' : cases[4].textContent,
        };
        
    conteneur.append("<p>Entreprise :<br>" + informations['company'] + "</p>");
    conteneur.append("<p>ape :<br>" + informations['ape'] + "</p>") ;
    conteneur.append("<p>Prenom :<br>" + informations['prenom'] + "</p>") ;
    conteneur.append("<p>Nom :<br>" + informations['nom'] + "</p>");
    conteneur.append("<p>Email :<br>" + informations['email'] + "</p>")
    });
}


//evenements
$('.fermeture_pop-up').click(() => {
    $('.fermeture_pop-up').toggle();
});

$('.pop-up').click((e) => {
    e.stopPropagation();
});
*/