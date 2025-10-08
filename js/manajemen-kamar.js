// Dummy data & render tabel kamar
$(document).ready(function() {
    const dummyKamar = [
        { id: 101, tipe: 'VIP', status: 'Tersedia', pasien: '' },
        { id: 102, tipe: 'Kelas 1', status: 'Terisi', pasien: 'Budi Santoso' },
        { id: 103, tipe: 'Kelas 2', status: 'Dibersihkan', pasien: '' },
        { id: 104, tipe: 'Kelas 3', status: 'Tersedia', pasien: '' }
    ];
    const $tbody = $('#room-table-body');
    if ($tbody.length) {
        $tbody.empty();
        dummyKamar.forEach(k => {
            $tbody.append(`<tr><td>${k.id}</td><td>${k.tipe}</td><td><span class="status-badge ${k.status === 'Tersedia' ? 'status-tersedia' : k.status === 'Terisi' ? 'status-lunas' : 'status-hampir-habis'}">${k.status}</span></td><td>${k.pasien || '-'}</td></tr>`);
        });
    }
});
// Manajemen Kamar page logic
$(document).ready(function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    // Dummy data kamar
    let rooms = JSON.parse(localStorage.getItem('rooms') || '[]');
    const $table = $('#room-table-body');
    $table.empty();
    if (rooms.length === 0) {
        $table.append('<tr><td colspan="4">Tidak ada data kamar.</td></tr>');
    } else {
        rooms.forEach(room => {
            $table.append(`<tr><td>${room.id}</td><td>${room.type}</td><td>${room.status}</td><td>${room.patientId ? room.patientId : '-'}</td></tr>`);
        });
    }
});

