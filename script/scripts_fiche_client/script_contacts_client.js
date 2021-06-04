//constantes pour tout le programe
var queryString = window.location.search;

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
        deleteContact(e.target.classList[1])
        e.target.parentElement.parentElement.remove()
    })
}





/*
Fonction pour le chargement du formulaire si jamais on trouve le siret
(dans l'url)
On envoie alors une requête et on charge les élements trouvés dans les champs

Ici on parle du chargement de la partie du formulaire qui concerne les contacts
*/
if (queryString){
    let siretUrl = queryString.split('=')[1];
    updateContactsInfo(siretUrl)
}else {
    //Si on ne modifie pas de formulaires, alors on initialise pour la création
    nouvelleLigneContact()
}





//Fonction qui permet d'afficher les différents contacts
function updateContactsInfo(siretUrl){
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
                if (data.length == 0){
                    nouvelleLigneContact();
                }
                for (contacts of data){
                    let strLigne =  '<tr>'
                    strLigne +=     '<td class="remove"><button class="retirerElement '+ contacts.idcontact +' ">-</button></td>'
                    strLigne +=     '<td><input type="text" class="nom" name="nom" placeholder="NOM" value = "' + contacts.name + '"></td>'
                    strLigne +=     '<td><input type="text" class="prenom" name="prenom" placeholder="PRENOM" value = "' + contacts.fname + '"></td>'
                    strLigne +=     '<td><input type="text" class="fonction" name="fonction" placeholder="FONCTION" value = "' + contacts.job + '"></td>'
                    strLigne +=     '<td><input type="text" class="mail" name="mail" placeholder="MAIL" value = "' + contacts.email + '"></td>'
                    strLigne +=     '<td><input type="text" class="telephone" name="telephone" placeholder="TELEPHONE" value = "' + contacts.num + '"></td>'
                    strLigne +=     '<td><textarea class="suiviApprecier" name="suiviApprecier">' + contacts.approach + '</textarea></td>'
                    strLigne +=     '</tr>'
                    let ligne = $(strLigne)
                    ligne.appendTo($('#tableContact'))
                }

                $(".retirerElement").on('click', (e) => {
                    deleteContact(e.target.classList[1])
                    e.target.parentElement.parentElement.remove()
                })
            }
        },
        error: (error) => {
            alert('Erreur !');
        }
    });
}





//Ajouter et modifier des contacts
function envoyerContacts(){
    //Formulaire du contact
    if (document.querySelector("#siret").value == ""){
        alert("Les contacts doivent appartenir a une entreprise (siret non defini)")
    } else {
        for (ligne of $('#tableContact').children().children()){
            if(ligne.classList != 'en-tete'){
                let cases = ligne.cells
                let idCont = cases[0].children[0].classList[1]

                if(idCont == undefined){
                    //Si on ne trouve pas l'id dans la classe, alors il faut ajouter dans la base
                    data = {
                        siret : document.querySelector("#siret").value,
                        nom : cases[1].children[0].value,
                        prenom : cases[2].children[0].value,
                        num : cases[5].children[0].value,
                        job : cases[3].children[0].value,
                        email : cases[4].children[0].value,
                        action : "ajouter",
                    }
                } else {
                    //Si on ne troruve pas le dit id alors, on parle d'un ajout
                    data = {
                        idcontact : idCont,
                        siret : document.querySelector("#siret").value,
                        nom : cases[1].children[0].value,
                        prenom : cases[2].children[0].value,
                        num : cases[5].children[0].value,
                        job : cases[3].children[0].value,
                        email : cases[4].children[0].value,
                        action : "modifier",
                    }
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
}



function deleteContact(idCont){
    data = {
        idcontact : idCont,
        action : "supprimer",
    }
    requeteContact(data)
}





//rq ajax contacts
function requeteContact(dataContact){
    $.ajax({
        type: 'GET',
        url: '../php/action_contact.php',
        dataType: 'json',
        data : dataContact,
        success: (data) => {
            if (data.error){
                alert(data.message)
            }
        },
        error: (error) => {
            alert('Erreur !');
        }
    });
}
