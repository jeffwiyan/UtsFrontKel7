// js/stok-obat.js
// CRUD & interaktif stok obat dengan dummy data, localStorage, dan update UI

const stokObatDummy = [
  { id: 1, name: "Paracetamol", stock: 120, price: 5000 },
  { id: 2, name: "Amoxicillin", stock: 80, price: 8000 },
  { id: 3, name: "Vitamin C", stock: 200, price: 3000 },
  { id: 4, name: "Ibuprofen", stock: 60, price: 7000 },
  { id: 5, name: "Antasida", stock: 40, price: 4000 }
];

function getStokObat() {
  return JSON.parse(localStorage.getItem("stokObat")) || stokObatDummy;
}

function saveStokObat(data) {
  localStorage.setItem("stokObat", JSON.stringify(data));
}

function renderStokObatTable(filter = "") {
  const tbody = document.getElementById("drug-stock-body");
  let data = getStokObat();
  if (filter) {
    data = data.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
  }
  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4">Tidak ada data obat</td></tr>';
    return;
  }
  tbody.innerHTML = data.map(item =>
    `<tr><td>${item.name}</td><td>${item.stock}</td><td>Rp ${item.price}</td><td>${item.stock > 0 ? 'Tersedia' : 'Habis'}</td></tr>`
  ).join("");
}

window.addEventListener("DOMContentLoaded", () => {
  renderStokObatTable();
  document.getElementById("drug-stock-search").addEventListener("input", function() {
    renderStokObatTable(this.value);
  });
});

