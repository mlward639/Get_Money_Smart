// CHARGE FORM

// charge form handling
const chargeFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from charge money form
  let chargeFrom = document
    .querySelector('.chargeFrom')
    .value.trim()
    .split('(');
  chargeFrom = chargeFrom[0].trim();
  //console.log('charge from', chargeFrom);
  const chargeTo = document.querySelector('.chargeTo').value.trim();
  //console.log('charge to', chargeTo);
  const chargeAmount = document.querySelector('.chargeAmt').value.trim();
  //console.log('charge amt', chargeAmount);
  const chargeComment = document.querySelector('.chargeComment').value.trim();
  //console.log('charge cmt', chargeComment);

  // Send POST request to API endpoint if required fields are filled out
  if (chargeFrom && chargeTo && chargeAmount) {
    //NOT SURE ABOUT ROUTE AND PUT vs POST HERE (seems like put would completely override, i think want post to send the info and let backend manipulate it)
    const response = await fetch('/api/transaction/chargemoney', {
      method: 'PUT',
      body: JSON.stringify({
        chargeFrom,
        chargeTo,
        chargeAmount,
        chargeComment,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    // if response goes through correctly, dislpay their transaction and then redirect browser to the dashboard page
    if (response.ok) {
      let comment = '';
      if (chargeComment) {
        comment = `Comment: ${chargeComment}`;
      } else {
        comment = 'No comment entered.';
      }
      alert(`You charged $${chargeAmount} on your ${chargeFrom} at ${chargeTo}.
      ${comment}
      Be sure to pay of your credit card on time to avoid late penalties and interest accumulating.`);
      document.location.assign('/dashboard');
    } else {
      alert(response.statusText);
    }
  } else {
    errorMessage();
  }
};

document
  .querySelector('#chargeBtn')
  .addEventListener('click', chargeFormHandler);

// error handling
function errorMessage() {
  var error = document.getElementById('error');
  error.textContent =
    '*Please enter a valid Merchant Name and Amount (number).';
}
