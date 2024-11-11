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
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;

        try {
            const response = await fetch('http://localhost:5001/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registration successful!');
                window.location.href = 'login.html'; // Redirect to login page
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error registering user:', error);
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

        try {
            const response = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token); // Simpan token
                alert('Login successful!');
                window.location.href = 'index.html'; // Redirect ke halaman berikutnya
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Failed to connect to server.');
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
