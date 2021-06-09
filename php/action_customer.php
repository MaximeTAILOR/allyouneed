<?php

session_start();

include './conn_db.php';

if ($_GET['action'] == 'afficher') {
    $sql = "SELECT * from customer where idcustomer='" . $_GET['idcustomer'] . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error' => true,
            'message' => 'Erreur d\'execution de la requête',
        );
        $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
        echo $table_encode;
    } else {
        $table = array();

        while ($row = mysqli_fetch_assoc($resultat)) {
            $date = date_create($row['creation_date']);
            $date = date_format($date, 'd-m-Y');
            array_push($table, array(
                'idcustomer' => $row['idcustomer'],
                'nom' => $row['name_customer'],
                'prenom' => $row['fname_customer'],
                'genre' => $row['gender_customer'],
                'portable' => $row['num_customer'],
                'mail' => $row['email_customer'],
                'posteActuel' => $row['job_customer'],
                'posteSouhaite' => $row['desired_job'],
                'derniereEntreprise' => $row['last_company'],
                'entrepriseSouhaitees' => $row['desired_company'],
                'salaireActuel' => $row['actual_salary'],
                'salaireSouhaite' => $row['desired_salary'],
                'adressePartielle' => $row['address_customer'],
                'codePost' => $row['postal_customer'],
                'ville' => $row['city_customer'],
                'region' => $row['district_customer'],
                'typeEntreprise' => $row['type_company'],
                'zoneDeTravail' => $row['work_zone'],
                'environnementTechActuel' => $row['actual_environnement'],
                'environnementTechVoulu' => $row['desired_environnement'],
                'plusGrosProjet' => $row['project'],
                'projetsSouhaites' => $row['desired_project'],
                'langues' => $row['languages'],
                'siteWeb' => $row['website'],
                'portfolio' => $row['portfolio'],
                'CV' => $row['cv'],
                'statutCandidat' => $row['status_customer'],
                'typeDeContrat' => $row['contract_type'],
                'compteRenduAgent' => $row['report'],
                'avisAgent' => $row['thoughts'],
                'note' => $row['score_customer'],
                'dateDuJour' => $date,
                'veutUneFormation' => $row['formation'],
                'listeFormationsSouhaitees' => $row['list_formations'],
                'origine' => $row['origin_customer'],
                'linkedin' => $row['linkedin'],
                'instagram' => $row['instagram'],
                'discord' => $row['discord'],
                'whatsapp' => $row['whatsapp']
            ));
        }
        echo json_encode($table, JSON_UNESCAPED_UNICODE);
    }
} elseif ($_GET['action'] == 'ajouter') {
    $sql = "SELECT * FROM customer where email_customer='" . $_GET['mail'] . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête ' . $sql,
        );
        $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
        echo $table_encode;
    } elseif (mysqli_num_rows($resultat) == 1) {
        $table = array(
            'error'  => true,
            'message' => "Le candidat existe déjà dans la base de données",
        );
        $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
        echo $table_encode;
    } else {
        $name = htmlspecialchars($_GET['nom']);
        $fname = htmlspecialchars($_GET['prenom']);
        $gender = htmlspecialchars($_GET['genre']);
        $num = htmlspecialchars($_GET['portable']);
        $email = htmlspecialchars($_GET['mail']);
        $job = htmlspecialchars($_GET['posteActuel']);
        $d_job = htmlspecialchars($_GET['posteSouhaite']);
        $company = htmlspecialchars($_GET['derniereEntreprise']);
        $d_company = htmlspecialchars($_GET['entrepriseSouhaitees']);
        $salary = htmlspecialchars($_GET['salaireActuel']);
        $d_salary = htmlspecialchars($_GET['salaireSouhaite']);
        $address = htmlspecialchars($_GET['adressePartielle']);
        $postal = htmlspecialchars($_GET['codePost']);
        $city = htmlspecialchars($_GET['ville']);
        $district = htmlspecialchars($_GET['region']);
        $type_company = htmlspecialchars($_GET['typeEntreprise']);
        $zone = htmlspecialchars($_GET['zoneDeTravail']);
        $environnement = htmlspecialchars($_GET['environnementTechActuel']);
        $d_environnement = htmlspecialchars($_GET['environnementTechVoulu']);
        $project = htmlspecialchars($_GET['plusGrosProjet']);
        $d_project = htmlspecialchars($_GET['projetsSouhaites']);
        $languages = htmlspecialchars($_GET['langues']);
        $website = htmlspecialchars($_GET['siteWeb']);
        $portfolio = htmlspecialchars($_GET['portfolio']);
        $cv = htmlspecialchars($_GET['CV']);
        $status = htmlspecialchars($_GET['statutCandidat']);
        $contract = htmlspecialchars($_GET['typeDeContrat']);
        $report = htmlspecialchars($_GET['compteRenduAgent']);
        $thoughts = htmlspecialchars($_GET['avisAgent']);
        $score = htmlspecialchars($_GET['note']);
        $date = date_create($_GET['dateDuJour']);
        $date = date_format($date, 'Y-m-d');
        $formation = htmlspecialchars($_GET['veutUneFormation']);
        $list_formations = htmlspecialchars($_GET['listeFormationsSouhaitees']);
        $origin = htmlspecialchars($_GET['origine']);
        $linkedin = htmlspecialchars($_GET['linkedin']);
        $instagram = htmlspecialchars($_GET['instagram']);
        $discord = htmlspecialchars($_GET['discord']);
        $whatsapp = htmlspecialchars($_GET['whatsapp']);

        $sql = "INSERT INTO customer (name_customer,fname_customer,gender_customer,num_customer,email_customer,job_customer,desired_job,last_company,desired_company,actual_salary,desired_salary,address_customer,postal_customer,city_customer,district_customer,type_company,work_zone,actual_environnement,desired_environnement,project,desired_project,languages,website,portfolio,cv,status_customer,contract_type,report,thoughts,score_customer, creation_date, formation, list_formations,origin_customer, linkedin, instagram, discord, whatsapp) VALUES ('" . $name . "','" . $fname . "','" . $gender . "','" . $num . "','" . $email . "','" . $job . "','" . $d_job . "','" . $company . "','" . $d_company . "','" . $salary . "','" . $d_salary . "','" . $address . "','" . $postal . "','" . $city . "','" . $district . "','" . $type_company . "','" . $zone . "','" . $environnement . "','" . $d_environnement . "','" . $project . "','" . $d_project . "','" . $languages . "','" . $website . "','" . $portfolio . "','" . $cv . "','" . $status . "','" . $contract . "','" . $report . "','" . $thoughts . "','" . $score . "','" . $date . "', '" . $formation . "', '" . $list_formations . "', '" . $origin . "','" . $linkedin . "','" . $instagram . "','" . $discord . "','" . $whatsapp . "')";
        $resultat = mysqli_query($conn, $sql);
        if ($resultat == FALSE) {
            $table = array(
                'error'  => true,
                'message' => 'Erreur d\'execution de la requête ' . $sql
            );
            $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
            echo $table_encode;
        } else {
            $sql = "SELECT * FROM customer where email_customer='" . $email . "'";
            $resultat = mysqli_query($conn, $sql);
            if ($resultat == FALSE) {
                $table = array(
                    'error'  => true,
                    'message' => 'Erreur d\'execution de la requête ' . $sql,
                );
                $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
                echo $table_encode;
            } else {
                while ($row = mysqli_fetch_assoc($resultat)) {
                    $id = $row['idcustomer'];
                }
                $table = array(
                    'error'  => false,
                    'message' => 'Le candidat a bien été ajouté',
                    'idcustomer' => $id,
                );
                $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
                echo $table_encode;
            }
        }
    }
} elseif ($_GET['action'] == 'modifier') {
    $idcustomer = htmlspecialchars($_GET['idcustomer']);
    $name = htmlspecialchars($_GET['nom']);
    $fname = htmlspecialchars($_GET['prenom']);
    $gender = htmlspecialchars($_GET['genre']);
    $num = htmlspecialchars($_GET['portable']);
    $email = htmlspecialchars($_GET['mail']);
    $job = htmlspecialchars($_GET['posteActuel']);
    $d_job = htmlspecialchars($_GET['posteSouhaite']);
    $company = htmlspecialchars($_GET['derniereEntreprise']);
    $d_company = htmlspecialchars($_GET['entrepriseSouhaitees']);
    $salary = htmlspecialchars($_GET['salaireActuel']);
    $d_salary = htmlspecialchars($_GET['salaireSouhaite']);
    $address = htmlspecialchars($_GET['adressePartielle']);
    $postal = htmlspecialchars($_GET['codePost']);
    $city = htmlspecialchars($_GET['ville']);
    $district = htmlspecialchars($_GET['region']);
    $type_company = htmlspecialchars($_GET['typeEntreprise']);
    $zone = htmlspecialchars($_GET['zoneDeTravail']);
    $environnement = htmlspecialchars($_GET['environnementTechActuel']);
    $d_environnement = htmlspecialchars($_GET['environnementTechVoulu']);
    $project = htmlspecialchars($_GET['plusGrosProjet']);
    $d_project = htmlspecialchars($_GET['projetsSouhaites']);
    $languages = htmlspecialchars($_GET['langues']);
    $website = htmlspecialchars($_GET['siteWeb']);
    $portfolio = htmlspecialchars($_GET['portfolio']);
    $cv = htmlspecialchars($_GET['CV']);
    $status = htmlspecialchars($_GET['statutCandidat']);
    $contract = htmlspecialchars($_GET['typeDeContrat']);
    $report = htmlspecialchars($_GET['compteRenduAgent']);
    $thoughts = htmlspecialchars($_GET['avisAgent']);
    $score = htmlspecialchars($_GET['note']);
    $date = date_create($_GET['dateDuJour']);
    $date = date_format($date, 'Y-m-d');
    $formation = htmlspecialchars($_GET['veutUneFormation']);
    $list_formations = htmlspecialchars($_GET['listeFormationsSouhaitees']);
    $origin = htmlspecialchars($_GET['origine']);
    $linkedin = htmlspecialchars($_GET['linkedin']);
    $instagram = htmlspecialchars($_GET['instagram']);
    $discord = htmlspecialchars($_GET['discord']);
    $whatsapp = htmlspecialchars($_GET['whatsapp']);

    $sql = "UPDATE customer SET 
        name_customer='" . $name . "',
        fname_customer='" . $fname . "',
        gender_customer='" . $gender . "',
        num_customer='" . $num . "',
        email_customer='" . $email . "',
        job_customer='" . $job . "',
        desired_job='" . $d_job . "',
        last_company='" . $company . "',
        desired_company='" . $d_company . "',
        actual_salary='" . $salary . "',
        desired_salary='" . $d_salary . "',
        address_customer='" . $address . "',
        postal_customer='" . $postal . "',
        city_customer='" . $city . "',
        district_customer='" . $district . "',
        type_company='" . $type_company . "',
        work_zone='" . $zone . "',
        actual_environnement='" . $environnement . "',
        desired_environnement='" . $d_environnement . "',
        project='" . $project . "',
        desired_project='" . $d_project . "',
        languages='" . $languages . "',
        website='" . $website . "',
        portfolio='" . $portfolio . "',
        cv='" . $cv . "',
        status_customer='" . $status . "',
        contract_type='" . $contract . "',
        report='" . $report . "',
        thoughts='" . $thoughts . "',
        score_customer='" . $score . "',
        creation_date='" . $date . "',
        formation='" . $formation . "',
        list_formations='" . $list_formations . "',
        origin_customer='" . $origin . "',
        linkedin='" . $linkedin . "', 
        instagram='" . $instagram . "',
        discord='" . $discord . "',
        whatsapp='" . $whatsapp . "'
            WHERE idcustomer='" . $idcustomer . "'";

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
            'message' => 'Le candidat a été modifié',
        );

        $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
        echo $table_encode;
    }
}
