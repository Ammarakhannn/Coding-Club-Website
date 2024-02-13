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

$Username = $_GET['Username'];
$Password = $_GET['Password']; 

$checkQuery = "SELECT * FROM `admin` WHERE `Username` = '$Username' AND `Password` = '$Password'";
$result = mysqli_query($conn, $checkQuery);

$checkQuery1 = "SELECT * FROM `admin` WHERE `Username` = '$Username' AND `Password` != '$Password'";
$result1 = mysqli_query($conn, $checkQuery1);

// Check if any rows are returned
if (mysqli_num_rows($result) > 0) {
    // Values already exist in the database
    echo 'matched';
} 
else if (mysqli_num_rows($result1) > 0) {
    // Values already exist in the database
    echo 'wrong password';
} 
else {
    echo 'Not Found';
    
}

// Close the database connection
mysqli_close($conn);
?>