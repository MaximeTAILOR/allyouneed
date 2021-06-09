const queryString = window.location.search;
var idUrl = queryString.split('=')[1];

/*
Fonctions appellées régulièrement dans le script
*/

//Fonction qui sert a mettre a jour l'affichage des notes
function updateAfficheNote(){
    note = $('#note').text()

    for (let numEtoile=1; numEtoile<6; numEtoile++){
        let checkStatus = 'un-check'
        if (numEtoile <= note){
            checkStatus = 'check'
        }
        $('#' + numEtoile).removeClass('un-check')
        $('#' + numEtoile).removeClass('check')
        $('#' + numEtoile).addClass(checkStatus)
    }
}




/*
Fonctions servant au chargement de la page
(notement, remplir les champs, mettre la bonne image...)
*/

//Fonction servant a remplir la fiche avec les données récupérées
//On parcours les champs et on on mes les valeurs renvoyées dans les inputs correspondants
function remplirFiche (data) {
    for (champ of Object.keys(data)) {
        $('#' + champ).val(data[champ]);
    }
    $('#note').text(data.note);
    updateAfficheNote();
    updateImg()
}


//Fonction qui met l'image de la femme si le bon boutton est check (on s'en sert que au chargement des données)
function updateImg(){
    if ($('#femme').is(':checked')) {
        $('img').attr('src', '../img/women.jpg')
    }
}


//Supprime les champs 'homme' et 'femme' créé automatiquement en parcourant les unputs
//Puis, créé un champ 'genre' qui contiens home ou femme
function genreCheck(donnees) {
    delete donnees['homme']
    delete donnees['femme']
    if ($('#homme').is(':checked')) {
        donnees['genre'] = 'homme'
    }
    if ($('#femme').is(':checked')) {
        donnees['genre'] = 'femme'
    }
}


/*
Fonctions préparant ou appelant des requêtes AJAX
*/
//Initialisation du bouton pour qu'il ai un comportement d'ajout
function initBouttonAjouter(){
    $('#envoyer').on('click', (event) => { 
        event.preventDefault();

        if (document.querySelector("#mail").value != ""){
            let inputs = $("input:not(#envoyer)")

            let donnees = {};

            for (element of inputs) {
            donnees[element.id] = element.value;
            }

            donnees['action'] = 'ajouter';
            donnees['typeDeContrat'] = $('#typeDeContrat').val();
            donnees['compteRenduAgent'] = $('#compteRenduAgent').val();
            donnees['statutCandidat'] = $('#statutCandidat').val();
            donnees['avisAgent'] = $('#avisAgent').val();
            donnees['origine'] = $('#origine').val();
            donnees['idcustomer'] = idUrl;
            donnees['note'] = $('#note').text();

            genreCheck(donnees);

            requeteCandidat(donnees, 'ajouter')
        } else {
            alert("Les candidats doivent avoir une adresse mail")
        }
    });
}


//Initialisation du bouton pour qu'il ai un comportement de modification
function initBouttonModifier(){
    $('#envoyer').on('click', (event) => { 
        event.preventDefault();

        if (document.querySelector("#mail").value != ""){
            let inputs = document.querySelectorAll('input');

            let donnees = {};
            for (element of inputs) {
            donnees[element.id] = element.value;
            }
            donnees['action'] = 'modifier';
            donnees['idcustomer'] = idUrl;
            donnees['typeDeContrat'] = $('#typeDeContrat').val();
            donnees['compteRenduAgent'] = $('#compteRenduAgent').val();
            donnees['statutCandidat'] = $('#statutCandidat').val();
            donnees['avisAgent'] = $('#avisAgent').val();
            donnees['origine'] = $('#origine').val();
            donnees['note'] = $('#note').text();

            genreCheck(donnees);

            requeteCandidat(donnees, 'modifier')
        } else {
            alert("Les candidats doivent avoir une adresse mail")
        }
    });
}


//Appel l'affichage des données au chargement
function updateAfficheInfos(){
    let donnees = {
        'action' : 'afficher',
        'idcustomer' : idUrl}
    requeteCandidat(donnees, 'afficher')
}



/*
Requêtes AJAX
*/
function requeteCandidat(donnees, action){
    $.ajax({
        type: 'GET',
        url: '../php/action_customer.php',
        dataType: 'json',
        data : donnees,
        success: (data) => {
            if (data.error){
                alert(data.message)
            } else {
                //La requête a abouti !
                if (action == 'afficher'){
                    remplirFiche(data[0]);
                }

                if (action == 'modifier'){
                    alert(data.message)
                }

                if (action == 'ajouter'){
                    idUrl = data.idcustomer
                    alert(data.message)
                        
                    $( "#envoyer").unbind( "click" )
                    initBouttonModifier()
                        
                }
            }
        },
        error: (data) => {
            alert('Erreur !')
        }
    });
}



/*
Script principal (tout ce qui n'est pas une fonction)
Innitialisation de bouttons et code appellé en début de programme
*/
if (idUrl == undefined) {
    initBouttonAjouter()
} else {
    updateAfficheInfos()
    initBouttonModifier()
}