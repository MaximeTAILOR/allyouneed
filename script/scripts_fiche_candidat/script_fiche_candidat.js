//navbar______________________________________________________________
$('#identite').on('click', (e) => {
    e.preventDefault();
    changerDePage($('.container1'))
});


$('#projet').on('click', (e) => {
    e.preventDefault();
    changerDePage($('.container2'))
});


$('#entretiens').on('click', (e) => {
    e.preventDefault();
    changerDePage($('.container3'))
});


$('#process').on('click', (e) => {
    e.preventDefault();
    changerDePage($('.container4'))
});



function changerDePage(pageAOuvrir){
    $('.container1').css('display', 'none')
    $('.container2').css('display', 'none')
    $('.container3').css('display', 'none')
    $('.container4').css('display', 'none')
    
    pageAOuvrir.css('display', 'grid')

    let finForm = $('#finForm').clone()
    $('#finForm').remove()
    finForm.appendTo(pageAOuvrir)


    initNotation()

    //Le script modif candidat étant chargé en premier, j'ai le droit d'utiliser ces fonctions
    //Cepandant il est important de ne pas changer l'ordre de ceux ci
    //
    //De plus idUrl étant une var, même si elle est définie sur un autre script, elle est accessible
    if (idUrl == undefined) {
        initBouttonAjouter()
    } else {
        initBouttonModifier()
    }
}





//Page 1______________________________________________________________
/*
*Change la pdp en fonction de si c'est un homme ou une femme
*/
$('.homme').on('click', (event) => {
    event.stopPropagation();
    $('img').attr('src', '../img/man.jpg');
    $('#homme').prop('checked', true);
    $('#femme').prop('checked', false);
});

$('.femme').on('click', (event) => {
    event.stopPropagation();
    $('img').attr('src', '../img/women.jpg');
    $('#homme').prop('checked', false);
    $('#femme').prop('checked', true);
});


/*
Fonctions liées au pop-up
Tout les labels sont sur une même fenêtre
On affiche et efface les labels en fonction de où on clique et ensuite on affiche la fenêtre
*/
//fonctions
function affichePopup (elementClique) { 
    $('.fermeture_pop-up').toggle();
    $('.' + elementClique).css('display', 'block');
}

function effacePopup () {
    $('.fermeture_pop-up').toggle();
    $('.linkedin').css('display', 'none');
    $('.instagram').css('display', 'none');
    $('.discord').css('display', 'none');
    $('.whatsapp').css('display', 'none');
}

//Création des evenements
$('.fermeture_pop-up').on('click', () => {effacePopup()})
$('.close').on('click', () => {effacePopup()})

//Pour ne pas fermer la popup en cliquant n'importe où dessus
$('.pop-up').on('click', (event) => {event.stopPropagation()})

$(".fa-linkedin").on('click', () => {affichePopup("linkedin")});
$(".fa-instagram").on('click', () => {affichePopup("instagram")});
$(".fa-discord").on('click', () => {affichePopup("discord")});
$(".fa-whatsapp").on('click', () => {affichePopup("whatsapp")});




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
        if (input.getAttribute('id') != "envoyer"
            && input.getAttribute('id') != "homme"
            && input.getAttribute('id') != "femme"
            && input.getAttribute('id') != "veutUneFormation"
            && input.getAttribute('id') != "listeFormationSouhaite"){
            nbMaxInput++;
            if(input.value != ""){
                nbValidInput++;
            }
        }
    }

    let listTextarea = document.querySelectorAll('textarea');

    for (textarea of listTextarea){
        nbMaxInput++;
        if (textarea.value != "COMPTE RENDU D'ENTRETIENS" && textarea.value != "AVIS DE L'AGENT"){
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
    });

    $("i").on("click", (event) => {
        let note = parseInt(event.target.id);
        $('#note').text(note);
    })

    $("i").on("mouseout", () => {
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
Pour afficher ou cacher la liste des formations
*/
$('#veutUneFormation').on('click', () => {
    $('#listeFormationSouhaite').toggle();
})


$('#listCand').on("click", (e) => {
    e.preventDefault() 
    if(confirm('Êtes vous sûr de vouloir quitter la page ?')){
        localStorage.removeItem("sauvegardeLocaleDuForm")
        window.location.href = "./list_cust.html"   
    }
})