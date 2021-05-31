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
let dateFormulaire = date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear();

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
let dateDuJour = new Date.now()
let date

/*
Calcul des CA
*/

/*
Ajout d'une ligne de contact
*/