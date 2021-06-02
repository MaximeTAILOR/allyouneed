//constantes pour tout le programe
const queryString = window.location.search;


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
$('#ajouterContact').on('click', () => {nouvelleLigneContact()})

function nouvelleLigneContact(){
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
}







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
* Met automatiquement la date
*/

let date = new Date();
let dateFormulaire = date.getDate() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear();

$('#dateDuJour').val(dateFormulaire);










/*
Fonction pour le chargement du formulaire si jamais on trouve le siret
(dans l'url)
On envoie alors une requête et on charge les élements trouvés dans les champs

Ici on parle du chargement de la partie du formulaire qui concerne l'entreprise
*/


if (queryString){
    let siretUrl = queryString.split('=')[1];
    
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
}else {
    /*
    Si on ne modifie pas de formulaires, alorson initialise pour la création
    */
    let date = new Date();
    let dateFormulaire = date.getDate() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear();
    $('#dateDuJour').val(dateFormulaire);


    nouvelleLigneMission()
    nouvelleLigneContact()
}



function updateAffichage(data){
    console.log(data)
    $('#siret').val(         data["siret"])
    $('#siren').val(         data["siren"])
    $('#catEntreprise').val( data["type"])
    $('#nomEntreprise').val( data["name"])
    $('#codeAPE').val(       data["ape"])
}


calculEtatMission()








/*
Fonctions concernant l'envoie du formulaire pour inscription dans la bd
*/



//Formulaire de l'entreprise
function envoyerEntreprise(){
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
            siret : document.querySelector("#siret").value,
            siren : document.querySelector("#siren").value,
            ape : document.querySelector("#codeAPE").value,
            nomEntreprise : document.querySelector("#nomEntreprise").value,
            type : document.querySelector("#catEntreprise").value,
            action : actionSurClient,
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






function envoyerContacts(){
    //Formulaire du contact
    for (ligne of $('#tableContact').children().children()){
        if(ligne.classList != 'en-tete'){
            let cases = ligne.cells
            data = {
                siret : document.querySelector("#siret").value,
                nom : cases[1].children[0].value,
                prenom : cases[2].children[0].value,
                num : cases[5].children[0].value,
                job : cases[3].children[0].value,
                email : cases[4].children[0].value,
                action : "ajouter",
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


function requeteContact(dataContact){
    $.ajax({
        type: 'GET',
        url: '../php/action_contact.php',
        dataType: 'json',
        data : dataContact,
        success: (data) => {
            if (data.error){
                alert(data.message);
            } else {
                alert("Contact ajouté / modifié !");
            }
        },
        error: (error) => {
            console.log(error)
            alert('Erreur !');
        }
    });
}





function initEnvoyer() {
    $('#envoyer').on('click', (e) => {
        e.preventDefault()
        console.log("fonction lancée")
        //envoyerEntreprise()
        envoyerContacts()
    });
}

initEnvoyer()