// Dummy data janji temu untuk tabel janji-temu.html
$(document).ready(function() {
  const janjiTemu = [
    { pasien: 'Budi Santoso', dokter: 'dr. Andi Wijaya', tanggal: '2025-10-04', waktu: '09:00', status: 'Terjadwal' },
    { pasien: 'Siti Aminah', dokter: 'dr. Sulastri, Sp.A', tanggal: '2025-10-04', waktu: '10:30', status: 'Selesai' },
    { pasien: 'Agus Salim', dokter: 'drg. Rina Mulyani', tanggal: '2025-10-05', waktu: '08:00', status: 'Terjadwal' },
    { pasien: 'Dewi Lestari', dokter: 'dr. Budi Prakoso, Sp.B', tanggal: '2025-10-05', waktu: '11:00', status: 'Dibatalkan' }
  ];
  const $tbody = $('#appointment-table-body');
  if ($tbody.length) {
    $tbody.empty();
    janjiTemu.forEach(jt => {
      $tbody.append(`<tr><td>${jt.pasien}</td><td>${jt.dokter}</td><td>${jt.tanggal}</td><td>${jt.waktu}</td><td><span class="status-badge status-terjadwal">${jt.status}</span></td><td><button class="btn btn-sm btn-danger">Batalkan</button></td></tr>`);
    });
  }
});

