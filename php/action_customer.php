<?php

session_start();

include './conn_db.php';
include './utf8.php';

if ($_GET['action'] == 'afficher') {
    $sql = "SELECT * from customer where idcustomer='" . $_GET['idcustomer'] . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error' => true,
            'message' => 'Erreur d\'execution de la requête',
        );
        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    } else {
        $table = array();

        while ($row = mysqli_fetch_assoc($resultat)) {
            $date = date_create($row['creation_date']);
            $date = date_format($date, 'd-m-Y');
            array_push($table, array(
                'idcustomer' => $row['idcustomer'],
                'name' => $row['name_customer'],
                'fname' => $row['fname_customer'],
                'gender' => $row['gender_customer'],
                'num' => $row['num_customer'],
                'email' => $row['email_customer'],
                'job' => $row['job_customer'],
                'd_job' => $row['desired_job'],
                'company' => $row['last_company'],
                'd_company' => $row['desired_company'],
                'salary' => $row['actual_salary'],
                'd_salary' => $row['desired_salary'],
                'address' => $row['address_customer'],
                'postal' => $row['postal_customer'],
                'city' => $row['city_customer'],
                'type_company' => $row['type_company'],
                'zone' => $row['work_zone'],
                'environnement' => $row['actual_environnement'],
                'd_environnement' => $row['desired_environnement'],
                'project' => $row['project'],
                'd_project' => $row['desired_project'],
                'languages' => $row['languages'],
                'website' => $row['website'],
                'portfolio' => $row['portfolio'],
                'cv' => $row['cv'],
                'status' => $row['status_customer'],
                'contract' => $row['contract_type'],
                'report' => $row['report'],
                'thoughts' => $row['thoughts'],
                'date' => $date,
                'mdp' => $row['password_customer'],
            ));
        }
        echo json_encode(utf8ize($table));
    }
} elseif ($_GET['action'] == 'ajouter') {
    $sql = "SELECT * FROM customer where email_customer='" . $_GET['email'] . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête' . $sql,
        );
        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    } elseif (mysqli_num_rows($resultat) == 1) {
        $table = array(
            'error'  => true,
            'message' => "L'entreprise existe déjà dans la base de données",
        );
        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    } else {
        $name = htmlspecialchars($_GET['name']);
        $fname = htmlspecialchars($_GET['fname']);
        $gender = htmlspecialchars($_GET['gender']);
        $num = htmlspecialchars($_GET['num']);
        $email = htmlspecialchars($_GET['email']);
        $job = htmlspecialchars($_GET['job']);
        $d_job = htmlspecialchars($_GET['d_job']);
        $company = htmlspecialchars($_GET['company']);
        $d_company = htmlspecialchars($_GET['d_company']);
        $salary = htmlspecialchars($_GET['salary']);
        $d_salary = htmlspecialchars($_GET['d_salary']);
        $address = htmlspecialchars($_GET['address']);
        $postal = htmlspecialchars($_GET['postal']);
        $city = htmlspecialchars($_GET['city']);
        $type_company = htmlspecialchars($_GET['type_company']);
        $zone = htmlspecialchars($_GET['zone']);
        $environnement = htmlspecialchars($_GET['environnement']);
        $d_environnement = htmlspecialchars($_GET['d_environnement']);
        $project = htmlspecialchars($_GET['project']);
        $d_project = htmlspecialchars($_GET['d_project']);
        $languages = htmlspecialchars($_GET['languages']);
        $website = htmlspecialchars($_GET['website']);
        $portfolio = htmlspecialchars($_GET['portfolio']);
        $cv = htmlspecialchars($_GET['cv']);
        $status = htmlspecialchars($_GET['status']);
        $contract = htmlspecialchars($_GET['contract']);
        $report = htmlspecialchars($_GET['report']);
        $thoughts = htmlspecialchars($_GET['thoughts']);
        $date = date_create($_GET['date']);
        $date = date_format($date, 'Y-m-d');
        $mdp = htmlspecialchars($_GET['password']);

        $sql = "INSERT INTO customer ('name_customer','fname_customer','gender_customer','num_customer','email_customer','job_customer','desired_job','last_company','desired_company','actual_salary','desired_salary','address_customer','postal_customer','city_customer','type_company','work_zone','actual_environnement','desired_environnement','project','desired_project','languages','website','portfolio','cv','status_customer','contract_type','report','thoughts','creation_date','password_customer' ) VALUES ('" . $name . "','" . $fname . "','" . $gender . "','" . $num . "','" . $email . "','" . $job . "','" . $d_job . "','" . $company . "','" . $d_company . "','" . $salary . "','" . $d_salary . "','" . $address . "','" . $postal . "','" . $city . "','" . $type_company . "','" . $zone . "','" . $environnement . "','" . $d_environnement . "','" . $project . "','" . $d_project . "','" . $languages . "','" . $website . "','" . $portfolio . "','" . $cv . "','" . $status . "','" . $contract . "','" . $report . "','" . $thoughts . "','" . $date . "','" . $mdp . "')";
        $resultat = mysqli_query($conn, $sql);
        if ($resultat == FALSE) {
            $table = array(
                'error'  => true,
                'message' => 'Erreur d\'execution de la requête' . $sql
            );
            $table_encode = json_encode(utf8ize($table));
            echo $table_encode;
        } else {
            $table = array(
                'error'  => false,
                'message' => 'Le candidat a bien été ajouté',
            );
            $table_encode = json_encode(utf8ize($table));
            echo $table_encode;
        }
    }
} elseif ($_GET['action'] == 'modifier') {
    $idcustomer = htmlspecialchars($_GET['idcustomer']);
    $name = htmlspecialchars($_GET['name']);
    $fname = htmlspecialchars($_GET['fname']);
    $gender = htmlspecialchars($_GET['gender']);
    $num = htmlspecialchars($_GET['num']);
    $email = htmlspecialchars($_GET['email']);
    $job = htmlspecialchars($_GET['job']);
    $d_job = htmlspecialchars($_GET['d_job']);
    $company = htmlspecialchars($_GET['company']);
    $d_company = htmlspecialchars($_GET['dcompany']);
    $salary = htmlspecialchars($_GET['salary']);
    $d_salary = htmlspecialchars($_GET['dsalary']);
    $address = htmlspecialchars($_GET['address']);
    $postal = htmlspecialchars($_GET['postal']);
    $city = htmlspecialchars($_GET['city']);
    $type_company = htmlspecialchars($_GET['type_company']);
    $zone = htmlspecialchars($_GET['zone']);
    $environnement = htmlspecialchars($_GET['environnement']);
    $d_environnement = htmlspecialchars($_GET['denvironnement']);
    $project = htmlspecialchars($_GET['project']);
    $d_project = htmlspecialchars($_GET['dproject']);
    $languages = htmlspecialchars($_GET['languages']);
    $website = htmlspecialchars($_GET['website']);
    $portfolio = htmlspecialchars($_GET['portfolio']);
    $cv = htmlspecialchars($_GET['cv']);
    $status = htmlspecialchars($_GET['status']);
    $contract = htmlspecialchars($_GET['contract']);
    $report = htmlspecialchars($_GET['report']);
    $thoughts = htmlspecialchars($_GET['thoughts']);
    $date = date_create($_GET['date']);
    $date = date_format($date, 'Y-m-d');
    $mdp = htmlspecialchars($_GET['password']);

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
        creation_date='" . $date . "',
        password_customer='" . $password . "'
            WHERE idcustomer='" . $idcustomer . "'";

    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête',
        );
        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    } else {
        $table = array(
            'error'  => false,
            'message' => 'Le candidat a été modifié',
        );

        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    }
}
