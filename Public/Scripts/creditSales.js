document.addEventListener('DOMContentLoaded', () => {
    const creditSalesForm = document.getElementById('credit-sales-form');
    const creditSalesContent = document.getElementById('credit-sales-content');

    creditSalesForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(creditSalesForm);
        const data = Object.fromEntries(formData);

        fetch('api/credit-sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Credit sale recorded successfully.');
                loadCreditSales();
            } else {
                alert('Error recording credit sale.');
            }
        })
        .catch(error => console.error('Error:', error));
    });

    function loadCreditSales() {
        fetch('api/credit-sales')
            .then(response => response.json())
            .then(data => {
                // Assuming `data` is an array of credit sales records
                creditSalesContent.innerHTML = data.map(sale => `
                    <div class="credit-sale-record">
                        <p><strong>Buyer Name:</strong> ${sale.buyerName}</p>
                        <p><strong>National ID:</strong> ${sale.nationalId}</p>
                        <p><strong>Location:</strong> ${sale.location}</p>
                        <p><strong>Contacts:</strong> ${sale.contacts}</p>
                        <p><strong>Amount Due:</strong> UGX ${sale.amountDue}</p>
                        <p><strong>Sales Agent Name:</strong> ${sale.salesAgentName}</p>
                        <p><strong>Due Date:</strong> ${sale.dueDate}</p>
                        <p><strong>Produce Name:</strong> ${sale.produceName}</p>
                        <p><strong>Produce Type:</strong> ${sale.produceType}</p>
                        <p><strong>Tonnage:</strong> ${sale.tonnage} kg</p>
                        <p><strong>Date of Dispatch:</strong> ${sale.dispatchDate}</p>
                    </div>
                `).join('');
            })
            .catch(error => console.error('Error loading credit sales:', error));
    }

    // Initial load
    loadCreditSales();
});
