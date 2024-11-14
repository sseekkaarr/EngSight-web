console.log("Profile.js loaded");

const apiUrl = "http://localhost:5001/api";

// Fungsi untuk memuat data profil dari backend
const loadProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found. Please log in.");
    }

    const response = await fetch(`${apiUrl}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile data`);
    }

    const data = await response.json();

    // Pastikan user_id tersedia dalam respons API
    if (!data.user_id) {
      console.error("user_id not found in API response");
      alert("Failed to load user data. Please contact support.");
      return;
    }

    // Simpan user_id ke localStorage
    localStorage.setItem("user_id", data.user_id);

    // Update profil
    document.getElementById("profile-name").textContent = data.name;
    document.getElementById("profile-email").textContent = data.email;
    document.getElementById("profile-picture").src = "img/default-avatar.png";

    console.log("Profile loaded successfully");
  } catch (error) {
    console.error("Error loading profile:", error.message);
    alert("Error loading profile data. Please try again.");
  }
};



// Fungsi untuk mengambil hasil tes dari backend
const fetchTestResults = async () => {
  const userId = localStorage.getItem("user_id");
  if (!userId) {
      console.error("User ID not found in localStorage.");
      document.querySelector(".test-cards").innerHTML = `<p>No test results found.</p>`;
      return;
  }

  try {
      const response = await fetch(`http://localhost:5001/api/test-results/${userId}`);
      if (!response.ok) {
          throw new Error("Failed to fetch test results.");
      }

      const result = await response.json();
      console.log("Test Results:", result); // Debugging
      renderTestResults(result);
  } catch (error) {
      console.error("Error fetching test results:", error);
      document.querySelector(".test-cards").innerHTML = `<p>Error loading test results. Please try again later.</p>`;
  }
};



const renderTestResults = (results) => {
  const testResultsContainer = document.querySelector(".test-cards");
  testResultsContainer.innerHTML = ""; // Kosongkan kontainer sebelumnya

  const renderCard = (testResult, testType) => {
      if (!testResult) return;

      const score = testResult.score || 0; // Default score 0 jika tidak ada
      const maxScore = testResult.max_score || 100; // Default max_score 100
      const testDate = testResult.submission_date
          ? new Date(testResult.submission_date).toLocaleDateString()
          : "Not Attempted";

      let scoreColor = "";
      if (score >= 90) {
          scoreColor = "#4caf50"; // Hijau untuk skor tinggi
      } else if (score >= 50) {
          scoreColor = "#ff9800"; // Oranye untuk skor sedang
      } else {
          scoreColor = "#f44336"; // Merah untuk skor rendah
      }

      const card = document.createElement("div");
      card.classList.add("test-card");
      card.innerHTML = `
          <div class="progress-ring" style="border-color: ${scoreColor};">
              <span class="score-text">${score}%</span>
          </div>
          <h3>${testType.replace("_", " ")}</h3>
          <p><strong>Date:</strong> ${testDate}</p>
      `;

      testResultsContainer.appendChild(card);
  };

  // Render hasil pre-reading, reading, dan post-reading
  renderCard(results.preReadingLab, "pre_reading_lab");
  renderCard(results.readingLab, "reading_lab");
  renderCard(results.postReadingLab, "post_reading_lab");
};



// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  loadProfile(); // Memuat profil pengguna
  fetchTestResults(); // Memuat hasil tes
});


// Fungsi untuk memuat progress video
const loadVideoProgress = async () => {
  const userId = localStorage.getItem("user_id");

  try {
      const response = await fetch(`${apiUrl}/videos/progress?user_id=${userId}`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
          },
      });

      let progressData;
      if (response.ok) {
          progressData = await response.json();
      } else {
          console.warn("No progress data found. Using default values.");
          progressData = [];
      }

      // Default progress untuk 4 section
      const defaultSections = [
          { section_name: "Introduction", progress: 0 },
          { section_name: "Paragraph", progress: 0 },
          { section_name: "Essay", progress: 0 },
          { section_name: "Citation", progress: 0 },
      ];

      // Gabungkan data dari backend dengan default data
      const finalData = defaultSections.map((defaultSection) => {
          const backendSection = progressData.find(
              (item) => item.section_name === defaultSection.section_name
          );
          return backendSection || defaultSection;
      });

      renderProgressBars(finalData);
  } catch (error) {
      console.error("Error loading video progress:", error.message);

      // Jika ada error, gunakan default data
      const defaultSections = [
          { section_name: "Introduction", progress: 0 },
          { section_name: "Paragraph", progress: 0 },
          { section_name: "Essay", progress: 0 },
          { section_name: "Citation", progress: 0 },
      ];
      renderProgressBars(defaultSections);
  }
};

// Fungsi untuk merender progress bar secara dinamis
const renderProgressBars = async () => {
  const userId = localStorage.getItem("user_id"); // Ambil user ID dari localStorage
  const progressContainer = document.querySelector(".progress-container");

  

  try {
      const response = await fetch(`http://localhost:5001/api/videos/progress?user_id=${userId}`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });

      if (!response.ok) {
          throw new Error(`Failed to fetch progress: ${response.status}`);
      }

      const progressData = await response.json(); // Ambil data dari backend
      const sections = ["Introduction", "Paragraph", "Essay", "Citation"]; // Semua section

      progressContainer.innerHTML = ""; // Kosongkan kontainer sebelum render ulang

      sections.forEach((sectionName) => {
          // Filter data untuk setiap section
          const sectionVideos = progressData.filter(
              (progress) => progress.section_name === sectionName
          );

          const totalVideos = sectionVideos.length;
          const watchedVideos = sectionVideos.filter((video) => video.watched).length;
          const completedPercentage = totalVideos > 0 ? (watchedVideos / totalVideos) * 100 : 0;

          const progressCategory = document.createElement("div");
          progressCategory.classList.add("progress-category");

          progressCategory.innerHTML = `
              <h3>${sectionName}</h3>
              <div class="progress-bar-container">
                  <div class="progress-bar ${
                      completedPercentage >= 90
                          ? "green"
                          : completedPercentage >= 70
                          ? "orange"
                          : "red"
                  }" style="width: ${completedPercentage}%;"></div>
              </div>
              <p>${Math.round(completedPercentage)}% Completed</p>
          `;

          progressContainer.appendChild(progressCategory);
      });

      console.log("Progress bars updated successfully!");
  } catch (error) {
      console.error("Error rendering progress bars:", error);
  }
};

// Jalankan fungsi ini saat halaman dimuat
document.addEventListener("DOMContentLoaded", renderProgressBars);




// Panggil fungsi loadVideoProgress saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadVideoProgress);


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
