const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (!entry.target.classList.contains('animated')) {
                entry.target.classList.add("visible");
                entry.target.classList.add("animated");
            }
            entry.target.classList.remove("fade-out");
        } else {
            if (!entry.target.classList.contains('animated')) {
                entry.target.classList.add("fade-out");
            }
        }
    });
}, { threshold: 0.3 });

sections.forEach(sec => observer.observe(sec));

document.addEventListener('DOMContentLoaded', function () {
    const imgs = document.querySelectorAll('.icon-grid img');
    const captionBox = document.getElementById('caption-box');

    function showCaption(text) {
        captionBox.innerHTML = '<p>' + text + '</p>';
        captionBox.classList.add('visible');
        captionBox.dataset.current = text;
        captionBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function hideCaption() {
        captionBox.classList.remove('visible');
        delete captionBox.dataset.current;
        setTimeout(() => { if (!captionBox.classList.contains('visible')) captionBox.innerHTML = ''; }, 520);
    }

    imgs.forEach(img => {
        function activate() {
            const next = img.nextElementSibling;
            if (!next || !next.classList.contains('caption')) return;
            const alreadyVisible = captionBox.classList.contains('visible') && captionBox.dataset.current === next.innerHTML;
            if (alreadyVisible) hideCaption();
            else showCaption(next.innerHTML);
        }
        img.addEventListener('click', activate);
        img.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
        });
    });
});

const mediaItems = document.querySelectorAll('.media');

const mediaObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

mediaItems.forEach(item => mediaObserver.observe(item));

const cards = document.querySelectorAll('.interactive-card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('active');
    });
    card.addEventListener('keydown', e => {
        if(e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.classList.toggle('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const kraftCtx = document.getElementById('kraftChart');
    if (kraftCtx) {
        new Chart(kraftCtx, {
            type: 'bar',
            data: {
                labels: ['Forbruk 2021', 'Produksjon 2021', 'Kraftunderskudd', 'Nytt kjernekraftverk (planlagt)'],
                datasets: [{
                    label: 'TWh (terawattimer)',
                    data: [24, 6, 18, 10],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.7)',
                        'rgba(34, 197, 94, 0.7)',
                        'rgba(251, 146, 60, 0.7)',
                        'rgba(59, 130, 246, 0.7)'
                    ],
                    borderColor: [
                        'rgba(239, 68, 68, 1)',
                        'rgba(34, 197, 94, 1)',
                        'rgba(251, 146, 60, 1)',
                        'rgba(59, 130, 246, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + ' TWh';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#e2e8f0' },
                        grid: { color: 'rgba(148,163,184,0.2)' }
                    },
                    x: {
                        ticks: { color: '#e2e8f0' },
                        grid: { color: 'rgba(148,163,184,0.2)' }
                    }
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const comparisonCards = document.querySelectorAll('.comparison-card');

    comparisonCards.forEach(card => {
        function toggleFlip() {
            card.classList.toggle('flipped');
        }

        card.addEventListener('click', toggleFlip);

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFlip();
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let currentSlideIndex = 0;

    const slideItems = document.querySelectorAll('.slide-item');
    const slideDots = document.querySelectorAll('.slide-dot');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');

    if (!slideItems.length) return;

    function showSlide(index) {
        if (index >= slideItems.length) currentSlideIndex = 0;
        else if (index < 0) currentSlideIndex = slideItems.length - 1;
        else currentSlideIndex = index;

        slideItems.forEach(slide => slide.classList.remove('active'));
        slideDots.forEach(dot => dot.classList.remove('active'));

        slideItems[currentSlideIndex].classList.add('active');
        if (slideDots[currentSlideIndex]) {
            slideDots[currentSlideIndex].classList.add('active');
        }
    }

    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
        showSlide(currentSlideIndex - 1);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    slideDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
});