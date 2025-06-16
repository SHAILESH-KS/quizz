const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

form.addEventListener("submit", (e) => {
    let errors = [];
    let isSignup = firstname_input !== null; // Check if it's a signup form

    if (isSignup) {
        errors = getSignupFormErrors(
            firstname_input.value.trim(),
            email_input.value.trim(),
            password_input.value.trim(),
            repeat_password_input.value.trim()
        );
    } else {
        errors = getLoginFormErrors(email_input.value.trim(), password_input.value.trim());
    }

    if (errors.length > 0) {
        e.preventDefault(); // Prevent form submission if there are errors
        console.log(errors);
        error_message.innerText = errors.join(". ");
    } else {
        e.preventDefault(); // Prevent default form submission to allow redirection

        if (isSignup) {
            const firstname = firstname_input.value.trim();
            const email = email_input.value.trim();
            const password = password_input.value.trim();

            const users = JSON.parse(localStorage.getItem("users")) || [];
            users.push({ name: firstname, email, password, score: 0 }); // Default score is 0
            localStorage.setItem("users", JSON.stringify(users));

            alert("Signup successful! Redirecting to login...");
            window.location.href = "login.html";
        } else {
            const email = email_input.value.trim();
            const password = password_input.value.trim();

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find((u) => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem("currentUser", JSON.stringify(user)); // Save user session
                alert("Login successful! Redirecting...");
                window.location.href = "afterlogin.html";
            } else {
                alert("Invalid email or password.");
            }
        }
    }
});


function getSignupFormErrors(firstname, email, password, repeatPassword) {
    let errors = [];

    if (!firstname) {
        errors.push("Firstname is required");
        firstname_input.parentElement.classList.add('incorrect');
    } else {
        firstname_input.parentElement.classList.remove('incorrect');
    }

    if (!email) {
        errors.push("Email is required");
        email_input.parentElement.classList.add('incorrect');
    } else {
        email_input.parentElement.classList.remove('incorrect');
    }

    if (!password) {
        errors.push("Password is required");
        password_input.parentElement.classList.add('incorrect');
    } else if (password.length < 8) {
        errors.push("Password must have at least 8 characters");
        password_input.parentElement.classList.add('incorrect');
    } else {
        password_input.parentElement.classList.remove('incorrect');
    }

    if (password !== repeatPassword) {
        errors.push("Passwords do not match");
        repeat_password_input.parentElement.classList.add('incorrect');
    } else {
        repeat_password_input.parentElement.classList.remove('incorrect');
    }

    return errors;
}

function getLoginFormErrors(email, password) {
    let errors = [];

    if (!email) {
        errors.push("Email is required");
        email_input.parentElement.classList.add('incorrect');
    } else {
        email_input.parentElement.classList.remove('incorrect');
    }

    if (!password) {
        errors.push("Password is required");
        password_input.parentElement.classList.add('incorrect');
    } else {
        password_input.parentElement.classList.remove('incorrect');
    }

    return errors;
}

// Remove 'incorrect' class on input change
const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input !== null);
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
        }
    });
});
