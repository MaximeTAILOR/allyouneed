<?php

session_start(); //pour demarrer la session

// si l utilisateur clique sur se deconnecter alors on detruit la session et on efface la varible $_SESSION

if (isset($_SESSION['type'])) { //Pour savoir qui est connecté

    echo '<div id="co"><p id="connect">Vous êtes connecté en tant que ' . (($_SESSION['type'] == "admin") ? "Administrateur " : "Client ") . $_SESSION['name_user'] . ' ' . $_SESSION['fname_user'] . '</p></div>';
    echo '<a href="./login.php?logout=1">Se deconnecter</a>';
}

include './php/conn_db.php';

$table = array();

$sql = "SELECT * FROM customer";
        $resultat = mysqli_query($conn, $sql);
        if ($resultat == FALSE) {
            echo 'Echec de l\'execution de la requête' . $sql;
        }else{
            while ($row = mysqli_fetch_assoc($resultat)) {
                array_push($table, array(
                    'nom' => $row['name_customer'],
                    'prenom' => $row['fname_customer'],
                    'num' => $row['num_customer'],
                    'email' => $row['email_customer'],
                    'statut' => $row['status_company'],
                    'fonction' => $row['fonction'],
                    'entreprise' => $row['name_company'], 
                ));
            }
            echo json_encode($table); 
        }
?>