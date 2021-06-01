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
}



/*
* Met automatiquement la date
*/


let date = new Date();
let dateFormulaire = date.getDate() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear();

$('#dateDuJour').val(dateFormulaire);


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
Calcul des etats des missions
*/
for (ligne of $('#tableMission').children().children()){
    if(ligne.classList != 'en-tete'){
        let cases = ligne.cells
        let elementsDate = cases[3].textContent.split('/')

        let dateMJA = new Date(elementsDate[2], elementsDate[1] - 1, elementsDate[0])
        let dateDuJour = new Date()

        let nbJours = parseInt((dateDuJour - dateMJA)/(1000 * 3600 * 24))
        
        
        cases[4].textContent = nbJours + "J"
    }
}






/*
Calcul des CA
*/
let totalCA=0
//On doit utiliser deux fois .children() parce que le tableau créé automatiquement un div tbody
//$('#tableCA').children() nous rend donc ce tbody et non les lignes voulues

for (ligne of $('#tableCA').children().children()){
    if(ligne.classList != 'en-tete'){
        let cases = ligne.cells
        cases[3].textContent = cases[1].textContent * (cases[2].textContent / 100)
        totalCA+=parseInt(cases[3].textContent)
    }
}
$('#textCA').text("Total CA : "+totalCA+"€")









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
Ajout d'une ligne de contact
*/
$('#ajouterContact').on('click', () => {
    let strLigne =  '<tr>'
    strLigne +=     '<td class="remove"><button class="retirerElement">-</button></td>'
    strLigne +=     '<td><input type="text" class="nom" name="nom" placeholder="NOM"></td>'
    strLigne +=     '<td><input type="text" class="prenom" name="prenom" placeholder="PRENOM"></td>'
    strLigne +=     '<td><input type="text" class="fonction" name="fonction" placeholder="FONCTION"></td>'
    strLigne +=     '<td><input type="text" class="mail" name="mail" placeholder="MAIL"></td>'
    strLigne +=     '<td><input type="text" class="telephone" name="telephone" placeholder="TELEPHONE"></td>'
    strLigne +=     '<td><textarea class="suiviApprecier" name="suiviApprecier">SUIVI APPRECIER</textarea></td>'
    strLigne +=     '</tr>'
    let ligne = $(strLigne)
    ligne.appendTo($('#tableContact'))

    $(".retirerElement").on('click', (e) => {
        e.target.parentElement.parentElement.remove()
    })
})





/*
Fonctions liées au pop-up
Tout les labels sont sur une même fenêtre
On affiche et efface les labels en fonction de où on clique et ensuite on affiche la fenêtre
*/
//fonctions
/*
function affichePopup () { 
    $('.fermeture_pop-up').toggle();
}

function effacePopup () {
    $('.fermeture_pop-up').toggle();
}

//Création des evenements
$('.fermeture_pop-up').on('click', () => {effacePopup()})
$('.close').on('click', () => {effacePopup()})

//Pour ne pas fermer la popup en cliquant n'importe où dessus
$('.pop-up').on('click', (event) => {event.stopPropagation()})

$("#ajouterContact").on('click', () => {affichePopup()});
$('#ajouterMission').on('click', () => {affichePopup()});
*/
