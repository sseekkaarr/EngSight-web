document.addEventListener('DOMContentLoaded', () => {
    window.submitEssay = function () {
        // Menggunakan SweetAlert2 untuk custom alert
        Swal.fire({
            title: 'Exercise done!',
            text: '',
            icon: 'success',
            confirmButtonText: 'See result'
        }).then(() => {
            // Arahkan ke halaman profile.html ketika tombol ditekan
            window.location.href = 'profile.html';
        });
    };
});
