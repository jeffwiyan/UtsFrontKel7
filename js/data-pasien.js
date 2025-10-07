// Data Pasien page logic
$(document).ready(function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    function renderPatientTable(query = '') {
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');
        const $tableBody = $('#patient-table-body').empty();
        patients.filter(p => p.name.toLowerCase().includes(query) || p.nik.includes(query)).forEach(p => {
            $tableBody.append(`<tr><td>${p.name}</td><td>${p.nik}</td><td>${p.dob}</td><td>
                <button class="btn btn-sm btn-info btn-view-record" data-id="${p.id}">Rekam Medis</button>
                <button class="btn btn-sm btn-warning btn-edit-pasien" data-id="${p.id}"><i class="fa fa-edit"></i></button>
                <button class="btn btn-sm btn-danger btn-hapus-pasien" data-id="${p.id}"><i class="fa fa-trash"></i></button>
            </td></tr>`);
        });
    }
    renderPatientTable();
    $('#patient-search').on('keyup', function() {
        renderPatientTable($(this).val().toLowerCase());
    });

    // Modal logic
    function showModal(edit = false, pasien = null) {
        $('#modal-pasien').removeClass('hidden');
        if (edit && pasien) {
            $('#modal-title').text('Edit Pasien');
            $('#pasien-id').val(pasien.id);
            $('#modal-nama').val(pasien.name);
            $('#modal-nik').val(pasien.nik);
            $('#modal-dob').val(pasien.dob);
            $('#modal-alamat').val(pasien.address);
        } else {
            $('#modal-title').text('Tambah Pasien');
            $('#pasien-id').val('');
            $('#form-pasien')[0].reset();
        }
    }
    function hideModal() { $('#modal-pasien').addClass('hidden'); }

    $('#btn-tambah-pasien').on('click', function() { showModal(false); });
    $('#btn-batal-modal').on('click', hideModal);

    // Simpan (tambah/edit)
    $('#form-pasien').on('submit', function(e) {
        e.preventDefault();
        let patients = JSON.parse(localStorage.getItem('patients') || '[]');
        const id = $('#pasien-id').val();
        const data = {
            id: id ? Number(id) : Date.now(),
            name: $('#modal-nama').val(),
            nik: $('#modal-nik').val(),
            dob: $('#modal-dob').val(),
            address: $('#modal-alamat').val(),
            records: [],
            labResults: []
        };
        if (id) {
            // Edit
            patients = patients.map(p => p.id == id ? { ...p, ...data } : p);
        } else {
            // Tambah
            patients.push(data);
        }
        localStorage.setItem('patients', JSON.stringify(patients));
        renderPatientTable($('#patient-search').val().toLowerCase());
        hideModal();
    });

    // Edit
    $(document).on('click', '.btn-edit-pasien', function() {
        const id = $(this).data('id');
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');
        const pasien = patients.find(p => p.id == id);
        if (pasien) showModal(true, pasien);
    });

    // Hapus
    $(document).on('click', '.btn-hapus-pasien', function() {
        if (!confirm('Yakin hapus pasien ini?')) return;
        const id = $(this).data('id');
        let patients = JSON.parse(localStorage.getItem('patients') || '[]');
        patients = patients.filter(p => p.id != id);
        localStorage.setItem('patients', JSON.stringify(patients));
        renderPatientTable($('#patient-search').val().toLowerCase());
    });
});

