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


const member_btn = document.getElementById("member_btn");
const status_btn = document.getElementById("status_btn");
const form1 = document.getElementById("form1");



member_btn.addEventListener('click', function handleClick() {
    document.getElementById("form-head").innerText="Register Now";
    document.getElementById("form-subhead").innerText="Fill in the form below to be the part of our team.";
    document.getElementById("rstatus").innerHTML=`<table></table>`;
    form1.innerHTML = ` 
    <form role="form" class="login-form" id="register" action="register.php" method="GET">
        <div class="input-group form-group">
            <span class="input-group-addon" id="basic-addon1"><i class="fa fa-user"></i></span>
            <input type="text" name="first_name" id="first_name" class="form-control" placeholder="First Name" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group form-group">
            <span class="input-group-addon" id="basic-addon1"><i class="fa fa-user"></i></span>
            <input type="text" name="last_name" id="last_name" class="form-control" placeholder="Last Name" aria-describedby="basic-addon1" required>
            </div>
        <div class="input-group form-group">
            <span class="input-group-addon" id="basic-addon1"><i class="fa fa-envelope"></i></span>
            <input type="text" name="email" id="email" class="form-control" placeholder="Email" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group form-group">
            <span class="input-group-addon" id="basic-addon1"><i class="fa fa-phone"></i></span>
            <input type="tel" name="phone" id="phone" class="form-control" placeholder="Phone No." aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group form-group" id="Skills">
            <textarea rows="2" cols="70" id="skills" name="skills" class="form-control" placeholder="Skills" required></textarea> 
        </div>
        <div class="input-group form-group" id="rules">
            <p>Membership Rules</p>
            <p>1. All members must be currently enrolled students at NED UNIVERSITY. <br>
                2.  Members must attend at least one meeting or event per semester to maintain active membership status.</p>
                <p><input type="checkbox" name="check" id="" required> I have read, understood, and accepted the membership rules.</p>
        </div>
        
        <button type="submit" name="send" value="Submit" class="btn" id="register" >Submit form</button>
        <p id="Message"></p>
    </form>
    `;
});

status_btn.addEventListener('click', function handleClick() {
    document.getElementById("form-head").innerText="Registration Status";
    document.getElementById("form-subhead").innerText="Check your registration status here.";
    document.getElementById("rstatus").innerHTML=`<div class="table-wrapper">
    <table>
    <tr>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Status</th>
    </tr>
    <tr>
    <td></td>
    <td></td>
    <td></td>
    <td id="state"></td>
    </tr>
    </table>`;
    form1.innerHTML = ` 
    <form role="form" class="login-form" id="reg_status" action="register_status.php" method="GET">
        <div class="input-group form-group">
            <span class="input-group-addon" id="basic-addon1"><i class="fa fa-user"></i></span>
            <input type="text" name="first_name" id="first_name" class="form-control" placeholder="First Name" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group form-group">
            <span class="input-group-addon" id="basic-addon1"><i class="fa fa-user"></i></span>
            <input type="text" name="last_name" id="last_name" class="form-control" placeholder="Last Name" aria-describedby="basic-addon1" required>
        </div>
        <div class="input-group form-group">
            <span class="input-group-addon" id="basic-addon1"><i class="fa fa-envelope"></i></span>
            <input type="text" name="email" id="email" class="form-control" placeholder="Email" aria-describedby="basic-addon1" required>
        </div>
        <button type="submit" value="Submit" class="btn" id="status">Check Status</button>
    </form>`;
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
});
                                
                                
                                
