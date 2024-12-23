console.log("index.js loaded");
const apiUrl = "https://engsight-be-production.up.railway.app/api";


function showDescription(lab) {
    const descriptionContainer = document.getElementById("description-container");

    if (lab === 'pre-reading') {
        descriptionContainer.innerHTML = "<p>Preparing your mind for the reading process.</p>";
    } else if (lab === 'reading') {
        descriptionContainer.innerHTML = "<p>Engage with the text! Skimming for key ideas and highlighting important information.</p>";
    } else if (lab === 'post-reading') {
        descriptionContainer.innerHTML = "<p>Reflect on what you’ve read by writing a summary-analysis/response essay.</p>";
    }

    descriptionContainer.style.display = "block";
}


function startNow() {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage

    console.log('Token:', token);

    if (token) {
        // Jika token ada, redirect ke pre-reading.html
        console.log('User is logged in. Redirecting to pre-reading...');
        window.location.href = 'pre-reading.html';
    } else {
        // Jika token tidak ada, redirect ke login.html
        console.log('User is not logged in. Redirecting to login...');
        alert('You need to log in first!');
        window.location.href = 'login.html';
    }
}

const trackVideoProgress = async (videoId, sectionName) => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    try {
        const response = await fetch("https://engsight-be-production.up.railway.app/api/videos/progress", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, videoId, sectionName }),
        });

        if (!response.ok) {
            console.error("Failed to update video progress");
        } else {
            console.log(`Progress updated for video ${videoId} in ${sectionName}`);
        }
    } catch (error) {
        console.error("Error updating video progress:", error);
    }
};



// Tambahkan event listener untuk semua video
document.querySelectorAll(".video-item a").forEach((link) => {
    link.addEventListener("click", (event) => {
        const videoId = link.dataset.videoId; // Pastikan atribut `data-video-id` ada
        const sectionName = link.closest("section").querySelector("h2").textContent.trim();

        trackVideoProgress(videoId, sectionName);
    });
});




