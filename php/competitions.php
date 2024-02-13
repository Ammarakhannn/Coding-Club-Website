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

$Member1 = $_POST['member1'];
$Email = $_POST['Email']; 
$Member2 = $_POST['member2'];
$Member3 = $_POST['member3'];
$Competition = $_POST['comp'];

$checkQuery = "SELECT * FROM `competitions` WHERE `Email` = '$Email'";

$result = mysqli_query($conn, $checkQuery);

if (!$result) {
    // Error occurred while executing the query
    echo 'query_error: ' . mysqli_error($conn);
} 
else {
    // Check if any rows are returned
    if (mysqli_num_rows($result) > 0) {
        // Values already exist in the database
        echo 'already_exists';
    } else {
        // Prepare an INSERT query to add the values to the database
        $insertQuery = "INSERT INTO `competitions` (`Member1`,`Email`, `Member2`, `Member3`, `Comp`)
                        VALUES ('$Member1', '$Email', '$Member2', '$Member3', '$Competition')";

        // Execute the INSERT query
        if (mysqli_query($conn, $insertQuery)) {
            // Values added successfully
            echo 'success';
        } else {
            // Error occurred while adding values
            echo 'insert_error: ' . mysqli_error($conn);
        }
    }
}

// Close the database connection
mysqli_close($conn);

?>
