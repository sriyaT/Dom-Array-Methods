const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch Random User & Money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  console.log(data);

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// Double Everyone's Money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}

// Add new obj to data array

function addData(obj) {
  data.push(obj);

  updateDom();
}

// Sort Users By Richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDom();
}

// Fiter only millionaires
function showMillionaire() {
  data = data.filter((user) => user.money > 1000000);
  updateDom();
}

// Calculate Wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => acc + user.money, 0);

  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(
    wealth
  )}</strong> </h3>`;
  main.appendChild(wealthElement);
}

// Update DOM

function updateDom(provideData = data) {
  //clear main div
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  provideData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong> ${item.name} </strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money

function formatMoney(number) {
  return '₹' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Even Listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionaires.addEventListener('click', showMillionaire);
calculateWealthBtn.addEventListener('click', calculateWealth);
