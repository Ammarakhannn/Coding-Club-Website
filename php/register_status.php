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


$checkQuery = "SELECT * FROM `register` WHERE `FName` = '$FName' AND `LName` = '$LName' AND `Email` = '$Email' ";
$result = mysqli_query($conn, $checkQuery);

// Check if any rows are returned
if (mysqli_num_rows($result) > 0) {
    // Values already exist in the database
    $row = mysqli_fetch_assoc($result);
    $status = '<table>
                <tr>   
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Status</th>
                </tr>
                <tr>
                    <td>'. $row['FName'] . '</td>
                    <td>'. $row['LName'] . '</td>
                    <td>'. $row['Email'] . '</td>
                    <td id="state">'. $row['Status'] . '</td>
                </tr>
                </table>';
    echo $status;
} 
else {
    echo 'Not Found';
    
}

// Close the database connection
mysqli_close($conn);
?>