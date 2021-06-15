//constantes pour tout le programe
var queryString = window.location.search;
let spancoColumn;
let rowColumn;


//navbar______________________________________________________________
$('#entreprise').on('click', (e) => {
    e.preventDefault();
    changerDePage($('.container1'))
});


$('#contacts').on('click', (e) => {
    e.preventDefault();
    changerDePage($('.container2'))
});


$('#missions').on('click', (e) => {
    e.preventDefault();
    changerDePage($('.container3'))
});


$('#ca').on('click', (e) => {
    e.preventDefault();
    changerDePage($('.container4'))
});

$('#spanco').on('click', (e) => {
    e.preventDefault();
    changerDePage($('.container5'))
});


function changerDePage(pageAOuvrir){
    $('.container1').css('display', 'none')
    $('.container2').css('display', 'none')
    $('.container3').css('display', 'none')
    $('.container4').css('display', 'none')
    $('.container5').css('display', 'none')
    
    pageAOuvrir.css('display', 'grid')

    let finForm = $('#finForm').clone()
    $('#finForm').remove()
    finForm.appendTo(pageAOuvrir)

    initNotation()
    initEnvoyer()
}


//Demande confirmation avant d'envoyer le formulaire
$('#listEnt').on("click", (e) => {
    e.preventDefault() 
    if(confirm('Êtes vous sûr de vouloir quitter la page ?')){
        window.location.href = "./list_comp.html"   
    }
})





//Fin form______________________________________________________________
/*
Système de bare d'avencement

On arrive a 100% ssi :
Tout les champs de la page principale sont remplis
On a un contact remplis au maximum
On a une mission replie au maximum


*/
function updateBar(){
    let nbMaxInput=0
    let nbValidInput=0

    for (element of $('.container1 input, .container1 select')){
        if (element.id != "envoyer"){
            nbMaxInput++;
            if(element.value != ""){
                nbValidInput++;
            }
        }
    }

    //On cherche dans les lignes du tableau laquelle est la plus remplie
    //On vas dans les lignes du tableau, on vérifie que ce n'est pas l'en-tête
    //Ensuite dans les cases de chaque ligne, on vérifie que l'on est pas dans la case du bouton
    //Puis enfin on vérifie qu'une valeur est bien rentrée

    //Le code est complexe pour pouvoir s'adapter si on décide de rajouter un champ

    let nombreCasesTableContact = $('#tableContact tr:first td').length -1
    let maxTemp = 0
    for (lignes of $('#tableContact tr')){
        let nombreChampsRemplis = 0
        if (lignes.className != "en-tete"){
            for (cases of lignes.cells){
                if(cases.firstChild.value!="" && cases.firstChild.value!="SUIVI APPRECIER" && cases.className != "remove"){
                    nombreChampsRemplis++
                }
            }
        }
        if (maxTemp<nombreChampsRemplis){
            maxTemp = nombreChampsRemplis
        }
    }
    nbMaxInput+=nombreCasesTableContact
    nbValidInput+=maxTemp


    //La on regarde juste si le nom du manager et le nom de poste ont été reneseignés
    //Vu que toutes les autres cases ont des valeurs par défaut, c'est innutile de les prendre en compte
    let nombreCasesTableMission = 2
    maxTemp = 0
    for (lignes of $('#tableMission tr')){
        let nombreChampsRemplis = 0

        if (lignes.className != "en-tete"){
            for (cases of lignes.cells){
                if((cases.firstChild.className == "poste" || cases.firstChild.className == "manager") && cases.firstChild.value!=""){
                    nombreChampsRemplis++
                }
            }
        }

        if (maxTemp<nombreChampsRemplis){
            maxTemp = nombreChampsRemplis
        }
    }
    nbMaxInput+=nombreCasesTableMission
    nbValidInput+=maxTemp

    
    let proportion = nbValidInput/nbMaxInput;
    
    $('#progressBar').css("width", 100*proportion + "%");

    $('#pourcentage').text(parseInt(100*proportion) + '%');
    $('#pourcentage').css('color', "rgb(" + (1-proportion)*255 + ", " + proportion*255 + ", 0)");
}


