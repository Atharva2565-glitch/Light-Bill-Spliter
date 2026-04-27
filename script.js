function addShop() {
  let div = document.createElement("div");
  div.className = "shop";

  let shopCount = document.querySelectorAll(".shop").length + 1;

  div.innerHTML = `
    <input type="text" placeholder="Shop ${shopCount} Name" class="name">
    <input type="number" placeholder="Previous Reading" class="prev" min="0">
    <input type="number" placeholder="Current Reading" class="curr" min="0">
  `;

  document.getElementById("shops").appendChild(div);
  updateShopCount();
}

function updateShopCount() {
  let count = document.querySelectorAll(".shop").length;
  let shopCountElement = document.querySelector(".shop-count");
  shopCountElement.textContent = count + " Shop" + (count !== 1 ? "s" : "");
}

function calculate() {
  let totalBill = Number(document.getElementById("totalBill").value);

  if (totalBill <= 0) {
    alert("Please enter a valid bill amount!");
    return;
  }

  let names = document.getElementsByClassName("name");
  let prevs = document.getElementsByClassName("prev");
  let currs = document.getElementsByClassName("curr");

  let shops = [];
  let totalUnits = 0;

  // Step 1: Calculate units
  for (let i = 0; i < names.length; i++) {
    let name = names[i].value.trim() || `Shop ${i+1}`;
    let prev = Number(prevs[i].value);
    let curr = Number(currs[i].value);

    if (isNaN(prev) || isNaN(curr)) {
      alert("Please enter valid readings!");
      return;
    }

    if (curr <= prev) {
      alert(`${name}: Current reading must be greater than previous!`);
      return;
    }

    let units = curr - prev;
    totalUnits += units;

    shops.push({ name, units });
  }

  if (totalUnits === 0) {
    alert("Total units cannot be zero!");
    return;
  }

  // Step 2: Apply formula
  let output = `<h3>📊 Bill Distribution</h3>`;
  let totalCalculated = 0;

  shops.forEach((shop, index) => {
    let bill = (shop.units / totalUnits) * totalBill;
    totalCalculated += bill;
    output += `<div class="result-item"><strong>${shop.name}</strong><br>Units: ${shop.units} | Amount: ₹${bill.toFixed(2)}</div>`;
  });

  output += `<div style="margin-top: 15px; padding: 10px; background: white; border-radius: 5px; border-left: 3px solid #667eea;">
    <strong>📈 Total Units:</strong> ${totalUnits}<br>
    <strong>💰 Total Bill:</strong> ₹${totalCalculated.toFixed(2)}
  </div>`;

  let resultDiv = document.getElementById("result");
  resultDiv.innerHTML = output;
  resultDiv.classList.add("show");
}

function resetForm() {
  document.getElementById("totalBill").value = "";
  document.getElementById("shops").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("result").classList.remove("show");

  // Add 1 default shop again
  addShop();
}

// Load default shop
window.onload = function() {
  addShop();
}