//constantes pour tout le programe
var queryString = window.location.search;

/*
Ajout d'une ligne de mission
*/
function nouvelleLigneMission(){
    let date = new Date();
    let dateFormulaire = date.getDate() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear();

    let strLigne =  '<tr>'
    strLigne +=     '<td class="remove"><button class="retirerMission">-</button></td>'
    strLigne +=     '<td><input type="text" class="dateOuverture" name="dateOuverture" placeholder="JJ/MM/AAAA" value=' + dateFormulaire + ' disabled></td>'
    strLigne +=     '<td><input type="text" class="poste" name="poste" placeholder="POSTE"></td>'
    strLigne +=     '<td><input type="text" class="manager" name="manager" placeholder="MANAGER"></td>'
    strLigne +=     '<td><input type="text" class="presentes" name="presentes" placeholder="0" value="0"></td>'
    strLigne +=     '<td><input type="text" class="entretiens" name="entretiens" placeholder="0" value="0"></td>'
    strLigne +=     '<td><input type="text" class="signer" name="signer" placeholder="0" value="0"></td>'
    strLigne +=     '<td><input type="text" class="dateSignature" name="dateSignature" placeholder="JJ/MM/AAAA" value="0/0/0"></td>'
    strLigne +=     '<td><input type="text" class="CA" name="CA" placeholder="0" value="0"></td>'
    strLigne +=     '<td>0J</td>'
    strLigne +=     '<td> <input type="text" class="dateModif" name="dateModif" placeholder="JJ/MM/AAAA" value=' + dateFormulaire + ' disabled></td>'
    strLigne +=     '<td>0J</td>'
    strLigne +=     '</tr>'
    let ligne = $(strLigne)
    ligne.appendTo($('#tableMission'))

    //on selectione le bouton de la dernière case de la dernière ligne du tableau
    $('#tableMission tr:last td:first button').on('click', (e) => {
        e.target.parentElement.parentElement.remove()
    })

    calculEtatMission()
}






/*
Calcul des etats des missions
*/
function calculEtatMission(){
    for (ligne of $('#tableMission').children().children()){
        if(ligne.classList != 'en-tete'){
            let cases = ligne.cells
            let elementsDate = cases[1].children[0].value.split('/')
            let elementsDateModif = cases[10].children[0].value.split('/')

            let dateJMA = new Date(+elementsDate[2], elementsDate[1] - 1, +elementsDate[0])
            let dateModif = new Date(+elementsDateModif[2], elementsDateModif[1] - 1, +elementsDateModif[0])
            let dateDuJour = new Date()
            

            let nbJours = parseInt((dateDuJour - dateJMA)/(1000 * 3600 * 24))
            let nbJoursModif = parseInt((dateDuJour - dateModif)/(1000 * 3600 * 24))
            
            cases[9].textContent =  nbJours + "J  ";
            cases[11].textContent =  nbJoursModif + "J  ";
            if (nbJoursModif < 5) {
                $('<i id="green" class="fas fa-circle"></i>').appendTo(cases[11]);
            } else if (nbJoursModif < 9){
                $('<i id="yellow" class="fas fa-circle"></i>').appendTo(cases[11]);
            } else if (nbJoursModif < 15){
                $('<i id="orange" class="fas fa-circle"></i>').appendTo(cases[11]);
            } else {
                $('<i id="red" class="fas fa-circle"></i>').appendTo(cases[11]);
                $('<i class="fas fa-exclamation-triangle"></i>').appendTo(cases[11]);
            }
            
        }
    }
}





function reloadMission(siret){
    //On supprime les lignes
    for (ligne of $('#tableMission tr')){
        if(ligne.classList != 'en-tete'){
            ligne.remove()
        }
    }

    updateMissionInfo(siret)
}






/*
Fonction appelant des requetes AJAX
*/

