<?php

session_start();

include './conn_db.php';

if(isset($_POST['prenom'], $_POST['nom'], $_POST['telephone'], $_POST['poste'], $_POST['mail'], $_POST['siret'], $_POST['siren'], $_POST['ape'], $_POST['nomEntreprise'], $_POST['mdp'])){ //on vérifie que tous le éléments sont rensignés
    
    $sql = "SELECT * from company where email_intermediaire='" . $_POST['mail'] . "'"; 
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) { // S'il y a une erreur dans la requête sql
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête',
        );
        $table_encode = json_encode($table);
        echo $table_encode;
    } elseif (mysqli_num_rows($resultat) == 1) { // Si il y a déjà l'addresse mail dans la database --> le compte existe déjà
        $table = array(
            'error'  => true,
            'message' => 'Cette addresse mail est déjà utilisée',
        );
        $table_encode = json_encode($table);
        echo $table_encode;
    } elseif (mysqli_num_rows($resultat) == 0) { //S'il n'y a pas la meme addresse mail dans la database

//--------------------------------------------------------------------------------------------------------------------------------

        $sql = "SELECT * from administrateur where email_admin='" . $_POST['mail'] . "'"; 
        $resultat = mysqli_query($conn, $sql);
        if ($resultat == FALSE) { // S'il y a une erreur dans la requête sql
            $table = array(
                'error'  => true,
                'message' => 'Erreur d\'execution de la requête',
            );
            $table_encode = json_encode($table);
            echo $table_encode;
        } elseif (mysqli_num_rows($resultat) == 1) { // Si il y a déjà l'addresse mail dans la database --> le compte existe déjà
            $table = array(
                'error'  => true,
                'message' => 'Cette addresse mail est déjà utilisée',
            );
            $table_encode = json_encode($table);
            echo $table_encode;
        } elseif (mysqli_num_rows($resultat) == 0) { //S'il n'y a pas la meme addresse mail dans la database

//----------------------------------------------------------------------------------------------------------------------------------

            $sql = "SELECT * from customer where email_customer='" . $_POST['mail'] . "'"; 
            $resultat = mysqli_query($conn, $sql);
            if ($resultat == FALSE) { // S'il y a une erreur dans la requête sql
                $table = array(
                    'error'  => true,
                    'message' => 'Erreur d\'execution de la requête',
                );
                $table_encode = json_encode($table);
                echo $table_encode;
            } elseif (mysqli_num_rows($resultat) == 1) { // Si il y a déjà l'addresse mail dans la database --> le compte existe déjà
                $table = array(
                    'error'  => true,
                    'message' => 'Cette addresse mail est déjà utilisée',
                );
                $table_encode = json_encode($table);
                echo $table_encode;
            } elseif (mysqli_num_rows($resultat) == 0) { //S'il n'y a pas la meme addresse mail dans la database

//-------------------------------------------------------------------------------------------------------------------------------------

                $nom = htmlspecialchars($_POST['nom']);
                $prenom = htmlspecialchars($_POST['prenom']);
                $tel = htmlspecialchars($_POST['telephone']);
                $poste = htmlspecialchars($_POST['poste']);
                $mail = htmlspecialchars($_POST['mail']);
                $siret = htmlspecialchars($_POST['siret']);
                $siren = htmlspecialchars($_POST['siren']);
                $ape = htmlspecialchars($_POST['ape']);
                $entreprise = htmlspecialchars($_POST['nomEntreprise']);
                $mdp = htmlspecialchars($_POST['mdp']);
                $pass_hash = password_hash($mdp, PASSWORD_DEFAULT);

                $sql = "INSERT INTO company (name_intermediaire, fname_intermediaire, num_intermediaire, job_intermediaire, email_intermediaire, siret_company, siren_company, ape_company, name_company, password_company) values ('" . $nom . "', '" . $prenom . "', '" . $tel . "', '" . $poste . "', '" . $mail . "', '" . $siret . "', '" . $siren . "', '" . $ape . "', '" . $entreprise . "', '" . $pass_hash . "')";
                $resultat = mysqli_query($conn, $sql);
                if($resultat == FALSE){
                    $table = array(
                        'error'  => true,
                        'message' => 'Erreur d\'execution de la requête',
                    );
                    
                    $table_encode = json_encode($table);
                    echo $table_encode;
                }else{
                    $table = array(
                        'error'  => false,
                        'message' => 'Inscription réussie !',
                    );
                    
                    $table_encode = json_encode($table);
                    echo $table_encode;
                }
            }
        }
    }
}
?>