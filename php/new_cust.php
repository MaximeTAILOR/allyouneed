<?php

session_start();

include './conn_db.php';

$sql = "SELECT * from contact where email_contact='" . addslashes($_GET['mail']) . "'";
$resultat = mysqli_query($conn, $sql);
if ($resultat == FALSE) { // S'il y a une erreur dans la requête sql
    $table = array(
        'error'  => true,
        'message' => 'Erreur d\'execution de la requête' . $sql,
    );
    $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
    echo $table_encode;
} elseif (mysqli_num_rows($resultat) == 1) { // Si il y a déjà l'addresse mail dans la database --> le compte existe déjà
    $table = array(
        'error'  => true,
        'message' => 'Cette addresse mail est déjà utilisée',
    );
    $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
    echo $table_encode;
} elseif (mysqli_num_rows($resultat) == 0) { //S'il n'y a pas la meme addresse mail dans la database

    //--------------------------------------------------------------------------------------------------------------------------------

    $sql = "SELECT * from administrateur where email_admin='" . addslashes($_GET['mail']) . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) { // S'il y a une erreur dans la requête sql
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête2',
        );
        $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
        echo $table_encode;
    } elseif (mysqli_num_rows($resultat) == 1) { // Si il y a déjà l'addresse mail dans la database --> le compte existe déjà
        $table = array(
            'error'  => true,
            'message' => 'Cette addresse mail est déjà utilisée',
        );
        $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
        echo $table_encode;
    } elseif (mysqli_num_rows($resultat) == 0) { //S'il n'y a pas la meme addresse mail dans la database

        //----------------------------------------------------------------------------------------------------------------------------------

        $sql = "SELECT * from customer where email_customer='" . addslashes($_GET['mail']) . "'";
        $resultat = mysqli_query($conn, $sql);
        if ($resultat == FALSE) { // S'il y a une erreur dans la requête sql
            $table = array(
                'error'  => true,
                'message' => 'Erreur d\'execution de la requête3',
            );
            $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
            echo $table_encode;
        } elseif (mysqli_num_rows($resultat) == 1) { // Si il y a déjà l'addresse mail dans la database --> le compte existe déjà
            $table = array(
                'error'  => true,
                'message' => 'Cette addresse mail est déjà utilisée',
            );
            $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
            echo $table_encode;
        } elseif (mysqli_num_rows($resultat) == 0) { //S'il n'y a pas la meme addresse mail dans la database
            $nom = htmlspecialchars(addslashes($_GET['nom']));
            $prenom = htmlspecialchars(addslashes($_GET['prenom']));
            $tel = htmlspecialchars($_GET['telephone']);
            $mail = htmlspecialchars(addslashes($_GET['mail']));
            $statut = htmlspecialchars(addslashes($_GET['statut']));
            $fonction = htmlspecialchars(addslashes($_GET['fonction']));
            $entreprise = htmlspecialchars(addslashes($_GET['nomEntreprise']));
            $date = date_create($_GET['date']);
            $date = date_format($date, 'Y-m-d');
            $mdp = htmlspecialchars($_GET['mdp']);
            $pass_hash = password_hash($mdp, PASSWORD_DEFAULT);

            $sql = "INSERT INTO customer (name_customer, fname_customer, num_customer, email_customer, status_customer, job_customer, last_company, creation_date, password_customer) values ('" . $nom . "', '" . $prenom . "', '" . $tel . "', '" . $mail . "', '" . $statut . "', '" . $fonction . "', '" . $entreprise . "','" . $date . "', '" . $pass_hash . "')";
            $resultat = mysqli_query($conn, $sql);
            if ($resultat == FALSE) {
                $table = array(
                    'error'  => true,
                    'message' => 'Erreur d\'execution de la requête' . $sql,
                );

                $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
                echo $table_encode;
            } else {
                $table = array(
                    'error'  => false,
                    'message' => 'Inscription réussie, vous allez être redirigé vers notre site sans quelques instants.',
                );

                $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
                echo $table_encode;
            }
        }
    }
}
