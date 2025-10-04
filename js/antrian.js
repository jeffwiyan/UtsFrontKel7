// Antrian page logic
$(document).ready(function() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    function renderQueueLists() {
        const queue = JSON.parse(localStorage.getItem('queue') || '{}');
        for (const poli in queue) {
            const $list = $(`#waiting-list-${poli}`).empty();
            if (queue[poli].length > 0) {
                queue[poli].forEach(name => $list.append(`<li>${name}</li>`));
            } else {
                $list.append('<li>Tidak ada pasien menunggu</li>');
            }
        }
    }
    renderQueueLists();
    $('.next-queue-btn').on('click', function() {
        const poli = $(this).data('poli');
        const queue = JSON.parse(localStorage.getItem('queue') || '{}');
        if (queue[poli] && queue[poli].length > 0) {
            queue[poli].shift();
            localStorage.setItem('queue', JSON.stringify(queue));
            renderQueueLists();
        }
    });
});

