// laporan.js - Chart dummy data for Laporan page
$(document).ready(function() {
  // Bar Chart: Kunjungan per Poli
  const ctxBar = document.getElementById('reportChartBar').getContext('2d');
  new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: ['Umum', 'Anak', 'Bedah', 'Gigi', 'Kandungan'],
      datasets: [{
        label: 'Jumlah Kunjungan',
        data: [120, 80, 45, 60, 30],
        backgroundColor: '#00bcd4',
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  // Pie Chart: Tipe Pembayaran
  const ctxPie = document.getElementById('reportChartPie').getContext('2d');
  new Chart(ctxPie, {
    type: 'pie',
    data: {
      labels: ['Tunai', 'BPJS', 'Asuransi', 'Lainnya'],
      datasets: [{
        data: [60, 100, 30, 10],
        backgroundColor: ['#00bcd4', '#4caf50', '#ff9800', '#f44336']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } }
    }
  });
});

