// WIRE MONEY
const wireFormHandler = async (event) => {
    event.preventDefault();
    // Collect values from wire money form
    let wireFrom = document
      .querySelector('.wireFrom')
      .value.trim()
      .split('(');
    wireFrom = wireFrom[0].trim();
    const wireToName = document.querySelector('.wireTo-name').value;
    const wireAmount = document.querySelector('.wireAmt').value.trim();
    const wireComment = document.querySelector('.wireComment').value.trim();
    const wireToAccount = document
      .querySelector('.wireTo-account')
      .value.trim();
    console.log('loggggg', wireFrom)
    console.log('loggggg', wireToName)
    console.log('loggggg', wireAmount)
    console.log('loggggg', wireToAccount)
    // Send POST request to API endpoint if required fields are filled out
    if (
        wireFrom &&
        wireToName &&
        wireAmount &&
        wireToAccount
    ) {
      const response = await fetch('/api/transaction/wiremoney', {
        method: 'POST',
        body: JSON.stringify({
            wireFrom,
            wireToName,
            wireAmount,
            wireToAccount,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      // if response goes through correctly, display their transaction and then redirect browser to the dashboard page
      if (response.ok) {
        let comment = '';
        if (wireComment) {
          comment = `Comment: ${wireComment}`;
        } else {
          comment = 'No comment entered.';
        }
        alert(`Congrats! You deposited $${wireAmount} from ${wireFrom} to ${wireToAccount}.
        ${comment}`);
        document.location.assign('/dashboard');
      } else {
        console.log('responsive test', response)
        alert('Please review your transaction balance', response.msg);
      }
    } else if (!wireFrom || !wireToName || !wireAmount || !wireToAccount) {
      errorMessage();
    } else {
        alert('Please Check Your Input')
    }
  };
  
  window.onload = function () { 
    let wire = document.querySelector('.wireBtn');
    wire.addEventListener('click', wireFormHandler);
    }
  
  // ERROR handling
  // From, To, and Amount are required fields
  function errorMessage() {
    var error = document.getElementById('error');
    error.textContent = "* Please fill in 'From', 'To', and 'Amount'";
  }
  
  
  // close the Transfer page and return to dashboard
  function closeWire() {
    document.location.assign('/dashboard');
  }
  