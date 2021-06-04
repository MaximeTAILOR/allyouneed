//constantes pour tout le programe
var queryString = window.location.search;

/*
Ajout d'une ligne de CA
*/
$('#ajouterCA').on('click', () => {nouvelleLigneCA()})

function nouvelleLigneCA(){
    let strLigne =  '<tr>'
    strLigne +=     '<td class="remove"><button class="retirerCA">-</button></td>'
    strLigne +=     '<td><input type="text" class="poste" name="poste" placeholder="POSTE"></td>'
    strLigne +=     '<td><input type="text" class="salaire valeuModifiee" name="salaire" placeholder="SALAIRE" value=0></td>'
    strLigne +=     '<td><input type="text" class="partAccordee valeuModifiee" name="partAccordee" placeholder="PART ACCORDEE" value=0></td>'
    strLigne +=     '<td>0</td>'
    strLigne +=     '</tr>'
    let ligne = $(strLigne)
    ligne.appendTo($('#tableCA'))

    $(".retirerCA").on('click', (e) => {
        e.target.parentElement.parentElement.remove()
    })
    initActualisationCA()
}

function initActualisationCA() {
    $('.valeuModifiee').on('keyup', () => {calculCA()})
}




/*
Calcul des CA
*/
function calculCA(){
    let totalCA=0
    //On doit utiliser deux fois .children() parce que le tableau créé automatiquement un div tbody
    //$('#tableCA').children() nous rend donc ce tbody et non les lignes voulues

    for (ligne of $('#tableCA').children().children()){
        if(ligne.classList != 'en-tete'){
            let cases = ligne.cells
            cases[4].textContent = cases[2].children[0].value * (cases[3].children[0].value / 100)
            totalCA+=parseInt(cases[4].textContent)
        }
    }
    $('#totalCA').text(totalCA)
}



/*
Fonction pour le chargement du formulaire si jamais on trouve le siret
(dans l'url)
On envoie alors une requête et on charge les élements trouvés dans les champs

Ici on parle du chargement de la partie du formulaire qui concerne les contacts
*/

if (queryString){
    let siretUrl = queryString.split('=')[1];
    updateCAInfo(siretUrl)
} else {
    calculCA()
    nouvelleLigneCA()
}






//Fonction qui permet d'afficher les différents CA
function updateCAInfo(siretUrl){
    $.ajax({
        type: 'GET',
        url: '../php/action_revenue.php',
        dataType: 'json',
        data : {
            siret : siretUrl,
            action : "afficher",
        },
        success: (data) => {
            if (data.error){
                alert(data.message);
            } else{
                if (data.length == 0){
                    nouvelleLigneContact();
                }
                for (revenuCA of data){
                    let strLigne =  '<tr>'
                    strLigne +=     '<td class="remove"><button class="retirerCA '+ revenuCA["idrevenue"] +' ">-</button></td>'
                    strLigne +=     '<td><input type="text" class="poste" name="poste" placeholder="POSTE" value='+ revenuCA["post"] +'></td>'
                    strLigne +=     '<td><input type="text" class="salaire valeuModifiee" name="salaire" placeholder="SALAIRE" value='+ revenuCA["salary"] +'></td>'
                    strLigne +=     '<td><input type="text" class="partAccordee valeuModifiee" name="partAccordee" placeholder="PART ACCORDEE" value='+ revenuCA["percentage"] +'></td>'
                    strLigne +=     '<td>'+ revenuCA["turnover"] +'</td>'
                    strLigne +=     '</tr>'
                    let ligne = $(strLigne)
                    ligne.appendTo($('#tableCA'))
                }

                //Initialisation des boutons et appel de quelques fonctions
                $(".retirerCA").on('click', (e) => {
                    deleteCA(e.target.classList[1])
                    e.target.parentElement.parentElement.remove()
                })

                initActualisationCA()
                calculCA()
                nouvelleLigneCA()
            }
        },
        error: (error) => {
            alert('Erreur !');
        }
    });
}





//Ajouter et modifier des contacts
function envoyerCA(){
    //Formulaire du contact
    if (document.querySelector("#siret").value == ""){
        alert("Les contacts doivent appartenir a une entreprise (siret non defini)")
    } else {
        for (ligne of $('#tableCA').children().children()){
            if(ligne.classList != 'en-tete'){
                let cases = ligne.cells
                let idCA = cases[0].children[0].classList[1]

                if(idCA == undefined){
                    //Si on ne trouve pas l'id dans la classe, alors il faut ajouter dans la base
                    data = {
                        siret       : document.querySelector("#siret").value,
                        post        : cases[1].children[0].value,
                        salary      : cases[2].children[0].value,
                        percentage  : cases[3].children[0].value,
                        turnover    : cases[4].textContent,
                        total       : $('#totalCA').text(), 
                        action      : "ajouter",
                    }
                } else {
                    //Si on ne troruve pas le dit id alors, on parle d'un ajout
                    data = {
                        idrevenue : idCA,
                        post        : cases[1].children[0].value,
                        salary      : cases[2].children[0].value,
                        percentage  : cases[3].children[0].value,
                        turnover    : cases[4].textContent,
                        total       : $('#totalCA').text(), 
                        action : "modifier",
                    }
                }

                requeteCA(data)
            }
        }
    }
}



function deleteCA(idCA){
    data = {
        idrevenue : idCA,
        action : "supprimer",
    }
    requeteCA(data)
}





//rq ajax CA
function requeteCA(dataCA){
    $.ajax({
        type: 'GET',
        url: '../php/action_revenue.php',
        dataType: 'json',
        data : dataCA,
        success: (data) => {
            if (data.error){
            }
        },
        error: (error) => {
            alert('Erreur !');
        }
    });
}



initActualisationCA()