// Bantuan page logic 
$(document).ready(function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    // FAQ Search
    var $search = $('<input type="text" id="faq-search" placeholder="Cari pertanyaan..." class="faq-search">');
    $('.card h2').after($search);
    $search.on('input', function() {
        var val = $(this).val().toLowerCase();
        $('.accordion-item').each(function() {
            var q = $(this).find('.accordion-header').text().toLowerCase();
            $(this).toggle(q.indexOf(val) !== -1);
        });
        // Otomatis tutup semua saat search
        $('.accordion-header').removeClass('active').next('.accordion-content').slideUp(150);
    });

    // Accordion click 
    $('.accordion-header').on('click', function() {
        var $header = $(this);
        var $content = $header.next('.accordion-content');
        if ($header.hasClass('active')) {
            $header.removeClass('active');
            $content.stop().slideUp(250);
        } else {
            $('.accordion-header').removeClass('active').next('.accordion-content').slideUp(250);
            $header.addClass('active');
            $content.stop().slideDown(250, function() {
                var offset = $header.offset().top - 80;
                $('html,body').animate({scrollTop: offset}, 300);
            });
        }
    });

    // highlight aktif
    $('<style>\
        .faq-search {width:100%;margin:10px 0 18px 0;padding:8px 12px;border-radius:6px;border:1px solid #ccc;font-size:1rem;}\
        .accordion-header.active {background:#e0f3ff;color:#0077b6;}\
        .accordion-header {cursor:pointer;transition:background 0.2s;}\
    </style>').appendTo('head');
});

