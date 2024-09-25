document.getElementById('stock-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the values from the form
    const produceName = document.getElementById('produce-name').value;
    const stockQuantity = parseInt(document.getElementById('stock-quantity').value);
    const branch = document.getElementById('branch').value;
    const produceImage = document.getElementById('produce-image').files[0];

    // Create a new row in the table
    const tableBody = document.getElementById('stock-table-body');
    const newRow = document.createElement('tr');

    // Create Image Cell
    const imageCell = document.createElement('td');
    const imgElement = document.createElement('img');
    const reader = new FileReader();
    reader.onload = function (e) {
        imgElement.src = e.target.result;
    }
    reader.readAsDataURL(produceImage);
    imageCell.appendChild(imgElement);

    // Create Produce Name, Quantity, and Branch Cells
    const produceCell = document.createElement('td');
    produceCell.textContent = produceName;

    const quantityCell = document.createElement('td');
    quantityCell.textContent = stockQuantity;

    const branchCell = document.createElement('td');
    branchCell.textContent = branch;

    // Append all cells to the row
    newRow.appendChild(imageCell);
    newRow.appendChild(produceCell);
    newRow.appendChild(quantityCell);
    newRow.appendChild(branchCell);

    // Add the row to the table body
    tableBody.appendChild(newRow);

    // Check for low stock and show an alert
    if (stockQuantity < 50) {
        const stockAlert = document.getElementById('stock-alert');
        stockAlert.textContent = `${produceName} stock is low: only ${stockQuantity}kg remaining in ${branch}`;
        stockAlert.style.display = 'block';
    }

    // Clear the form after submission
    document.getElementById('stock-form').reset();
});
