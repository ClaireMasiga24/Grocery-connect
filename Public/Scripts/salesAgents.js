document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sales-form');
    const salesTableBody = document.getElementById('sales-table-body');

    // Example sales data
    const sales = [];

    // Function to add sales
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect form data
        const produceName = document.getElementById('produce-name').value;
        const quantity = parseInt(document.getElementById('quantity').value, 10);
        const amountPaid = parseInt(document.getElementById('amount-paid').value, 10);
        const buyerName = document.getElementById('buyer-name').value;
        const agentName = document.getElementById('agent-name').value;
        const saleDate = document.getElementById('sale-date').value;
        const saleTime = document.getElementById('sale-time').value;

        // Create sales object
        const sale = {
            produceName,
            quantity,
            amountPaid,
            buyerName,
            agentName,
            saleDate,
            saleTime
        };

        // Add to sales array (simulating a database)
        sales.push(sale);

        // Update the sales table
        updateSalesTable();

        // Reset form
        form.reset();
    });

    // Function to update the sales table
    function updateSalesTable() {
        salesTableBody.innerHTML = '';
        sales.forEach((sale) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sale.produceName}</td>
                <td>${sale.quantity}</td>
                <td>${sale.amountPaid}</td>
                <td>${sale.buyerName}</td>
                <td>${sale.agentName}</td>
                <td>${sale.saleDate}</td>
                <td>${sale.saleTime}</td>
            `;
            salesTableBody.appendChild(row);
        });
    }
});
