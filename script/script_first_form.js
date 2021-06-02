if (localStorage.getItem('survey') == "yes") {
  document.location.href = "./end_form.html";
}

$(document).ready(function(){
  var secondes = 0;
  var minutes = 0;
  setInterval(chrono, 1000);
 
  function chrono(){
    secondes += 1;
   
    if(secondes>59){
      minutes += 1;
      secondes = 0;
    }
   
    if(minutes<10 && secondes<10){
        $("#timer").html("0"+minutes+" : 0"+secondes);
    }
      else if(minutes<10 && secondes>=10){
        $("#timer").html("0"+minutes+" : "+secondes);
    }
    else if(minutes>=10 && secondes<10){
        $("#timer").html(+minutes+" : 0"+secondes);
    }
    else if(minutes>=10 && secondes>10){
        $("#timer").html(+minutes+" : "+secondes);
    }
  }
});

$('#envoyer').click((event) => { 
    event.preventDefault();
  // PHP pas encore créé 
        $.ajax({
            type: 'POST',
            url: '../php/first-form.php',
            dataType: 'json',
            data : {
              satifaction   : document.querySelector("#satisfaction").value,
              materiel      : document.querySelector("#materiel").value,
              satisfaction2 : document.querySelector("#satisfaction2").value,
              timer         : document.querySelector("#timer").value,
            },
            success: (data) => {
              console.log(data);
              if (data.error){
                  alert(data.message);
              } else {
                  alert(data.message);
                  localStorage.setItem('survey', "yes");
                  document.location.href="./end_form.html";
              }
                
            },
            error: () => {
              alert('Erreur !');
            }
          });
});
