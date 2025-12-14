// Создание снежинок
function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const snowflakeCount = 100;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Случайные размеры и позиции
        const size = Math.random() * 10 + 5;
        const startPosition = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 10;
        const animationDelay = Math.random() * 10;
        const opacity = Math.random() * 0.7 + 0.3;
        
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${startPosition}vw`;
        snowflake.style.opacity = opacity;
        snowflake.style.animation = `fall ${animationDuration}s linear ${animationDelay}s infinite`;
        
        snowflakesContainer.appendChild(snowflake);
    }
    
    // Добавляем CSS анимацию для снежинок
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

// Функция для поделиться
function shareOnSocial() {
    if (navigator.share) {
        navigator.share({
            title: 'С Новым 2025 Годом!',
            text: 'Посмотрите это красивое новогоднее поздравление!',
            url: window.location.href
        })
        .then(() => console.log('Успешно поделились'))
        .catch(error => console.log('Ошибка при шаринге:', error));
    } else {
        // Для десктопов - копируем ссылку в буфер обмена
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Ссылка скопирована в буфер обмена! Поделитесь ею с друзьями!'))
            .catch(err => console.error('Ошибка копирования: ', err));
    }
}

// Анимация для украшений на ёлке
function animateDecorations() {
    const decorations = document.querySelectorAll('.decoration');
    decorations.forEach((decoration, index) => {
        decoration.style.animation = `pulse ${2 + index * 0.5}s infinite alternate`;
    });
    
    // Добавляем CSS анимацию пульсации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            from { transform: scale(1); }
            to { transform: scale(1.3); }
        }
    `;
    document.head.appendChild(style);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    createSnowflakes();
    updateCountdown();
    animateDecorations();
    
    // Обновляем таймер каждую секунду
    setInterval(updateCountdown, 1000);
    
    // Добавляем эффект параллакса для снежинок при скролле
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const snowflakes = document.querySelector('.snowflakes');
        snowflakes.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
    
    // Случайные пожелания при клике на ёлку
    const tree = document.querySelector('.christmas-tree');
    const wishes = [
        "Счастья в новом году!",
        "Здоровья и удачи!",
        "Исполнения всех желаний!",
        "Мира и добра!",
        "Процветания и успехов!",
        "Любви и тепла!"
    ];
    
    tree.addEventListener('click', function() {
        const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
        alert(randomWish);
    });
});