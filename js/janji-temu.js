$(document).ready(function() {
    let janjiTemu = [
        { id: 1, pasien: 'Budi Santoso', dokter: 'dr. Andi Wijaya', tanggal: '2025-10-04', waktu: '09:00', status: 'selesai' },
        { id: 2, pasien: 'Siti Aminah', dokter: 'dr. Sulastri, Sp.A', tanggal: '2025-10-04', waktu: '10:30', status: 'Selesai' },
        { id: 3, pasien: 'Agus Salim', dokter: 'drg. Rina Mulyani', tanggal: '2025-10-05', waktu: '08:00', status: 'selesai' },
        { id: 4, pasien: 'Dewi Lestari', dokter: 'dr. Budi Prakoso, Sp.B', tanggal: '2025-10-05', waktu: '11:00', status: 'Dibatalkan' }
    ];

    const $selectPasien = $('#appointment-patient');
    const $selectDokter = $('#appointment-doctor');
    const $tbody = $('#appointment-table-body');
    const $form = $('#appointment-form');

    function getStatusClass(status) {
        return 'status-' + status.toLowerCase().replace(' ', '-');
    }

    function renderTable() {
        $tbody.empty();
        if (janjiTemu.length === 0) {
            $tbody.append('<tr><td colspan="6" style="text-align:center;">Belum ada janji temu.</td></tr>');
            return;
        }

        janjiTemu.forEach((jt, index) => {
            const statusClass = getStatusClass(jt.status);
            const tombolAksi = jt.status === 'Terjadwal'
                ? `<button class="btn btn-sm btn-danger btn-cancel" data-index="${index}">Batalkan</button>`
                : '-';

            const row = `
                <tr>
                    <td>${jt.pasien}</td>
                    <td>${jt.dokter}</td>
                    <td>${jt.tanggal}</td>
                    <td>${jt.waktu}</td>
                    <td><span class="status-badge ${statusClass}">${jt.status}</span></td>
                    <td>${tombolAksi}</td>
                </tr>
            `;
            $tbody.append(row);
        });
    }

    function populateDropdowns() {
        const pasienTersedia = JSON.parse(localStorage.getItem('patients') || '[]');
        $selectPasien.empty().append('<option value="">-- Pilih Pasien --</option>');
        
        if (pasienTersedia.length > 0) {
            pasienTersedia.forEach(p => {
                $selectPasien.append(`<option value="${p.name}">${p.name}</option>`);
            });
        } else {
             $selectPasien.append('<option value="" disabled>Tidak ada data pasien</option>');
        }

        const dokterTersedia = JSON.parse(localStorage.getItem('doctors') || '[]');
        $selectDokter.empty().append('<option value="">-- Pilih Dokter --</option>');

        const dokterAktif = dokterTersedia.filter(d => d.status === 'Aktif');

        if (dokterAktif.length > 0) {
            dokterAktif.forEach(d => {
                $selectDokter.append(`<option value="${d.name}">${d.name} - ${d.spec}</option>`);
            });
        } else {
            $selectDokter.append('<option value="" disabled>Tidak ada dokter yang aktif</option>');
        }
    }

    $form.on('submit', function(event) {
        event.preventDefault();

        const newAppointment = {
            id: janjiTemu.length + 1,
            pasien: $selectPasien.val(),
            dokter: $selectDokter.val(),
            tanggal: $('#appointment-date').val(),
            waktu: $('#appointment-time').val(),
            status: 'Terjadwal'
        };

        janjiTemu.push(newAppointment);
        renderTable();
        $form[0].reset();
    });

    $tbody.on('click', '.btn-cancel', function() {
        const index = $(this).data('index');
        if (confirm(`Apakah Anda yakin ingin membatalkan janji temu ini?`)) {
            janjiTemu[index].status = 'Dibatalkan';
            renderTable();
        }
    });

    populateDropdowns();
    renderTable();
});
