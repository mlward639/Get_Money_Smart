// If click on the Deposit Money button, go to the /deposit URL
function depositURL() {
  console.log('deposit!!')
  document.location.assign('/transaction/depositmoney');
}
// If click on the Transfer Money button, go to the /transfer URL
function transferURL() {
  document.location.assign('/transfermoney');
}
function chargeCardURL() {
  document.location.assign('/chargecard ');
}
// If click Clear Transaction History, clear the history by going to /clear URL
function clearURL() {
  document.location.assign('/clear');
}

window.onload = function(){ 
let deposit = document.getElementById('depositButton')
deposit.addEventListener('click', depositURL);
}

document.querySelector('#transferButton').addEventListener('click', transferURL);
// If click on the Make Payment button, go to the /transfer URL
document.querySelector('#makePayment').addEventListener('click', transferURL);
// If click on the Charge Card button, go to the Charge Card page
document.querySelector('.chargeCard').addEventListener('click', chargeCardURL);
document.querySelector('.clearBtn').addEventListener('click', clearURL); 
// WHY WONT THIS QUERY SELECTOR WORK! ONLY WORKS WITH ONCLICK=CLEARURL IN THE HTML FILE
