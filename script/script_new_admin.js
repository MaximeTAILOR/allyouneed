const tabNumeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

//On modifie le comportement de l'envoie du formulairee
$('#envoyer').click((event) => { 
    event.preventDefault();

    $('p').remove();
    let erreur = false;

    //On vérifie qu'aucun champ n'est vide
    let champs = document.querySelectorAll('input')
    for (champ of champs) {
        if (champ.value == ''){
            champ.style.borderColor = "red";
            $("<p> Ce champ n'est pas rempli.</p>").insertAfter(champ);
            erreur = true;
        } else {
            champ.style.borderColor = "silver";
        }
    }


    //Bloc des vérifications liés aux noms et prenoms
    //On vérifie si les noms / prenoms ont des chiffres
    for (element of [document.querySelector("#nom"), document.querySelector("#prenom")]){
        if (testNumeroPresent(element.value)){
            erreur = true;
            element.style.borderColor = "red";
            $("<p> Cet element ne peut pas contenir de numéros.</p>").insertAfter(element);
        }
    }


    //Bloc des vérifications liés a l'adresse mail
    //On vérifie que l'email a été entré avec un forma valide
    let str = document.querySelector("#mail").value;
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
        if (str != document.querySelector("#verifMail").value && document.querySelector("#verifMail").value != "") {
            erreur = true;
            $('#verifMail').css('borderColor', "red");
            $("<p> Les deux adresses mail doivent être identiques</p>").insertAfter($('#verifMail'));
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
        } /*else if (!testNumeroPresent(str)) {
            erreur = true;
            $('#mdp').css('borderColor', "red");
            $("<p> Le mot de passe doit contenir au moins un numero.</p>").insertAfter($('#mdp'));
        } */
        else {
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
        if (str != document.querySelector("#verifMdp").value && document.querySelector("#verifMdp").value!="") {
            erreur = true;
            $('#verifMdp').css('borderColor', "red");
            $("<p> Les deux mot de passe doivent être identiques.</p>").insertAfter($('#verifMdp'));
        }
    }


    //Si aucun problème n'a été détécter, on peut envoyer le formulaire
    if (!erreur){
        $.ajax({
            type: 'POST',
            url: '../php/new_admin.php',
            dataType: 'json',
            data : {
                mail : document.querySelector("#mail").value,
                mdp : document.querySelector("#mdp").value,
                nom : document.querySelector('#nom').value,
                prenom : document.querySelector('#prenom').value,
            },
            success: (data) => {
                if (data.error){
                    alert(data.message);
                    document.querySelector("#mdp").value='';
                    document.querySelector("#verifMdp").value='';
                } else {
                    alert(data.message);
                    window.location.href = "./login.html";;
                }
            },
            error: () => {
              alert('Erreur !');
            }
          });
    } else {
        $("<p>Un ou plusieurs problèmes ont été détectés.</p>").insertAfter($('form'));
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
