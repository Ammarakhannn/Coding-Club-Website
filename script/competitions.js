const competitionsSelect = document.getElementById('competitions');
    const selectedOption = 'Web-Kode'; // Change this to the desired selected option value

    for (let i = 0; i < competitionsSelect.options.length; i++) {
        if (competitionsSelect.options[i].value === selectedOption) {
            competitionsSelect.options[i].selected = true;
            break;
        }
    }


$(document).ready(function () {
    $("#panel-admin").css("display", "none");

    $('.open').click(function () {
        $("#panel-admin").animate({ width: 'toggle' }, 100);
    });

    if (!document.getElementById('wrapper').className && !localStorage.getItem("selectedColor")) {
        console.log('in if');
        document.getElementById('wrapper').classList.add('blue');
    } else {
        console.log('else');
        var colorClass = localStorage.getItem("selectedColor");
        document.getElementById('wrapper').classList.add(colorClass);
    }


    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);

});

 
$(window).scroll(function () {

    if ($(this).scrollTop() > 50) {
        $('header').addClass("sticky");
    } else {
        $('header').removeClass("sticky");
    }
});


function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('fa-plus fa-minus');
}


const form2 = document.getElementById("form2");
const comp_btn = document.getElementById("comp_btn");
const comp_status_btn = document.getElementById("comp_status_btn");
comp_btn.addEventListener('click', function handleClick() {
    document.getElementById("cstatus").innerHTML="";
    document.getElementById("form-head").innerText="Register your team here";
    document.getElementById("form-subhead").innerText="Register in Competitions now and win amazing Prize!";
    form2.innerHTML=`
    <form role="form" class="login-form form" id="comp_form" action="competitions.php" method="POST">
        <div class="input-group form-group">
            <span class="input-group-addon" id="basic-addon1"><i class="fa fa-user"></i></span>
            <input type="text" name="member1" id="member1" class="form-control" placeholder="Member 1 (Lead)" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group form-group">
            <span class="input-group-addon" id="basic-addon1"><i class="fa fa-envelope"></i></span>
            <input type="text" name="Email" id="Email" class="form-control" placeholder="Email" aria-describedby="basic-addon1" required>
            </div>
            <div class="input-group form-group">
            <span class="input-group-addon" id="basic-addon1"><i class="fa fa-user"></i></span>
            <input type="text" name="member2" id="member2" class="form-control" placeholder="Member 2" aria-describedby="basic-addon1" required>
            </div>
            <div class="input-group form-group">
            <span class="input-group-addon" id="basic-addon1"><i class="fa fa-user"></i></span>
            <input type="text" name="member3" id="member3" class="form-control" placeholder="Member 3" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group form-group">
            <select style="width: 500px; padding: 10px 10px;" id="competitions" name="comp">
                <option value="Koderz-Kombat">Koderz Kombat</option>
                <option value="Web-Kode">Web Kode</option>
                <option value="Web-Quest">Web Quest</option>
            </select>
        </div>
        
        <div class="input-group form-group" id="rules">
            <p>Competition Rules</p>
            <p>1. All participants must abide by the rules and guidelines of the competition. <br>
            2. Participants must comply with the deadlines and submission requirements stated for each competition.</p>
            <p><input type="checkbox" name="check" id="" required> I have read, understood, and accepted the competition rules.</p>
        </div>
            
        <button type="submit" value="Submit" class="btn" id="competitions" >Submit form</button>
        <p id="Message"></p>
        </form>`;
});

comp_status_btn.addEventListener('click', function handleClick() {
    document.getElementById("form-head").innerText="Registration Status";
    document.getElementById("form-subhead").innerText="Check your competition Registration Status.";
    document.getElementById("cstatus").innerHTML=`
    <table>
    <tr>   
        <th>Member 1</th>
        <th>Email</th>
        <th>Member 2</th>
        <th>Member 3</th>
        <th>Competition</th>
        <th>Status</th>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td id="state"></td>
    </tr>
    </table>`;
form2.innerHTML=`
    <form role="form" class="login-form form" id="comp_status_form" action="competitions_status.php" method="POST">
        <div class="input-group form-group">
            <span class="input-group-addon" id="basic-addon1"><i class="fa fa-user"></i></span>
            <input type="text" name="member1" id="member1" class="form-control" placeholder="Member 1 (Lead)" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group form-group">
            <span class="input-group-addon" id="basic-addon1"><i class="fa fa-envelope"></i></span>
            <input type="text" name="Email" id="Email" class="form-control" placeholder="Email" aria-describedby="basic-addon1" required>
        </div>
        
        <button type="submit" value="Submit" class="btn" id="competitions" >Check status</button>
    </form>`;
});

// $(document).ready(function() {
    $('#comp_form').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the form data
        var formData = $(this).serialize();
        console.log(formData);

        // Send the AJAX request
        $.ajax({
            url: 'competitions.php',
            type: 'POST',
            data: formData,
            success: function(response) { 
                // console.log(response);
                // Handle the response from the server
                if (response === 'already_exists') {
                    $('#Message').text('You have already Registered!');
                } else if (response === 'success') {
                    $('#Message').text('Thank You for Submitting the Form!');
                } else {
                    $('#Message').text('Error submitting form.');
                }
            },
            error: function(xhr, status, error) {
                console.log(error); // Log any AJAX errors
              }
        });
    });
    // });
    document.getElementById('comp_status_btn').addEventListener('click', function() {
        $('#comp_status_form').submit(function(event) {
            event.preventDefault(); // Prevent the default form submission
    
            // Get the form data
            var formData2 = $(this).serialize();
            // console.log(formData2);
            
            $.ajax({
                url: 'competitions_status.php',
                type: 'POST',
                data: formData2,
                success: function(response) {
                    // Handle the response from the server
                    // console.log(response);
                    if(response === 'Not Found'){
                        document.getElementById("cstatus").innerHTML = "<p><strong>No Result found please Register yourself First.</strong></p>";
                    }
                    else{
                        document.getElementById("cstatus").innerHTML = response;
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