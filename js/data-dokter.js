// Data Dokter page logic
$(document).ready(function() {
    function renderDoctorTable(query = '') {
        const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
        const $tableBody = $('#doctor-table-body').empty();
        doctors.filter(d => d.name.toLowerCase().includes(query) || d.spec.toLowerCase().includes(query)).forEach(doc => {
            $tableBody.append(`<tr><td>${doc.name}</td><td>${doc.spec}</td><td><span class="status-badge ${doc.status === 'Aktif' ? 'status-aktif' : 'status-cuti'}">${doc.status}</span></td><td>
                <button class="btn btn-sm btn-warning btn-edit-dokter" data-id="${doc.id}"><i class="fa fa-edit"></i></button>
                <button class="btn btn-sm btn-danger btn-hapus-dokter" data-id="${doc.id}"><i class="fa fa-trash"></i></button>
            </td></tr>`);
        });
    }
    renderDoctorTable();
    $('#doctor-search').on('keyup', function() {
        renderDoctorTable($(this).val().toLowerCase());
    });
    
    function showModalDokter(edit = false, dokter = null) {
        $('#modal-dokter').removeClass('hidden');
        if (edit && dokter) {
            $('#modal-title-dokter').text('Edit Dokter');
            $('#dokter-id').val(dokter.id);
            $('#modal-nama-dokter').val(dokter.name);
            $('#modal-spec-dokter').val(dokter.spec);
            $('#modal-status-dokter').val(dokter.status);
        } else {
            $('#modal-title-dokter').text('Tambah Dokter');
            $('#dokter-id').val('');
            $('#form-dokter')[0].reset();
        }
    }
    function hideModalDokter() { $('#modal-dokter').addClass('hidden'); }

    $('#btn-tambah-dokter').on('click', function() { showModalDokter(false); });
    $('#btn-batal-modal-dokter').on('click', hideModalDokter);

    // Simpan (tambah/edit)
    $('#form-dokter').on('submit', function(e) {
        e.preventDefault();
        let doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
        const id = $('#dokter-id').val();
        const data = {
            id: id ? Number(id) : Date.now(),
            name: $('#modal-nama-dokter').val(),
            spec: $('#modal-spec-dokter').val(),
            status: $('#modal-status-dokter').val()
        };
        if (id) {
            // Edit
            doctors = doctors.map(d => d.id == id ? { ...d, ...data } : d);
        } else {
            // Tambah
            doctors.push(data);
        }
        localStorage.setItem('doctors', JSON.stringify(doctors));
        renderDoctorTable($('#doctor-search').val().toLowerCase());
        hideModalDokter();
    });

    // Edit
    $(document).on('click', '.btn-edit-dokter', function() {
        const id = $(this).data('id');
        const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
        const dokter = doctors.find(d => d.id == id);
        if (dokter) showModalDokter(true, dokter);
    });

    // Hapus
    $(document).on('click', '.btn-hapus-dokter', function() {
        if (!confirm('Yakin hapus dokter ini?')) return;
        const id = $(this).data('id');
        let doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
        doctors = doctors.filter(d => d.id != id);
        localStorage.setItem('doctors', JSON.stringify(doctors));
        renderDoctorTable($('#doctor-search').val().toLowerCase());
    });
});
