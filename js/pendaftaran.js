// Pendaftaran page logic
$(document).ready(function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    $('#form-pendaftaran').on('submit', function(e) {
        e.preventDefault();
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');
        const queue = JSON.parse(localStorage.getItem('queue') || '{}');
        const newPatient = { id: Date.now(), name: $('#nama-pasien').val(), nik: $('#nik-pasien').val(), dob: $('#tgl-lahir').val(), address: $('#alamat-pasien').val(), records: [], labResults: [] };
        patients.push(newPatient);
        const poli = $('#layanan').val();
        if (queue[poli]) queue[poli].push(newPatient.name);
        localStorage.setItem('patients', JSON.stringify(patients));
        localStorage.setItem('queue', JSON.stringify(queue));
        window.location.href = 'antrian.html';
    });
});

