/**
 * =============================================================================
 * login.js – Alumni Portal Login & Registration Logic
 * -----------------------------------------------------------------------------
 * This script powers the login and signup forms for the L.N.D College Alumni Portal.
 * It ensures only registered alumni can access the dashboard, and guides new users
 * through a secure, validated registration process.
 *
 * Why this is needed:
 *   - Protects alumni-only features by requiring authentication.
 *   - Collects and validates user info for new registrations.
 *   - Provides clear feedback and smooth UI transitions for users.
 *
 * How it works:
 *   - Handles form switching, validation, and real-time feedback.
 *   - Sends login/signup requests to the backend API and processes responses.
 *   - Stores authentication tokens for session management.
 *   - Displays success/error messages and manages loading states.
 * =============================================================================
 */

// ==============================
// Department Data for Dropdowns
// ==============================

/**
 * Maps course types to available departments.
 * Used to dynamically populate the department dropdown based on course selection.
 */
const departmentData = {
    UG: [
        'ECONOMICS', 'ENGLISH', 'GEOGRAPHY', 'HINDI', 'HISTORY', 
        'PHILOSOPHY', 'POLITICAL SCIENCE', 'PSYCHOLOGY', 'URDU', 
        'BOTANY', 'CHEMISTRY', 'MATHEMATICS', 'PHYSICS', 'ZOOLOGY', 
        'BCA', 'BBA', 'BED'
    ],
    PG: [
        'ECONOMICS', 'GEOGRAPHY', 'HINDI', 'HISTORY', 
        'POLITICAL SCIENCE', 'PHYSICS', 'CHEMISTRY'
    ]
};

// ==============================
// DOM Element References
// ==============================

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const courseSelect = document.getElementById('course');
const departmentSelect = document.getElementById('department');
const messageContainer = document.getElementById('messageContainer');
const messageText = document.getElementById('messageText');
const messageElement = document.getElementById('message');

// ==============================
// Initialization on Page Load
// ==============================

/**
 * Sets up all event listeners and initial UI state when the DOM is ready.
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

// ==============================
// Event Listener Setup
// ==============================

/**
 * Attaches all necessary event listeners for form logic and validation.
 */
function initializeEventListeners() {
    // Update department dropdown when course changes
    courseSelect.addEventListener('change', handleCourseChange);

    // Handle login and signup form submissions
    document.getElementById('loginFormElement').addEventListener('submit', handleLogin);
    document.getElementById('signupFormElement').addEventListener('submit', handleSignup);

    // Enable real-time validation for fields
    setupRealTimeValidation();

    // Prevent accidental form submission via Enter in dropdowns
    preventEnterSubmission();
}

// ==============================
// Dynamic Department Dropdown
// ==============================

/**
 * Populates the department dropdown based on selected course.
 * Disables the dropdown if no course is selected.
 */
function handleCourseChange() {
    const selectedCourse = courseSelect.value;
    const departmentDropdown = document.getElementById('department');

    // Reset department options
    departmentDropdown.innerHTML = '<option value="">Select Department</option>';

    if (selectedCourse && departmentData[selectedCourse]) {
        departmentDropdown.disabled = false;
        // Add department options for the selected course
        departmentData[selectedCourse].forEach(dept => {
            const option = document.createElement('option');
            option.value = dept;
            option.textContent = dept;
            departmentDropdown.appendChild(option);
        });
        // Smooth fade-in effect
        departmentDropdown.style.opacity = '0.5';
        setTimeout(() => {
            departmentDropdown.style.opacity = '1';
        }, 150);
    } else {
        departmentDropdown.disabled = true;
    }
}

// ==============================
// Form Switching Logic
// ==============================

/**
 * Switches UI from login to signup form.
 * Resets login form and hides messages.
 */
function switchToSignup() {
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
    hideMessage();
    document.getElementById('loginFormElement').reset();
}

/**
 * Switches UI from signup to login form.
 * Resets signup form, hides messages, and disables department dropdown.
 */
function switchToLogin() {
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
    hideMessage();
    document.getElementById('signupFormElement').reset();
    departmentSelect.disabled = true;
    departmentSelect.innerHTML = '<option value="">Select Department</option>';
}

// ==============================
// Password Show/Hide Toggle
// ==============================

/**
 * Toggles password visibility for a given input field.
 * @param {string} inputId - The ID of the password input field.
 */
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = passwordInput.nextElementSibling;
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// ==============================
// Field Validation Functions
// ==============================

/**
 * Checks if a registration number is valid (alphanumeric, at least 6 chars).
 */
function validateRegistrationNumber(regNo) {
    const regNoPattern = /^[A-Za-z0-9]{6,}$/;
    return regNoPattern.test(regNo);
}

