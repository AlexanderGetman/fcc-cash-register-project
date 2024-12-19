let price = 19.5;
let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];

const currencyNames = [
  'Pennies',
  'Nickels',
  'Dimes',
  'Quarters',
  'Ones',
  'Fives',
  'Tens',
  'Twenties',
  'Hundreds'
]

const currencyAmount = [
  ['PENNY', 0.01],
  ['NICKEL', 0.05],
  ['DIME', 0.1],
  ['QUARTER', 0.25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100]
]


const changeDueElement = document.getElementById("change-due");
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeFund = document.getElementById("change-fund");
const itemSpanElement = document.getElementById("item-price-span");


itemSpanElement.textContent =`$${price}`;

const updateDrawerDisplay = () => {
  changeFund.innerHTML = "";
  cid.forEach((unit, index) => {
    changeFund.innerHTML += `<li>${currencyNames[index]}: $${unit[1]}</li>`;
  });
}

updateDrawerDisplay();

purchaseBtn.addEventListener("click", () => {
  const cash = Number(cashInput.value);
  let changeAmount = [];    

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (cash === price) {
    changeDueElement.textContent = "No change due - customer paid with exact cash";
    return;
  }

  let changeFrom = cash - price;

  for (let i = cid.length - 1; i >= 0; i--) {    
    if (changeFrom > currencyAmount[i][1] && changeFrom > 0) {      

      if (changeFrom < cid[i][1]) {
        let changeSum = Math.floor(changeFrom / currencyAmount[i][1]) * currencyAmount[i][1];
        changeAmount.push([currencyAmount[i][0], changeSum]);
        cid[i][1] = cid[i][1] - changeSum;
        changeFrom = Number((changeFrom - changeSum).toFixed(2));
      } else if (changeFrom >= cid[i][1] && cid[i][1] > 0) {
        let changeSum = cid[i][1];
        changeAmount.push([currencyAmount[i][0], changeSum]);
        cid[i][1] = 0;
        changeFrom = Number((changeFrom - changeSum).toFixed(2));
      }
    }
  }

  updateDrawerDisplay();
  let totalAmountInDrawer = (cid.reduce((sum, coin) => sum + coin[1], 0)).toFixed(2);
  
  if (changeFrom !== 0) {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  } else if (totalAmountInDrawer == 0) {
    changeDueElement.textContent = `Status: CLOSED ${
      changeAmount.map(cid => cid[0] + ": " + "$" + cid[1]).join(" ")
    }`;
    return;
  }

  changeDueElement.textContent = `Status: OPEN ${
    changeAmount.map(cid => cid[0] + ": " + "$" + cid[1]).join(" ")
  }`;
  return;
})