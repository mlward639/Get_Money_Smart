// LOGOUT fetch request
var logout = async () => {
  const response = await fetch('/api/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  // if successful, redirect to homepage
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

var logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', logout);
