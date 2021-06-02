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
            && input.getAttribute('id') != "dateDuJour"
            && input.getAttribute('id') != null) {
            if (input.value != "") {
                data[input.getAttribute('id')] = input.value;
            }
        }
    }

    let listSelect = document.querySelectorAll('select');
    for (select of listSelect){
        if (select.value != "") {
            data[select.getAttribute('id')] = select.value;
        }
    }


    data["note"]=document.getElementById("note").textContent;

    data = JSON.stringify(data)
    localStorage.setItem("sauvegardeLocaleDuForm", data);
}





function chargementSauvegarde() {
    if (localStorage.getItem('sauvegardeLocaleDuForm') != null) {
        let data = JSON.parse(localStorage.getItem('sauvegardeLocaleDuForm'));
        console.log(data)

        let listInputs = document.querySelectorAll('input')
        for (input of listInputs){
            let id = input.getAttribute('id');
            if (id != "envoyer" && data[id] != undefined) {
                input.value = data[id];
            }
        }
    
        let listSelect = document.querySelectorAll('select');
        for (select of listSelect){
            if (data[select.getAttribute('id')] != undefined) {
                document.getElementById(select.getAttribute('id')).value=data[select.getAttribute('id')];
            }
        }
    
        update(data["note"]);
    }
}

/*
Fonction pour mettre a jour la photo, les étoies affichés et la bare d'avancement
*/
function update(note) {
    $('#note').text(note);
    for (let i = note; i>0; i--){
        $('#' + i).removeClass('un-check');
        $('#' + i).addClass('check');
    }
}

//La fonction updateBar est dans le script_fiche_client
//Je peut l'appeller uniquement parce que je sait que ce script est bien charger en premier
updateBar()



chargementSauvegarde();

let intervalle = setInterval(() => {
    creationSauvegarde();
}, 2000);