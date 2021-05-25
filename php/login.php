<?php

session_start();

include './conn_db.php';

if (isset($_GET['logout'])) {
    if ($_GET['logout'] == "1") {
        session_destroy();
        unset($_SESSION);
    }
}

if(isset($_POST['mail'], $_POST['mdp'])){

    $dsn = "mysql:host=$db_host;dbname=$db_database";

    $sql = "SELECT * from company where email_intermediaire='" . $_POST['mail'] . "'"; 
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) { // S'il y a une erreur dans la requête sql
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête',
        );
        $table_encode = json_encode($table);
        echo $table_encode;
    } elseif (mysqli_num_rows($resultat) == 0) { //S'il n'y a pas la meme addresse mail dans la database

        $sql = "SELECT * from administrateur where email_admin='" . $_POST['mail'] . "'"; 
        $resultat = mysqli_query($conn, $sql);
        if ($resultat == FALSE) { // S'il y a une erreur dans la requête sql
            $table = array(
                'error'  => true,
                'message' => 'Erreur d\'execution de la requête',
            );
            $table_encode = json_encode($table);
            echo $table_encode;
        } elseif (mysqli_num_rows($resultat) == 0) { //S'il n'y a pas l'addresse mail dans la table ADMINISTRATEUR

            $sql = "SELECT * from customer where email_customer='" . $_POST['mail'] . "'"; 
            $resultat = mysqli_query($conn, $sql);
            if ($resultat == FALSE) { // S'il y a une erreur dans la requête sql
                $table = array(
                    'error'  => true,
                    'message' => 'Erreur d\'execution de la requête',
                );
                $table_encode = json_encode($table);
                echo $table_encode;
            } elseif (mysqli_num_rows($resultat) == 0) { //S'il n'y a pas l' addresse mail dans la table CUSTOMER
                $table = array(
                    'error'  => true,
                    'message' => 'Aucun compte n\'est lié à cet email',
                );
                
                $table_encode = json_encode($table);
                echo $table_encode;


            } elseif (mysqli_num_rows($resultat) == 1) { // L'email existe dans la table CUSTOMER
                $pdo = new PDO($dsn, $db_user, $db_password);
                $stmt = $pdo->query($sql);
                $row= $stmt->fetch(PDO::FETCH_ASSOC);
                $mdp = $row['password_customer'];
                if(password_verify($_POST['mdp'], $mdp)){
                    $sql = "SELECT * from customer where email_customer='" . $_POST['mail'] . "' and password_customer='" . $mdp . "'"; // On regarde ds la base de donnés si le mdp correspond  bien avec l'email
                    $resultat = mysqli_query($conn, $sql);
                    if($resultat == FALSE){
                        $table = array(
                            'error'  => true,
                            'message' => 'Erreur d\'execution de la requête',
                        );
                        
                        $table_encode = json_encode($table);
                        echo $table_encode;

                    }elseif(mysqli_num_rows($resultat) == 1){  
                        $row = mysqli_fetch_assoc($resultat); 
                        // On va initialiser les variables de la session
                        $_SESSION['id_user'] = $row['idcustomer'];
                        $_SESSION['name_user'] = $row['name_customer'];
                        $_SESSION['fname_user'] = $row['fname_customer'];
                        $_SESSION['mail_user'] = $row['email_customer'];
                        $_SESSION['type'] = "customer"; // On détermine le type de l'utilisateur

                        $table = array(
                            'error' => false,
                            'message' => '../html/list_cust.html',
                        );
                        $table_encode = json_encode($table);
                        echo $table_encode;
                    }
                }else{
                    $table = array(
                        'error'  => true,
                        'message' => 'Mot de passe incorect',
                    );
                    
                    $table_encode = json_encode($table);
                    echo $table_encode;
                }
            }
        } elseif (mysqli_num_rows($resultat) == 1) { // L'email existe dans la table ADMINISTRATEUR
            $pdo = new PDO($dsn, $db_user, $db_password);
            $stmt = $pdo->query($sql);
            $row= $stmt->fetch(PDO::FETCH_ASSOC);
            $mdp = $row['password_admin'];
            if(password_verify($_POST['mdp'], $mdp)){
                $sql = "SELECT * from administrateur where email_admin='" . $_POST['mail'] . "' and password_admin='" . $mdp . "'"; // On regarde ds la base de donnés si le mdp correspond  bien avec l'email
                $resultat = mysqli_query($conn, $sql);
                if($resultat == FALSE){
                    $table = array(
                        'error'  => true,
                        'message' => 'Erreur d\'execution de la requête',
                    );
                    
                    $table_encode = json_encode($table);
                    echo $table_encode;

                }elseif(mysqli_num_rows($resultat) == 1){ // S'il y a un seul résultat c'est bon car le login (mail) est unique 
                    $row = mysqli_fetch_assoc($resultat); 
                    // On va initialiser les variables de la session
                    $_SESSION['id_user'] = $row['idadmin'];
                    $_SESSION['name_user'] = $row['name_admin'];
                    $_SESSION['fname_user'] = $row['fname_admin'];
                    $_SESSION['mail_user'] = $row['email_admin'];
                    $_SESSION['type'] = "admin"; // On détermine le type de l'utilisateur

                    $table = array(
                        'error' => false,
                        'message' => '../html/list_cust.html',
                    );
                    $table_encode = json_encode($table);
                    echo $table_encode;
                }
            }else{
                $table = array(
                    'error'  => true,
                    'message' => 'Mot de passe incorect',
                );
                
                $table_encode = json_encode($table);
                echo $table_encode;
            }
        }
    } elseif (mysqli_num_rows($resultat) == 1) { // L'email existe dans la table COMPANY
        $pdo = new PDO($dsn, $db_user, $db_password);
        $stmt = $pdo->query($sql);
        $row= $stmt->fetch(PDO::FETCH_ASSOC);
        $mdp = $row['password_company'];
        if(password_verify($_POST['mdp'], $mdp)){
            $sql = "SELECT * from company where email_intermediaire='" . $_POST['mail'] . "' and password_company='" . $mdp . "'"; // On regarde ds la base de donnés si le mdp correspond  bien avec l'email
            $resultat = mysqli_query($conn, $sql);
            if($resultat == FALSE){
                $table = array(
                    'error'  => true,
                    'message' => 'Erreur d\'execution de la requête',
                );
                
                $table_encode = json_encode($table);
                echo $table_encode;

            }elseif(mysqli_num_rows($resultat) == 1){  
                $row = mysqli_fetch_assoc($resultat); 
                // On va initialiser les variables de la session
                $_SESSION['id_user'] = $row['id_intermediaire'];
                $_SESSION['name_user'] = $row['name_intermediaire'];
                $_SESSION['fname_user'] = $row['fname_intermediaire'];
                $_SESSION['mail_user'] = $row['email_intermediaire'];
                $_SESSION['type'] = "company"; // On détermine le type de l'utilisateur

                $table = array(
                    'error' => false,
                    'message' => '../html/list_comp.html',
                );
                $table_encode = json_encode($table);
                echo $table_encode;
            }
        }else{
            $table = array(
                'error'  => true,
                'message' => 'Mot de passe incorect',
            );
            
            $table_encode = json_encode($table);
            echo $table_encode;
        }
            
    }
}
?>
