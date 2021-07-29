// TRANSFER
const transferFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from transfer money form
  const transferFrom = document.querySelector(".transferFrom").value.trim();
  //console.log("transfer from", transferFrom);
  const transferTo = document.querySelector(".transferTo").value.trim();
  //console.log("transfer to", transferTo);
  const transferAmount = document.querySelector(".transferAmt").value.trim();
  //console.log("transfer amt", transferAmount);
  const transferComment = document
    .querySelector(".transferComment")
    .value.trim();
  //console.log("transfer cmt", transferComment);

  // Send POST request to API endpoint if required fields are filled out
  if (transferFrom && transferTo && transferAmount) {
    //NOT SURE ABOUT ROUTE AND PUT vs POST HERE (seems like put would completely override, i think want post to send the info and let backend manipulate it)
    const response = await fetch("/api/transfermoney", {
      method: "POST",
      body: JSON.stringify({
        transferFrom,
        transferTo,
        transferAmount,
        transferComment,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // if response goes through correctly, redirect browser to the dashboard page
    if (response.ok) {
      document.location.assign("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".transferBtn")
  .addEventListener("click", transferFormHandler);
