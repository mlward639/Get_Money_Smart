const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const firstName = document.querySelector('#firstName-signup').value.trim();
    const lastName = document.querySelector('#lastName-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to sign up');
      }
  };
  
  window.onload = function () { 
  let signup = document.getElementById('signup-form');
  signup.addEventListener('click', signupFormHandler);
  }