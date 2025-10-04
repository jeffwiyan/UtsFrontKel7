// pembayaran.js - Dummy data for Pembayaran & Riwayat Transaksi
$(document).ready(function () {
  // Dummy transaksi
  const transaksi = [
    {
      tanggal: "2025-10-01",
      pasien: "Budi Santoso",
      total: 250000,
      status: "Lunas",
    },
    {
      tanggal: "2025-10-02",
      pasien: "Siti Aminah",
      total: 180000,
      status: "Belum Lunas",
    },
    {
      tanggal: "2025-10-02",
      pasien: "Agus Salim",
      total: 320000,
      status: "Lunas",
    },
    {
      tanggal: "2025-10-03",
      pasien: "Dewi Lestari",
      total: 150000,
      status: "Lunas",
    },
  ];

  // Render ke tabel pembayaran
  const $tbody = $("#transaction-history-body");
  if ($tbody.length) {
    $tbody.empty();
    transaksi.forEach((trx) => {
      $tbody.append(
        `<tr><td>${trx.tanggal}</td><td>${
          trx.pasien
        }</td><td>Rp${trx.total.toLocaleString()}</td><td><span class="status-badge ${
          trx.status === "Lunas" ? "status-lunas" : "status-belum-lunas"
        }">${trx.status}</span></td></tr>`
      );
    });
  }

  // Render ke tabel riwayat transaksi (jika ada)
  const $tbody2 = $("#riwayat-transaksi-body");
  if ($tbody2.length) {
    $tbody2.empty();
    transaksi.forEach((trx) => {
      $tbody2.append(
        `<tr><td>${trx.tanggal}</td><td>${
          trx.pasien
        }</td><td>Rp${trx.total.toLocaleString()}</td><td><span class="status-badge ${
          trx.status === "Lunas" ? "status-lunas" : "status-belum-lunas"
        }">${trx.status}</span></td></tr>`
      );
    });
  }
});

