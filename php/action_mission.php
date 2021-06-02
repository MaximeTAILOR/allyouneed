<?php

session_start();

include './conn_db.php';

if($_GET['action'] == 'afficher'){
    $sql = "SELECT * from mission where siret_company='" . $GET['siret'] . "'";
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
                'idmission' => $row['idmission'],
                'manager' => $row['manager_mission'],
                'post' => $row['post_mission'],
                'current' => $row['current_mission'],
                'meeting' => $row['meeting_mission'],
                'endorsed' => $row['endorsed_mission'],
                'opendate' => $row['opendate_mission'],
                'enddate' => $row['enddate_mission'],
                'turnover' => $row['turnover_mission'],
            ));
        }
        echo json_encode(utf8ize($table));
    }
}elseif($_GET['action'] == 'ajouter'){
    $siret = htmlspecialchars($_GET['siret']);
    $manager = htmlspecialchars($_GET['manager']);
    $post = htmlspecialchars($_GET['post']);
    $current = htmlspecialchars($_GET['current']);
    $meeting = htmlspecialchars($_GET['meeting']);
    $endorsed = htmlspecialchars($_GET['endorsed']);
    $opendate = htmlspecialchars($_GET['opendate']);
    $enddate = htmlspecialchars($_POST['enddate']);
    $turnover = htmlspecialchars($_POST['turnover']);

    $sql = "INSERT INTO mission (siret_company, manager_mission, post_mission, current_mission, meeting_mission, endorsed_mission, opendate_mission, enddate_mission, turnover_mission) values ('" . $siret . "', '" . $manager . "', '" . $post . "', '" . $current . "', '" . $meeting . "', '" . $endorsed . "', '" . $opendate . "', '" . $enddate . "', '" . $turnover . "')";
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

}elseif($_GET['action'] == 'modifier'){
    $manager = htmlspecialchars($_GET['manager']);
    $post = htmlspecialchars($_GET['post']);
    $current = htmlspecialchars($_GET['current']);
    $meeting = htmlspecialchars($_GET['meeting']);
    $endorsed = htmlspecialchars($_GET['endorsed']);
    $opendate = htmlspecialchars($_GET['opendate']);
    $enddate = htmlspecialchars($_POST['enddate']);
    $turnover = htmlspecialchars($_POST['turnover']);

    $sql = "UPDATE mission SET manager_mission='" . $manager . "', post_mission='" . $post . "', current_mission='" . $current . "', meeting_mission='" . $meeting . "', endorsed_mission='" . $endorsed . "', opendate_mission='" . $opendate . "', enddate_mission='" . $enddate . "', turnover_mission='" . $turnover . "' WHERE idmission='" . $idmission . "'";
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

}elseif($_GET['action'] == 'supprimer'){
    $sql = "DELETE FROM mission WHERE idmission='" . $_GET['idmission'] . "'";
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