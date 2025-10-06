// Inisialisasi data global (hanya dijalankan sekali, misal di dashboard atau login)
(function() {
    if (!localStorage.getItem('doctors')) {
        localStorage.setItem('doctors', JSON.stringify([
            { id: 1, name: "Dr. Andika Halim", spec: "Spesialis Jantung", status: "Aktif" },
            { id: 2, name: "Dr. Ignatius Febrian", spec: "Spesialis Anak", status: "Aktif" },
            { id: 3, name: "Dr. Kenneth Kusnadi", spec: "Spesialis Bedah Umum", status: "Cuti" },
            { id: 4, name: "Dr. Nicholas Henry", spec: "Spesialis Mata", status: "Aktif" },
            { id: 5, name: "Dr. Jeffwiyan", spec: "Spesialis THT", status: "Aktif" },
        ]));
    }
    if (!localStorage.getItem('patients')) {
        localStorage.setItem('patients', JSON.stringify([
            { id: 1, name: "Jeffwiyan", nik: "3171234567890001", dob: "1995-05-20", address: "Jl. Meruya Ilir", records: [ { date: "2024-10-15", doctor: "Dr. Andika Halim", diagnosis: "Demam, Batuk", notes: "Resep paracetamol, istirahat cukup."} ], labResults: [] },
            { id: 2, name: "Budi Santoso", nik: "3171234567890002", dob: "1988-11-30", address: "Jl. Kembang Kerep", records: [ { date: "2024-10-12", doctor: "Dr. Ignatius Febrian", diagnosis: "Pemeriksaan rutin", notes: "Kondisi stabil."} ], labResults: [{ date: '2024-10-12', test: 'Gula Darah', result: '98 mg/dL', notes: 'Normal' }] },
            { id: 3, name: "Citra Lestari", nik: "3171234567890003", dob: "2001-01-15", address: "Jl. Pesanggrahan", records: [ { date: "2024-09-28", doctor: "Dr. Jeffwiyan", diagnosis: "Infeksi Telinga", notes: "Diberi antibiotik."} ], labResults: [] },
        ]));
    }
    if (!localStorage.getItem('appointments')) {
        localStorage.setItem('appointments', JSON.stringify([
            { id: 1, patientId: 2, doctorId: 1, date: "2024-11-05", time: "09:00", status: "Terjadwal" },
            { id: 2, patientId: 3, doctorId: 4, date: "2024-11-05", time: "14:00", status: "Terjadwal" }
        ]));
    }
    if (!localStorage.getItem('rooms')) {
        localStorage.setItem('rooms', JSON.stringify([
            { id: 101, type: "VIP", status: "occupied", patientId: 1 },
            { id: 102, type: "VIP", status: "available", patientId: null },
            { id: 201, type: "Kelas 1", status: "cleaning", patientId: null },
            { id: 202, type: "Kelas 1", status: "available", patientId: null },
            { id: 203, type: "Kelas 1", status: "occupied", patientId: 2 }
        ]));
    }
    if (!localStorage.getItem('drugs')) {
        localStorage.setItem('drugs', JSON.stringify([
            { id: 1, name: "Paracetamol 500mg", price: 2000, stock: 150 },
            { id: 2, name: "Amoxicillin 500mg", price: 5000, stock: 80 },
            { id: 3, name: "Vitamin C 1000mg", price: 3000, stock: 200 },
            { id: 4, name: "Obat Batuk Sirup", price: 15000, stock: 45 },
            { id: 5, name: "Aspirin 80mg", price: 7000, stock: 8 },
        ]));
    }
    if (!localStorage.getItem('inventory')) {
        localStorage.setItem('inventory', JSON.stringify([
            { id: 1, name: "Masker Bedah", category: "Alat Medis", stock: 500, status: "Tersedia" },
            { id: 2, name: "Sarung Tangan Latex", category: "Alat Medis", stock: 1200, status: "Tersedia" },
            { id: 3, name: "Infus Set", category: "Alat Medis", stock: 250, status: "Tersedia" },
        ]));
    }
    if (!localStorage.getItem('transactions')) {
        localStorage.setItem('transactions', JSON.stringify([
            { id: 1, date: "2024-10-15", patientId: 1, total: 175000, status: "Lunas" },
            { id: 2, date: "2024-10-12", patientId: 2, total: 150000, status: "Lunas" }
        ]));
    }
    if (!localStorage.getItem('activityLog')) {
        localStorage.setItem('activityLog', JSON.stringify([{ timestamp: new Date(), activity: "Sistem berhasil dimuat." }]));
    }
    if (!localStorage.getItem('internalNotifications')) {
        localStorage.setItem('internalNotifications', JSON.stringify([]));
    }
    if (!localStorage.getItem('queue')) {
        localStorage.setItem('queue', JSON.stringify({ umum: [], anak: [], bedah: [], gigi: [] }));
    }
})();

