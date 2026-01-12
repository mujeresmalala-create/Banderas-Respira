document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.main-nav ul');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Accessibility: update aria-expanded
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Participate Interaction
    const participateBtns = document.querySelectorAll('.btn-participate');
    const participateOptions = document.getElementById('participateOptions');
    const participateMessage = document.getElementById('participateMessage');

    if (participateBtns.length > 0 && participateOptions && participateMessage) {
        participateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Determine which choice was made (if needed for tracking/analytics later)
                const choice = btn.getAttribute('data-choice');
                console.log('User chose:', choice);

                // UI transition
                participateOptions.style.display = 'none';
                participateMessage.classList.remove('hidden');
            });
        });
    }

    // Scroll opacity Logic (Simple)
    // Optional: Add some navbar scroll effect

    // Share Button Logic
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const shareData = {
                title: 'Banderas Respira',
                text: 'Descubre "Banderas Respira", una intervención para cuidar la convivencia y la calma en TransMilenio.',
                url: window.location.href
            };

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    console.error('Error sharing:', err);
                }
            } else {
                // Fallback: Copy to clipboard
                try {
                    await navigator.clipboard.writeText(shareData.url);
                    const originalText = shareBtn.querySelector('span').textContent;
                    shareBtn.querySelector('span').textContent = '¡Enlace copiado!';
                    setTimeout(() => {
                        shareBtn.querySelector('span').textContent = originalText;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            }
        });
    }
});
