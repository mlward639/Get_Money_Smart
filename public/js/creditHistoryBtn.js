// GET CREDIT HISTORY
// fetch call to get /history
// event listener to button on dashboards

const { restore } = require('../../models/User');

const creditHistoryHandler = async (event) => {
  // Send GET request to API endpoint
  const response = await fetch('/api/transaction/history', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    let creditHistory = response.json();
  } else {
    console.log(error);
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
