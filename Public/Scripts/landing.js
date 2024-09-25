document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#search-button').addEventListener('click', performSearch);
});

function performSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();

    // Check and hide/show stock items based on search query
    const stockItems = document.querySelectorAll('#stock-available .stock-item');
    stockItems.forEach(item => {
        const itemName = item.querySelector('h3').textContent.toLowerCase();
        const itemDescription = item.querySelector('p').textContent.toLowerCase();
        if (itemName.includes(query) || itemDescription.includes(query)) {
            item.style.display = ''; // Show matching item
        } else {
            item.style.display = 'none'; // Hide non-matching item
        }
    });

    // Check and hide/show low stock alerts based on search query
    const alertItems = document.querySelectorAll('.low-stock-alerts .alert-item');
    alertItems.forEach(alert => {
        const alertText = alert.textContent.toLowerCase();
        if (alertText.includes(query)) {
            alert.style.display = ''; // Show matching alert
        } else {
            alert.style.display = 'none'; // Hide non-matching alert
        }
    });

    // Optionally, you can also search through other sections
    // Example: Searching through the main banner
    const bannerContent = document.querySelector('.banner-content');
    const bannerText = bannerContent ? bannerContent.textContent.toLowerCase() : '';
    if (bannerText.includes(query)) {
        bannerContent.style.display = ''; // Show matching banner content
    } else {
        bannerContent.style.display = 'none'; // Hide non-matching banner content
    }
}



// Slideshow script
let slideIndex = 0;
showSlides();

function showSlides() {
    const slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}