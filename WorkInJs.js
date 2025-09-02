const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies"; 
const dropdowns = document.querySelectorAll(".dropdown select"); 

// fill dropdowns dynamically
for (let select of dropdowns) {
  for (let currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;

    // set default values
    if (select.name === "from" && currcode === "USD") {
      newoption.selected = true;
    } else if (select.name === "to" && currcode === "INR") {
      newoption.selected = true;
    }

    select.appendChild(newoption);
  }

  // add flag change on dropdown
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// function to update flag image dynamically
function updateFlag(element) {
  let currcode = element.value;
  let countryCode = countryList[currcode]; // e.g. INR -> IN
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

// conversion logic
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

btn.addEventListener("click", async (evt) => {
  evt.preventDefault(); // stop form submit refresh

  let amount = document.querySelector(".amount input").value;
  if (amount === "" || amount < 1) {
    amount = 1;
    document.querySelector(".amount input").value = "1";
  }

  // fetch exchange rate
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();

  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalAmount = (amount * rate).toFixed(2);

  msg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