/*
On fait en sorte que quelque soit ce que l'on clique ou modifie, on actualise la progress bar
Et ensuite si on clique sur un bouton (par exemple nouveau contact), alors on rebind les champs de la nouvelle ligne
Pour que eux aussi puissent actualiser la progress bar
*/

//On actualise la progress bar toutes les secondes
let timer = setInterval(updateBar, 1000)






/*
*Système de notation
*On initialise le les étoiles pour pouvoir noter
*Ensuite si on clique on désactive les fonction de notation pour pouvoir déplacer la souris
*Et ensuite au bout de 2s, on laisse modifier la notation si il y a eu une erreur
*/

function initNotation(){
    $(".fa-star").on("mouseover", (event) => { 
        let note = parseInt(event.target.id);
        for (let i = note; i>0; i--){
            $('#' + i).removeClass('un-check');
            $('#' + i).addClass('check');
        }
        for (let i = note+1; i<6; i++){
            $('#' + i).removeClass('check');
            $('#' + i).addClass('un-check');
        }
    });

    $(".fa-star").on("click", (event) => {
        let note = parseInt(event.target.id);
        $('#note').text(note);
    })

    $(".fa-star").on("mouseout", () => {
        updateAfficheNote()
    })
}

function updateAfficheNote(){
    note = $('#note').text();

    for (let numEtoile=1; numEtoile<6; numEtoile++){
        let checkStatus = 'un-check'
        if (numEtoile <= note){
            checkStatus = 'check'
        }
        $('#' + numEtoile).removeClass('un-check')
        $('#' + numEtoile).removeClass('check')
        $('#' + numEtoile).addClass(checkStatus);
    }
}


initNotation()






/*
Mise a jour des informations quand on rentre le siret
*/
const cle = "631cd780-53e6-335c-b1d3-d682fb533507";

$("#siret").keyup(function () { 
    let siret = document.querySelector("#siret").value;
    if (siret.length == 14){
        remplissageAutoSiret (siret);
    }
});





//On fait la requête pour voir si l'entreprise existe bien
function remplissageAutoSiret (siret){
    $.ajax({
        url: "https://api.insee.fr/entreprises/sirene/V3/siret/" + siret,
        beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + cle)
        },
        success: (data) => {
            $("#siren").val(data.etablissement.siren)
            $("#codeAPE").val(data.etablissement.uniteLegale.activitePrincipaleUniteLegale)
            $("#nomEntreprise").val(data.etablissement.uniteLegale.denominationUniteLegale)
            $("#catEntreprise").val(data.etablissement.uniteLegale.categorieEntreprise)
        }
    });
}


/*
Fonction pour le chargement du formulaire si jamais on trouve le siret
(dans l'url)
On envoie alors une requête et on charge les élements trouvés dans les champs

Ici on parle du chargement de la partie du formulaire qui concerne l'entreprise

On en profite pour initialiser la navbar
*/
if (queryString){
    let siretUrl = queryString.split('=')[1];
    
    updateEntrepriseInfo(siretUrl);
    //initProgressBarUpdate()
}else {
    //Si on ne modifie pas de formulaires, alorson initialise pour la création
    let date = new Date();
    let dateFormulaire = date.getDate() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear();
    $('#dateDuJour').val(dateFormulaire);

    //initProgressBarUpdate()
}




function updateAffichage(data){
    $('#siret').val(            data["siret"])
    $('#siren').val(            data["siren"])
    $('#catEntreprise').val(    data["type"])
    $('#nomEntreprise').val(    data["name"])
    $('#codeAPE').val(          data["ape"])
    $('#origineDuContact').val( data["origin"])
    $('#note').text(            data["grade"])
    

    //affichage de la date
    let elementsDate = data["date"].split('-')
    for (index in elementsDate){
        elementsDate[index] = parseInt(elementsDate[index])
    }
    let dateFormulaire = elementsDate[0] + '/' + elementsDate[1] + '/' + elementsDate[2];
    $('#dateDuJour').val(dateFormulaire);

    //update l'affichage de note
    updateAfficheNote()
}





