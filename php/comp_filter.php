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

$Allcomps = $_GET['All-comp'];

if ($Allcomps == 'All') {
    $checkQuery = "SELECT * FROM `competitions`";
} else if ($Allcomps == 'Pending') {
    $checkQuery = "SELECT * FROM `competitions` where `Status`='Pending'";
} else if ($Allcomps == 'Accepted') {
    $checkQuery = "SELECT * FROM `competitions` where `Status`='Accepted'";
} else if ($Allcomps == 'Rejected') {
    $checkQuery = "SELECT * FROM `competitions` where `Status`='Rejected'";
}

$result = mysqli_query($conn, $checkQuery);

// Check if any rows are returned
if (mysqli_num_rows($result) > 0) {
    $status = '<div class="table-wrapper">
              <table>
                  <thead>
                      <tr>   
                          <th>Member 1</th>
                          <th>Email</th>
                          <th>Member 2</th>
                          <th>Member 3</th>
                          <th>Competition</th>
                          <th>Status</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>';

while ($row = mysqli_fetch_assoc($result)) {
    $status .= '<tr>
                <td>' . $row['Member1'] . '</td>
                <td>' . $row['Email'] . '</td>
                <td>' . $row['Member2'] . '</td>
                <td>' . $row['Member3'] . '</td>
                <td>' . $row['Comp'] . '</td>
                <td id="state">' . $row['Status'] . '</td>
                <td>'; // Your code for action buttons

                    
        if ($row['Status'] == 'Pending') {
            $status .= '<button id="reg-change" onclick="changeCStatus(' . $row['CompID'] . ', \'Accepted\')">Accept</button>';
            $status .= '<button id="reg-change" onclick="changeCStatus(' . $row['CompID'] . ', \'Rejected\')">Reject</button>';
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
