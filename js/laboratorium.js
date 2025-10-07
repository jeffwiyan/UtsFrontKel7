// Dummy data pasien dan hasil lab untuk laboratorium.html
$(document).ready(function() {
  // Dummy pasien
  const pasien = [
    { id: 1, name: 'Budi Santoso' },
    { id: 2, name: 'Siti Aminah' },
    { id: 3, name: 'Agus Salim' },
    { id: 4, name: 'Dewi Lestari' }
  ];
  const $select = $('#lab-patient-select');
  if ($select.length) {
    $select.empty();
    $select.append('<option value="">-- Pilih Pasien --</option>');
    pasien.forEach(p => {
      $select.append(`<option value="${p.id}">${p.name}</option>`);
    });
  }

  // Dummy hasil lab per pasien
  const hasilLab = {
    1: [
      { tanggal: '2025-10-01', jenis: 'Darah Lengkap', hasil: 'Normal', catatan: '-' },
      { tanggal: '2025-10-03', jenis: 'Urine', hasil: 'Normal', catatan: 'Tidak ada infeksi' }
    ],
    2: [
      { tanggal: '2025-10-02', jenis: 'Gula Darah', hasil: 'Tinggi', catatan: 'Perlu diet' }
    ],
    3: [],
    4: [
      { tanggal: '2025-10-03', jenis: 'Kolesterol', hasil: 'Normal', catatan: '-' }
    ]
  };

  $select.on('change', function() {
    const id = $(this).val();
    const $tbody = $('#lab-history-body');
    $tbody.empty();
    if (hasilLab[id] && hasilLab[id].length) {
      hasilLab[id].forEach(lab => {
        $tbody.append(`<tr><td>${lab.tanggal}</td><td>${lab.jenis}</td><td>${lab.hasil}</td><td>${lab.catatan}</td></tr>`);
      });
    } else {
      $tbody.append('<tr><td colspan="4">Belum ada hasil lab</td></tr>');
    }
    $('#lab-content').removeClass('hidden');
  });
});

