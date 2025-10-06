const inventarisDummy = [
  { id: 1, name: "Infus Set", category: "Alat Medis", stock: 50 },
  { id: 2, name: "Kursi Roda", category: "Fasilitas", stock: 10 },
  { id: 3, name: "Masker Bedah", category: "Alat Medis", stock: 200 },
  { id: 4, name: "Termometer", category: "Alat Medis", stock: 30 },
  { id: 5, name: "Stetoskop", category: "Alat Medis", stock: 15 }
];

function getInventaris() {
  const data = localStorage.getItem("inventarisMedis");
  if (data) {
    return JSON.parse(data);
  } else {
    localStorage.setItem("inventarisMedis", JSON.stringify(inventarisDummy));
    return inventarisDummy;
  }
}

function saveInventaris(data) {
  localStorage.setItem("inventarisMedis", JSON.stringify(data));
}


function renderInventarisTable(filter = "") {
  const tbody = document.getElementById("inventory-table-body");
  let data = getInventaris();

  if (filter) {
    data = data.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
  }

  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Tidak ada data inventaris yang cocok.</td></tr>';
    return;
  }

  tbody.innerHTML = data.map(item => {
    const status = item.stock > 0 ? 'Tersedia' : 'Habis';
    const statusClass = item.stock > 0 ? 'status-tersedia' : 'status-habis'; // Anda bisa tambahkan class ini di style.css
    return `
      <tr>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.stock}</td>
        <td><span class="status-badge ${statusClass}">${status}</span></td>
      </tr>
    `;
  }).join("");
}

function tambahItemInventaris() {
  const name = prompt("Masukkan nama item baru:");
  if (!name) return; 

  const category = prompt("Masukkan kategori item (e.g., Alat Medis, Fasilitas):");
  if (!category) return; 

  const stockInput = prompt("Masukkan jumlah stok awal:");
  if (stockInput === null) return; 

  const stock = parseInt(stockInput, 10);
  if (isNaN(stock) || stock < 0) {
    alert("Stok tidak valid! Harap masukkan angka positif.");
    return;
  }

  const inventaris = getInventaris();
  
  const newId = inventaris.length > 0 ? Math.max(...inventaris.map(item => item.id)) + 1 : 1;

  const newItem = { id: newId, name, category, stock };

  inventaris.push(newItem);
  saveInventaris(inventaris);

  renderInventarisTable();
  alert(`Item "${name}" berhasil ditambahkan!`);
}


window.addEventListener("DOMContentLoaded", () => {
  renderInventarisTable();

  document.getElementById("inventory-search").addEventListener("input", function() {
    renderInventarisTable(this.value);
  });

  document.getElementById("btn-tambah-inventaris").addEventListener("click", tambahItemInventaris);
});
