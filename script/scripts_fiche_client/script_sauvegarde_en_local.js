$('#envoyer').on('click', (e) => {
    e.preventDefault();
    clearInterval(intervalle);
    localStorage.removeItem("sauvegardeLocaleDuFormClient");
});


function creationSauvegarde(){
    let data = {};

    let listInputs = document.querySelectorAll('input')
    for (input of listInputs){
        if (input.getAttribute('id') != "envoyer"
            && input.getAttribute('id') != "dateDuJour") {
            if (input.value != "") {

                data[input.getAttribute('id')] = input.value;
            }
        }
    }

    let listTextarea = document.querySelectorAll('textarea');
    for (textarea of listTextarea){
        if (textarea.value != "SUIVI APPRECIER"){
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
    }

    data["note"]=document.getElementById("note").textContent;

    console.log(data)
    data = JSON.stringify(data)
    localStorage.setItem("sauvegardeLocaleDuFormClient", data);
}





function chargementSauvegarde() {
    if (localStorage.getItem('sauvegardeLocaleDuFormClient') != null) {  
        let data = JSON.parse(localStorage.getItem('sauvegardeLocaleDuFormClient'));
        console.log(data)

        let listInputs = document.querySelectorAll('input')
        for (input of listInputs){
            let id = input.getAttribute('id'); 
            if (id != "envoyer" && id != "date"){
                if (data["id"] != undefined) {
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
    }
}


chargementSauvegarde();

let intervalle = setInterval(() => {
    creationSauvegarde();
}, 2000);