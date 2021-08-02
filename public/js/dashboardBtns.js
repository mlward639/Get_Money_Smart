// If click on the Deposit Money button, go to the /deposit URL
function depositURL() {
  console.log('deposit!!');
  document.location.assign('/api/transaction/depositmoney');
}
// If click on the Transfer Money button, go to the /transfer URL
function transferURL() {
  document.location.assign('/api/transaction/transfermoney');
}
function chargeCardURL() {
  document.location.assign('/api/transaction/chargecard ');
}

const delButtonHandler = async (event) => {
  const response = await fetch('/api/transaction/clear', {
    method: 'DELETE',
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete transaction history');
  }
};

window.onload = function () {
  let deposit = document.getElementById('depositButton');
  deposit.addEventListener('click', depositURL);
};

document
  .querySelector('#transferButton')
  .addEventListener('click', transferURL);
// If click on the Make Payment button, go to the /transfer URL
document.querySelector('#makePayment').addEventListener('click', transferURL);
// If click on the Charge Card button, go to the Charge Card page
document.querySelector('#chargeCard').addEventListener('click', chargeCardURL);
