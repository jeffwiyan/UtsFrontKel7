// js/apotek.js
// CRUD & interaktif resep apotek dengan dummy data, localStorage, dan update UI

// Dummy data pasien dan obat
const apotekPatients = [
  { id: 1, name: "Budi Santoso" },
  { id: 2, name: "Siti Aminah" },
  { id: 3, name: "Agus Wijaya" }
];
const apotekDrugs = [
  { id: 1, name: "Paracetamol", price: 5000 },
  { id: 2, name: "Amoxicillin", price: 8000 },
  { id: 3, name: "Vitamin C", price: 3000 }
];

// State resep sementara
let currentPrescription = [];
let selectedPatient = null;

function renderPatientDropdown() {
  const select = document.getElementById("pharmacy-patient");
  select.innerHTML = '<option value="">Pilih Pasien</option>' +
    apotekPatients.map(p => `<option value="${p.id}">${p.name}</option>`).join("");
}

function renderDrugDropdown() {
  const select = document.getElementById("pharmacy-drug");
  select.innerHTML = '<option value="">Pilih Obat</option>' +
    apotekDrugs.map(d => `<option value="${d.id}">${d.name}</option>`).join("");
}

function renderPrescriptionList() {
  const list = document.getElementById("prescription-list");
  if (currentPrescription.length === 0) {
    list.innerHTML = '<li>Belum ada obat ditambahkan</li>';
  } else {
    list.innerHTML = currentPrescription.map((item, idx) =>
      `<li>${item.name} x${item.qty} <span class='price'>Rp ${item.price * item.qty}</span> <button class='btn btn-danger btn-xs' onclick='removeDrug(${idx})'><i class="fa fa-trash"></i></button></li>`
    ).join("");
  }
  updateTotal();
}

function updateTotal() {
  const total = currentPrescription.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById("prescription-total").textContent = `Rp ${total}`;
  document.getElementById("btn-save-prescription").disabled = currentPrescription.length === 0 || !selectedPatient;
}

function removeDrug(idx) {
  currentPrescription.splice(idx, 1);
  renderPrescriptionList();
}

function resetPrescription() {
  currentPrescription = [];
  renderPrescriptionList();
  document.getElementById("prescription-patient-name").textContent = "...";
  document.getElementById("pharmacy-patient").value = "";
  selectedPatient = null;
  updateTotal();
}

// Event listeners
window.addEventListener("DOMContentLoaded", () => {
  renderPatientDropdown();
  renderDrugDropdown();
  renderPrescriptionList();

  document.getElementById("pharmacy-patient").addEventListener("change", function() {
    const id = parseInt(this.value);
    selectedPatient = apotekPatients.find(p => p.id === id) || null;
    document.getElementById("prescription-patient-name").textContent = selectedPatient ? selectedPatient.name : "...";
    updateTotal();
  });

  document.getElementById("btn-add-drug").addEventListener("click", function() {
    const drugId = parseInt(document.getElementById("pharmacy-drug").value);
    const qty = parseInt(document.getElementById("pharmacy-qty").value);
    if (!drugId || !qty) return;
    const drug = apotekDrugs.find(d => d.id === drugId);
    if (!drug) return;
    // Cek jika sudah ada, tambahkan qty
    const exist = currentPrescription.find(item => item.id === drugId);
    if (exist) {
      exist.qty += qty;
    } else {
      currentPrescription.push({ ...drug, qty });
    }
    renderPrescriptionList();
  });

  document.getElementById("btn-save-prescription").addEventListener("click", function() {
    if (!selectedPatient || currentPrescription.length === 0) return;
    // Simpan ke localStorage (dummy)
    const allPrescriptions = JSON.parse(localStorage.getItem("apotekPrescriptions") || "[]");
    allPrescriptions.push({
      patient: selectedPatient,
      items: currentPrescription,
      date: new Date().toISOString()
    });
    localStorage.setItem("apotekPrescriptions", JSON.stringify(allPrescriptions));
    alert("Resep berhasil disimpan dan dikirim ke kasir!");
    resetPrescription();
  });
});

// Expose removeDrug to global
window.removeDrug = removeDrug;

