<?php

session_start();

include './conn_db.php';
include './utf8.php';

if($_GET['action'] == 'afficher'){
    $sql = "SELECT * from contact where siret_company='" . $_GET['siret'] . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête',
        );
        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    }else{
        $table = array();
        while ($row = mysqli_fetch_assoc($resultat)) {
            array_push($table, array(
                'idcontact' => $row['idcontact'],
                'siret' => $row['siret_company'],
                'name' => $row['name_contact'],
                'fname' => $row['fname_contact'],
                'num' => $row['num_contact'],
                'job' => $row['job_contact'],
                'email' => $row['email_contact'],
                'approach' => $row['approach_contact'],
            ));
        }
        echo json_encode(utf8ize($table));
    }
}elseif($_GET['action'] == 'ajouter'){
    if (isset($_GET['siret'])){
        $sql = "SELECT * from contact where email_contact='" . $_GET['email'] . "'"; 
        $resultat = mysqli_query($conn, $sql);
        if ($resultat == FALSE) { // S'il y a une erreur dans la requête sql
            $table = array(
                'error'  => true,
                'message' => 'Erreur d\'execution de la requête',
            );
            $table_encode = json_encode(utf8ize($table));
            echo $table_encode;
        }elseif (mysqli_num_rows($resultat) == 1) {
            $table = array(
                'error'  => true,
                'message' => 'Le contact existe déjà dans la base de données',
            );
            $table_encode = json_encode(utf8ize($table));
            echo $table_encode;
        }else{
            $siret = htmlspecialchars($_GET['siret']);
            $name = htmlspecialchars($_GET['nom']);
            $fname = htmlspecialchars($_GET['prenom']);
            $num = htmlspecialchars($_GET['num']);
            $job = htmlspecialchars($_GET['job']);
            $email = htmlspecialchars($_GET['email']);
            $approach = htmlspecialchars($_GET['approach']);
            $mdp = htmlspecialchars('Epsi.123');
            $pass_hash = password_hash($mdp, PASSWORD_DEFAULT);

            $sql = "INSERT INTO contact (siret_company, name_contact, fname_contact, num_contact, job_contact, email_contact, password_contact, approach_contact) values ('". $siret . "', '" . $name . "', '" . $fname . "', '" . $num . "', '" . $job . "', '" . $email . "', '" . $mdp . "', '" . $approach . "')";
            $resultat = mysqli_query($conn, $sql);
            if($resultat == FALSE){
                $table = array(
                    'error'  => true,
                    'message' => 'Erreur d\'execution de la requête' . $sql,
                );
                
                $table_encode = json_encode(utf8ize($table));
                echo $table_encode;
            }else{
                $table = array(
                    'error'  => false,
                    'message' => 'Le contact a été ajouté',
                );
                
                $table_encode = json_encode(utf8ize($table));
                echo $table_encode;
            }
        }
    }else{
        $table = array(
            'error'  => true,
            'message' => 'Le contact n\'appartient à aucune entreprise',
        );
        
        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    }

}elseif($_GET['action'] == 'modifier'){
    if (isset($_GET['siret'])){
        $idcontact = $_GET['idcontact'];
        $siret = $_GET['siret'];
        $name = htmlspecialchars($_GET['nom']);
        $fname = htmlspecialchars($_GET['prenom']);
        $num = htmlspecialchars($_GET['num']);
        $job = htmlspecialchars($_GET['job']);
        $email = htmlspecialchars($_GET['email']);
        $approach = htmlspecialchars($_GET['approach']);
        $mdp = 'Test.123';
        $pass_hash = password_hash($mdp, PASSWORD_DEFAULT);

        $sql = "SELECT * FROM contact where idcontact!='" . $idcontact . "'";
        $resultat = mysqli_query($conn, $sql);
        if($resultat == FALSE){

            $table = array(
                'error'  => true,
                'message' => 'Erreur d\'execution de la requête ' . $sql,
            );
            $table_encode = json_encode(utf8ize($table));
            echo $table_encode;

        }elseif (mysqli_num_rows($resultat) >= 1) {

            $table = array(
                'error'  => true,
                'message' => 'L\'addresse mail est déjà utilisée',
            );
            $table_encode = json_encode(utf8ize($table));
            echo $table_encode;

        }else{

            $sql = "UPDATE contact SET name_contact='" . $name . "', fname_contact='" . $fname . "', num_contact='" . $num . "', job_contact='" . $job . "', email_contact='" . $email . "', password_contact='" . $pass_hash . "', approach_contact='" . $approach . "' WHERE idcontact='" . $idcontact . "'";
            $resultat = mysqli_query($conn, $sql);
            if($resultat == FALSE){
                $table = array(
                    'error'  => true,
                    'message' => 'Erreur d\'execution de la requête' . $sql,
                );
                
                $table_encode = json_encode(utf8ize($table));
                echo $table_encode;
            }else{
                $table = array(
                    'error'  => false,
                    'message' => 'Le contact a été modifié',
                );
                
                $table_encode = json_encode(utf8ize($table));
                echo $table_encode;
            }
        }
    }else{
        $table = array(
            'error'  => true,
            'message' => 'Le contact n\'appartient à aucune entreprise' . $sql,
        );
        
        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    }

}elseif($_GET['action'] == 'supprimer'){
    $sql = "DELETE FROM contact WHERE idcontact='" . $_GET['idcontact'] . "'";
    if($resultat == FALSE){
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête' . $sql,
        );
        
        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    }else{
        $table = array(
            'error'  => false,
            'message' => 'Le contact a été supprimé',
        );
        
        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    }
}

?>