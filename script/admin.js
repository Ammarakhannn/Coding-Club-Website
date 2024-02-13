$('#admin_login').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    var formData = $(this).serialize();
    // console.log(formData);

    // Send the AJAX request
    $.ajax({
        url: 'admin_login.php',
        type: 'GET',
        data: formData,
        success: function(response) { 
            if(response == 'matched'){
                document.getElementById("result").innerText="Logged In";
                document.getElementById("admin-ul").innerHTML=`<li class="admin-li"><button class="parallelogram-btn" id="comps">Competitions</button></li>
                <li class="admin-li"><button class="parallelogram-btn" id="mems">Members</button></li>
                <li class="admin-li"><button class="parallelogram-btn" id="logout">Log Out</button></li>`;
            }
            else if(response == 'wrong password'){
                document.getElementById("result").innerText="Password is Incorrect";
            }
            else if(response == 'Not Found'){
                document.getElementById("result").innerText="Invalid User";
            }
        },
        error: function(xhr, status, error) {
            console.log(error); // Log any AJAX errors
        }
    });
});

document.getElementById("admin-ul").addEventListener('click', function(event) {
    if (event.target.id === 'logout') {
        location.reload();
        document.getElementById("admin-ul").innerHTML = `
            <li class="admin-li"><button class="parallelogram-btn" id="logIn">Log In</button></li>
        `;
    }
    else if (event.target.id === 'comps') {
        document.getElementById("change").innerHTML=`<section class="comp_report">
        <div class="container">
            <div class="form-bottom">
                <form role="form" class="login-form form" id="comp_filter" action="comp_filter.php" method="GET">
                    <strong>Filter Competition Registartions:</strong>
                    <div class="input-group form-group" >
                        <span class="input-group-addon" id="basic-addon1"><i class="fa fa-flag"></i></span>
                        <select  id="All-comp"  style="height: 40px; width: 190px;  border: 1px solid rgb(222, 221, 221); border-left: none;" name="All-comp" >
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <button type="submit" value="Submit" class="btn join" id="filter">Filter</button>
                    <p id="rcomp">
                    </p>
        </div>
    </section>`;
    $('#comp_filter').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        // Get the form data
        var formData = $(this).serialize();
        // console.log(formData);
    
        // Send the AJAX request
        $.ajax({
            url: 'comp_filter.php',
            type: 'GET',
            data: formData,
            success: function(response) { 
                document.getElementById('rcomp').innerHTML=response;
                var stateElements = document.querySelectorAll("#state");
                stateElements.forEach(function(element) {
                    var state = element.innerText;
                    if (state === "Pending") {
                        element.style.color = "orange";
                    } else if (state === "Accepted") {
                        element.style.color = "green";
                    } else if (state === "Rejected") {
                        element.style.color = "red";
                    }
                });
            },
            error: function(xhr, status, error) {
                console.log(error); // Log any AJAX errors
            }
        });
    });
    }
    else if (event.target.id === 'mems') {
        document.getElementById("change").innerHTML=`<section class="comp_report">
        <div class="container">
            <div class="form-bottom">
                <form role="form" class="login-form form" id="mems_filter" action="mems_filter.php" method="GET">
                    <strong>Filter Members Registartions:</strong>
                    <div class="input-group form-group" >
                        <span class="input-group-addon" id="basic-addon1"><i class="fa fa-flag"></i></span>
                        <select  id="All-mems"  style="height: 40px; width: 190px;  border: 1px solid rgb(222, 221, 221); border-left: none;" name="All-mems" >
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <button type="submit" value="Submit" class="btn join" id="filter">Filter</button>
                    <p id="rmems">
                    </p>
        </div>
    </section>`;
    $('#mems_filter').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        // Get the form data
        var formData = $(this).serialize();
        // console.log(formData);
    
        // Send the AJAX request
        $.ajax({
            url: 'mems_filter.php',
            type: 'GET',
            data: formData,
            success: function(response) { 
                document.getElementById('rmems').innerHTML=response;
                var stateElements = document.querySelectorAll("#state");
                stateElements.forEach(function(element) {
                    var state = element.innerText;
                    if (state === "Pending") {
                        element.style.color = "orange";
                    } else if (state === "Accepted") {
                        element.style.color = "green";
                    } else if (state === "Rejected") {
                        element.style.color = "red";
                    }
                });
            },
            error: function(xhr, status, error) {
                console.log(error); // Log any AJAX errors
            }
        });
    });
    }
});

function changeStatus(memberID, newStatus) {
    $.ajax({
      type: "POST",
      url: "update_status.php",
      data: {
        memberID: memberID,
        newStatus: newStatus
      },
      success: function(response) {
        // Handle the response from the server
        console.log(response); // Example: Log the response
        // Perform any necessary updates on the page
      },
      error: function(xhr, status, error) {
        console.log(error); // Log any AJAX errors
      }
    });
  }
  
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('change-status')) {
      var memberID = event.target.dataset.memberId;
      var newStatus = event.target.dataset.newStatus;
      changeStatus(memberID, newStatus);
    }
  });

function changeCStatus(memberID, newStatus) {
    $.ajax({
      type: "POST",
      url: "update_cstatus.php",
      data: {
        memberID: memberID,
        newStatus: newStatus
      },
      success: function(response) {
        // Handle the response from the server
        console.log(response); // Example: Log the response
        // Perform any necessary updates on the page
      },
      error: function(xhr, status, error) {
        console.log(error); // Log any AJAX errors
      }
    });
  }
  
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('change-status')) {
      var memberID = event.target.dataset.memberId;
      var newStatus = event.target.dataset.newStatus;
      changeStatus(memberID, newStatus);
    }
  });
  