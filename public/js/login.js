const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Send a POST request to the API endpoint
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    // If successful, redirect the browser to the dashboard page
    document.location.replace('/dashboard');
    // res.render('dashboard');
  } else {
    alert('Failed to login');
  }
};



let login = document.getElementById('login-form')
login.addEventListener('click', loginFormHandler)
