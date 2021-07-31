// LOGOUT fetch request
const logout = async () => {
  const response = await fetch("/api/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  // if successful, redirect to homepage
  if (response.ok) {
    document.location.assign("/");
  } else {
    alert(response.statusText);
  }
};

  const logoutBtn = document.getElementById("logout")
  logoutBtn.addEventListener("click", logout)
