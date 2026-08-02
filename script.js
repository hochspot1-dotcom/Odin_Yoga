/* ==========================================================================
   Odin Yoga — Скрипты управления модальным окном и бургер-меню
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Управление модальным окном
    const bookingModal = document.getElementById('bookingModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (openModalBtn && bookingModal) {
        openModalBtn.addEventListener('click', () => {
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Запрет скролла при открытом модальном окне
        });
    }

    if (closeModalBtn && bookingModal) {
        closeModalBtn.addEventListener('click', () => {
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                bookingModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Закрытие по нажатию Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('active')) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 2. Управление Мобильным Бургер-меню
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');

    if (burgerBtn && mobileNavDrawer) {
        burgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileNavDrawer.classList.toggle('active');
            burgerBtn.classList.toggle('active');
            burgerBtn.setAttribute('aria-expanded', isOpen);
        });

        // Закрываем меню при клике на любую ссылку
        mobileNavDrawer.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileNavDrawer.classList.remove('active');
                burgerBtn.classList.remove('active');
                burgerBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Закрываем меню при клике вне его области
        document.addEventListener('click', (e) => {
            if (!mobileNavDrawer.contains(e.target) && !burgerBtn.contains(e.target)) {
                mobileNavDrawer.classList.remove('active');
                burgerBtn.classList.remove('active');
                burgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 3. Анимация постоянного появления при скроллинге (ВВЕРХ и ВНИЗ) для карточек и кружков
    const animElements = document.querySelectorAll('.class-card, .benefit-ball');
    
    if (animElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -30px 0px',
            threshold: 0.12
        };

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        }, observerOptions);

        animElements.forEach((el, index) => {
            if (el.classList.contains('class-card')) {
                el.style.transitionDelay = `${(index % 4) * 0.14}s`;
            } else if (el.classList.contains('benefit-ball')) {
                el.style.transitionDelay = `${(index % 3) * 0.12}s`;
            }
            scrollObserver.observe(el);
        });
    }
});
