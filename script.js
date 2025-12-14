// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт для Риты загружается...');
    
    // Инициализация всех компонентов
    initSnowflakes();
    initStars();
    initCountdown();
    initWishButton();
    initMobileOptimization();
    initShareButton();
    
    console.log('Всё готово! С Новым Годом, Рита! 🎄');
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

// Обратный отсчёт
function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date();
    const nextYear = now.getFullYear() + 1;
    const newYear = new Date(`January 1, ${nextYear} 00:00:00`);
    const diff = newYear - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Кнопка загадать желание
function initWishButton() {
    const wishBtn = document.getElementById('wish-btn');
    const wishMessage = document.getElementById('wish-message');
    
    if (!wishBtn || !wishMessage) return;
    
    const wishes = [
        "✨ Твоё желание обязательно сбудется!",
        "🌟 Вселенная уже работает над ним!",
        "💫 Мечты Риты — это святое!",
        "🎯 В 2025 году всё получится!",
        "🌠 Пусть каждый день приносит радость!"
    ];
    
    wishBtn.addEventListener('click', function() {
        // Анимация кнопки
        wishBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загадываю...';
        wishBtn.disabled = true;
        
        // Создаём искры
        createSparks();
        
        // Показываем сообщение через 1.5 секунды
        setTimeout(() => {
            const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
            wishMessage.innerHTML = `<p>${randomWish}</p>`;
            wishMessage.classList.remove('hidden');
            
            // Возвращаем кнопку
            wishBtn.innerHTML = '<i class="fas fa-star"></i> Загадать ещё желание';
            wishBtn.disabled = false;
            
            // Добавляем звёздный дождь
            createStarShower();
        }, 1500);
    });
}

// Искры для анимации
function createSparks() {
    const container = document.getElementById('sparkles-container');
    if (!container) container = document.body;
    
    const sparkCount = 20;
    
    for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #ffd166, #ff6b8b);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const startX = 50 + Math.random() * 40 - 20;
        const startY = 50 + Math.random() * 40 - 20;
        
        spark.style.left = `${startX}%`;
        spark.style.top = `${startY}%`;
        
        container.appendChild(spark);
        
        // Анимация
        spark.animate([
            { transform: 'scale(0) translate(0, 0)', opacity: 1 },
            { 
                transform: `scale(1.5) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`,
                opacity: 0 
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        // Удаление
        setTimeout(() => spark.remove(), 1000);
    }
}

// Звёздный дождь
function createStarShower() {
    const container = document.body;
    const starCount = 15;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.innerHTML = '✦';
        star.style.cssText = `
            position: fixed;
            color: #ffd166;
            font-size: ${Math.random() * 20 + 15}px;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
        `;
        
        const startX = Math.random() * 100;
        
        star.style.left = `${startX}%`;
        star.style.top = '-50px';
        
        container.appendChild(star);
        
        // Анимация падения
        star.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
            { transform: 'translateY(50px) rotate(180deg)', opacity: 1 },
            { transform: 'translateY(100vh) rotate(360deg)', opacity: 0 }
        ], {
            duration: 2000 + Math.random() * 1000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            delay: Math.random() * 500
        });
        
        // Удаление
        setTimeout(() => star.remove(), 3000);
    }
}

// Оптимизация для мобильных
function initMobileOptimization() {
    // Исправление viewport
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    }
    
    // Исправление высоты
    function fixHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    fixHeight();
    window.addEventListener('resize', fixHeight);
    window.addEventListener('orientationchange', fixHeight);
    
    // Предотвращение двойного тапа
    let lastTap = 0;
    document.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTap < 300) {
            e.preventDefault();
        }
        lastTap = now;
    });
}

// Кнопка "Отправить Рите"
function initShareButton() {
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareForRita);
    }
    
    const fireworksBtn = document.querySelector('.fireworks-btn');
    if (fireworksBtn) {
        fireworksBtn.addEventListener('click', createFireworks);
    }
}

function shareForRita() {
    const shareData = {
        title: 'С Новым Годом, Рита! ✨',
        text: 'Посмотри это персональное новогоднее поздравление!',
        url: window.location.href
    };
    
    if (navigator.share && navigator.canShare(shareData)) {
        navigator.share(shareData).catch(console.log);
    } else {
        navigator.clipboard.writeText(window.location.href)
            .then(() => showMessage('Ссылка скопирована! Отправь её Рите 📱'))
            .catch(() => showMessage(window.location.href));
    }
}

function showMessage(text) {
    const message = document.createElement('div');
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        max-width: 90%;
        text-align: center;
        font-size: 16px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: fadeInOut 3s forwards;
    `;
    
    // Анимация
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            10%, 90% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
        style.remove();
    }, 3000);
}

// Фейерверк
function createFireworks() {
    const colors = ['#ff6b8b', '#a5b4fc', '#4cc9f0', '#ffd166'];
    const count = window.innerWidth < 768 ? 5 : 10;
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const x = Math.random() * 80 + 10;
            const y = Math.random() * 50 + 10;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            createFirework(x, y, color);
        }, i * 300);
    }
}

function createFirework(x, y, color) {
    const container = document.body;
    const particles = 30;
    
    // Центральная вспышка
    const center = document.createElement('div');
    center.style.cssText = `
        position: fixed;
        left: ${x}%;
        top: ${y}%;
        width: 20px;
        height: 20px;
        background: ${color};
        border-radius: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        pointer-events: none;
        box-shadow: 0 0 20px ${color};
    `;
    
    container.appendChild(center);
    
    // Анимация центра
    center.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(3)', opacity: 0 }
    ], {
        duration: 500,
        easing: 'ease-out'
    });
    
    // Частицы
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}%;
            top: ${y}%;
            width: 8px;
            height: 8px;
            background: ${color};
            border-radius: 50%;
            transform: translate(-50%, -50%);
            z-index: 1000;
            pointer-events: none;
        `;
        
        container.appendChild(particle);
        
        const angle = (i / particles) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;
        
        particle.animate([
            { 
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 1 
            },
            { 
                transform: `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
    
    setTimeout(() => center.remove(), 500);
    
    // Вибрация на мобильных
    if (navigator.vibrate) {
        navigator.vibrate(100);
    }
}

// Обработчик изменения ориентации
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        location.reload();
    }, 100);
});

// Предотвращение множественных кликов на мобильных
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.dataset.processing) {
                e.preventDefault();
                return;
            }
            this.dataset.processing = 'true';
            setTimeout(() => delete this.dataset.processing, 1000);
        });
    });
});