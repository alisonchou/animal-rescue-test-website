const form = document.querySelector('form');
const requiredFields = ['name', 'email', 'interest', 'message'];

form.noValidate = true;

function showError(field, message) {
  const error = document.createElement('span');
  error.className = 'error';
  error.textContent = message;
  field.parentElement.appendChild(error);
}

function removeError(field) {
  const error = field.nextElementSibling;
  if (error && error.className === 'error') {
    error.remove();
  }
}

function isValidEmail(value) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value);
}

function validateField(field) {
  removeError(field);
  const value = field.value.trim();

  if (value === '') {
    showError(field, 'This field is required.');
    return false;
  }

  if (field.type === 'email' && !isValidEmail(value)) {
    showError(field, 'Enter a valid email, e.g., myemail@example.com.');
    return false;
  }

  return true;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const results = requiredFields.map((field) => 
    validateField(form.elements[field])
  );

  if (results.includes(false)) {
    return;
  }

  alert('Successfully submitted');
  form.reset();
});

form.addEventListener('input', (event) => removeError(event.target));
