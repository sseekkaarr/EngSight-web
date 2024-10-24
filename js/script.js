const dropzones = document.querySelectorAll('.dropzone');

dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    dropzone.addEventListener('drop', (e) => {
        const answer = e.dataTransfer.getData('text/plain');
        const existingAnswer = dropzone.querySelector('.answer');

        if (!existingAnswer) {
            const answerElement = document.createElement('div');
            answerElement.classList.add('answer');
            answerElement.textContent = answer;
            dropzone.appendChild(answerElement);
        }
    });
});
