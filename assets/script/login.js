// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('loginForm');

//   form.addEventListener('submit', function (e) {
//     e.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     if (email === 'admin@gmail.com' && password === '123456') {
//       const user = {
//         name: 'Administrator',
//         email: email,
//       };

//       localStorage.setItem('user', JSON.stringify(user));

//       window.location.href = 'main_admin.html';
//     } else {
//       alert('Invalid Login');
//     }
//   });
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('loginForm');

//   if (form) {
//     form.addEventListener('submit', async function (e) {
//       e.preventDefault();

//       const email = document.getElementById('email').value;
//       const password = document.getElementById('password').value;

//       try {
//         const response = await fetch('/api/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email, password }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           localStorage.setItem('token', data.token);
//           localStorage.setItem('user', JSON.stringify(data.user));

//           window.location.href = 'main_admin.html';
//         } else {
//           alert(data.message || 'Invalid Login');
//         }
//       } catch (error) {
//         console.error('Login error:', error);
//         alert('Cannot connect to the server/database!');
//       }
//     });
//   }
// });

/////===================== Log In Sample ==================

lucide.createIcons();

// Toggle Password Visibility
const togglePasswordBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePasswordBtn.addEventListener('click', () => {
  const type =
    passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  // Update eye icon state
  const eyeIcon = togglePasswordBtn.querySelector('svg');
  if (type === 'text') {
    eyeIcon.setAttribute('data-lucide', 'eye-off');
  } else {
    eyeIcon.setAttribute('data-lucide', 'eye');
  }
  lucide.createIcons();
});

// Form Submit Handler
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Login attempt submitted!');
});
