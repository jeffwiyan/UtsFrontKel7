// Isi dropdown pasien di pembayaran.html dengan dummy data
$(document).ready(function() {
  const pasien = [
    { id: 1, name: 'Budi Santoso' },
    { id: 2, name: 'Siti Aminah' },
    { id: 3, name: 'Agus Salim' },
    { id: 4, name: 'Dewi Lestari' }
  ];
  const $select = $('#patient-billing-select');
  if ($select.length) {
    $select.empty();
    $select.append('<option value="">-- Pilih Pasien --</option>');
    pasien.forEach(p => {
      $select.append(`<option value="${p.id}">${p.name}</option>`);
    });
  }
});

