let token = localStorage.getItem('token');
let userRole = localStorage.getItem('userRole');

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginForm = document.getElementById('loginForm');
const salesAgentSection = document.getElementById('salesAgentSection');
const managerSection = document.getElementById('managerSection');
const salesAggregation = document.getElementById('salesAggregation');

loginBtn.addEventListener('click', () => {
    loginForm.style.display = 'block';
    loginBtn.style.display = 'none';
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    token = null;
    userRole = null;
    location.reload();
});

document.getElementById('submitLogin').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.querySelector('input[name="role"]:checked').value; // Assuming you have radio buttons for role

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role })
        });

        const data = await response.json();
        if (data.success) {
            token = data.token; // Correctly retrieve token from the response
            localStorage.setItem('token', token);
            userRole = data.role;
            localStorage.setItem('userRole', userRole);
            showUserSection();
        } else {
            alert(data.message); // Display error message from response
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    }
});

document.getElementById('submitProduce').addEventListener('click', async () => {
    const name = document.getElementById('produceName').value;
    const quantity = document.getElementById('produceQuantity').value;
    const price = document.getElementById('producePrice').value;
    const branch = document.getElementById('produceBranch').value;

    try {
        const response = await fetch('/api/produce', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-auth-token': token // Ensure token is included
            },
            body: JSON.stringify({ name, quantity, price, branch })
        });

        if (response.ok) {
            alert('Produce recorded successfully');
        } else {
            alert('Failed to record produce');
        }
    } catch (error) {
        console.error('Error during produce recording:', error);
        alert('An error occurred while recording produce.');
    }
});

document.getElementById('submitSale').addEventListener('click', async () => {
    const produce = document.getElementById('produceSelect').value;
    const quantity = document.getElementById('saleQuantity').value;
    const branch = document.getElementById('saleBranch').value;

    try {
        const response = await fetch('/api/sales', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-auth-token': token // Ensure token is included
            },
            body: JSON.stringify({ produce, quantity, branch })
        });

        if (response.ok) {
            alert('Sale recorded successfully');
        } else {
            alert('Failed to record sale');
        }
    } catch (error) {
        console.error('Error during sale recording:', error);
        alert('An error occurred while recording sale.');
    }
});

async function showUserSection() {
    loginForm.style.display = 'none';
    logoutBtn.style.display = 'block';

    if (userRole === 'sales_agent') {
        salesAgentSection.style.display = 'block';
    } else if (userRole === 'manager') {
        managerSection.style.display = 'block';
        await loadProduceOptions(); // Ensure you wait for options to load
    }

    salesAggregation.style.display = 'block';
    await loadSalesAggregation(); // Ensure you wait for aggregation to load
}

async function loadProduceOptions() {
    try {
        const response = await fetch('/api/produce', {
            headers: { 'x-auth-token': token }
        });
        const produce = await response.json();
        const select = document.getElementById('produceSelect');
        select.innerHTML = ''; // Clear previous options
        produce.forEach(item => {
            const option = document.createElement('option');
            option.value = item._id;
            option.textContent = item.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading produce options:', error);
    }
}

async function loadSalesAggregation() {
    try {
        const response = await fetch('/api/sales/aggregation', {
            headers: { 'x-auth-token': token }
        });
        const aggregation = await response.json();
        const resultsDiv = document.getElementById('aggregationResults');
        resultsDiv.innerHTML = ''; // Clear previous results
        aggregation.forEach(branch => {
            resultsDiv.innerHTML += `
                <p>Branch: ${branch._id}</p>
                <p>Total Sales: $${branch.totalSales.toFixed(2)}</p>
                <p>Total Quantity: ${branch.totalQuantity}</p>
                <hr>
            `;
        });
    } catch (error) {
        console.error('Error loading sales aggregation:', error);
    }
}

if (token) {
    showUserSection();
}
