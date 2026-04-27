function addShop() {
  let div = document.createElement("div");
  div.className = "shop";

  div.innerHTML = `
    <input type="text" placeholder="Shop Name" class="name">
    <input type="number" placeholder="Previous Reading" class="prev">
    <input type="number" placeholder="Current Reading" class="curr">
  `;

  document.getElementById("shops").appendChild(div);
}

function calculate() {

  let totalBill = Number(document.getElementById("totalBill").value);

  let names = document.getElementsByClassName("name");
  let prevs = document.getElementsByClassName("prev");
  let currs = document.getElementsByClassName("curr");

  let shops = [];
  let totalUnits = 0;

  // Step 1: Calculate units
  for (let i = 0; i < names.length; i++) {

    let name = names[i].value || `Shop ${i+1}`;
    let prev = Number(prevs[i].value);
    let curr = Number(currs[i].value);

    if (curr <= prev) {
      alert("Current reading must be greater than previous!");
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
  let output = `<h3>Result</h3>`;

  shops.forEach(shop => {
    let bill = (shop.units / totalUnits) * totalBill;
    output += `${shop.name} → ${shop.units} units = ₹${bill.toFixed(2)} <br>`;
  });

  output += `<br><b>Total Units:</b> ${totalUnits}`;

  document.getElementById("result").innerHTML = output;
}

function resetForm() {
  document.getElementById("totalBill").value = "";
  document.getElementById("shops").innerHTML = "";
  document.getElementById("result").innerHTML = "";

  // Add 2 default shops again
  addShop();
  addShop();
}

// Load default shops
window.onload = function() {
  addShop();
  addShop();
}