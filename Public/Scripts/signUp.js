document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;

    function showStep(step) {
        document.querySelectorAll('.form-step').forEach((element) => {
            element.style.display = 'none';
        });
        document.getElementById(`step-${step}`).style.display = 'block';
    }

    function nextStep(step) {
        if (step === 2 && !validatePersonalInfo()) return;
        if (step === 3 && !validateAccountDetails()) return;
        currentStep = step;
        showStep(currentStep);
    }

    function prevStep(step) {
        currentStep = step;
        showStep(currentStep);
    }

    function validatePersonalInfo() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const branch = document.getElementById('branch').value.trim();
        if (!name || !email || !branch) {
            alert('Please fill out all personal information fields.');
            return false;
        }
        return true;
    }

    function validateAccountDetails() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return false;
        }
        if (!passwordPattern.test(password)) {
            alert('Password must be at least 6 characters long and contain both letters and numbers.');
            return false;
        }
        return true;
    }

    function togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const showPasswordCheckbox = document.getElementById('show-password');
        passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
        confirmPasswordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
    }

    document.getElementById('show-password').addEventListener('change', togglePasswordVisibility);

    document.querySelector('#signup-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Signup successful!');
        // Handle form submission here, e.g., send data to server
    });

    window.nextStep = nextStep;
    window.prevStep = prevStep;

    showStep(currentStep); // Show the first step initially
});
