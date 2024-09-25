document.addEventListener('DOMContentLoaded', () => {
  // Handle login form submission
  document.querySelector('#login-button').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default form submission

    let username = document.querySelector('#username').value.trim();
    let password = document.querySelector('#password').value.trim();
    let role = document.querySelector('#role').value;

    if (verifyLogin(username, password, role)) {
      // Redirects are handled within verifyLogin
    } else {
      alert('Invalid username, password, or role.');
    }
  });

  // Sign-Up button functionality
  document.querySelector('#signup-button').addEventListener('click', () => {
    window.location.href = '/signUp.html';
  });

  // Show Password functionality
  document.querySelector('#show-password').addEventListener('change', (event) => {
    const passwordInput = document.querySelector('#password');
    passwordInput.type = event.target.checked ? 'text' : 'password';
  });
});

// Function to verify login credentials and redirect based on role
function verifyLogin(username, password, role) {
  // Role-specific usernames
  const managerUsernames = ['managerSsali', 'managerNamakula'];
  const salesAgentUsernames = ['salesMubiru', 'salesAchieng'];
  const validPassword = 'Deathyhallows#!';

  if (password === validPassword) {
    if (role === 'manager' && managerUsernames.includes(username)) {
      window.location.href = "/manager.html"; // Redirect to Manager dashboard
      return true;
    } else if (role === 'sales_agent' && salesAgentUsernames.includes(username)) {
      window.location.href = "/salesAgents.html"; // Redirect to Sales Agent dashboard
      return true;
    } else {
      alert('Invalid username or role combination.');
    }
  } else {
    alert('Invalid password.');
  }
  return false;
}
