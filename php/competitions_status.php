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

$checkQuery = "SELECT * FROM `competitions` WHERE `Member1` = '$Member1' AND `Email` = '$Email'";
$result = mysqli_query($conn, $checkQuery);

// Check if any rows are returned
if (mysqli_num_rows($result) > 0) {
    // Values already exist in the database
    $row = mysqli_fetch_assoc($result);
    $status = '
                <table>
                <thead>
                <tr>   
                    <th>Member 1</th>
                    <th>Email</th>
                    <th>Member 2</th>
                    <th>Member 3</th>
                    <th>Competition</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tr>
                    <td>'. $row['Member1'] . '</td>
                    <td>'. $row['Email'] . '</td>
                    <td>'. $row['Member2'] . '</td>
                    <td>'. $row['Member3'] . '</td>
                    <td>'. $row['Comp'] . '</td>
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