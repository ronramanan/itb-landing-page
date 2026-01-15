(function() {
  'use strict';

  const FORM_ENDPOINT = 'https://aulrbkdftasdrtctsvzr.supabase.co/functions/v1/itb-registration-form';
  // Using Google's Test Key for reCAPTCHA v2. Replace with your own site key in production.


  const COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
    "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
    "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
    "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo",
    "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
    "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
    "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
    "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
    "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const styles = `
    .itb-form-container {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      max-width: 520px;
      margin: 0 auto;
      padding: 32px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    }
    .itb-form-group {
      margin-bottom: 20px;
    }
    .itb-form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 20px;
    }
    .itb-form-row .itb-form-group {
      margin-bottom: 0;
    }
    .itb-form-row.half {
      grid-template-columns: 1fr 1fr;
    }
    .itb-form-row.half .itb-form-spacer {
      display: block;
    }
    .itb-form-label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #374151;
      margin-bottom: 8px;
    }
    .itb-form-label span.required {
      color: #dc2626;
    }
    .itb-form-input,
    .itb-form-select {
      width: 100%;
      padding: 14px 16px;
      font-size: 15px;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      background: #ffffff;
      color: #1f2937;
      transition: border-color 0.2s, box-shadow 0.2s;
      box-sizing: border-box;
    }
    .itb-form-input:focus,
    .itb-form-select:focus {
      outline: none;
      border-color: #334580;
      box-shadow: 0 0 0 3px rgba(51, 69, 128, 0.1);
    }
    .itb-form-input::placeholder {
      color: #9ca3af;
    }

    .itb-form-select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 14px center;
      padding-right: 44px;
    }
    .itb-form-submit {
      width: 100%;
      padding: 16px 24px;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      background: #334580;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
      margin-top: 8px;
    }
    .itb-form-submit:hover {
      background: #283660;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(51, 69, 128, 0.3);
    }
    .itb-form-submit:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }
    .itb-form-submit svg {
      width: 18px;
      height: 18px;
    }
    .itb-form-message {
      padding: 12px 16px;
      border-radius: 12px;
      margin-top: 16px;
      font-size: 14px;
      text-align: center;
    }
    .itb-form-message.success {
      background: #dcfce7;
      color: #166534;
      border: 1px solid #bbf7d0;
    }
    .itb-form-message.error {
      background: #fef2f2;
      color: #dc2626;
      border: 1px solid #fecaca;
    }
    .itb-form-error {
      color: #dc2626;
      font-size: 12px;
      margin-top: 4px;
    }
    .itb-spinner {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: itb-spin 0.8s linear infinite;
    }
    @keyframes itb-spin {
      to { transform: rotate(360deg); }
    }
    @media (max-width: 520px) {
      .itb-form-container {
        padding: 24px 20px;
        margin: 0 16px;
      }
      .itb-form-row {
        grid-template-columns: 1fr;
        gap: 0;
      }
      .itb-form-row .itb-form-group {
        margin-bottom: 20px;
      }
      .itb-form-row.half .itb-form-spacer {
        display: none;
      }
    }
  `;

  function createForm() {
    const container = document.getElementById('itb-registration-form');
    if (!container) {
      console.error('ITB Form: Container element #itb-registration-form not found');
      return;
    }

    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // Create country options
    const countryOptions = COUNTRIES.map(c => `<option value="${c}">${c}</option>`).join('');

    // Create form HTML
    container.innerHTML = `
      <div class="itb-form-container">
        <form id="itb-form" novalidate>
          <div class="itb-form-group">
            <label class="itb-form-label">Full Name <span class="required">*</span></label>
            <input type="text" name="full_name" class="itb-form-input" placeholder="e.g. Sarah Connor" required>
          </div>
          <div class="itb-form-row">
            <div class="itb-form-group">
              <label class="itb-form-label">Agency Name <span class="required">*</span></label>
              <input type="text" name="agency_name" class="itb-form-input" placeholder="Sky Travels" required>
            </div>
            <div class="itb-form-group">
              <label class="itb-form-label">Email <span class="required">*</span></label>
              <input type="email" name="email" class="itb-form-input" placeholder="sarah@skytravels.com" required>
            </div>
          </div>
          <div class="itb-form-row half">
            <div class="itb-form-group">
              <label class="itb-form-label">Country <span class="required">*</span></label>
              <select name="country" class="itb-form-select" required>
                <option value="">Select your country</option>
                ${countryOptions}
              </select>
            </div>
            <div class="itb-form-spacer"></div>
          </div>
          <div class="itb-form-group">
            <label class="itb-form-label">Attending ITB Berlin? <span class="required">*</span></label>
            <select name="attending_itb" class="itb-form-select" required>
              <option value="">Select an option</option>
              <option value="yes_definitely">Yes, definitely</option>
              <option value="planning_to">Planning to</option>
              <option value="not_sure">Not sure</option>
            </select>
          </div>



          <button type="submit" class="itb-form-submit">
            <span>Reserve My Spot</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </form>
        <div id="itb-form-message" style="display: none;"></div>
      </div>
    `;

    // Attach event listener
    const form = document.getElementById('itb-form');
    form.addEventListener('submit', handleSubmit);
    

  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showMessage(type, message) {
    const msgEl = document.getElementById('itb-form-message');
    msgEl.className = 'itb-form-message ' + type;
    msgEl.textContent = message;
    msgEl.style.display = 'block';
  }

  function clearErrors() {
    const errors = document.querySelectorAll('.itb-form-error');
    errors.forEach(el => el.remove());
  }

  function showFieldError(fieldName, message) {
    const input = document.querySelector(`[name="${fieldName}"]`);
    if (input) {
      const error = document.createElement('div');
      error.className = 'itb-form-error';
      error.textContent = message;
      input.parentNode.appendChild(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    clearErrors();

    const form = e.target;
    const submitBtn = form.querySelector('.itb-form-submit');
    const msgEl = document.getElementById('itb-form-message');
    msgEl.style.display = 'none';

    // Get form data
    const formData = new FormData(form);
    const data = {
      full_name: formData.get('full_name')?.trim() || '',
      agency_name: formData.get('agency_name')?.trim() || '',
      email: formData.get('email')?.trim() || '',
      country: formData.get('country') || '',
      attending_itb: formData.get('attending_itb') || '',
    };

    // Client-side validation
    let hasErrors = false;
    if (!data.full_name) {
      showFieldError('full_name', 'Full name is required');
      hasErrors = true;
    }
    if (!data.agency_name) {
      showFieldError('agency_name', 'Agency name is required');
      hasErrors = true;
    }
    if (!data.email) {
      showFieldError('email', 'Email is required');
      hasErrors = true;
    } else if (!validateEmail(data.email)) {
      showFieldError('email', 'Please enter a valid email address');
      hasErrors = true;
    }
    if (!data.country) {
      showFieldError('country', 'Please select your country');
      hasErrors = true;
    }
    if (!data.attending_itb) {
      showFieldError('attending_itb', 'Please select an option');
      hasErrors = true;
    }



    if (hasErrors) return;

    // Show loading state
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="itb-spinner"></div><span>Submitting...</span>';
    submitBtn.disabled = true;

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showMessage('success', result.message || 'Registration successful! We will contact you soon.');
        form.reset();

      } else {
        showMessage('error', result.error || 'Something went wrong. Please try again.');

      }
    } catch (error) {
      console.error('ITB Form Error:', error);
      showMessage('error', 'Network error. Please check your connection and try again.');
    } finally {
      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createForm);
  } else {
    createForm();
  }
})();
