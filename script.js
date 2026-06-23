
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function submitForm() {
    document.getElementById('formMessage').innerText = "Thank you! We will contact you shortly.";
    return false; // Prevent actual form submission
}

// Quote Modal Logic
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('quoteModal');
    const closeModal = document.getElementById('closeModal');
    const quoteForm = document.getElementById('quoteForm');
    const quoteService = document.getElementById('quoteService');
    const quoteStatus = document.getElementById('quoteStatus');
    // Open modal for each Send Quote button
    document.querySelectorAll('.send-quote-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            quoteService.value = btn.getAttribute('data-service');
            modal.style.display = 'block';
            quoteStatus.innerText = '';
        });
    });
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    window.addEventListener('click', function(e) {
        if (e.target === modal) modal.style.display = 'none';
    });
    // Handle quote form submission
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        quoteStatus.innerText = 'Sending...';
        // Send form data to Formspree
        fetch('https://formspree.io/f/your-form-id', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: new FormData(quoteForm)
        })
        .then(response => {
            if (response.ok) {
                quoteStatus.innerText = 'Quote sent! We will contact you soon.';
                quoteForm.reset();
            } else {
                quoteStatus.innerText = 'Failed to send. Please try again.';
            }
        })
        .catch(() => {
            quoteStatus.innerText = 'Failed to send. Please try again.';
        });
    });
});
