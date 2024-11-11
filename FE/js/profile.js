console.log('Profile.js loaded');

const loadTestResults = (results) => {
    const testResultsContainer = document.getElementById('test-results');
    testResultsContainer.innerHTML = ''; // Hapus data lama sebelum mengisi ulang

    results.forEach(result => {
        const card = document.createElement('div');
        card.classList.add('test-card');

        const iconMap = {
            'Pre-Reading Lab': 'img/pre.png',
            'Reading Lab': 'img/read.png',
            'Post-Reading Lab': 'img/post.png'
        };

        card.innerHTML = `
            <img src="${iconMap[result.testName]}" alt="${result.testName}" class="test-icon">
            <div class="test-content">
                <h3>${result.testName}</h3>
                <p><strong>Score:</strong> ${result.score}%</p>
                <p><strong>Date:</strong> ${result.date}</p>
            </div>
        `;
        testResultsContainer.appendChild(card);
    });
};

// Dummy data
const dummyTestResults = [
    { testName: 'Pre-Reading Lab', score: 100, date: '2024-11-06' },
    { testName: 'Reading Lab', score: 85, date: '2024-11-07' },
    { testName: 'Post-Reading Lab', score: 90, date: '2024-11-08' },
];

// Load test results on page load
document.addEventListener('DOMContentLoaded', () => {
    const progressRings = document.querySelectorAll('.progress-ring');

    progressRings.forEach(ring => {
        const score = parseInt(ring.getAttribute('data-score'), 10);
        ring.style.setProperty('--score', score);

        // Tentukan kelas warna berdasarkan skor
        if (score >= 90) {
            ring.classList.add('high-score');
        } else if (score >= 70) {
            ring.classList.add('medium-score');
        } else {
            ring.classList.add('low-score');
        }
    });
});



// Dummy data for testing
const dummyProfileData = {
    name: 'Sekar Anindita',
    email: 'sekaranindita@example.com',
    profilePicture: 'img/default-avatar.png',
    videos: [
        { title: 'Video 1', watchedAt: '2024-11-01' },
        { title: 'Video 2', watchedAt: '2024-11-03' },
    ],
    tests: [
        { testName: 'Reading Lab', score: 85, date: '2024-11-07' },
        { testName: 'Post-Reading Lab', score: 90, date: '2024-11-08' },
    ],
    activities: [
        { description: 'Completed Video 1', date: '2024-11-01' },
        { description: 'Scored 85 on Reading Lab', date: '2024-11-07' },
    ],
};

// Load Profile Data
const loadProfile = async () => {
    const data = dummyProfileData; // Replace with API call when back-end is ready

    // Update profile info
    document.getElementById('profile-name').textContent = data.name;
    document.getElementById('profile-email').textContent = data.email;
    document.getElementById('profile-picture').src = data.profilePicture;

    // Update video progress
    const videoProgress = document.getElementById('video-progress');
    videoProgress.innerHTML = '';
    data.videos.forEach(video => {
        const li = document.createElement('li');
        li.textContent = `${video.title} - Watched on ${video.watchedAt}`;
        videoProgress.appendChild(li);
    });

    // Update test results
    const testResults = document.getElementById('test-results');
    testResults.innerHTML = '';
    data.tests.forEach(test => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${test.testName}</td>
            <td>${test.score}</td>
            <td>${test.date}</td>
        `;
        testResults.appendChild(row);
    });

    // Update activity log
    const activityLog = document.getElementById('activity-log');
    activityLog.innerHTML = '';
    data.activities.forEach(activity => {
        const li = document.createElement('li');
        li.textContent = `${activity.description} - ${activity.date}`;
        activityLog.appendChild(li);
    });
};

// Data aktivitas (contoh data)
const activityData = {
    '2024-11-01': ['Completed Video 1', 'Scored 85 on Reading Lab'],
    '2024-11-03': ['Watched Video 2'],
    '2024-11-07': ['Completed Post-Reading Lab'],
};

// Variabel global untuk melacak bulan dan tahun aktif
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

// Fungsi untuk membuat kalender
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const monthYearDisplay = document.getElementById('month-year');
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Jumlah hari di bulan

    // Kosongkan kalender sebelum menambahkan tanggal baru
    calendar.innerHTML = '';

    // Update tampilan bulan dan tahun
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];
    monthYearDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Tambahkan tanggal ke kalender
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dateStr = date.toISOString().split('T')[0];
        const dayElement = document.createElement('div');
        dayElement.textContent = day;

        if (activityData[dateStr]) {
            dayElement.classList.add('has-activity');
        }

        dayElement.addEventListener('click', () => handleDateClick(dateStr, dayElement));
        calendar.appendChild(dayElement);
    }
}

// Fungsi untuk menangani klik tanggal
function handleDateClick(dateStr, element) {
    document.querySelectorAll('#calendar div').forEach((div) => {
        div.classList.remove('selected');
    });
    element.classList.add('selected');

    const activityLogDetails = document.getElementById('activity-log-details');
    const activityLogList = document.getElementById('activity-log-list');
    activityLogList.innerHTML = '';

    if (activityData[dateStr]) {
        activityData[dateStr].forEach((activity) => {
            const listItem = document.createElement('li');
            listItem.textContent = activity;
            activityLogList.appendChild(listItem);
        });
    } else {
        activityLogList.innerHTML = '<li>No activity recorded</li>';
    }

    activityLogDetails.classList.remove('hidden');
}

// Fungsi untuk mengubah bulan
function changeMonth(direction) {
    currentMonth += direction;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }

    generateCalendar();
}

// Tambahkan event listener ke tombol navigasi
document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
document.getElementById('next-month').addEventListener('click', () => changeMonth(1));

// Panggil fungsi generateCalendar saat halaman dimuat
document.addEventListener('DOMContentLoaded', generateCalendar);



document.addEventListener('DOMContentLoaded', loadProfile);

// Selecting the logout button
const logoutButton = document.querySelector('.logout');

if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        const confirmLogout = confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            window.location.href = 'login.html';
        }
        // If canceled, nothing happens, stays on the profile page
    });
}

