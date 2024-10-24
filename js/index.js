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
    window.location.href = 'login.html';
}
