<?php

session_start();

include './conn_db.php';

if($_GET['action'] == 'afficher'){
    $siret = htmlspecialchars($_GET['siret']);
    $sql = "SELECT * from company where idcompany='" . $siret . "'";
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
                'id' => $row['idcompany'],
                'siret' => $row['siret_company'],
                'siren' => $row['siren_company'],
                'ape' => $row['ape_company'],
                'name' => $row['name_company'],
                'type' => $row['type_company'],
                'suspect' => $row['suspect_company'],
                'prospect' => $row['prospect_company'],
                'analyse' => $row['anayse_company'],
                'negociation' => $row['negociation_company'],
                'closing' => $row['closing_company'],
                'order' => $row['order_company'],
            ));
        }
        echo json_encode($table);
    }
}elseif($_GET['action'] == 'ajouter'){
    $sql = "SELECT * from company where siret_company='" . $_GET['siret'] . "'"; 
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
            'message' => 'L\entreprise existe déjà dans la base de données',
        );
        $table_encode = json_encode($table);
        echo $table_encode;
    }else{
        $siret = htmlspecialchars($_GET['siret']);
        $siren = htmlspecialchars($_GET['siren']);
        $ape = htmlspecialchars($_GET['ape']);
        $entreprise = htmlspecialchars($_GET['nomEntreprise']);
        $type = htmlspecialchars($_GET['type']);

        $sql = "INSERT INTO company (siret_company, siren_company, ape_company, name_company, legal_entity, type_company) values ('" . $siret . "', '" . $siren . "', '" . $ape . "', '" . $entreprise . "', '" . $type . "')";
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
                'message' => 'L\'entreprise a été ajoutée',
            );
            
            $table_encode = json_encode($table);
            echo $table_encode;
        }
    }

}elseif($_GET['action'] == 'modifier'){
    $siret = htmlspecialchars($_GET['siret']);
    $siren = htmlspecialchars($_GET['siren']);
    $ape = htmlspecialchars($_GET['ape']);
    $entreprise = htmlspecialchars($_GET['nomEntreprise']);
    $type = htmlspecialchars($_GET['type']);

    $sql = "UPDATE company SET siret_company='" . $siret . "', siren_company='" . $sirent . "', ape_company='" . $ape . "', name_company='" . $entreprise . "', type_company='" . $type . "' WHERE siret_company='" . $siret . "'";
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
                'message' => 'L\'entreprise a été modifiée',
            );
            
            $table_encode = json_encode($table);
            echo $table_encode;
        }
}elseif($_GET['action'] == 'supprimer'){
    $siret = htmlspecialchars($_GET['siret']);
    $sql = "DELETE FROM company WHERE siret_company='" . $siret . "'";
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
            'message' => 'L\'entreprise a été supprimée',
        );
        
        $table_encode = json_encode($table);
        echo $table_encode;
    }
}

?>