/**
 * Checks if a passing year is within allowed range.
 */
function validatePassingYear(year) {
    const numYear = parseInt(year);
    return numYear >= 1970 && numYear <= 2025;
}

/**
 * Checks if a password is strong (min 8 chars, at least one letter and number).
 */
function validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordPattern.test(password);
}

/**
 * Checks if an email address is valid.
 */
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// ==============================
// Real-time Validation Setup
// ==============================

/**
 * Adds blur event listeners to form fields for instant validation feedback.
 */
function setupRealTimeValidation() {
    // Registration number validation for both forms
    ['regNumber', 'loginRegNo'].forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('blur', function() {
                validateField(this, validateRegistrationNumber(this.value), 'Invalid registration number format');
            });
        }
    });

    // Passing year validation
    const yearInput = document.getElementById('signupPassingYear');
    if (yearInput) {
        yearInput.addEventListener('blur', function() {
            validateField(this, validatePassingYear(this.value), 'Year must be between 1970 and 2025');
        });
    }

    // Password validation
    const passwordInput = document.getElementById('signupPassword');
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            validateField(this, validatePassword(this.value), 'Password must be at least 8 characters with letters and numbers');
        });
    }

    // Confirm password validation
    const confirmPasswordInput = document.getElementById('confirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', function() {
            const password = document.getElementById('signupPassword').value;
            validateField(this, this.value === password, 'Passwords do not match');
        });
    }
}

/**
 * Adds/removes error or success styles and messages for a field.
 */
function validateField(inputElement, isValid, errorMessage) {
    const inputWrapper = inputElement.parentElement;
    inputWrapper.classList.remove('error', 'success');
    // Remove any previous error message
    const existingError = inputWrapper.querySelector('.error-message');
    if (existingError) existingError.remove();

    if (inputElement.value.trim() === '') return; // Skip empty fields

    if (isValid) {
        inputWrapper.classList.add('success');
        inputElement.style.borderColor = '#48bb78';
    } else {
        inputWrapper.classList.add('error');
        inputElement.style.borderColor = '#f56565';
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#f56565';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = errorMessage;
        inputWrapper.appendChild(errorDiv);
    }
}

// ==============================
// Signup Data Validation
// ==============================

/**
 * Validates all signup form fields before submission.
 * Checks for required fields, format, and password match.
 */
function validateSignupData(data) {
    if (!data.name || !data.fatherName || !data.course || !data.department ||
        !data.regNo || !data.passingYear || !data.password || !data.confirmPassword) {
        return { isValid: false, message: 'Please fill in all required fields' };
    }
    if (!validateRegistrationNumber(data.regNo)) {
        return { isValid: false, message: 'Invalid registration number format' };
    }
    // Check for duplicate registration number in local storage (client-side only)
    const existingUsers = getStoredUsers();
    if (existingUsers.find(user => user.regNo === data.regNo)) {
        return { isValid: false, message: 'Registration number already exists' };
    }
    if (!validatePassingYear(data.passingYear)) {
        return { isValid: false, message: 'Year must be between 1970 and 2025' };
    }
    if (!validatePassword(data.password)) {
        return { isValid: false, message: 'Password must be at least 8 characters with letters and numbers' };
    }
    if (data.password !== data.confirmPassword) {
        return { isValid: false, message: 'Passwords do not match' };
    }
    return { isValid: true };
}

// ==============================
// Local Storage Helpers
// ==============================

/**
 * Retrieves locally stored users (for client-side duplicate check).
 */
function getStoredUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// ==============================
// Token Management Helpers
// ==============================

/**
 * Gets the current user's auth token from localStorage.
 */
function gettoken() {
    return localStorage.getItem('token');
}

/**
 * Removes the auth token from localStorage (logout).
 */
function removetoken() {
    localStorage.removeItem('token');
}

/**
 * Checks if a user is currently logged in.
 */
function isUserLoggedIn() {
    return !!gettoken();
}

// ==============================
// Message Display Helpers
// ==============================

/**
 * Shows a success or error message in the UI.
 * @param {string} text - The message to display.
 * @param {string} type - 'success' or 'error'.
 */
function showMessage(text, type = 'success') {
    messageText.textContent = text;
    messageElement.className = `message ${type}`;
    // Set icon based on message type
    const icon = messageElement.querySelector('i');
    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
    } else if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle';
    }
    messageContainer.classList.add('show');
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideMessage();
    }, 5000);
}

/**
 * Hides the message area.
 */
function hideMessage() {
    messageContainer.classList.remove('show');
}

// ==============================
// Button Loading State Helpers
// ==============================

/**
 * Shows or hides a loading state on a button during async actions.
 * @param {HTMLButtonElement} button
 * @param {boolean} isLoading
 */
