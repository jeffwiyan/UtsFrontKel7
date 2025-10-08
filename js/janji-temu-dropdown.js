// Isi dropdown pasien & dokter di janji-temu.html dengan dummy data
$(document).ready(function() {
  // Dummy pasien
  const pasien = [
    { id: 1, name: 'Budi Santoso' },
    { id: 2, name: 'Siti Aminah' },
    { id: 3, name: 'Agus Salim' },
    { id: 4, name: 'Dewi Lestari' }
  ];
  const $selectPasien = $('#appointment-patient');
  if ($selectPasien.length) {
    $selectPasien.empty();
    $selectPasien.append('<option value="">-- Pilih Pasien --</option>');
    pasien.forEach(p => {
      $selectPasien.append(`<option value="${p.id}">${p.name}</option>`);
    });
  }

  // Dummy dokter
  const dokter = [
    { id: 1, name: 'dr. Andi Wijaya' },
    { id: 2, name: 'dr. Sulastri, Sp.A' },
    { id: 3, name: 'drg. Rina Mulyani' },
    { id: 4, name: 'dr. Budi Prakoso, Sp.B' }
  ];
  const $selectDokter = $('#appointment-doctor');
  if ($selectDokter.length) {
    $selectDokter.empty();
    $selectDokter.append('<option value="">-- Pilih Dokter --</option>');
    dokter.forEach(d => {
      $selectDokter.append(`<option value="${d.id}">${d.name}</option>`);
    });
  }
});

