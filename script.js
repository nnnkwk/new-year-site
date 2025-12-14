// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Новогоднее поздравление для Риты загружается...');
    
    // Инициализация всех компонентов
    initSnowflakes();
    initStars();
    initCountdown();
    initMobileOptimization();
    
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