$(document).ready(function () {
  // DATA DUMMY BARU DENGAN RINCIAN TAGIHAN 🧾
  const dummyDataTagihan = [
    {
      idPasien: "P001",
      namaPasien: "Budi Santoso",
      rincian: [
        { deskripsi: "Konsultasi Dokter Umum", harga: 150000 },
        { deskripsi: "Obat Paracetamol 1 Strip", harga: 10000 },
        { deskripsi: "Biaya Administrasi", harga: 15000 },
      ],
      status: "Belum Lunas",
    },
    {
      idPasien: "P002",
      namaPasien: "Siti Aminah",
      rincian: [
        { deskripsi: "Pemeriksaan Laboratorium Darah", harga: 250000 },
        { deskripsi: "Konsultasi Dokter Spesialis", harga: 300000 },
        { deskripsi: "Biaya Administrasi", harga: 15000 },
      ],
      status: "Belum Lunas",
    },
    {
      idPasien: "P004",
      namaPasien: "Dewi Lestari",
      rincian: [
        { deskripsi: "Obat Batuk Sirup", harga: 45000 },
        { deskripsi: "Vitamin C 1 Botol", harga: 60000 },
      ],
      status: "Belum Lunas",
    },
     {
      idPasien: "P003",
      namaPasien: "Agus Salim",
      rincian: [
        { deskripsi: "Rawat Inap Kelas 1 (1 Malam)", harga: 750000 },
        { deskripsi: "Tindakan Medis", harga: 1200000 },
        { deskripsi: "Obat-obatan", harga: 450000 },
      ],
      status: "Lunas", // Pasien ini tidak akan muncul di dropdown
    },
  ];

  // 1. Mengisi dropdown dengan pasien yang punya tagihan belum lunas
  const $patientSelect = $("#patient-billing-select");
  dummyDataTagihan.forEach((pasien) => {
    // Hanya tampilkan pasien yang statusnya "Belum Lunas" di pilihan
    if (pasien.status === "Belum Lunas") {
      $patientSelect.append(
        `<option value="${pasien.idPasien}">${pasien.namaPasien}</option>`
      );
    }
  });

  // 2. Event listener ketika pasien di dropdown dipilih
  $patientSelect.on("change", function () {
    const selectedPatientId = $(this).val();
    const $detailsContainer = $("#billing-details-container");
    const $billingDetailsDiv = $(".billing-details");

    // Jika user memilih pasien (bukan pilihan default)
    if (selectedPatientId) {
      // Cari data tagihan berdasarkan ID pasien yang dipilih
      const tagihan = dummyDataTagihan.find(
        (p) => p.idPasien === selectedPatientId
      );

      if (tagihan) {
        // Tampilkan nama pasien di judul
        $("#billing-patient-name").text(
          `Rincian Tagihan untuk ${tagihan.namaPasien}`
        );

        // Kosongkan rincian sebelumnya untuk menghindari data ganda
        $billingDetailsDiv.empty();

        // Mulai membuat HTML untuk tabel rincian
        let tableHTML = `<table class="billing-table">
                            <thead>
                                <tr>
                                    <th>Deskripsi</th>
                                    <th>Harga</th>
                                </tr>
                            </thead>
                            <tbody>`;

        let total = 0;
        // Loop setiap item dalam rincian dan tambahkan sebagai baris tabel
        tagihan.rincian.forEach((item) => {
          tableHTML += `<tr>
                            <td>${item.deskripsi}</td>
                            <td>Rp${item.harga.toLocaleString("id-ID")}</td>
                        </tr>`;
          total += item.harga; // Kalkulasi total biaya
        });

        // Tambahkan baris total di bagian bawah tabel
        tableHTML += `  </tbody>
                        <tfoot>
                            <tr>
                                <td><strong>Total Tagihan</strong></td>
                                <td><strong>Rp${total.toLocaleString("id-ID")}</strong></td>
                            </tr>
                        </tfoot>
                       </table>`;

        // Masukkan tabel yang sudah jadi ke dalam div yang sudah disiapkan
        $billingDetailsDiv.html(tableHTML);

        // Tampilkan seluruh kontainer rincian yang tadinya tersembunyi
        $detailsContainer.removeClass("hidden");
      }
    } else {
      // Jika pilihan kembali ke "-- Pilih Pasien --", sembunyikan lagi kontainer rincian
      $detailsContainer.addClass("hidden");
    }
  });

  // 3. Fungsionalitas Tombol (masih dummy)
  $("#btn-lunasi").on("click", function () {
    const selectedPatientName = $("#patient-billing-select option:selected").text();
    if (selectedPatientName && selectedPatientName !== '-- Pilih Pasien --') {
        alert(`Tagihan untuk ${selectedPatientName} telah ditandai lunas!`);
    } else {
        alert("Silakan pilih pasien terlebih dahulu.");
    }
  });

  $("#btn-cetak-struk").on("click", function () {
    const selectedPatientName = $("#patient-billing-select option:selected").text();
     if (selectedPatientName && selectedPatientName !== '-- Pilih Pasien --') {
        alert(`Mencetak struk untuk ${selectedPatientName}...`);
    } else {
        alert("Silakan pilih pasien terlebih dahulu.");
    }
  });
});