function showLoadingState(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        const span = button.querySelector('span');
        span.textContent = 'Processing...';
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        const span = button.querySelector('span');
        // Restore original text based on button context
        if (button.closest('#loginForm')) {
            span.textContent = 'Sign In';
        } else {
            span.textContent = 'Create Account';
        }
    }
}

// ==============================
// Prevent Enter Key Submission
// ==============================

/**
 * Prevents form submission when pressing Enter in dropdown fields.
 */
function preventEnterSubmission() {
    const preventEnterFields = ['course', 'department'];
    preventEnterFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                }
            });
        }
    });
}

// ==============================
// API Configuration & Helpers
// ==============================

/** Base URL for backend API requests */
const API_BASE_URL = 'https://setu.fit';

/**
 * Makes an API call to the backend.
 * Handles JSON requests and responses, and throws on error.
 * @param {string} endpoint - API endpoint (e.g., '/api/auth/login')
 * @param {string} method - HTTP method ('GET', 'POST', etc.)
 * @param {object|null} data - Data to send (for POST/PUT)
 * @returns {Promise<object>} - Parsed JSON response
 */
async function makeApiCall(endpoint, method = 'GET', data = null) {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
    }
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || `HTTP error! status: ${response.status}`);
        }
        return result;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// ==============================
// Form Submission Handlers
// ==============================

/**
 * Handles login form submission.
 * Validates input, sends login request, stores token, and redirects on success.
 */
async function handleLogin(e) {
    e.preventDefault();

    const loginData = {
        regNo: document.getElementById('loginRegNo').value.trim(),
        password: document.getElementById('loginPassword').value
    };

    // Validate required fields
    if (!loginData.regNo || !loginData.password) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }
    if (!validateRegistrationNumber(loginData.regNo)) {
        showMessage('Invalid registration number format', 'error');
        return;
    }

    // Show loading spinner on button
    const submitBtn = e.target.querySelector('button[type="submit"]');
    showLoadingState(submitBtn, true);

    try {
        // Send login request to backend
        const response = await makeApiCall('/api/auth/login', 'POST', loginData);

        showLoadingState(submitBtn, false);

        if (response.success) {
            // Store token for session management
            if (response.token) {
                localStorage.setItem('token', response.token);
            }
            showMessage(`Welcome back, ${response.user?.name || 'User'}!`, 'success');
            // Redirect to dashboard after short delay
            setTimeout(() => {
                window.location.href = response.redirectUrl || 'dashboard.html';
            }, 1500);
        } else {
            showMessage(response.message || 'Login failed', 'error');
        }
    } catch (error) {
        showLoadingState(submitBtn, false);
        if (error.message.includes('fetch')) {
            showMessage('Unable to connect to server. Please check if the backend is running.', 'error');
        } else {
            showMessage(error.message || 'Login failed. Please try again.', 'error');
        }
    }
}

/**
 * Handles signup form submission.
 * Validates input, sends registration request, and switches to login on success.
 */
async function handleSignup(e) {
    e.preventDefault();

    const signupData = {
        name: document.getElementById('name').value.trim(),
        fatherName: document.getElementById('fatherName').value.trim(),
        course: document.getElementById('course').value,
        department: document.getElementById('department').value,
        regNo: document.getElementById('regNumber').value.trim(),
        passingYear: document.getElementById('signupPassingYear').value,
        password: document.getElementById('signupPassword').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        currentPosition: document.getElementById('currentPosition') ? document.getElementById('currentPosition').value.trim() : "",
        currentCompany: document.getElementById('currentCompany') ? document.getElementById('currentCompany').value.trim() : ""
    };

    // Validate all signup fields
    const validationResult = validateSignupData(signupData);
    if (!validationResult.isValid) {
        showMessage(validationResult.message, 'error');
        return;
    }

    // Show loading spinner on button
    const submitBtn = e.target.querySelector('button[type="submit"]');
    showLoadingState(submitBtn, true);

    try {
        // Remove confirmPassword before sending to backend
        const { confirmPassword, ...dataToSend } = signupData;

        // Send signup request to backend
        const response = await makeApiCall('/api/auth/register', 'POST', dataToSend);

        showLoadingState(submitBtn, false);

        if (response.success) {
            showMessage('Account created successfully! You can now sign in.', 'success');
            // Switch to login after short delay
            setTimeout(() => {
                switchToLogin();
            }, 2000);
        } else {
            showMessage(response.message || 'Signup failed', 'error');
        }
    } catch (error) {
        showLoadingState(submitBtn, false);
        if (error.message.includes('fetch')) {
            showMessage('Unable to connect to server. Please check if the backend is running.', 'error');
        } else {
            showMessage(error.message || 'Signup failed. Please try again.', 'error');
        }
    }
}
