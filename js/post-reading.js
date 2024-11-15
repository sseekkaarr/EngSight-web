import { fetchWithAuth } from "./api";

document.getElementById("start-pre-reading").addEventListener("click", async () => {
  try {
    const preReadingData = await fetchWithAuth("/api/pre-reading");
    console.log("Pre-reading data:", preReadingData);
    // Update UI sesuai preReadingData
  } catch (error) {
    console.error("Error fetching pre-reading data:", error.message);
    alert("Failed to load pre-reading data. Please log in again.");
    window.location.href = "/login"; // Redirect to login page
  }
});

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
