<?php
$servername = "localhost";
$username = "root";
$database = "club";
$password = "";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$FName = $_GET['first_name'];
$LName = $_GET['last_name'];
$Email = $_GET['email'];
$Phnumber = $_GET['phone'];
$Skills = $_GET['skills'];

$checkQuery = "SELECT * FROM `register` WHERE `FName` = '$FName' AND `LName` = '$LName' AND `Email` = '$Email' ";
$result = mysqli_query($conn, $checkQuery);

// Check if any rows are returned
if (mysqli_num_rows($result) > 0) {
    // Values already exist in the database
    echo 'already_exists';
} 
else {
    // Prepare an INSERT query to add the values to the database
    $insertQuery = "INSERT INTO `register` (`FName`, `LName`, `Email`, `Phnumber`, `Skills`)
                    VALUES ('$FName', '$LName', '$Email', '$Phnumber', '$Skills')";

    // Execute the INSERT query
    if (mysqli_query($conn, $insertQuery)) {
        // Values added successfully
        echo 'success';
    } 
    else {
        // Error occurred while adding values
        echo 'error'. mysqli_error($conn);
    }
}

// Close the database connection
mysqli_close($conn);
?>
