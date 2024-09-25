document.addEventListener('DOMContentLoaded', () => {
    const settingsForm = document.getElementById('settings-form');
    const settingsContent = document.getElementById('settings-content');

    settingsForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(settingsForm);
        const data = Object.fromEntries(formData);

        fetch('api/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Settings updated successfully.');
                loadSettings();
            } else {
                alert('Error updating settings.');
            }
        })
        .catch(error => console.error('Error:', error));
    });

    function loadSettings() {
        fetch('api/settings')
            .then(response => response.json())
            .then(data => {
                // Assuming `data` contains current settings information
                settingsContent.innerHTML = `
                    <p><strong>Username:</strong> ${data.username}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Notification Settings:</strong> ${data.notificationSettings}</p>
                    <p><strong>Timezone:</strong> ${data.timezone}</p>
                    <p><strong>Preferred Language:</strong> ${data.language}</p>
                `;
            })
            .catch(error => console.error('Error loading settings:', error));
    }

    // Initial load
    loadSettings();
});
