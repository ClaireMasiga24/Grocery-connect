const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const strengthIndicator = document.getElementById('strength-indicator');
const passwordMatch = document.getElementById('password-match');

// Password strength check
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const strength = checkPasswordStrength(password);
    strengthIndicator.textContent = `Password Strength: ${strength}`;
});

// Password matching check
confirmPasswordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    if (password === confirmPassword) {
        passwordMatch.textContent = 'Passwords match!';
        passwordMatch.classList.add('valid');
        passwordMatch.classList.remove('invalid');
    } else {
        passwordMatch.textContent = 'Passwords do not match!';
        passwordMatch.classList.remove('valid');
        passwordMatch.classList.add('invalid');
    }
});

// Function to check password strength
function checkPasswordStrength(password) {
    let strength = 'Weak';
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;

    if (strongRegex.test(password)) {
        strength = 'Strong';
    } else if (mediumRegex.test(password)) {
        strength = 'Medium';
    }
    return strength;
}
