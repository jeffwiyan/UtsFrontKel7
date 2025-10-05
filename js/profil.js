// Profil page logic
$(document).ready(function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    // Render log aktivitas
    const logs = JSON.parse(localStorage.getItem('activityLog') || '[]');
    const $log = $('#full-activity-log').empty();
    if (logs.length === 0) {
        $log.append('<li>Tidak ada log aktivitas.</li>');
    } else {
        logs.forEach(log => {
            $log.append(`<li>${new Date(log.timestamp).toLocaleString()} - ${log.activity}</li>`);
        });
    }
    // Logout
    $('#logout-btn').on('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    });
});

