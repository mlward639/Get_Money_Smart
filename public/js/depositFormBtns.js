// DEPOSIT
const depositFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from deposit money form
  const depositFrom = document.querySelector('.depositFrom').value.trim();
  console.log('deposit from', depositFrom);
  const depositTo = document.querySelector('.depositTo').value.trim();
  console.log('deposit to', depositTo);
  const depositAmount = document.querySelector('.depositAmt').value.trim();
  console.log('deposit amt', depositAmount);
  const depositComment = document.querySelector('.depositComment').value.trim();
  console.log('deposit cmt', depositComment);

  // Send POST request to API endpoint if required fields are filled out
  if (depositFrom && depositTo && depositAmount) {
    //NOT SURE ABOUT ROUTE AND PUT vs POST HERE (seems like put would completely override, i think want post to send the info and let backend manipulate it)
    const response = await fetch('/api/depositmoney', {
      method: 'POST',
      body: JSON.stringify({
        depositFrom,
        depositTo,
        depositAmount,
        depositComment,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    // if response goes through correctly, redirect browser to the dashboard page
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
  }
};

document
  .querySelector('.depositBtn')
  .addEventListener('click', depositFormHandler);
