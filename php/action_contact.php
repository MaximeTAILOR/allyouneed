<?php

if($_GET['action'] == 'afficher'){
    $sql = "SELECT * from contact where idcompany='" . $GET['idcompany'] . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête',
        );
        $table_encode = json_encode($table);
        echo $table_encode;
    }else{
        while ($row = mysqli_fetch_assoc($resultat)) {
            array_push($table, array(
                'id' => $row['idcontact'],
                'name' => $row['name_contact'],
                'fname' => $row['fname_contact'],
                'num' => $row['num_contact'],
                'job' => $row['job_contact'],
                'email' => $row['email_contact'],
                'suivi' => $row['approach_contact'],
            ));
        }
        echo json_encode($table);
    }
}elseif($_GET['action'] == 'ajouter'){
    $sql = "SELECT * from contact where email_contact='" . $_GET['email'] . "'"; 
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) { // S'il y a une erreur dans la requête sql
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête',
        );
        $table_encode = json_encode($table);
        echo $table_encode;
    }elseif (mysqli_num_rows($resultat) == 1) {
        $table = array(
            'error'  => true,
            'message' => 'Le contact existe déjà dans la base de données',
        );
        $table_encode = json_encode($table);
        echo $table_encode;
    }else{
        $name = htmlspecialchars($_GET['nom']);
        $fname = htmlspecialchars($_GET['prenom']);
        $num = htmlspecialchars($_GET['num']);
        $job = htmlspecialchars($_GET['job']);
        $email = htmlspecialchars($_GET['email']);
        $suivi = htmlspecialchars($_GET['suivi']);
        $mdp = htmlspecialchars($_POST['mdp']);
        $pass_hash = password_hash($mdp, PASSWORD_DEFAULT);

        $sql = "INSERT INTO contact (name_contact, fname_contact, num_contact, job_contact, email_contact, password_contact, approach_contact) values ('" . $name . "', '" . $fname . "', '" . $num . "', '" . $job . "', '" . $email . "', '" . $mdp . "', '" . $suivi . "')";
        $resultat = mysqli_query($conn, $sql);
        if($resultat == FALSE){
            $table = array(
                'error'  => true,
                'message' => 'Erreur d\'execution de la requête' . $sql,
            );
            
            $table_encode = json_encode($table);
            echo $table_encode;
        }else{
            $table = array(
                'error'  => false,
                'message' => 'Le contact a été ajouté',
            );
            
            $table_encode = json_encode($table);
            echo $table_encode;
        }
    }

}elseif($_GET['action'] == 'modifier'){
    $name = htmlspecialchars($_GET['nom']);
    $fname = htmlspecialchars($_GET['prenom']);
    $num = htmlspecialchars($_GET['num']);
    $job = htmlspecialchars($_GET['job']);
    $email = htmlspecialchars($_GET['email']);
    $suivi = htmlspecialchars($_GET['suivi']);
    $mdp = htmlspecialchars($_POST['mdp']);
    $pass_hash = password_hash($mdp, PASSWORD_DEFAULT);

    $sql = "UPDATE contact SET name_contact='" . $name . "', fname_contact='" . $fname . "', num_contact='" . $num . "', job_contact='" . $job . "', email_contact='" . $contact . "', password_contact='" . $pass_hash . "', approach_contact='" . $suivi . "' WHERE idcontact='" . $_GET['idcontact'] . "'";
    $resultat = mysqli_query($conn, $sql);
        if($resultat == FALSE){
            $table = array(
                'error'  => true,
                'message' => 'Erreur d\'execution de la requête' . $sql,
            );
            
            $table_encode = json_encode($table);
            echo $table_encode;
        }else{
            $table = array(
                'error'  => false,
                'message' => 'Le contact a été modifié',
            );
            
            $table_encode = json_encode($table);
            echo $table_encode;
        }
}elseif($_GET['action'] == 'supprimer'){
    $sql = "DELETE FROM contact WHERE idcontact='" . $_GET['idcontact'] . "'";
    if($resultat == FALSE){
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête' . $sql,
        );
        
        $table_encode = json_encode($table);
        echo $table_encode;
    }else{
        $table = array(
            'error'  => false,
            'message' => 'Le contact a été supprimé',
        );
        
        $table_encode = json_encode($table);
        echo $table_encode;
    }
}

?>