// TRANSFER
const transferFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from transfer money form
  let transferFrom = document
    .querySelector('.transferFrom')
    .value.trim()
    .split('(');
  transferFrom = transferFrom[0].trim();
  //console.log('transfer from', transferFrom);
  let transferTo = document
    .querySelector('.transferTo')
    .value.trim()
    .split('(');
  transferTo = transferTo[0].trim();
  //console.log('transfer to', transferTo);
  const transferAmount = document.querySelector('.transferAmt').value.trim();
  //console.log("transfer amt", transferAmount);
  const transferComment = document
    .querySelector('.transferComment')
    .value.trim();
  //console.log("transfer cmt", transferComment);

  // Send POST request to API endpoint if required fields are filled out
  if (
    transferFrom &&
    transferTo &&
    transferAmount &&
    transferFrom !== transferTo
  ) {
    //NOT SURE ABOUT ROUTE AND PUT vs POST HERE (seems like put would completely override, i think want post to send the info and let backend manipulate it)
    const response = await fetch('/api/transaction/transfermoney', {
      method: 'POST',
      body: JSON.stringify({
        transferFrom,
        transferTo,
        transferAmount,
        transferComment,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    // if response goes through correctly, display their transaction and then redirect browser to the dashboard page
    if (response.ok) {
      let comment = '';
      if (transferComment) {
        comment = `Comment: ${transferComment}`;
      } else {
        comment = 'No comment entered.';
      }
      alert(`Congrats! You deposited $${transferAmount} from ${transferFrom} to ${transferTo}.
      ${comment}`);
      document.location.assign('/dashboard');
    } else {
      alert(response.statusText);
    }
  } else if (!transferFrom || !transferTo || !transferAmount) {
    errorMessage();
  } else if (transferFrom === transferTo) {
    errorMessage2();
  }
};

document
  .querySelector('.transferBtn')
  .addEventListener('click', transferFormHandler);

// ERROR handling
// From, To, and Amount are required fields
function errorMessage() {
  var error = document.getElementById('error');
  error.textContent = "* Please fill in 'From', 'To', and 'Amount'";
}

// Must transfer to a different account
function errorMessage2() {
  var error = document.getElementById('error');
  error.textContent = "* 'From' and 'To' must be different accounts.";
}
