$('#envoyer').on('click', (e) => {
    e.preventDefault();
    clearInterval(intervalle);
    localStorage.removeItem("sauvegardeLocaleDuForm");
});


function creationSauvegarde(){
    let data = {};

    let listInputs = document.querySelectorAll('input')
    for (input of listInputs){
        if (input.getAttribute('id') != "envoyer"
            && input.getAttribute('id') != "dateDuJour") {
            if (input.value != "" && input.getAttribute('id') != "homme" && input.getAttribute('id') != "femme") {
                data[input.getAttribute('id')] = input.value;
            }
        }
    }

    let listTextarea = document.querySelectorAll('textarea');
    for (textarea of listTextarea){
        if (textarea.value != "COMPTE RENDU D'ENTRETIENS" && textarea.value != "AVIS DE L'AGENT"){
            if (textarea.value != ""){
                data[textarea.getAttribute('id')] = textarea.value;
            }
        } 
    }

    let listSelect = document.querySelectorAll('select');
    for (select of listSelect){
        if (select.value != "") {
            data[select.getAttribute('id')] = select.value;
        }
        //document.getElementById(select.getAttribute('id')).value=data[select.getAttribute('id')];
    }

    data["homme"]=document.getElementById("homme").checked;
    data["femme"]=document.getElementById("femme").checked;

    data["note"]=document.getElementById("note").textContent;


    data = JSON.stringify(data)
    localStorage.setItem("sauvegardeLocaleDuForm", data);
}





function chargementSauvegarde() {
    if (localStorage.getItem('sauvegardeLocaleDuForm') != null) {
        let data = JSON.parse(localStorage.getItem('sauvegardeLocaleDuForm'));

        let listInputs = document.querySelectorAll('input')
        for (input of listInputs){
            let id = input.getAttribute('id'); 
            if (id != "envoyer" && id != "date"){
                if (id != "homme" && id != "femme" && data[id] != undefined) {
                    input.value = data[input.getAttribute('id')];
                }
            }
        }
    
        let listTextarea = document.querySelectorAll('textarea');
        for (textarea of listTextarea){
            if (data[textarea.getAttribute('id')] != undefined){
                textarea.value = data[textarea.getAttribute('id')];
            } 
        }
    
        let listSelect = document.querySelectorAll('select');
        for (select of listSelect){
            if (data[select.getAttribute('id')] != undefined) {
                document.getElementById(select.getAttribute('id')).value=data[select.getAttribute('id')];
            }
        }
    
        document.getElementById("homme").checked = data["homme"];
        document.getElementById("femme").checked = data["femme"];

        update(data["note"], data["femme"]);
    
        localStorage.setItem("sauvegardeLocaleDuForm", data);
    }
}

/*
Fonction pour mettre a jour la photo, les étoies affichés et la bare d'avancement
*/
function update(note, estUneFemme) {
    $('#note').text(note);
    for (let i = note; i>0; i--){
        $('#' + i).removeClass('un-check');
        $('#' + i).addClass('check');
    }

    if (estUneFemme){
        $('img').attr('src', '../img/women.jpg');
        $('#homme').prop('checked', false);
        $('#femme').prop('checked', true);
    }

    //La fonction updateBar est dans le script_fiche_client
    //Je peut l'appeller uniquement parce que je sait que ce script est bien charger en premier
    updateBar()
}



chargementSauvegarde();

let intervalle = setInterval(() => {
    creationSauvegarde();
}, 2000);