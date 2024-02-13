$(document).on('submit', '#register', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    var formData = $(this).serialize();

    // Send the AJAX request to register.php
    $.ajax({
        url: 'register.php',
        type: 'GET',
        data: formData,
        success: function(response) {
            if (response === 'already_exists') {
                $('#Message').text('You have already Registered!');
            } else if (response === 'success') {
                // If registration is successful, send email
                sendEmail(formData);
            } else {
                $('#Message').text('Error submitting form.');
            }
        },
        error: function() {
            $('#Message').text('Error submitting form.');
        }
    });
});

function sendEmail(formData) {
    console.log(formData);
    // Send AJAX request to send_email.php
    $.ajax({
        url: 'send_email.php',
        type: 'POST',
        data: formData,
        success: function(response) {
            if (response === 'success') {
                $('#Message').text('Thank You for Submitting the Form!');
            } else {
                $('#Message').text(response);
            }
        },
        error: function() {
            $('#Message').text('Error sending email.');
        }
    });
}

document.getElementById('status_btn').addEventListener('click', function() {
    $('#reg_status').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the form data
        var formData2 = $(this).serialize();
        // console.log(formData2);
        
        $.ajax({
            url: 'register_status.php',
            type: 'GET',
            data: formData2,
            success: function(response) {
                // Handle the response from the server
                // console.log(response);
                if(response === 'Not Found'){
                    document.getElementById("rstatus").innerHTML = "<p><strong>No Result found please Register yourself First.</strong></p>";
                }
                else{
                    document.getElementById("rstatus").innerHTML = response;
                    var state = document.getElementById("state").innerText;
                    if (state == "Pending") {
                        document.getElementById("state").style.color = "orange";
                    } else if (state == "Accepted") {
                        document.getElementById("state").style.color = "green";
                    } else if (state == "Rejected") {
                        document.getElementById("state").style.color = "red";
                    }
                }
            },
            
        });
    });
});
  