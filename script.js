document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const revealElements = document.querySelectorAll('.reveal');

    // Intersection observer for reveal animations
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18 }
    );

    revealElements.forEach(el => observer.observe(el));

    // Sticky navbar shadow toggle
    const onScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    // Brand logo slider
    new Swiper('.brands-swiper', {
        slidesPerView: 2,
        spaceBetween: 16,
        loop: true,
        autoplay: { delay: 1800, disableOnInteraction: false },
        breakpoints: {
            576: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            992: { slidesPerView: 5 },
        },
    });

    // CTA hover micro interaction
    document.querySelectorAll('.btn-cta').forEach(btn => {
        btn.addEventListener('mouseenter', () => btn.classList.add('hovered'));
        btn.addEventListener('mouseleave', () => btn.classList.remove('hovered'));
    });

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.length > 1) {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Show popup modal on page load
    const leadFormModal = new bootstrap.Modal(document.getElementById('leadFormModal'), {
        backdrop: 'static',
        keyboard: false
    });

    // Check if user has already closed the modal in this session
    const modalClosed = sessionStorage.getItem('leadModalClosed');
    
    // Show modal after a short delay for better UX
    if (!modalClosed) {
        setTimeout(() => {
            leadFormModal.show();
        }, 1000);
    }

    // Track when modal is closed and don't show again in this session
    document.getElementById('leadFormModal').addEventListener('hidden.bs.modal', function () {
        sessionStorage.setItem('leadModalClosed', 'true');
    });

    // Handle lead form submission
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                requirement: formData.get('requirement')
            };

            // Here you can add your form submission logic
            // For example, send to an API endpoint
            console.log('Form submitted:', data);

            // Show success message
            alert('Thank you! Our team will contact you shortly.');
            
            // Close modal
            leadFormModal.hide();
            
            // Reset form
            this.reset();
            
            // Mark as closed so it doesn't show again
            sessionStorage.setItem('leadModalClosed', 'true');
        });
    }
});
