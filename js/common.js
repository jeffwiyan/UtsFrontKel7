$(document).ready(function() {
    // 1. Cek status login di setiap halaman
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    // 2. Muat sidebar dari file _sidebar.html
    $('.sidebar').load('_sidebar.html', function() {
        // 3. Setelah sidebar dimuat, cari tahu halaman mana yang sedang aktif
        const currentPage = window.location.pathname.split("/").pop();
        // 4. Tambahkan class 'active' secara otomatis ke link yang sesuai
        $('.sidebar-menu a').each(function() {
            if ($(this).attr('href') === currentPage) {
                $(this).addClass('active');
            }
        });
        // 5. Tambahkan fungsi logout setelah sidebar dimuat
        $('#logout-btn').on('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    });
});

