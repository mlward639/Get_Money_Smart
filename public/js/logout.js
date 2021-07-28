// LOGOUT fetch request
const logout = async () => {
  const response = await fetch("/api/users/logout", {
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

document.querySelector("#logout").addEventListener("click", logout);
