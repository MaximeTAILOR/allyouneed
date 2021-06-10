<?php

session_start();

include './conn_db.php';

if (isset($_POST['mail'],  addslashes($_POST['prenom']), addslashes($_POST['nom']), addslashes($_POST['mdp']))) { // On revérifie que tous les éléments sont bien envoyés
    $sql = "SELECT * from contact where email_contact='" . addslashes($_POST['mail']) . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) { // S'il y a une erreur dans la requête sql
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête',
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

        $sql = "SELECT * from administrateur where email_admin='" . addslashes($_POST['mail']) . "'";
        $resultat = mysqli_query($conn, $sql);
        if ($resultat == FALSE) { // S'il y a une erreur dans la requête sql
            $table = array(
                'error'  => true,
                'message' => 'Erreur d\'execution de la requête',
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

            $sql = "SELECT * from customer where email_customer='" . addslashes($_POST['mail']) . "'";
            $resultat = mysqli_query($conn, $sql);
            if ($resultat == FALSE) { // S'il y a une erreur dans la requête sql
                $table = array(
                    'error'  => true,
                    'message' => 'Erreur d\'execution de la requête',
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
                $nom = htmlspecialchars(addslashes($_POST['nom'])); // htmlspecialchars transforme toute la variable en string (pour éviter des injéctions sql quand on entre le mail dans le formulaire par exemple)
                $prenom = htmlspecialchars(addslashes($_POST['prenom']));
                $mail = htmlspecialchars(addslashes($_POST['mail']));
                $mdp = htmlspecialchars(addslashes($_POST['mdp']));
                $pass_hash = password_hash($mdp, PASSWORD_DEFAULT);
                $sql = "INSERT INTO administrateur (name_admin, fname_admin, email_admin, password_admin) values ('" . $nom . "', '" . $prenom . "', '" . $mail . "', '" . $pass_hash . "')"; //Creation du compte administrateurs
                $resultat = mysqli_query($conn, $sql);
                if ($resultat == FALSE) {
                    $table = array(
                        'error'  => true,
                        'message' => 'Erreur d\'execution de la requête',
                    );

                    $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
                    echo $table_encode;
                } else {
                    $table = array(
                        'error'  => false,
                        'message' => 'Inscription réussie, vous allez être redirigé vers notre site sans quelques instants',
                    );
                    $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
                    echo $table_encode;
                }
            }
        }
    }
}
