// If click on the Deposit Money button, go to the /deposit URL
function depositURL() {
  document.location.assign("/deposit");
};

document.querySelector(".depositMoney").addEventListener("click", depositURL);


// If click on the Transfer Money button, go to the /transfer URL
function transferURL() {
  document.location.assign("/transfermoney");
};

document.querySelector(".transferMoney").addEventListener("click", transferURL);

// If click on the Make Payment button, go to the /transfer URL
document.querySelector(".makePayment").addEventListener("click", transferURL);


// If click on the Charge Card button, go to the Charge Card page
function chargeCardURL() {
  document.location.assign("/chargecard ");
};

document.querySelector(".chargeCard").addEventListener("click", chargeCardURL);


