// Function to toggle the visibility of the produce form
function toggleForm() {
    const form = document.getElementById('produce-form');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}

// Function to validate contact number (ensuring it's 10 digits)
function validateContact() {
    const contactInput = document.getElementById('contact');
    const contact = contactInput.value;
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contact)) {
        alert('Please enter a valid 10-digit contact number.');
        return false;
    }
    return true;
}

// Function to validate cost and selling price
function validateCost() {
    const costInput = document.getElementById('cost');
    const sellingPriceInput = document.getElementById('selling-price');

    const cost = parseFloat(costInput.value);
    const sellingPrice = parseFloat(sellingPriceInput.value);

    if (cost < 10000) {
        alert('Cost must be at least 10,000 UgX.');
        return false;
    }
    if (sellingPrice < 10000) {
        alert('Selling price must be at least 10,000 UgX.');
        return false;
    }
    if (sellingPrice < cost) {
        alert('Selling price should not be less than the cost.');
        return false;
    }
    return true;
}

// Function to validate the tonnage input (should be at least 1000kg)
function validateTonnage() {
    const tonnageInput = document.getElementById('tonnage');
    const tonnage = parseFloat(tonnageInput.value);

    if (tonnage < 1000) {
        alert('Tonnage should be at least 1000 kg.');
        return false;
    }
    return true;
}

// Function to handle form submission validation
function validateForm(event) {
    event.preventDefault();  // Prevent form submission if validation fails

    const isContactValid = validateContact();
    const isCostValid = validateCost();
    const isTonnageValid = validateTonnage();

    // Submit form if all validations pass
    if (isContactValid && isCostValid && isTonnageValid) {
        alert('Form submitted successfully!');
        // Use this line to submit form after validation if necessary
        // event.target.submit();
    }
}

// Adding event listener to form submission
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', validateForm);
}
