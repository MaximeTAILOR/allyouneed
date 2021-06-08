//constantes pour tout le programe
var queryString = window.location.search;


function nouvelleLigneCA(){
    let strLigne =  '<tr>'
    strLigne +=     '<td class="remove"><button class="retirerCA">-</button></td>'
    strLigne +=     '<td><input type="text" class="poste" name="poste" placeholder="POSTE"></td>'
    strLigne +=     '<td><input type="text" class="salaire" name="salaire" placeholder="SALAIRE" value=0></td>'
    strLigne +=     '<td><input type="text" class="partAccordee" name="partAccordee" placeholder="PART ACCORDEE" value=0></td>'
    strLigne +=     '<td>0</td>'
    strLigne +=     '</tr>'
    let ligne = $(strLigne)
    ligne.appendTo($('#tableCA'))

    $('#tableCA tr:last td:first button').on('click', (e) => {
        e.target.parentElement.parentElement.remove()
        calculCA()
    })
    actualisationCA()
}


//Fonction pour actualiser le chiffre d'affaire quand on modifie la valeur, doit être appellée a chaque ajout de ligne
function actualisationCA() {
    $('#tableCA tr:last td .salaire').on('keyup', () => {calculCA()})
    $('#tableCA tr:last td .partAccordee').on('keyup', () => {calculCA()})
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




function reloadCA(siret){
    //On supprime les lignes
    for (ligne of $('#tableCA tr')){
        if(ligne.classList != 'en-tete'){
            ligne.remove()
        }
    }

    updateCAInfo(siret)
}





/*
Fonction appelant des requetes AJAX
*/


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
                    strLigne +=     '<td><input type="text" class="salaire" name="salaire" placeholder="SALAIRE" value='+ revenuCA["salary"] +'></td>'
                    strLigne +=     '<td><input type="text" class="partAccordee" name="partAccordee" placeholder="PART ACCORDEE" value='+ revenuCA["percentage"] +'></td>'
                    strLigne +=     '<td>'+ revenuCA["turnover"] +'</td>'
                    strLigne +=     '</tr>'
                    let ligne = $(strLigne)
                    ligne.appendTo($('#tableCA'))

                    actualisationCA()
                }

                //Initialisation des boutons et appel de quelques fonctions
                $(".retirerCA").on('click', (e) => {
                    deleteCA(e.target.classList[1])
                    e.target.parentElement.parentElement.remove()
                    calculCA()
                })

                nouvelleLigneCA()
                calculCA()
            }
        },
        error: (error) => {
            alert('Erreur !');
        }
    });
}





//Ajouter et modifier des contacts
function envoyerCA(){
    for (ligne of $('#tableCA tr')){
        if(ligne.classList != 'en-tete'){
            if(ligne.cells[1].children[0].value!=""){
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
    reloadCA(document.querySelector("#siret").value)
}




function deleteCA(idCA){
    data = {
        idrevenue : idCA,
        action : "supprimer",
    }
    requeteCA(data)
}




/*
Requetes AJAX
*/

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






/*
Code principal (tout ce qui n'est pas des fonctions)

On a aussi toutes les initialisation qui sont faites qu'une seule fois
*/

//Ajout d'une ligne de CA
$('#ajouterCA').on('click', () => {nouvelleLigneCA()})



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