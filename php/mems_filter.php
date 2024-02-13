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

$Allmems = $_GET['All-mems'];

if ($Allmems == 'All') {
    $checkQuery = "SELECT * FROM `register`";
} else if ($Allmems == 'Pending') {
    $checkQuery = "SELECT * FROM `register` where `Status`='Pending'";
} else if ($Allmems == 'Accepted') {
    $checkQuery = "SELECT * FROM `register` where `Status`='Accepted'";
} else if ($Allmems == 'Rejected') {
    $checkQuery = "SELECT * FROM `register` where `Status`='Rejected'";
}

$result = mysqli_query($conn, $checkQuery);

// Check if any rows are returned
if (mysqli_num_rows($result) > 0) {
    $status = '<div class="table-wrapper">
                <table>
                <tr>   
                    <th>FName</th>
                    <th>LName</th>
                    <th>Email</th>
                    <th>Ph Number</th>
                    <th>Skills</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>';

    while ($row = mysqli_fetch_assoc($result)) {
        $status .= '<tr>
                    <td>' . $row['FName'] . '</td>
                    <td>' . $row['LName'] . '</td>
                    <td>' . $row['Email'] . '</td>
                    <td>' . $row['Phnumber'] . '</td>
                    <td>' . $row['Skills'] . '</td>
                    <td id="state">' . $row['Status'] . '</td>
                    <td>';
                    
        if ($row['Status'] == 'Pending') {
            $status .= '<button id="reg-change" onclick="changeStatus(' . $row['RegID'] . ', \'Accepted\')">Accept</button>';
            $status .= '<button id="reg-change" onclick="changeStatus(' . $row['RegID'] . ', \'Rejected\')">Reject</button>';
        } else {
            $status .= '-';
        }

        $status .= '</td>
                    </tr>';
    }

    $status .= '</table>';
    echo $status;
} else {
    echo "No members found.";
}

// Close the database connection
mysqli_close($conn);
?>
