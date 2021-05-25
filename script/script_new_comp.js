const tabNumeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//Le jeton est valide pour 9223372036854776 secondes (autrement dit pas d'expirations)
//mais en utilisant une requete curl on pourrait mettre un temps plus court
//et aller chercher le jeton a se moment la.
const cle = "631cd780-53e6-335c-b1d3-d682fb533507";
//49872731200049
//41228073720375
//

//On modifie le comportement de l'envoie du formulairee
$('#envoyer').click((event) => {
    event.preventDefault();
    $('p').remove();
    let str = "";
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



    //Bloc des vérifications liés au telephone
    str = document.querySelector("#telephone").value;
    element = $("#telephone");
    if(str!=''){
        if (str.length != 11) {
            erreur = true;
            element.css("border-color", 'red');
            $("<p> Mauvaise taille de numéro (rendu attendu : 3363871xxxx).</p>").insertAfter(element);
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
        if (str != document.querySelector("#verifMdp").value && document.querySelector("#verifMdp").value!="") {
            erreur = true;
            $('#verifMdp').css('borderColor', "red");
            $("<p> Les deux mot de passe doivent être identiques.</p>").insertAfter($('#verifMdp'));
        }
    }

    //On vérifie le siret et le siren
    //On vérifie la taille, qu'on y trouve seulement des numéros
    //Ensuite, on vérifie que tout les champs correspondent a une
    //entreprise encore en activité
    //Bloc des vérifications liés au telephone
    str = document.querySelector("#siret").value;
    element = $("#siret");
    if(str!=''){
        if (str.length != 14) {
            erreur = true;
            element.css("border-color", 'red');
            $("<p> Mauvaise taille de numéro (rendu attendu : xxxxxxxxxxxxxx).</p>").insertAfter(element);
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

    str = document.querySelector("#siren").value;
    element = $("#siren");
    if(str!=''){
        if (str.length != 9) {
            erreur = true;
            element.css("border-color", 'red');
            $("<p> Mauvaise taille de numéro (rendu attendu : xxxxxxxxx).</p>").insertAfter(element);
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

    //On fait les tests pour voir si les siren, siret... Sont cohérent et appartiennent a une entreprise en activité.
    promesseSiret (document.querySelector("#siret").value)
    .then(
        function(data) {
            //On vérifie si les 4 cases correspondent bien au même
            //siret
            element=document.querySelector("#siren");
            if (element.value != data.etablissement.siren){
                console.log("differents");
                erreur = true;
                element.style.borderColor='red';
                $("<p> Le siret et siren ne corresponent pas.</p>").insertAfter(element);
                }
            
            element=document.querySelector("#ape");
            if (element.value != data.etablissement.uniteLegale.activitePrincipaleUniteLegale){
                erreur = true;
                element.style.borderColor='red';
                $("<p> Le siret et code APE ne corresponent pas.</p>").insertAfter(element);
            }

            element=document.querySelector("#nomEntreprise")
            if(element.value.toUpperCase() != data.etablissement.uniteLegale.denominationUniteLegale){
                erreur = true;
                element.style.borderColor='red';
                $("<p> Le siret et le nom d'établissement ne correspondent pas.</p>").insertAfter(element);
            }


            //test sur l'ouverture de l'établissement
            if (data.etablissement.periodesEtablissement[0].dateFin != null || data.etablissement.periodesEtablissement[0].etatAdministratifEtablissement !='A'){
                erreur = true;
                document.querySelector("#siret").style.borderColor='red';
                $("<p> L'entreprise entrée est fermée.</p>").insertAfter(element);
            }
            

            //Si on a une erreur, on affiche ce message, sinon on envoie le formulaire.
            if (erreur) {
                $("<p>Un ou plusieurs problèmes ont été détectés.</p>").insertAfter($('form'));
            } else {
                $.ajax({
                    type: 'POST',
                    url: '../php/new_comp.php',
                    dataType: 'json',
                    data : {
                        nom             : document.querySelector("#nom").value,
                        prenom          : document.querySelector('#prenom').value,
                        telephone       : document.querySelector('#telephone').value,
                        poste           : document.querySelector('#poste').value,
                        mail            : document.querySelector('#mail').value,
                        siret           : document.querySelector('#siret').value,
                        siren           : document.querySelector('#siren').value,
                        ape             : document.querySelector('#ape').value,
                        nomEntreprise   : document.querySelector('#nomEntreprise').value,
                        mdp             : document.querySelector('#mdp').value,
                    },
                    success: (data) => {
                        console.log(data);
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
            }
        }
    )
    .catch(function(erreurExectution) {
        if(erreurExectution.responseJSON.header.statut == "404"){
            $('#siret').css("border-color", 'red');
            $("<p> Le siret ne correspond a aucune entreprise.</p>").insertAfter($('#siret'));
        }
        $("<p>Un ou plusieurs problèmes ont été détectés.</p>").insertAfter($('form'));
        }
    );
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





$("#siret").keyup(function () { 
    siret = document.querySelector("#siret").value;
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
            document.querySelector("#siren").value = data.etablissement.siren;
            document.querySelector("#ape").value = data.etablissement.uniteLegale.activitePrincipaleUniteLegale;
            document.querySelector("#nomEntreprise").value = data.etablissement.uniteLegale.denominationUniteLegale;
        }
    });
}



function promesseSiret (siret) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://api.insee.fr/entreprises/sirene/V3/siret/" + siret,
            beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + cle)
            },
            success: (data) => {
                resolve(data);
            },
            error: (erreur) => {
                reject(erreur)
                dataAPI = "erreur";
            }
        });
    })
};
