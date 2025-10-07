// Dummy data obat untuk stok-obat, apotek, inventaris
const dummyObat = [
  { id: 1, nama: 'Paracetamol 500mg' },
  { id: 2, nama: 'Amoxicillin 500mg' },
  { id: 3, nama: 'Ibuprofen 200mg' },
  { id: 4, nama: 'CTM 4mg' },
  { id: 5, nama: 'Omeprazole 20mg' }
];

// Stok Obat: isi select jika ada
$(document).ready(function() {
  const $selectStok = $('#stok-obat-select');
  if ($selectStok && $selectStok.length) {
    $selectStok.empty();
    $selectStok.append('<option value="">-- Pilih Obat --</option>');
    dummyObat.forEach(o => $selectStok.append(`<option value="${o.id}">${o.nama}</option>`));
  }

  // Apotek: isi select obat
  const $selectApotek = $('#pharmacy-drug');
  if ($selectApotek && $selectApotek.length) {
    $selectApotek.empty();
    $selectApotek.append('<option value="">-- Pilih Obat --</option>');
    dummyObat.forEach(o => $selectApotek.append(`<option value="${o.id}">${o.nama}</option>`));
  }

  // Inventaris: isi select barang jika ada
  const $selectInventaris = $('#inventaris-barang-select');
  if ($selectInventaris && $selectInventaris.length) {
    $selectInventaris.empty();
    $selectInventaris.append('<option value="">-- Pilih Barang --</option>');
    dummyObat.forEach(o => $selectInventaris.append(`<option value="${o.id}">${o.nama}</option>`));
  }
});

