/*
		Your Name: <Minjeong Kim
		Last Modified Date: <06/13/2026>
		File: event_registration.js
		File Description: <Enter a brief paragraph to describe the purpose of this file>
*/

// Set the minimum and maximum number of tickets able to be purchased
var minTickets = 1;
var maxTickets = 3;
// Set variables for the ticket cost
var costPerTicket = 5.00;
var ticketSurcharge = 0.50;

/*** YOUR CODE STARTS BELOW HERE ***/
// Set timer to 10 minutes (600 seconds)
var timeLeft = 600;

// Start countdown timer
var timerInterval = setInterval(updateTimer, 1000);

// Function to update countdown timer
function updateTimer()
{
    // Decrease timer by one second
    timeLeft--;

    // Calculate minutes and seconds
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;

    // Add leading zero if needed
    if (seconds < 10)
    {
        seconds = "0" + seconds;
    }

    // Display timer
    document.getElementById("timer").innerHTML = minutes + ":" + seconds;

    // Timer expired
    if (timeLeft <= 0)
    {
        clearInterval(timerInterval);

        alert("Your transaction has expired.");

        location.href = location.href;
    }
}

// Function to change field color
function changeFieldColor(fieldID, error)
{
    if (error)
    {
        document.getElementById(fieldID).style.backgroundColor = "#ffcccc";
    }
    else
    {
        document.getElementById(fieldID).style.backgroundColor = "#efefef";
    }
}

// Function to calculate ticket total
function calculateTotal()
{
    // Get number of tickets
    var tickets = document.getElementById("numTickets").value;

    // Validate number of tickets
    if (isNaN(tickets) || tickets < minTickets || tickets > maxTickets)
    {
        document.getElementById("msgTickets").innerHTML =
            " Please enter a number between " + minTickets + " and " + maxTickets + ".";

        changeFieldColor("numTickets", true);

        document.getElementById("totalCost").value = "$0.00";

        document.getElementById("contactInformation").style.display = "none";

        return;
    }

    // Clear error
    document.getElementById("msgTickets").innerHTML = "";

    changeFieldColor("numTickets", false);

    // Calculate total
    var total = tickets * (costPerTicket + ticketSurcharge);

    // Display total
    document.getElementById("totalCost").value = "$" + total.toFixed(2);

    // Show contact information section
    document.getElementById("contactInformation").style.display = "block";
}

// Function to complete purchase
function completePurchase()
{
    var customerName = document.getElementById("name").value;
    var customerEmail = document.getElementById("email").value;

    var hasErrors = false;

    // Validate name
    if (customerName.trim() == "")
    {
        document.getElementById("msgname").innerHTML = " Required";
        changeFieldColor("name", true);
        hasErrors = true;
    }
    else
    {
        document.getElementById("msgname").innerHTML = "";
        changeFieldColor("name", false);
    }

   // Validate email
	if (customerEmail.trim() == "" ||
    	customerEmail.indexOf("@") == -1 ||
    	customerEmail.indexOf(".") == -1)
	{
    	document.getElementById("msgemail").innerHTML =
        	" Enter a valid email address";

    	changeFieldColor("email", true);

    	hasErrors = true;
	}
	else
	{
    	document.getElementById("msgemail").innerHTML = "";

    	changeFieldColor("email", false);
	}

    // Complete purchase
    if (!hasErrors)
    {
        clearInterval(timerInterval);

        alert(
            "Thank you for your purchase!\n\n" +
            "Total Purchase: " + document.getElementById("totalCost").value
        );
    }
}