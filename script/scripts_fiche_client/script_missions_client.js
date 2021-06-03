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
    //Si on ne modifie pas de formulaires, alorson initialise pour la création
    nouvelleLigneMission()
}




