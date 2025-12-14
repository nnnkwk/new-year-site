// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Новогоднее поздравление для Риты загружается...');
    
    // Инициализация всех компонентов
    initSnowflakes();
    initStars();
    initCountdown();
    initMobileOptimization();
    initGiftSystem(); // Новая функция для подарка
    
    console.log('С Новым 2026 Годом, Рита! 🎄');
});

// Снежинки
function initSnowflakes() {
    const container = document.querySelector('.snowflakes');
    if (!container) return;
    
    const snowflakeCount = window.innerWidth < 768 ? 40 : 80;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        
        const size = Math.random() * 5 + 3;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 10;
        const opacity = Math.random() * 0.6 + 0.4;
        
        flake.style.width = `${size}px`;
        flake.style.height = `${size}px`;
        flake.style.left = `${left}vw`;
        flake.style.opacity = opacity;
        flake.style.animationDuration = `${duration}s`;
        flake.style.animationDelay = `${delay}s`;
        
        container.appendChild(flake);
    }
}

// Плавающие звёзды
function initStars() {
    const container = document.getElementById('stars-container');
    if (!container) return;
    
    const starCount = 15;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('floating-star');
        star.innerHTML = '✦';
        
        const size = Math.random() * 20 + 15;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 4 + 2;
        
        star.style.fontSize = `${size}px`;
        star.style.left = `${left}vw`;
        star.style.top = `${top}vh`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        
        container.appendChild(star);
    }
}

// Обратный отсчёт до 2026 года
function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date();
    const nextYear = 2026;
    const newYear = new Date(`January 1, ${nextYear} 00:00:00`);
    const diff = newYear - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Безопасное обновление элементов
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
    if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
}

// Система подарка с паролем
function initGiftSystem() {
    const giftBtn = document.getElementById('open-gift-btn');
    const passwordModal = document.getElementById('password-modal');
    const imageModal = document.getElementById('image-modal');
    const passwordInput = document.getElementById('password-input');
    const submitBtn = document.getElementById('submit-password');
    const passwordError = document.getElementById('password-error');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Пароль (имя Риты в разных вариантах)
    const correctPasswords = ['2026newyear'];
    
    if (!giftBtn || !passwordModal) return;
    
    // Открытие модального окна с паролем
    giftBtn.addEventListener('click', function() {
        // Анимация кнопки
        giftBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Открываю...';
        giftBtn.disabled = true;
        
        // Эффект встряски подарка
        const giftBox = document.querySelector('.gift-box');
        giftBox.style.animation = 'shake 0.5s ease';
        
        setTimeout(() => {
            // Показываем модальное окно с паролем
            passwordModal.classList.remove('hidden');
            passwordInput.focus();
            
            // Возвращаем кнопку в исходное состояние
            giftBtn.innerHTML = '<i class="fas fa-box-open"></i> Получить подарок';
            giftBtn.disabled = false;
            giftBox.style.animation = '';
        }, 1000);
    });
    
    // Проверка пароля
    submitBtn.addEventListener('click', checkPassword);
    
    // Проверка пароля по нажатию Enter
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    function checkPassword() {
        const enteredPassword = passwordInput.value.trim();
        
        // Проверяем пароль
        if (correctPasswords.includes(enteredPassword)) {
            // Правильный пароль
            passwordError.classList.add('hidden');
            passwordInput.value = '';
            
            // Закрываем окно с паролем
            passwordModal.classList.add('hidden');
            
            // Показываем успешную анимацию
            showSuccessAnimation();
            
            // Через 1 секунду показываем картинку
            setTimeout(() => {
                imageModal.classList.remove('hidden');
            }, 1000);
            
        } else {
            // Неправильный пароль
            passwordError.classList.remove('hidden');
            passwordInput.value = '';
            passwordInput.focus();
            
            // Анимация ошибки
            passwordInput.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                passwordInput.style.animation = '';
            }, 500);
            
            // Вибрация на мобильных (если поддерживается)
            if (navigator.vibrate) {
                navigator.vibrate(200);
            }
        }
    }
    
    // Закрытие модальных окон
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.add('hidden');
                passwordInput.value = '';
                passwordError.classList.add('hidden');
            }
        });
    });
    
    // Закрытие по клику вне модального окна
    window.addEventListener('click', function(event) {
        if (event.target === passwordModal) {
            passwordModal.classList.add('hidden');
            passwordInput.value = '';
            passwordError.classList.add('hidden');
        }
        if (event.target === imageModal) {
            imageModal.classList.add('hidden');
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            passwordModal.classList.add('hidden');
            imageModal.classList.add('hidden');
            passwordInput.value = '';
            passwordError.classList.add('hidden');
        }
    });
}

// Анимация успешного ввода пароля
function showSuccessAnimation() {
    const container = document.querySelector('.container');
    
    // Создаём летающие сердечки
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 25 + 20}px;
            z-index: 2000;
            pointer-events: none;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `;
        
        container.appendChild(heart);
        
        // Анимация разлёта
        const angle = (i / 20) * Math.PI * 2;
        const distance = 100 + Math.random() * 100;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;
        
        heart.animate([
            { 
                transform: 'translate(-50%, -50%) scale(0)',
                opacity: 1 
            },
            { 
                transform: `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) scale(1)`,
                opacity: 0 
            }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            delay: Math.random() * 300
        });
        
        // Удаление
        setTimeout(() => heart.remove(), 1800);
    }
}

// Оптимизация для мобильных
function initMobileOptimization() {
    // Исправление viewport
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    }
    
    // Исправление высоты для мобильных браузеров
    function fixHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.body.style.minHeight = `calc(var(--vh, 1vh) * 100)`;
    }
    
    fixHeight();
    window.addEventListener('resize', fixHeight);
    window.addEventListener('orientationchange', fixHeight);
    
    // Предотвращение двойного тапа для масштабирования
    let lastTap = 0;
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTap < 300) {
            e.preventDefault();
        }
        lastTap = now;
    });
    
    // Улучшение отзывчивости тапов на мобильных
    document.addEventListener('touchstart', function() {}, {passive: true});
}

// Обработчик изменения ориентации для пересчёта layout
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        // Пересоздаём снежинки при изменении ориентации
        const container = document.querySelector('.snowflakes');
        if (container) {
            container.innerHTML = '';
            initSnowflakes();
        }
    }, 100);
});

// Пересоздание снежинок при изменении размера окна
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        const container = document.querySelector('.snowflakes');
        if (container) {
            container.innerHTML = '';
            initSnowflakes();
        }
        
        const starsContainer = document.getElementById('stars-container');
        if (starsContainer) {
            starsContainer.innerHTML = '';
            initStars();
        }
    }, 250);
});

// Fallback для старых браузеров
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 1000 / 60);
    };
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}

// Очистка интервалов при выгрузке страницы
window.addEventListener('beforeunload', function() {
    const highestId = window.setTimeout(() => {}, 0);
    for (let i = highestId; i >= 0; i--) {
        window.clearInterval(i);
    }
});