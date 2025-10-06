// Dashboard page logic
$(document).ready(function() {
    // Pastikan user sudah login
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    //  statistik dashboard
    function updateDashboardStats() {
        const doctors = JSON.parse(localStorage.getItem('doctors') || '[]');
        const patients = JSON.parse(localStorage.getItem('patients') || '[]');
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const rooms = JSON.parse(localStorage.getItem('rooms') || '[]');
        $('#stat-doctors').text(doctors.filter(d => d.status === 'Aktif').length);
        $('#stat-patients').text(patients.length);
        $('#stat-appointments').text(appointments.filter(a => a.date === new Date().toISOString().slice(0, 10)).length);
        $('#stat-rooms').text(`${rooms.filter(r => r.status === 'occupied').length}/${rooms.length}`);
    }
    updateDashboardStats();
    // Render log aktivitas
    function renderActivityLogs() {
        const activityLog = JSON.parse(localStorage.getItem('activityLog') || '[]');
        const $log = $('#recent-activity-log').empty();
        activityLog.slice(0, 5).forEach(log => {
            $log.append(`<li>${new Date(log.timestamp).toLocaleTimeString()} - ${log.activity}</li>`);
        });
    }
    renderActivityLogs();
    // Render notifikasi
    function renderNotifications() {
        const notifications = JSON.parse(localStorage.getItem('internalNotifications') || '[]');
        const $panel = $('#notification-list').empty();
        const unreadCount = notifications.filter(n => !n.read).length;
        if (unreadCount > 0) $('#notification-count').text(unreadCount).removeClass('hidden');
        else $('#notification-count').addClass('hidden');
        if (notifications.length === 0) {
            $panel.append('<li>Tidak ada notifikasi baru.</li>');
            return;
        }
        notifications.forEach(n => $panel.append(`<li class="${n.read ? '' : 'unread'}" data-id="${n.id}">${n.message}</li>`));
    }
    renderNotifications();
    // Notifikasi bell
    $('#notification-bell').on('click', () => $('#notification-panel').toggleClass('hidden'));
    $(document).on('click', '#notification-list li', function() {
        const notifications = JSON.parse(localStorage.getItem('internalNotifications') || '[]');
        const notif = notifications.find(n => n.id === $(this).data('id'));
        if (notif) notif.read = true;
        localStorage.setItem('internalNotifications', JSON.stringify(notifications));
        renderNotifications();
    });
    // Logout
    $('#logout-btn').on('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    });
});
