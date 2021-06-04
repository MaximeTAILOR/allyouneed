//constantes pour tout le programe
var queryString = window.location.search;


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



function changerDePage(pageAOuvrir){
    let anciennePage
    if ($('.container1').css('display')=='grid'){
        anciennePage=$('.container1')
    } else if ($('.container2').css('display')=='grid') {
        anciennePage=$('.container2')
    } else if ($('.container3').css('display')=='grid') {
        anciennePage=$('.container3')
    } else if ($('.container4').css('display')=='grid') {
        anciennePage=$('.container4')
    }
    anciennePage.css('display', 'none');
    pageAOuvrir.css('display', 'grid');

    let finForm = $('#finForm').clone();
    $('#finForm').remove();
    finForm.appendTo(pageAOuvrir)

    initNotation()
    $("i").on("click", () => {
        $("i").off("mouseover");
        setTimeout(() => {initNotation()}, 2000)
    })
    initEnvoyer()
}





//Fin form______________________________________________________________
/*
*Système de bare d'avencement
*On compte tout les champs (input + textarea)
*On vérifie qu'ils n'ont pas leur valeur par défaut
*Ensuite on fait 100 x (nb de champs remplis / nb total de champs)
*/
function updateBar(){
    let listInputs = document.querySelectorAll('input')
    
    let nbMaxInput=0;
    let nbValidInput=0;
    for (input of listInputs){
        if (input.getAttribute('id') != "envoyer"){
            nbMaxInput++;
            if(input.value != ""){
                nbValidInput++;
            }
        }
    }

    let listTextarea = document.querySelectorAll('textarea');

    for (textarea of listTextarea){
        nbMaxInput++;
        if (textarea.value != "SUIVIT APPRECIER"){
            nbValidInput++;
        } 
    }

    let listSelect = document.querySelectorAll('select');
    for (select of listSelect){
        nbMaxInput++;
        if (select.value != "") {
            nbValidInput++;
        }
    }

    
    let proportion = nbValidInput/nbMaxInput;
    
    $('#progressBar').css("width", 100*proportion + "%");

    $('#pourcentage').text(parseInt(100*proportion) + '%');
    $('#pourcentage').css('color', "rgb(" + (1-proportion)*255 + ", " + proportion*255 + ", 0)");
}



$('input').change(() => {updateBar()});
$('textarea').change(() => {updateBar()});
$('select').change(() => {updateBar()});

updateBar()






/*
*Système de notation
*On initialise le les étoiles pour pouvoir noter
*Ensuite si on clique on désactive les fonction de notation pour pouvoir déplacer la souris
*Et ensuite au bout de 2s, on laisse modifier la notation si il y a eu une erreur
*/

function initNotation(){
    $("i").on("mouseover", (event) => { 
        let note = parseInt(event.target.id);
        for (let i = note; i>0; i--){
            $('#' + i).removeClass('un-check');
            $('#' + i).addClass('check');
        }
        for (let i = note+1; i<6; i++){
            $('#' + i).removeClass('check');
            $('#' + i).addClass('un-check');
        }
        $('#note').text(note);
    });
}

$("i").on("click", () => {
    $("i").off("mouseover");
    setTimeout(() => {initNotation()}, 2000)
})

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
*/
if (queryString){
    let siretUrl = queryString.split('=')[1];
    
    updateEntrepriseInfo(siretUrl)
}else {
    //Si on ne modifie pas de formulaires, alorson initialise pour la création
    let date = new Date();
    let dateFormulaire = date.getDate() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear();
    $('#dateDuJour').val(dateFormulaire);
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
    note = $('#note').text();
    for (let i = note; i>0; i--){
        $('#' + i).removeClass('un-check');
        $('#' + i).addClass('check');
    }
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
                updateAffichage(data[0])
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
            action :        actionSurClient,
            spanco :        "",
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
        e.preventDefault()
        envoyerEntreprise()
        envoyerContacts()
        envoyerMissions()
        envoyerCA()
    });
}

initEnvoyer()