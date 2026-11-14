
// ==========================================
// STUDENTHUB - PRACTICAL 5
// Registration Form Validation
// ==========================================

const form = document.getElementById("registrationForm");

// Form fields
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const dob = document.getElementById("dob");
const gender = document.getElementById("gender");
const studentid = document.getElementById("studentid");
const course = document.getElementById("course");
const year = document.getElementById("year");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const terms = document.getElementById("terms");

// Password strength elements
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");


// Display error message
function showError(field, errorId, message) {

    const errorElement = document.getElementById(errorId);

    errorElement.textContent = message;
    field.setAttribute("aria-invalid", "true");

}


// Clear error message
function clearError(field, errorId) {

    const errorElement = document.getElementById(errorId);

    errorElement.textContent = "";
    field.removeAttribute("aria-invalid");

}


// 1. NAME VALIDATION

function validateName() {

    const namePattern = /^[A-Za-z][A-Za-z .'-]{1,49}$/;

    if (fullname.value.trim() === "") {
        showError(fullname, "nameError", "Name is required.");
        return false;
    }

    if (!namePattern.test(fullname.value.trim())) {
        showError(fullname, "nameError",
            "Enter a valid name using letters only.");
        return false;
    }

    clearError(fullname, "nameError");
    return true;

}


// 2. EMAIL VALIDATION

function validateEmail() {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (email.value.trim() === "") {
        showError(email, "emailError", "Email is required.");
        return false;
    }

    if (!emailPattern.test(email.value.trim())) {
        showError(email, "emailError",
            "Enter a valid email address.");
        return false;
    }

    clearError(email, "emailError");
    return true;

}


// 3. MOBILE NUMBER VALIDATION

function validateMobile() {

    const mobilePattern = /^[6-9][0-9]{9}$/;

    if (mobile.value.trim() === "") {
        showError(mobile, "mobileError",
            "Mobile number is required.");
        return false;
    }

    if (!mobilePattern.test(mobile.value.trim())) {
        showError(mobile, "mobileError",
            "Enter a valid 10-digit Indian mobile number.");
        return false;
    }

    clearError(mobile, "mobileError");
    return true;

}


// 4. DATE OF BIRTH VALIDATION

function validateDOB() {

    if (dob.value === "") {
        showError(dob, "dobError",
            "Please select your date of birth.");
        return false;
    }

    const selectedDate = new Date(dob.value + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
        showError(dob, "dobError",
            "Date of birth cannot be in the future.");
        return false;
    }

    clearError(dob, "dobError");
    return true;

}


// 5. GENDER VALIDATION

function validateGender() {

    if (gender.value === "") {
        showError(gender, "genderError",
            "Please select your gender.");
        return false;
    }

    clearError(gender, "genderError");
    return true;

}


// 6. STUDENT ID VALIDATION

function validateStudentID() {

    if (studentid.value.trim() === "") {
        showError(studentid, "studentidError",
            "Student ID is required.");
        return false;
    }

    clearError(studentid, "studentidError");
    return true;

}


// 7. COURSE VALIDATION

function validateCourse() {

    if (course.value === "") {
        showError(course, "courseError",
            "Please select your course.");
        return false;
    }

    clearError(course, "courseError");
    return true;

}


// 8. ACADEMIC YEAR VALIDATION

function validateYear() {

    if (year.value === "") {
        showError(year, "yearError",
            "Please select your academic year.");
        return false;
    }

    clearError(year, "yearError");
    return true;

}


// 9. PASSWORD STRENGTH CHECKER

function updatePasswordStrength() {

    const value = password.value;

    let strength = 0;

    if (value.length >= 8) {
        strength++;
    }

    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) {
        strength++;
    }

    if (/[0-9]/.test(value)) {
        strength++;
    }

    if (/[^A-Za-z0-9]/.test(value)) {
        strength++;
    }

    strengthBar.value = strength;

    const messages = [
        "Not entered",
        "Weak",
        "Fair",
        "Good",
        "Strong"
    ];

    strengthText.textContent = messages[strength];

}


// 10. PASSWORD VALIDATION

function validatePassword() {

    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

    if (password.value === "") {
        showError(password, "passwordError",
            "Password is required.");
        return false;
    }

    if (!passwordPattern.test(password.value)) {
        showError(password, "passwordError",
            "Use at least 8 characters with uppercase, lowercase, number and special character.");
        return false;
    }

    clearError(password, "passwordError");
    return true;

}


// 11. CONFIRM PASSWORD VALIDATION

function validateConfirmPassword() {

    if (confirmPassword.value === "") {
        showError(confirmPassword, "confirmError",
            "Please confirm your password.");
        return false;
    }

    if (confirmPassword.value !== password.value) {
        showError(confirmPassword, "confirmError",
            "Passwords do not match.");
        return false;
    }

    clearError(confirmPassword, "confirmError");
    return true;

}


// 12. TERMS AND CONDITIONS VALIDATION

function validateTerms() {

    if (!terms.checked) {
        terms.setAttribute("aria-invalid", "true");

        document.getElementById("termsError").textContent =
            "You must accept the terms and conditions.";

        return false;
    }

    terms.removeAttribute("aria-invalid");

    document.getElementById("termsError").textContent = "";

    return true;

}


// REAL-TIME VALIDATION

fullname.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
mobile.addEventListener("input", validateMobile);
dob.addEventListener("change", validateDOB);
gender.addEventListener("change", validateGender);
studentid.addEventListener("input", validateStudentID);
course.addEventListener("change", validateCourse);
year.addEventListener("change", validateYear);

password.addEventListener("input", function() {

    updatePasswordStrength();
    validatePassword();

    if (confirmPassword.value !== "") {
        validateConfirmPassword();
    }

});

confirmPassword.addEventListener("input", validateConfirmPassword);
terms.addEventListener("change", validateTerms);


// FORM SUBMISSION

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const validations = [
        validateName(),
        validateEmail(),
        validateMobile(),
        validateDOB(),
        validateGender(),
        validateStudentID(),
        validateCourse(),
        validateYear(),
        validatePassword(),
        validateConfirmPassword(),
        validateTerms()
    ];

    const isFormValid = validations.every(Boolean);

    if (isFormValid) {

        document.getElementById("formMessage").textContent =
            "Registration form validated successfully!";

        alert("Registration Successful!");

    } else {

        document.getElementById("formMessage").textContent =
            "Please correct the errors before submitting.";

        const firstInvalidField =
            form.querySelector('[aria-invalid="true"]');

        if (firstInvalidField) {
            firstInvalidField.focus();
        }

    }

});


// CLEAR FORM

form.addEventListener("reset", function() {

    setTimeout(function() {

        const errorMessages =
            form.querySelectorAll(".error-message");

        errorMessages.forEach(function(error) {
            error.textContent = "";
        });

        form.querySelectorAll("[aria-invalid]").forEach(function(field) {
            field.removeAttribute("aria-invalid");
        });

        strengthBar.value = 0;
        strengthText.textContent = "Not entered";

        document.getElementById("formMessage").textContent = "";

    }, 0);

});


console.log("StudentHub Practical 5 validation loaded successfully.");
