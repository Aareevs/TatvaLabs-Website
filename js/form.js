/* ============================================
   TATVA LABS — Contact Form Validation
   Client-side validation with visual feedback
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: {
      el: document.getElementById('contact-name'),
      error: document.getElementById('error-name'),
      validate: (val) => val.trim().length >= 2 ? '' : 'Please enter your name (at least 2 characters)'
    },
    email: {
      el: document.getElementById('contact-email'),
      error: document.getElementById('error-email'),
      validate: (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val.trim()) return 'Please enter your email';
        if (!emailRegex.test(val)) return 'Please enter a valid email address';
        return '';
      }
    },
    subject: {
      el: document.getElementById('contact-subject'),
      error: document.getElementById('error-subject'),
      validate: (val) => val.trim().length >= 3 ? '' : 'Please enter a subject (at least 3 characters)'
    },
    message: {
      el: document.getElementById('contact-message'),
      error: document.getElementById('error-message'),
      validate: (val) => val.trim().length >= 10 ? '' : 'Please enter a message (at least 10 characters)'
    }
  };

  // Real-time validation on blur
  Object.values(fields).forEach(field => {
    if (field.el) {
      field.el.addEventListener('blur', () => {
        validateField(field);
      });

      field.el.addEventListener('input', () => {
        // Clear error on typing
        if (field.el.classList.contains('error')) {
          clearFieldError(field);
        }
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    Object.values(fields).forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      showSuccess(form);
    }
  });
}

function validateField(field) {
  if (!field.el) return true;

  const errorMsg = field.validate(field.el.value);

  if (errorMsg) {
    field.el.classList.add('error');
    if (field.error) {
      field.error.textContent = errorMsg;
      field.error.classList.add('visible');
    }
    return false;
  } else {
    clearFieldError(field);
    return true;
  }
}

function clearFieldError(field) {
  field.el.classList.remove('error');
  if (field.error) {
    field.error.textContent = '';
    field.error.classList.remove('visible');
  }
}

function showSuccess(form) {
  const formFields = form.querySelector('.contact-form__fields');
  const successMsg = form.querySelector('.contact-form__success');

  if (formFields && successMsg) {
    formFields.style.display = 'none';
    successMsg.classList.add('visible');
  }
}