/*
Fonctions concernant le SPANCO
*/
//Fonction permettant d'initialiser les flèches
function initFleches() {
    $('#arrowRight').click(() => {   
        let spancoCompany = $('#logo').clone();
        let arrows = $('#arrow').clone();
        spancoColumn = $('#logo').parent().attr('id');
        rowColumn = spancoColumn.charAt(spancoColumn.length-1);
        $('#logo').remove();
        $('#arrow').remove();
        rowColumn = parseInt(rowColumn) + 1;
        spancoColumn = '#' + spancoColumn.slice(0, -1) + rowColumn;
        spancoCompany.appendTo(spancoColumn);
        arrows.appendTo(spancoColumn);
        $('#arrowLeft').attr('style', 'display : inline');
        initFleches();
        rightBorder(spancoColumn);
        modifyLogo(spancoColumn);
    })
    
    $('#arrowLeft').click(() => {   
        let spancoCompany = $('#logo').clone();
        let arrows = $('#arrow').clone();
        spancoColumn = $('#logo').parent().attr('id');
        rowColumn = spancoColumn.charAt(spancoColumn.length-1);
        $('#logo').remove();
        $('#arrow').remove();
        rowColumn = parseInt(rowColumn) - 1;
        spancoColumn = '#' + spancoColumn.slice(0, -1) + rowColumn;
        spancoCompany.appendTo(spancoColumn);
        arrows.appendTo(spancoColumn);
        $('#arrowRight').attr('style', 'display : inline');
        initFleches();
        leftBorder(spancoColumn);
        modifyLogo(spancoColumn);
    })
}

initFleches()



//Met le SPANCO dans la bonne case
function initSpanco(data){
    console.log(data);
    spancoColumn = '#colonne' + data[0]['spanco'];
    console.log(spancoColumn);
    let spancoCompInit = $('#logo').clone();
    let spancoArrowsInit = $('#arrow').clone();
    $('#logo').remove();
    $('#arrow').remove();
    spancoCompInit.appendTo(spancoColumn);
    spancoArrowsInit.appendTo(spancoColumn);
    initFleches();
    modifyLogo(spancoColumn);
    rightBorder(spancoColumn);
    leftBorder(spancoColumn);
    $('#dateSpanco').append(data[0]['date']);

    rowColumn = data[0]['spanco']
}


function leftBorder (column) {
    if (column == "#colonne0") {
        $('#arrowLeft').attr('style', 'display : none');
    }
}

function rightBorder (column) {
    if (column == "#colonne5") {
        $('#arrowRight').attr('style', 'display : none');
    }
}


function modifyLogo (column) {
    if (column == "#colonne0") {
        $('#logo').attr('class', 'far fa-user')
    }
    else if (column == "#colonne1") {
        $('#logo').attr('class', 'fas fa-suitcase')
        $('#logo').addClass('trigger-popup')
        initLiens();
    }
    else if (column == "#colonne2") {
        $('#logo').attr('class', 'fas fa-list-ul')
        $('#logo').addClass('trigger-popup')
        initLiens();
    }
    else if (column == "#colonne3") {
        $('#logo').attr('class', 'fas fa-balance-scale')
        $('#logo').addClass('trigger-popup')
        initLiens();
    }
    else if (column == "#colonne4") {
        $('#logo').attr('class', 'fas fa-handshake')
        $('#logo').addClass('trigger-popup')
        initLiens();
    }
    else if (column == "#colonne5") {
        $('#logo').attr('class', 'fas fa-user-check')
        $('#logo').addClass('trigger-popup')
        initLiens();
    }else {
        alert('Erreur !');
    }
}


