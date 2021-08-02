// DEPOSIT
const depositFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from deposit money form
  const depositFrom = document.querySelector('.depositFrom').value.trim();
  let depositTo = document.querySelector('.depositTo').value.trim().split('(');
  depositTo = depositTo[0].trim();
  const depositAmount = document.querySelector('.depositAmt').value.trim();
  const depositComment = document.querySelector('.depositComment').value.trim();

  // Send POST request to API endpoint if required fields are filled out
  if (depositFrom && depositTo && depositAmount) {
    //NOT SURE ABOUT ROUTE AND PUT vs POST HERE (seems like put would completely override, i think want post to send the info and let backend manipulate it)
    const response = await fetch('/api/transaction/depositmoney', {
      method: 'PUT',
      body: JSON.stringify({
        depositFrom,
        depositTo,
        depositAmount,
        depositComment,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    // if response goes through correctly, display their transaction, then redirect browser to the dashboard page
    if (response.ok) {
      let comment = '';
      if (depositComment) {
        comment = `Comment: ${depositComment}`;
      } else {
        comment = 'No comment entered.';
      }
      alert(`Congrats! You deposited $${depositAmount} from ${depositFrom} to ${depositTo}.
      ${comment}`);
      document.location.assign('/dashboard');
    } else {
      alert(response.statusText);
    }
  } else {
    errorMessage();
  }
};

document
  .querySelector('.depositBtn')
  .addEventListener('click', depositFormHandler);

// error handling
function errorMessage() {
  var error = document.getElementById('error');
  error.textContent = "* Please fill in 'From', 'To', and 'Amount'";
}

// close the Deposit page and return to dashboard
function closeDeposit() {
  document.location.assign('/dashboard');
}
