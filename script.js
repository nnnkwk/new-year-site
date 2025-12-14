// Создание снежинок
function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const snowflakeCount = 80;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        const size = Math.random() * 8 + 4;
        const startPosition = Math.random() * 100;
        const animationDuration = Math.random() * 8 + 8;
        const animationDelay = Math.random() * 5;
        const opacity = Math.random() * 0.6 + 0.4;
        const isHeart = Math.random() > 0.7;
        
        if (isHeart) {
            snowflake.innerHTML = '❤️';
            snowflake.style.fontSize = `${size * 2}px`;
            snowflake.style.background = 'transparent';
        } else {
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;
            snowflake.style.background = 'white';
            snowflake.style.borderRadius = '50%';
        }
        
        snowflake.style.left = `${startPosition}vw`;
        snowflake.style.opacity = opacity;
        snowflake.style.animation = `fall ${animationDuration}s linear ${animationDelay}s infinite`;
        
        snowflakesContainer.appendChild(snowflake);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(-100px) rotate(0deg);
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Создание плавающих сердечек
function createHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    if (!heartsContainer) return;
    
    const heartCount = 30;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-decoration');
        heart.innerHTML = '❤️';
        
        const size = Math.random() * 25 + 20;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 5;
        
        heart.style.fontSize = `${size}px`;
        heart.style.left = `${left}vw`;
        heart.style.top = `${top}vh`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        
        heartsContainer.appendChild(heart);
    }
}

// Обратный отсчет до Нового года
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

