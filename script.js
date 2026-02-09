document.addEventListener('DOMContentLoaded', function() {
    // Инициализация переменных
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const backToTop = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('.nav-link');
    const slider = document.getElementById('slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('sliderDots');
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.slide');
    const detailButtons = document.querySelectorAll('.btn-details');
    const registerButtons = document.querySelectorAll('.btn-register');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');
    const clearFormButton = document.getElementById('clearForm');
    const registrationForm = document.getElementById('registrationForm');
    const eventNameInput = document.getElementById('eventName');
    const eventDateInput = document.getElementById('eventDate');
    const registrationModal = document.getElementById('registrationModal');
    
    let currentSlide = 0;
    let slideInterval;
    let isPaused = false;
    
    // Мобильное меню
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        menuToggle.innerHTML = mainNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Закрытие мобильного меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Обновление активной ссылки
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Кнопка "Наверх"
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
        
        // Обновление активной навигационной ссылки при скролле
        updateActiveNavLink();
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Функция обновления активной навигационной ссылки
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Слайдер
    function showSlide(n) {
        slides[currentSlide].classList.remove('slide-active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('slide-active');
        dots[currentSlide].classList.add('active');
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Автопрокрутка слайдера
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function pauseSlider() {
        if (!isPaused) {
            clearInterval(slideInterval);
            isPaused = true;
        }
    }
    
    function resumeSlider() {
        if (isPaused) {
            startSlider();
            isPaused = false;
        }
    }
    
    // Инициализация слайдера
    startSlider();
    
    // Обработчики для кнопок слайдера
    nextBtn.addEventListener('click', function() {
        pauseSlider();
        nextSlide();
        setTimeout(resumeSlider, 10000); // Возобновить через 10 секунд
    });
    
    prevBtn.addEventListener('click', function() {
        pauseSlider();
        prevSlide();
        setTimeout(resumeSlider, 10000); // Возобновить через 10 секунд
    });
    
    // Обработчики для точек слайдера
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            pauseSlider();
            showSlide(index);
            setTimeout(resumeSlider, 10000); // Возобновить через 10 секунд
        });
    });
    
    // Пауза слайдера при наведении
    slider.addEventListener('mouseenter', pauseSlider);
    slider.addEventListener('mouseleave', resumeSlider);
    
    // Модальные окна для инициатив
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Блокировка скролла
            }
        });
    });
    
    // Модальное окно для регистрации
    registerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventName = this.getAttribute('data-event');
            const eventCard = this.closest('.event-card');
            const eventDate = eventCard.querySelector('.day').textContent + ' ' + 
                            eventCard.querySelector('.month').textContent;
            
            eventNameInput.value = eventName;
            eventDateInput.value = eventDate;
            
            registrationModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Блокировка скролла
        });
    });
    
    // Закрытие модальных окон
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Разблокировка скролла
        });
    });
    
    // Закрытие модального окна при клике вне его
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = 'auto'; // Разблокировка скролла
            }
        });
    });
    
    // Очистка формы регистрации
    if (clearFormButton) {
        clearFormButton.addEventListener('click', function() {
            registrationForm.reset();
        });
    }
    
    // Обработка отправки формы регистрации
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Простая валидация
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            
            if (!fullName || !email || !phone) {
                alert('Пожалуйста, заполните все обязательные поля!');
                return;
            }
            
            // В реальном приложении здесь был бы AJAX-запрос к серверу
            alert(`Спасибо, ${fullName}! Вы успешно зарегистрированы на мероприятие "${eventNameInput.value}".`);
            
            // Закрытие модального окна
            registrationModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Разблокировка скролла
            
            // Очистка формы
            registrationForm.reset();
        });
    }
    
    // Адаптивность навигационных ссылок
    function handleResize() {
        if (window.innerWidth > 768) {
            mainNav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Инициализация
    updateActiveNavLink();
});