function updateContactsInfo() {
let siretUrl = queryString.split('=')[1];
console.log(siretUrl);
$.ajax({
    type: 'GET',
    url: '../php/action_contact.php',
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
                let strLigne =  ''
                strLigne +=     '<h1> Contact : </h1>';
                strLigne +=     '<p> Nom : <br>' + contacts.name + '</p>';
                strLigne +=     '<p> Prénom : <br>' + contacts.fname + '</p>';
                strLigne +=     '<p> Fonction : <br>' + contacts.job + '</p>';
                strLigne +=     '<p> Adresse mail : <br>' + contacts.email + '</p>';
                strLigne +=     '<p> Numéro de téléphone : <br>' + contacts.num + '</p>';
                strLigne +=     '<p> Suivi apprécié : <br>' + contacts.approach + '</p>';
                let ligne = $(strLigne)
                ligne.appendTo($('.pop-up'))
            }
        }
    },
    error: (error) => {
        alert(error);
    }
});
}







function updateEntrepriseInfo(siretUrl){
    $.ajax({
        type: 'GET',
        url: '../php/action_company.php',
        dataType: 'json',
        data : {
            siret : siretUrl,
            action : "afficher",
        },
        success: (data) => {
            if (data.error){
                alert(data.message);
            } else {
                updateAffichage(data[0]);
                initSpanco(data);
            }
        },
        error: (error) => {
            alert('Erreur !');
        }
    });
}



/*
Fonctions concernant l'envoie du formulaire pour inscription dans la bd
*/


//Formulaire de l'entreprise
function envoyerEntreprise(){
    elementDate = document.querySelector("#dateDuJour").value.split('/')
    datePhp=elementDate[0] + '-' + elementDate[1] + '-' + elementDate[2]

    if (!queryString){
        var actionSurClient = "ajouter";
    } else {
        var actionSurClient = "modifier";
    }
    $.ajax({
        type: 'GET',
        url: '../php/action_company.php',
        dataType: 'json',
        data : {
            siret :         document.querySelector("#siret").value,
            siren :         document.querySelector("#siren").value,
            ape :           document.querySelector("#codeAPE").value,
            nomEntreprise : document.querySelector("#nomEntreprise").value,
            type :          document.querySelector("#catEntreprise").value,
            date :          datePhp,
            origin :        document.querySelector("#origineDuContact").value,
            grade :         $('#note').text(),
            spanco :        rowColumn,
            action :        actionSurClient,
        },
        success: (data) => {
            if (data.error){
                alert(data.message);
            } else {
                alert("Entreprise ajoutée / modifiée !");
            }
        },
        error: (error) => {
            alert('Erreur !');
        }
    });
}


/*
Attention, cette fonction appel des fonction basés sur d'autres feuilles !
Il est important que celle ci soit chargée en dernier
*/
function initEnvoyer() {
        $('#envoyer').on('click', (e) => {
            if (document.querySelector("#siret").value != ""){
                e.preventDefault()
                envoyerEntreprise()
                envoyerContacts()
                envoyerMissions()
                envoyerCA()
            } else {
                alert("Les contacts doivent appartenir a une entreprise (siret non defini)")
            }
        });
}

function initLiens(){
    $('.trigger-popup').click((event) => { 
        event.preventDefault();
        //On réinitialise la fenêtre pop-up puis on l'affiche
        $('.pop-up').html('<span class="close">x</span>')
        //On réassocie l'event
        $('.close').click(() => {
            $('.fermeture_pop-up').toggle();
        });

        $('.fermeture_pop-up').toggle();

        //sélection du conteneur dans lequel on vas placer les infos
        let conteneur=$('.pop-up');
        
        updateContactsInfo();
    
    })
}

//evenements
$('.fermeture_pop-up').click(() => {
    $('.fermeture_pop-up').toggle();
});

$('.pop-up').click((e) => {
    e.stopPropagation();
});

initEnvoyer();
initLiens();