// Функция для отправки Рите
function shareForRita() {
    const messages = [
        "Рита, смотри какое красивое поздравление я для тебя сделал! 💖",
        "Для самой прекрасной Риты - особое новогоднее поздравление! ✨",
        "Дорогая Рита, этот сайт создан специально для тебя! 🎄",
        "С Новым Годом, моя прекрасная Рита! 💝"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    if (navigator.share) {
        navigator.share({
            title: 'С Новым Годом, Рита! 💖',
            text: randomMessage,
            url: window.location.href
        })
        .then(() => console.log('Успешно поделились'))
        .catch(error => console.log('Ошибка:', error));
    } else {
        const shareText = `${randomMessage}\n\n${window.location.href}`;
        navigator.clipboard.writeText(shareText)
            .then(() => {
                alert('Сообщение для Риты скопировано в буфер обмена!\nОтправь его ей в сообщении! 💌');
            })
            .catch(err => {
                prompt('Скопируйте эту ссылку и отправьте Рите:', window.location.href);
            });
    }
}

// Загадать желание
function setupWishButton() {
    const wishBtn = document.getElementById('make-wish-btn');
    const wishResult = document.getElementById('wish-result');
    
    if (!wishBtn || !wishResult) return;
    
    const wishMessages = [
        "✨ Твое желание обязательно сбудется! Ведь ты этого достойна! ✨",
        "🌟 Вселенная услышала твое желание! Готовься к чуду в 2025! 🌟",
        "💫 Загаданное желание Риты — это закон! Оно непременно исполнится! 💫",
        "🎯 В 2025 году ты получишь даже больше, чем загадала! Верь в это! 🎯",
        "🌠 Пусть все твои мечты сбудутся, самая прекрасная Рита! 🌠"
    ];
    
    wishBtn.addEventListener('click', function() {
        // Анимация кнопки
        wishBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Загадываем...';
        wishBtn.disabled = true;
        
        // Создаем эффект волшебной пыли
        createMagicDust();
        
        // Показываем результат через 2 секунды
        setTimeout(() => {
            const randomMessage = wishMessages[Math.floor(Math.random() * wishMessages.length)];
            wishResult.innerHTML = `<p>${randomMessage}</p>`;
            wishResult.classList.remove('hidden');
            
            // Возвращаем кнопку в исходное состояние
            wishBtn.innerHTML = '<i class="fas fa-hand-sparkles"></i> Загадать еще одно желание';
            wishBtn.disabled = false;
            
            // Добавляем сердечки
            createCelebrationHearts();
        }, 2000);
    });
}

// Создать волшебную пыль
function createMagicDust() {
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.width = '10px';
        sparkle.style.height = '10px';
        sparkle.style.background = 'radial-gradient(circle, #ffcc00, #ff4081)';
        sparkle.style.borderRadius = '50%';
        sparkle.style.zIndex = '1000';
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight - 100;
        
        sparkle.style.left = `${startX}px`;
        sparkle.style.top = `${startY}px`;
        
        container.appendChild(sparkle);
        
        // Анимация
        sparkle.animate([
            { transform: `translate(0, 0) scale(1)`, opacity: 1 },
            { transform: `translate(${Math.random() * 100 - 50}px, -200px) scale(0)`, opacity: 0 }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        // Удаляем после анимации
        setTimeout(() => sparkle.remove(), 1500);
    }
}

// Создать праздничные сердечки
function createCelebrationHearts() {
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = `${Math.random() * 30 + 20}px`;
        heart.style.zIndex = '1000';
        heart.style.opacity = '0.9';
        
        const startX = 50 + Math.random() * 20 - 10;
        const startY = 50 + Math.random() * 20 - 10;
        
        heart.style.left = `${startX}%`;
        heart.style.top = `${startY}%`;
        
        container.appendChild(heart);
        
        // Анимация
        heart.animate([
            { transform: 'scale(0) translate(0, 0)', opacity: 0 },
            { transform: 'scale(1.5) translate(0, -50px)', opacity: 1 },
            { transform: 'scale(1) translate(0, -100px)', opacity: 0.5 }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        
        // Удаляем после анимации
        setTimeout(() => heart.remove(), 2000);
    }
}

// Случайные комплименты при клике на имя
function setupCompliments() {
    const ritaName = document.querySelector('h1');
    if (!ritaName) return;
    
    const compliments = [
        "Рита, ты просто космос! 🌟",
        "Ты прекраснее самого красивого рассвета! 🌅",
        "Твоя улыбка делает мир лучше! 😊",
        "С тобой каждый день как праздник! 🎉",
        "Ты вдохновляешь на подвиги! 💪",
        "Твои глаза как две звезды! ✨",
        "Ты самая добрая и нежная! 💖",
        "С Новым Годом, моя принцесса! 👑"
    ];
    
    ritaName.addEventListener('click', function() {
        const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
        
        // Создаем всплывающее сообщение
        const popup = document.createElement('div');
        popup.textContent = randomCompliment;
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.background = 'rgba(255, 64, 129, 0.9)';
        popup.style.color = 'white';
        popup.style.padding = '20px 40px';
        popup.style.borderRadius = '20px';
        popup.style.fontSize = '2rem';
        popup.style.zIndex = '2000';
        popup.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        popup.style.textAlign = 'center';
        
        document.body.appendChild(popup);
        
        // Удаляем через 2 секунды
        setTimeout(() => {
            popup.remove();
        }, 2000);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    createSnowflakes();
    createHearts();
    updateCountdown();
    setupWishButton();
    setupCompliments();
    
    // Обновляем таймер каждую секунду
    setInterval(updateCountdown, 1000);
    
    // Параллакс эффект
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const snowflakes = document.querySelector('.snowflakes');
        if (snowflakes) {
            snowflakes.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Автоматическое изменение фона
    let hue = 0;
    setInterval(() => {
        hue = (hue + 0.1) % 360;
        document.body.style.background = 
            `linear-gradient(135deg, hsl(${hue}, 100%, 15%), hsl(${(hue + 30) % 360}, 100%, 35%), hsl(${(hue + 60) % 360}, 100%, 50%))`;
    }, 5000);
    
    // Секретное сообщение при тройном клике
    let clickCount = 0;
    let clickTimer;
    
    document.body.addEventListener('click', function() {
        clickCount++;
        
        if (clickTimer) clearTimeout(clickTimer);
        
        clickTimer = setTimeout(() => {
            if (clickCount === 3) {
                showSecretMessage();
            }
            clickCount = 0;
        }, 500);
    });
});

// Секретное сообщение
function showSecretMessage() {
    const secretMessages = [
        "Рита, ты самое лучшее, что случалось в моей жизни! 💝",
        "Каждый день с тобой — это подарок судьбы! 🎁",
        "Ты заслуживаешь всего самого прекрасного в этом мире! 🌍",
        "Пусть 2025 год будет твоим годом! Полным любви и счастья! 🥂"
    ];
    
    const message = secretMessages[Math.floor(Math.random() * secretMessages.length)];
    
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0,0,0,0.8)';