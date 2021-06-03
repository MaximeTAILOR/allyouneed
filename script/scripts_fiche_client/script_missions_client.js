//constantes pour tout le programe
var queryString = window.location.search;

/*
Ajout d'une ligne de mission
*/
$('#ajouterMission').on('click', () => {nouvelleLigneMission()})

function nouvelleLigneMission(){
    let date = new Date();
    let dateFormulaire = date.getDate() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear();

    let strLigne =  '<tr>'
    strLigne +=     '<td class="remove"><button class="retirerMission">-</button></td>'
    strLigne +=     '<td><input type="text" class="poste" name="poste" placeholder="POSTE"></td>'
    strLigne +=     '<td><input type="text" class="manager" name="manager" placeholder="MANAGER"></td>'
    strLigne +=     '<td><input type="text" class="nbCandidatsPresentes" name="nbCandidatsPresentes" placeholder="NOMBRE DE CANDIDATS PRESENTES" value="0"></td>'
    strLigne +=     '<td><input type="text" class="dateOuverture" name="dateOuverture" placeholder="JJ/MM/AAAA" value=' + dateFormulaire + '></td>'
    strLigne +=     '<td>0J</td>'
    strLigne +=     '</tr>'
    let ligne = $(strLigne)
    ligne.appendTo($('#tableMission'))

    $(".retirerMission").on('click', (e) => {
        e.target.parentElement.parentElement.remove()
    })
    $('.dateOuverture').on('click', () => {calculEtatMission()})
}






/*
Calcul des etats des missions
*/
function calculEtatMission(){
    for (ligne of $('#tableMission').children().children()){
        if(ligne.classList != 'en-tete'){
            let cases = ligne.cells
            let elementsDate = cases[4].children[0].value.split('/')

            let dateMJA = new Date(+elementsDate[2], elementsDate[1] - 1, +elementsDate[0])
            let dateDuJour = new Date()


            let nbJours = parseInt((dateDuJour - dateMJA)/(1000 * 3600 * 24))
            
            
            cases[5].textContent = nbJours + "J"
        }
    }
}




/*
Fonction pour le chargement du formulaire si jamais on trouve le siret
(dans l'url)
On envoie alors une requête et on charge les élements trouvés dans les champs

Ici on parle du chargement de la partie du formulaire qui concerne les missions
*/
if (queryString){
    let siretUrl = queryString.split('=')[1];

    calculEtatMission()
}else {
    //Si on ne modifie pas de formulaires, alors on initialise pour la création
    nouvelleLigneMission()
}




/*
//Fonction qui permet d'afficher les différentes missions
function updateContactsInfo(siretUrl){
    $.ajax({
        type: 'GET',
        url: '../php/action_missions.php',
        dataType: 'json',
        data : {
            siret : siretUrl,
            action : "afficher",
        },
        success: (data) => {
            if (data.error){
                alert(data.message);
            } else{
                for (contacts of data){
                    let strLigne =  '<tr>'
                    strLigne +=     '<td class="remove"><button class="retirerMission '+ idmission +' ">-</button></td>'
                    strLigne +=     '<td><input type="text" class="poste" name="poste" placeholder="POSTE" value=' + contacts.post_mission + '></td>'
                    strLigne +=     '<td><input type="text" class="manager" name="manager" placeholder="MANAGER" value=' + contacts.manager_mission + '></td>'
                    strLigne +=     '<td><input type="text" class="nbCandidatsPresentes" name="nbCandidatsPresentes" placeholder="NOMBRE DE CANDIDATS PRESENTES" value=' + contacts. + '></td>'
                    strLigne +=     '<td><input type="text" class="dateOuverture" name="dateOuverture" placeholder="JJ/MM/AAAA" value=' + contacts. + '></td>'
                    strLigne +=     '<td>0J</td>'
                    strLigne +=     '</tr>'
                    let ligne = $(strLigne)
                    ligne.appendTo($('#tableMission'))
                
                    $(".retirerMission").on('click', (e) => {
                        e.target.parentElement.parentElement.remove()
                    })
                    $('.dateOuverture').on('click', () => {calculEtatMission()})
                }

                $(".retirerElement").on('click', (e) => {
                    deleteContact(e.target.classList[1])
                    e.target.parentElement.parentElement.remove()
                })
            }
        },
        error: (error) => {
            alert('Erreur !');
        }
    });
}





//Ajouter et modifier des contacts
function envoyerContacts(){
    //Formulaire du contact
    if (document.querySelector("#siret").value == ""){
        alert("Les contacts doivent appartenir a une entreprise (siret non defini)")
    } else {
        for (ligne of $('#tableContact').children().children()){
            if(ligne.classList != 'en-tete'){
                let cases = ligne.cells
                let idCont = cases[0].children[0].classList[1]


                if(idCont == undefined){
                    //Si on ne trouve pas l'id dans la classe, alors il faut ajouter dans la base
                    data = {
                        siret : document.querySelector("#siret").value,
                        nom : cases[1].children[0].value,
                        prenom : cases[2].children[0].value,
                        num : cases[5].children[0].value,
                        job : cases[3].children[0].value,
                        email : cases[4].children[0].value,
                        action : "ajouter",
                    }
                } else {
                    //Si on ne troruve pas le dit id alors, on parle d'un ajout
                    data = {
                        idcontact : idCont,
                        siret : document.querySelector("#siret").value,
                        nom : cases[1].children[0].value,
                        prenom : cases[2].children[0].value,
                        num : cases[5].children[0].value,
                        job : cases[3].children[0].value,
                        email : cases[4].children[0].value,
                        action : "modifier",
                    }
                }
                
                if (cases[6].children[0].value == "SUIVI APPRECIER"){
                    data["approach"] = ""
                } else {
                    data["approach"] = cases[6].children[0].value
                }

                requeteContact(data)
            }
        }
    }
}



function deleteContact(idCont){
    data = {
        idcontact : idCont,
        action : "supprimer",
    }
    requeteContact(data)
}





//rq ajax contacts
function requeteContact(dataContact){
    $.ajax({
        type: 'GET',
        url: '../php/action_contact.php',
        dataType: 'json',
        data : dataContact,
        success: (data) => {
            if (data.error){
                alert(data.message);
            }
        },
        error: (error) => {
            alert('Erreur !');
        }
    });
}
*/