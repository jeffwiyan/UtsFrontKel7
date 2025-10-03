// Login page logic
$(document).ready(function() {
    $('#login-form').on('submit', function(e) {
        e.preventDefault();
        if ($('#username').val() === 'admin' && $('#password').val() === '12345') {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            $('#login-error').text('Username atau password salah.');
        }
    });
});

