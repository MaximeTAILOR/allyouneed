/*
 * Partie remplissage du tableau
 * On prend les données dans la bd avec une rq AJAx
 * Puis on insère les lignes une par une
*/
//Fonctions
function remplirTableau(data){
    for (client of data){
        //Conversion de la date en forma php a la date en forma affiché a l'utilisateur
        let elementsDate = client["date"].split('-')
        for (index in elementsDate){
            elementsDate[index] = parseInt(elementsDate[index])
            }
        let dateInsc = elementsDate[2] + '/' + elementsDate[1] + '/' + elementsDate[0];

        
        //Creation d'une ligne de tableau
        let strLigne =  '<tr>'
        strLigne +=     '<td class="remove"><button class="retirer '+ client["idCustomer"] +' ">-</button></td>'
        strLigne +=     '<td>'+ client["prenom"] +'</td>'
        strLigne +=     '<td>'+ client["nom"] +'</td>'
        strLigne +=     '<td>'+ client["num"] +'</td>'
        strLigne +=     '<td>'+ client["email"] +'</td>'
        strLigne +=     '<td>'+ dateInsc +'</td>'
        strLigne +=     '<td>'
            for (let numEtoile=1; numEtoile<6; numEtoile++){
                let checkStatus = 'un-check'
                if (numEtoile <= client["score"]){
                    checkStatus = 'check'
                }
                strLigne+=  '<i class="fas fa-star check ' + checkStatus + '"></i>'
            }
        strLigne +=     '</td>'
        strLigne +=     '<td><a href=./fiche_candidat.html?id='+ client["idCustomer"] +'>Fiche detaillée</a></td>'
        strLigne +=     '</tr>'

        //On ajoute la ligne au tableau
        $(strLigne).appendTo($('table'))
    }

    $('.retirer').on('click', (e) => {
        //Demande confirmation avant de supprimer l'entreprise
        if(confirm('Êtes vous sûr de vouloir supprimer cet element ?')){
            id=e.target.classList[1]
            alert("Suppression de l'element " + id + "...\nOu pas vus que le php ne le permet pas pour le moment...")
        }
    })
}



//Script principal
$.ajax({
    type: 'GET',
    url: '../php/list_customer.php',
    dataType: 'json',
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


$('#nouveau').on('click', () => {window.location.replace("./fiche_candidat.html")})




/*
 * Partie interraction avec le tableau 
 * Permet d'accèder a la fiche détaillée en cliquant sur un lien
 * Le fait en lisant les lignes
*/

//fonctions
/*
function initLiens(){
    $('.trigger-popup').click(function (event) { 
        event.preventDefault();
        //On réinitialise la fenêtre pop-up puis on l'affiche
        $('.pop-up').html('<span class="close">x</span>')
        //On réassocie l'event
        $('.close').click(() => {
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
            'prenom' : cases[0].textContent,
            'nom' : cases[1].textContent,
            'telephone' : cases[2].textContent,
            'status' : cases[3].textContent,
            'mail' : cases[4].textContent,
        };
        
    conteneur.append("<p>Prenom :<br>" + informations['prenom'] + "</p>");
    conteneur.append("<p>Nom :<br>" + informations['nom'] + "</p>") ;
    conteneur.append("<p>Telephone :<br>" + informations['status'] + "</p>") ;
    conteneur.append("<p>Mail :<br>" + informations['telephone'] + "</p>");
    conteneur.append("<p>Status :<br>" + informations['mail'] + "</p>")
    });
}


//evenements
$('.fermeture_pop-up').click(() => {
    $('.fermeture_pop-up').toggle();
});

$('.pop-up').click((e) => {
    e.stopPropagation();
});*/