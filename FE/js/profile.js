console.log("Profile.js loaded");

const loadProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found. Please log in.");
    }

    const response = await fetch("http://localhost:5001/api/auth/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile data`);
    }

    const data = await response.json();

    // Update profil
    document.getElementById("profile-name").textContent = data.name;
    document.getElementById("profile-email").textContent = data.email;
    document.getElementById("profile-picture").src = "img/default-avatar.png";

    // Load test results with dummy data
    loadTestResults(dummyTestResults);

    console.log("Profile loaded successfully");
  } catch (error) {
    console.error("Error loading profile:", error.message);
    alert("Error loading profile data. Please try again.");
  }
};

const loadTestResults = (results) => {
  const testResultsContainer = document.querySelector(".test-cards");
  testResultsContainer.innerHTML = ""; // Clear previous data

  results.forEach((result) => {
    const card = document.createElement("div");
    card.classList.add("test-card");

    // Tentukan warna berdasarkan skor
    let scoreColor = "";
    if (result.score >= 90) {
      scoreColor = "#4caf50"; // Hijau
    } else if (result.score >= 70) {
      scoreColor = "#ff9800"; // Oranye
    } else {
      scoreColor = "#f44336"; // Merah
    }

    // Buat elemen progress ring
    const progressRing = document.createElement("div");
    progressRing.classList.add("progress-ring");
    progressRing.style.backgroundColor = scoreColor; // Terapkan warna langsung

    const scoreText = document.createElement("span");
    scoreText.classList.add("score-text");
    scoreText.textContent = `${result.score}%`;

    progressRing.appendChild(scoreText);

    card.innerHTML = `
      <h3>${result.testName}</h3>
      <p><strong>Date:</strong> ${result.date}</p>
    `;

    card.prepend(progressRing);
    testResultsContainer.appendChild(card);
  });

  console.log("Test results loaded with colors.");
};

// Dummy data for test results
const dummyTestResults = [
  { testName: "Pre-Reading Lab", score: 100, date: "2024-11-06" },
  { testName: "Reading Lab", score: 60, date: "2024-11-07" },
  { testName: "Post-Reading Lab", score: 80, date: "2024-11-08" },
];

// Run loadProfile on DOMContentLoaded
document.addEventListener("DOMContentLoaded", loadProfile);




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

// Panggil fungsi loadProfile saat halaman dimuat
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
