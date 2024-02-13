<?php
var_dump($_POST);
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

$memberID = $_POST['memberID'];
$newStatus = $_POST['newStatus'];

// Update the status in the database
$updateQuery = "UPDATE `register` SET `Status` = '$newStatus' WHERE `RegID` = $memberID";
if ($conn->query($updateQuery) === TRUE) {
    echo "Status updated successfully";
} else {
    echo "Error updating status: " . $conn->error;
}

// Close the database connection
mysqli_close($conn);
?>
