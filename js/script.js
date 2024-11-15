console.log('Script.js loaded');

const dropzones = document.querySelectorAll('.dropzone');

// Menangani drag & drop functionality
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

// Fungsi untuk menghandle form register
console.log('Script.js loaded');

// Fungsi untuk menangani form registrasi
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        // Validasi input
        if (!name || !email || !password) {
            alert('All fields are required.');
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            alert('Invalid email format.');
            return;
        }

        try {
            const response = await fetch('https://engsight-be-production.up.railway.app/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registration successful!');
                window.location.href = 'login.html'; // Redirect ke halaman login
            } else {
                console.error('Error response:', data);
                alert(`Error: ${data.message || 'An unknown error occurred.'}`);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Failed to connect to the server.');
        }
    });
}


// Fungsi untuk menghandle form login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        console.log(`Login attempt with Email: ${email}, Password: ${password}`);

        try {
            const response = await fetch('https://engsight-be-production.up.railway.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                console.error('Error response:', data);
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Failed to connect to the server.');
        }
    });
}



// Cek apakah user sudah login
const token = localStorage.getItem('token');
const profileMenu = document.querySelector('.profile-menu');
const signUpLink = document.querySelector('nav ul li:nth-child(1)'); // Sign Up
const signInLink = document.querySelector('nav ul li:nth-child(2)'); // Sign In

if (token) {
    // Jika user sudah login, tampilkan Profile, sembunyikan Sign Up & Sign In
    profileMenu?.classList.remove('hidden');
    signUpLink?.classList.add('hidden');
    signInLink?.classList.add('hidden');
    console.log('User is logged in. Showing profile menu.');
} else {
    // Jika user belum login, tampilkan Sign Up & Sign In, sembunyikan Profile
    profileMenu?.classList.add('hidden');
    signUpLink?.classList.remove('hidden');
    signInLink?.classList.remove('hidden');
    console.log('User is not logged in. Showing Sign Up & Sign In.');
}

// Logika untuk tombol logout
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', function () {
        const confirmLogout = confirm('Are you sure want to log out?');
        if (confirmLogout) {
            // Hapus token dari localStorage
            localStorage.removeItem('token');
            alert('Logged out successfully!');
            window.location.href = 'login.html'; // Redirect ke login page
        }
    });
}

// Tampilkan dropdown menu saat kursor di atas Profile
const profileLink = document.querySelector('.profile-link');
const dropdown = document.querySelector('.dropdown');
if (profileLink && dropdown) {
    profileLink.addEventListener('mouseover', function () {
        dropdown.classList.remove('hidden');
    });

    profileLink.addEventListener('mouseout', function () {
        dropdown.classList.add('hidden');
    });

    // Tambahkan listener pada dropdown agar tidak langsung hilang saat hover
    dropdown.addEventListener('mouseover', function () {
        dropdown.classList.remove('hidden');
    });
    dropdown.addEventListener('mouseout', function () {
        dropdown.classList.add('hidden');
    });
}

// Fungsi untuk menangani tombol "Start Now" di index.html
const startNowButton = document.getElementById('start-now');
if (startNowButton) {
    console.log('Start Now button found!');
    startNowButton.addEventListener('click', function () {
        console.log('Start Now button clicked!');
        const token = localStorage.getItem('token');
        console.log('Token:', token);

        if (token) {
            console.log('User is logged in. Redirecting to pre-reading...');
            window.location.href = 'pre-reading.html';
        } else {
            console.log('User is not logged in. Redirecting to login...');
            alert('You need to log in first!');
            window.location.href = 'login.html';
        }
    });
} else {
    console.error('Start Now button not found!');
}

// Handle logout from anywhere in the application
document.addEventListener('DOMContentLoaded', () => {
    const globalLogoutButton = document.querySelector('.logout');
    
    if (globalLogoutButton) {
        globalLogoutButton.addEventListener('click', () => {
            const confirmLogout = confirm("Are you sure you want to log out?");
            if (confirmLogout) {
                window.location.href = 'login.html';
            }
        });
    }
});

// Fetch user profile data and update the profile page
document.addEventListener('DOMContentLoaded', () => {
    const profileNameElement = document.getElementById('profile-name');
    const profileEmailElement = document.getElementById('profile-email');

    if (profileNameElement && profileEmailElement) {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found. Redirecting to login.');
            window.location.href = 'login.html'; // Redirect to login if not authenticated
            return;
        }

        fetch('https://engsight-be-production.up.railway.app/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.name && data.email) {
                profileNameElement.textContent = data.name;
                profileEmailElement.textContent = data.email;
                console.log('Profile data loaded:', data);
            } else {
                console.error('Incomplete profile data received:', data);
            }
        })
        .catch(error => {
            console.error('Error fetching profile data:', error);
            profileNameElement.textContent = 'Error loading name';
            profileEmailElement.textContent = 'Error loading email';
        });
    }
});

const trackVideoProgress = async (videoId, sectionName) => {
    const userId = localStorage.getItem("user_id"); // Pastikan user_id tersimpan di localStorage

    console.log("trackVideoProgress called with:", { userId, videoId, sectionName });

    try {
        const response = await fetch(`${apiUrl}/videos/progress`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                user_id: userId, // Gunakan nama variabel sesuai database
                video_id: videoId,
                section_name: sectionName,
            }),
        });

        if (response.ok) {
            console.log("Progress saved successfully.");
        } else {
            console.error("Failed to save progress. Response status:", response.status);
        }
    } catch (error) {
        console.error("Error saving progress:", error);
    }
};

