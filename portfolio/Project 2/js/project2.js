// Registration Form Validation
// CMST 388 Project 2

const form = document.getElementById("registrationForm");
const errorDiv = document.getElementById("errorMessages");

// Remove default text when selected
document.getElementById("firstName").addEventListener("focus", function() {
    if(this.value === "Enter First Name"){
        this.value = "";
    }
});

document.getElementById("lastName").addEventListener("focus", function() {
    if(this.value === "Enter Last Name"){
        this.value = "";
    }
});

form.addEventListener("submit", function(event){

    let errors = [];

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value.trim();

    const areaCode = document.getElementById("areaCode").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();

    const email = document.getElementById("email").value.trim();
    const confirmEmail = document.getElementById("confirmEmail").value.trim();

    const comments = document.getElementById("comments").value;

    const alphaPattern = /^[A-Za-z]+$/;
    const cityPattern = /^[A-Za-z ]+$/;
    const addressPattern = /^[A-Za-z0-9\s]+$/;
    const zipPattern = /^\d{5}$/;
    const areaPattern = /^\d{3}$/;
    const phonePattern = /^\d{7}$/;

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // First Name
    if(firstName === "" || !alphaPattern.test(firstName)){
        errors.push("First Name must contain letters only.");
    }

    // Last Name
    if(lastName === "" || !alphaPattern.test(lastName)){
        errors.push("Last Name must contain letters only.");
    }

    // Address
    if(address === "" || !addressPattern.test(address)){
        errors.push("Enter a valid address.");
    }

    // City
    if(city === "" || !cityPattern.test(city)){
        errors.push("City must contain letters only.");
    }

    // State
    if(state === ""){
        errors.push("Please select a state.");
    }

    // Zip
    if(!zipPattern.test(zip)){
        errors.push("Zip Code must be 5 digits.");
    }

    // Area Code
    if(!areaPattern.test(areaCode)){
        errors.push("Area Code must be 3 digits.");
    }

    // Phone
    if(!phonePattern.test(phoneNumber)){
        errors.push("Phone Number must be 7 digits.");
    }

    // Email
    if(!emailPattern.test(email)){
        errors.push("You have entered an invalid e-mail address.");
    }

    // Confirm Email
    if(email !== confirmEmail){
        errors.push("Email addresses must match.");
    }

    // Meal Preference
    const mealSelected =
        document.querySelector('input[name="meal"]:checked');

    if(!mealSelected){
        errors.push("Please select a meal preference.");
    }

    // Contact Method
    const contacts =
        document.querySelectorAll('input[name="contact"]:checked');

    if(contacts.length < 2){
        errors.push("Please select at least two contact methods.");
    }

    // Comments
    if(comments.length > 250){
        errors.push("Comments cannot exceed 250 characters.");
    }

    if(errors.length > 0){

        event.preventDefault();

		errorDiv.style.display = "block";
        errorDiv.innerHTML = errors.join("<br>");

    } else {

		errorDiv.style.display = "none";
        errorDiv.innerHTML = "";

        alert("Form submitted successfully!");

        // Example email transmission
        window.location.href =
        "mailto:mkim110@student.umgc.edu?subject=Registration Form Submission";

    }
});

// Reset button
form.addEventListener("reset", function(){

    errorDiv.innerHTML = "";

});