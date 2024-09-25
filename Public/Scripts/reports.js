document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("report-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form data
        const reportTitle = document.getElementById("reportTitle").value;
        const reportDescription = document.getElementById("reportDescription").value;

        // Create an object with the form data
        const reportData = {
            title: reportTitle,
            description: reportDescription
        };

        // Send the form data to the server using fetch
        fetch('/api/submit-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Report submitted successfully!');
                form.reset(); // Clear the form after successful submission
            } else {
                alert('Failed to submit report');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
