// GET CREDIT HISTORY
// fetch call to get /history
// event listener to button on dashboards

const { restore } = require('../../models/User'); ????

const creditHistoryHandler = async (event) => {
  // Send GET request to API endpoint
  const response = await fetch('/api/ 
  //??? 
  // /api/transaction/history'
  // or api/dashboard
  // or charge card???
  , {
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
  .querySelector('#historyModalLabel')
  .addEventListener('click', creditHistoryHandler);