//Fonction qui permet d'afficher les différentes missions
function updateMissionInfo(siretUrl){
    $.ajax({
        type: 'GET',
        url: '../php/action_mission.php',
        dataType: 'json',
        data : {
            siret : siretUrl,
            action : "afficher",
        },
        success: (data) => {
            if (data.error){
                alert(data.message);
            } else{
                for (mission of data){
                    /*
                    Traitement sur les dates pour un affichage correct
                    */
                    //affichage de la date d'ouverture
                    let elementsDate = mission["opendate"].split('-')
                    for (index in elementsDate){
                        elementsDate[index] = parseInt(elementsDate[index])
                    }
                    let dateOuverture = elementsDate[2] + '/' + elementsDate[1] + '/' + elementsDate[0];

                    //affichage de la date de signature
                    elementsDate = mission["enddate"].split('-')
                    for (index in elementsDate){
                        elementsDate[index] = parseInt(elementsDate[index])
                    }
                    let dateSignature = elementsDate[2] + '/' + elementsDate[1] + '/' + elementsDate[0];

                    //affichage de la date de modification
                    elementsDate = mission["lastmodif"].split('-')
                    for (index in elementsDate){
                        elementsDate[index] = parseInt(elementsDate[index])
                    }
                    let dateModif = elementsDate[2] + '/' + elementsDate[1] + '/' + elementsDate[0];

                    let strLigne =  '<tr>'
                    strLigne +=     '<td class="remove"><button class="retirerMission ' + mission["idmission"] + ' ">-</button></td>'
                    strLigne +=     '<td><input type="text" class="dateOuverture" name="dateOuverture" placeholder="JJ/MM/AAAA" value=' + dateOuverture + ' disabled></td>'
                    strLigne +=     '<td><input type="text" class="poste" name="poste" placeholder="POSTE" value=' + mission["post"] + '></td>'
                    strLigne +=     '<td><input type="text" class="manager" name="manager" placeholder="MANAGER" value=' + mission["manager"] + '></td>'
                    strLigne +=     '<td><input type="text" class="presentes" name="presentes" placeholder="0" value=' + mission["current"] + '></td>'
                    strLigne +=     '<td><input type="text" class="entretiens" name="entretiens" placeholder="0" value=' + mission["meeting"] + '></td>'
                    strLigne +=     '<td><input type="text" class="signer" name="signer" placeholder="0" value=' + mission["endorsed"] + '></td>'
                    strLigne +=     '<td><input type="text" class="dateSignature" name="dateSignature" placeholder="JJ/MM/AAAA" value=' + dateSignature + '></td>'
                    strLigne +=     '<td><input type="text" class="CA" name="CA" placeholder="0" value=' + mission["turnover"] + '></td>'
                    strLigne +=     "<td>" +  "J</td>"
                    strLigne +=     '<td><input type="text" class="dateModif" name="dateModif" placeholder="JJ/MM/AAAA" value=' + dateModif + ' disabled></td>'
                    strLigne +=     "<td>" +  "J</td>"
                    strLigne +=     '</tr>'
                    let ligne = $(strLigne)
                    ligne.appendTo($('#tableMission'))

                }
                //Initialisation du comportement du bouton et appel de quelques fonctions
                $(".retirerMission").on('click', (e) => {
                    deleteMission(e.target.classList[1])
                    e.target.parentElement.parentElement.remove()
                })
                //On rajoute une ligne et on calcul les états
                calculEtatMission()
                nouvelleLigneMission()
            }
        },
        error: (error) => {
            alert(error);
        }
    });
}





//Ajouter et modifier des missions
function envoyerMissions(){
    for (ligne of $('#tableMission tr')){
        if(ligne.classList != 'en-tete'){
            if(ligne.cells[3].children[0].value!="" && ligne.cells[2].children[0].value!=""){
                let cases = ligne.cells
                let idMiss = cases[0].children[0].classList[1]

                //Que l'on parle d'ajout ou de modifications, il faut préparer les dates pour le php
                let elementDate
                elementDate = cases[1].children[0].value.split('/')
                let dateOuverture=elementDate[2] + '-' + elementDate[1] + '-' + elementDate[0]

                elementDate = cases[7].children[0].value.split('/')
                let dateSignature=elementDate[2] + '-' + elementDate[1] + '-' + elementDate[0]
                
                let date = new Date();
                let dateModif = date.getFullYear() + '-' + parseInt(date.getMonth() + 1) + '-' + date.getDate();

                if(idMiss == undefined){
                    //Si on ne trouve pas l'id dans la classe, alors il faut ajouter dans la base
                    data = {
                        siret      : document.querySelector("#siret").value,
                        manager    : cases[3].children[0].value,
                        post       : cases[2].children[0].value,
                        current    : cases[4].children[0].value,
                        meeting    : cases[5].children[0].value,
                        endorsed   : cases[6].children[0].value,
                        opendate   : dateOuverture,
                        enddate    : dateSignature,
                        turnover   : cases[8].children[0].value,
                        lastmodif  : dateModif,
                        action     : "ajouter",
                    }
                } else {
                    //Si on ne troruve pas le dit id alors, on parle d'un ajout
                    data = {
                        idmission : idMiss,
                        siret      : document.querySelector("#siret").value,
                        manager    : cases[3].children[0].value,
                        post       : cases[2].children[0].value,
                        current    : cases[4].children[0].value,
                        meeting    : cases[5].children[0].value,
                        endorsed   : cases[6].children[0].value,
                        opendate   : dateOuverture,
                        enddate    : dateSignature,
                        turnover   : cases[8].children[0].value,
                        lastmodif  : dateModif,
                        action     : "modifier",
                    }
                }
                
                requeteMission(data)
            }
        }
    }
    reloadMission(document.querySelector("#siret").value)
}






function deleteMission(idMiss){
    data = {
        idmission : idMiss,
        action : "supprimer",
    }
    requeteMission(data)
}





/*
Requetes AJAX
*/

//rq ajax missions
function requeteMission(dataMission){
    $.ajax({
        type: 'GET',
        url: '../php/action_mission.php',
        dataType: 'json',
        data : dataMission,
        success: (data) => {
            if (data.error){
                alert(data.message)
            }
            console.log(data);
        },
        error: (error) => {
            console.log(data);
            alert(error);
        }
    });
}






/*
Code principal (tout ce qui n'est pas des fonctions)

On a aussi toutes les initialisation qui sont faites qu'une seule fois
*/

$('#ajouterMission').on('click', () => {nouvelleLigneMission()})


/*
Fonction pour le chargement du formulaire si jamais on trouve le siret
(dans l'url)
On envoie alors une requête et on charge les élements trouvés dans les champs

Ici on parle du chargement de la partie du formulaire qui concerne les missions
*/
if (queryString){
    let siretUrl = queryString.split('=')[1];

    updateMissionInfo(siretUrl)

    calculEtatMission()
} else {
    //Si on ne modifie pas de formulaires, alors on initialise pour la création
    nouvelleLigneMission()
}