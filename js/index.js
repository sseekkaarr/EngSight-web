console.log('Index.js loaded');

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

function trackVideoProgress(videoId, sectionName) {
    fetch('http://localhost:5001/api/videos/progress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: 1, // Ganti dengan userId yang sesuai
            videoId: videoId,
            sectionName: sectionName,
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Feedback dari server
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


