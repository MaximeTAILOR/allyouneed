const tabNumeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let testAssociatif = {

    'telephone'     : '33612121212',
    'mail'          : 'test@gmail.com',
    'fonction'      : 'PDG',
    'nomEntreprise' : 'Facebook',
    'mdp'           : 'Monmdp-8'

};


document.querySelector('#telephone').value      = testAssociatif['telephone'];
document.querySelector('#mail').value           = testAssociatif['mail'];
document.querySelector('#fonction').value       = testAssociatif['fonction'];
document.querySelector('#nomEntreprise').value  = testAssociatif['nomEntreprise'];
document.querySelector('#mdp').value            = testAssociatif['mdp'];

$('.verifMail').attr('style', "display : none");
$('#mail').change(() => {
if (document.querySelector('#mail').value == testAssociatif['mail']) {
    $('.verifMail').attr('style', "display : none");
}
else {
    $('.verifMail').attr('style', "display : block");
}
})

$('.verifMdp').attr('style', "display : none");
$('#mdp').change(() => {
if (document.querySelector('#mdp').value == testAssociatif['mdp']) {
    $('.verifMdp').attr('style', "display : none");
}
else {
    $('.verifMdp').attr('style', "display : block");
}
})

//On modifie le comportement de l'envoi du formulairee
$('#envoyer').click((event) => {
    event.preventDefault();
    $('p').remove();
    let str = "";
    let erreur = false;

    //On vérifie qu'aucun champ n'est vide
    let champs = document.querySelectorAll('input')
    for (champ of champs) {
        if (champ.value == '' && champ.id != 'verifMail' && champ.id != 'verifMdp' && champ.id != "fonction" && champ.id != "nomEntreprise"){
            champ.style.borderColor = "red";
            $("<p> Ce champ n'est pas rempli.</p>").insertAfter(champ);
            erreur = true;
        } else {
            champ.style.borderColor = "silver";
        }
    }


    //Bloc des vérifications liés a tout ce qui ne peut pas contenir de chiffres
    let tabElementsSansChiffres = [
        document.querySelector("#fonction")
    ]
    for (element of tabElementsSansChiffres){
        if (testNumeroPresent(element.value)){
            erreur = true;
            element.style.borderColor = "red";
            $("<p> Cet element ne peut pas contenir de numéros.</p>").insertAfter(element);
        }
    }



    //Bloc des vérifications liés au telephone
    str = document.querySelector("#telephone").value;
    element = $("#telephone");
    if(str!=''){
        if (str.length != 11) {
            erreur = true;
            element.css("border-color", 'red');
            $("<p> Mauvaise taille de numéro (rendu attendu : 336 38 71 xx xx).</p>").insertAfter(element);
        } else {
            let NaNtrouve=false
            for (char of str) {
                if (isNaN(char)){
                    NaNtrouve = true;
                }
            }
            if (NaNtrouve){
                erreur = true
                element.css("border-color", 'red');
                $("<p> Cet élement ne peut pas contenir autres choses que des chiffres.</p>").insertAfter(element);
            }
        }
    }



    //Bloc des vérifications liés a l'adresse mail
    //On vérifie que l'email a été entré avec un forma valide
    str = document.querySelector("#mail").value;
    if(str!=''){
        if(!str.includes('@')){
            $('#mail').css('borderColor', "red");
            $("<p> Une adresse mail doit contetnir un '@'.</p>").insertAfter($('#mail'));
            erreur = true;
        } else if(!str.includes('.')){
            $('#mail').css('borderColor', "red");
            $("<p> Une adresse mail doit contetnir un '.'</p>").insertAfter($('#mail'));
            erreur = true;
        }

        //On vérifie que les deux adresses mails sont identiques
        if (testAssociatif['mail'] != str){
            if (str != document.querySelector("#verifMail").value) {
                erreur = true;
                $('#verifMail').css('borderColor', "red");
                $("<p> Les deux adresses mail doivent être identiques</p>").insertAfter($('#verifMail'));
            }
        }
    }

    //bloc de vérification du mot de passe
    //On vérifie que le mot de passe fait plus de 8 char
    //On vérifie qu'il ai un chiffre
    str = document.querySelector("#mdp").value;
    if (str != ""){
        if (str.length < 8){
            erreur = true;
            $('#mdp').css('borderColor', "red");
            $("<p> Le mot de passe doit au moins faire 8 caractères</p>").insertAfter($('#mdp'));
        } else {
            //On vas vérifier pour chaque char du mdp a quel catégorie il appartiens
            //Ensuite il suffit de vérifier si on en a une de chaque
            let possedeNombre       = false;
            let possedeMaj          = false;
            let possedeMin          = false
            let possedeSpecialChar  = false;
            
            for (char of str) {
                if (char in tabNumeros) {
                    possedeNombre = true;
                } else if (char.toUpperCase() != char){
                    possedeMin = true;
                } else if (char.toLowerCase() != char){
                    possedeMaj = true;
                } else {
                    possedeSpecialChar = true;
                }
            }
            //ici on utilise une suite de if else juste pour ne pas afficher 4 messages en même temps
            if (possedeMin == false) {
                erreur = true;
                $('#mdp').css('borderColor', "red");
                $("<p> Le mot de passe doit contenir au moins une minuscule.</p>").insertAfter($('#mdp'));
            } else if (possedeMaj == false) {
                erreur = true;
                $('#mdp').css('borderColor', "red");
                $("<p> Le mot de passe doit contenir au moins une majuscule.</p>").insertAfter($('#mdp'));
            } else if (possedeNombre == false){
                erreur = true;
                $('#mdp').css('borderColor', "red");
                $("<p> Le mot de passe doit contenir au moins un numero.</p>").insertAfter($('#mdp'));
            } else if (possedeSpecialChar == false) {
                erreur = true;
                $('#mdp').css('borderColor', "red");
                $("<p> Le mot de passe doit contenir au moins un caractère spécial.</p>").insertAfter($('#mdp'));
            }
        }


        //On vérifie que les deux mots de passe entrés sont identiques
        if (testAssociatif['mdp'] != str){
            if (str != document.querySelector("#verifMdp").value) {
                erreur = true;
                $('#verifMdp').css('borderColor', "red");
                $("<p> Les deux mot de passe doivent être identiques.</p>").insertAfter($('#verifMdp'));
            }
        }
    }

    if (erreur) {
        $("<p>Un ou plusieurs problèmes ont été détectés.</p>").insertAfter($('form'));
    } else {
        $('form').submit();
    }
});




//On fait en sorte que l'on ne puisse pas taper de chiffres dans les noms et prenoms
function testNumeroPresent (str) {
    for (char of str){
        for (numero of tabNumeros){
            if (char == numero) {
                return true
            }
        }
    }
    return false
}
