//Creation du header
$("body").prepend($('<header>'));

//Creation de la navbar
let navbar = $("<ul>")

navbar.html(navbar.html() + "<li><a href='list_cust.html'>Clients</a></li>");
navbar.html(navbar.html() + "<li><a href='list_comp.html'>Entreprises</a></li>");
navbar.html(navbar.html() + "<li><a href='#' class='log-out'>Log out</a></li>");

//Ajout de la navbar
$('header').append(navbar);


//fonctionnalités de log out
$('.log-out').click((e) => { 
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '../php/logout.php',
        dataType: 'html',
        success: (data) => {
            alert(data);
            window.location.href = "./login.html";
        },
        error: () => {
          alert('Impossible de se déconnecter');
        }
      });
});