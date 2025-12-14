// Исправление для мобильных устройств
function fixMobileIssues() {
    // Исправление viewport на iOS
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        }
    }
    
    // Предотвращение масштабирования при двойном тапе
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Исправление для 100vh на мобильных
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.body.style.minHeight = `calc(var(--vh, 1vh) * 100)`;
    }
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    // Увеличиваем размер кликабельных областей для мобильных
    if ('ontouchstart' in window) {
        const buttons = document.querySelectorAll('button, .clickable');
        buttons.forEach(button => {
            button.style.minHeight = '44px';
            button.style.minWidth = '44px';
        });
    }
}

// Создание снежинок (оптимизированная версия для мобильных)
function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    if (!snowflakesContainer) return;
    
    // Меньше снежинок на мобильных для производительности
    const isMobile = window.innerWidth <= 768;
    const snowflakeCount = isMobile ? 50 : 100;
    
    // Очищаем существующие снежинки
    snowflakesContainer.innerHTML = '';
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Случайные размеры и позиции (меньше на мобильных)
        const size = isMobile ? Math.random() * 6 + 3 : Math.random() * 10 + 5;
        const startPosition = Math.random() * 100;
        const animationDuration = isMobile ? Math.random() * 8 + 8 : Math.random() * 10 + 10;
        const animationDelay = Math.random() * 10;
        const opacity = Math.random() * 0.7 + 0.3;
        
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${startPosition}vw`;
        snowflake.style.opacity = opacity;
        snowflake.style.animation = `fall ${animationDuration}s linear ${animationDelay}s infinite`;
        
        snowflakesContainer.appendChild(snowflake);
    }
    
    // Добавляем CSS анимацию для снежинок (если еще нет)
    if (!document.querySelector('#snowflakes-style')) {
        const style = document.createElement('style');
        style.id = 'snowflakes-style';
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

// Функция для поделиться (оптимизированная для мобильных)
function shareOnSocial() {
    const shareData = {
        title: 'С Новым 2025 Годом!',
        text: 'Посмотрите это красивое новогоднее поздравление!',
        url: window.location.href
    };
    
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        navigator.share(shareData)
            .then(() => console.log('Успешно поделились'))
            .catch(error => {
                if (error.name !== 'AbortError') {
                    fallbackShare();
                }
            });
    } else {
        fallbackShare();
    }
    
    function fallbackShare() {
        const shareUrl = encodeURIComponent(window.location.href);
        const shareText = encodeURIComponent('Посмотрите это красивое новогоднее поздравление!');
        
        // Попробуем открыть в популярных соцсетях
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobileDevice) {
            // Для мобильных - предлагаем скопировать ссылку
            navigator.clipboard.writeText(window.location.href)
                .then(() => showMobileAlert('Ссылка скопирована в буфер обмена! Поделитесь ею с друзьями!'))
                .catch(err => {
                    showMobileAlert('Ссылка: ' + window.location.href);
                });
        } else {
            // Для десктопов - показываем сообщение
            alert('Ссылка скопирована в буфер обмена! Поделитесь ею с друзьями!\n\n' + window.location.href);
            navigator.clipboard.writeText(window.location.href);
        }
    }
    
    function showMobileAlert(message) {
        const alertEl = document.createElement('div');
        alertEl.textContent = message;
        alertEl.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10000;
            text-align: center;
            max-width: 90%;
            font-size: 16px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(alertEl);
        
        setTimeout(() => {
            alertEl.style.opacity = '0';
            alertEl.style.transition = 'opacity 0.5s';
            setTimeout(() => alertEl.remove(), 500);
        }, 3000);
    }
}

// Анимация для украшений на ёлке
function animateDecorations() {
    const decorations = document.querySelectorAll('.decoration');
    if (decorations.length === 0) return;
    
    decorations.forEach((decoration, index) => {
        decoration.style.animation = `pulse ${2 + index * 0.5}s infinite alternate`;
    });
    
    // Добавляем CSS анимацию пульсации (если еще нет)
    if (!document.querySelector('#pulse-style')) {
        const style = document.createElement('style');
        style.id = 'pulse-style';
        style.textContent = `
            @keyframes pulse {
                from { transform: scale(1); }
                to { transform: scale(1.3); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Адаптивная перестройка при изменении размера окна
function handleResize() {
    // Пересоздаем снежинки при изменении размера
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        createSnowflakes();
        updateLayoutForMobile();
    }, 250);
}

// Обновление лэйаута для мобильных
function updateLayoutForMobile() {
    const isMobile = window.innerWidth <= 768;
    const cardContent = document.querySelector('.card-content');
    
    if (cardContent) {
        if (isMobile) {
            cardContent.style.flexDirection = 'column';
        } else {
            cardContent.style.flexDirection = 'row';
        }
    }
    
    // Оптимизация анимаций для мобильных
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        if (isMobile) {
            // Отключаем сложные анимации на слабых устройствах
            el.style.willChange = 'auto';
        }
    });
}

// Оптимизация скролла для мобильных
function optimizeMobileScroll() {
    // Отключаем momentum scroll на iOS для лучшей производительности
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100%';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    }
}

// Эффект параллакса (облегченный для мобильных)
function setupParallax() {
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const snowflakes = document.querySelector('.snowflakes');
            if (snowflakes) {
                snowflakes.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
}

// Случайные пожелания при клике на ёлку
function setupTreeWishes() {
    const tree = document.querySelector('.christmas-tree');
    if (!tree) return;
    
    const wishes = [
        "Счастья в новом году!",
        "Здоровья и удачи!",
        "Исполнения всех желаний!",
        "Мира и добра!",
        "Процветания и успехов!",
        "Любви и тепла!"
    ];
    
    tree.addEventListener('click', function(e) {
        // Предотвращаем множественные клики на мобильных
        if (tree.dataset.clicked) return;
        tree.dataset.clicked = 'true';
        
        const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
        
        // Создаем красивое всплывающее сообщение
        const wishPopup = document.createElement('div');
        wishPopup.textContent = randomWish;
        wishPopup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(246, 211, 101, 0.95);
            color: #0c2461;
            padding: 20px 30px;
            border-radius: 15px;
            font-size: 1.5rem;
            font-weight: bold;
            z-index: 1000;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: popIn 0.5s ease-out;
            max-width: 80%;
            word-break: break-word;
        `;
        
        // Добавляем анимацию
        const style = document.createElement('style');
        style.textContent = `
            @keyframes popIn {
                0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                70% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(wishPopup);
        
        // Удаляем через 2 секунды
        setTimeout(() => {
            wishPopup.style.opacity = '0';
            wishPopup.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                wishPopup.remove();
                style.remove();
                delete tree.dataset.clicked;
            }, 500);
        }, 2000);
        
        // Вибрация на мобильных (если поддерживается)
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
    });
}

// Предотвращение быстрых множественных кликов на мобильных
function preventMultipleClicks() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.dataset.processing === 'true') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            this.dataset.processing = 'true';
            setTimeout(() => {
                delete this.dataset.processing;
            }, 1000);
        });
    });
}

// Ленивая загрузка для улучшения производительности
function lazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback для старых браузеров
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Документ загружен, инициализируем скрипты...');
    
    // Применяем исправления для мобильных
    fixMobileIssues();
    
    // Создаем снежинки
    createSnowflakes();
    
    // Устанавливаем начальное значение таймера
    updateCountdown();
    
    // Настраиваем анимацию украшений
    animateDecorations();
    
    // Настраиваем интерактивность ёлки
    setupTreeWishes();
    
    // Оптимизируем скролл для мобильных
    optimizeMobileScroll();
    
    // Настраиваем параллакс эффект
    setupParallax();
    
    // Предотвращаем множественные клики
    preventMultipleClicks();
    
    // Ленивая загрузка изображений
    lazyLoad();
    
    // Обновляем таймер каждую секунду
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Обработчик изменения размера окна
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Инициализируем лэйаут
    updateLayoutForMobile();
    
    // Добавляем обработчик для кнопки "Поделиться"
    const shareButton = document.querySelector('.social button');
    if (shareButton) {
        shareButton.addEventListener('click', shareOnSocial);
    }
    
    // Оптимизация для слабых устройств
    if ('hardwareConcurrency' in navigator && navigator.hardwareConcurrency < 4) {
        console.log('Слабое устройство, оптимизируем...');
        // Уменьшаем количество анимаций
        const animations = document.querySelectorAll('*[style*="animation"]');
        animations.forEach((el, index) => {
            if (index > 5) {
                el.style.animation = 'none';
            }
        });
    }
    
    // Предотвращаем стандартное поведение контекстного меню на мобильных
    document.addEventListener('contextmenu', function(e) {
        if ('ontouchstart' in window) {
            e.preventDefault();
        }
    });
    
    // Улучшаем отзывчивость тапов на мобильных
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    console.log('Все скрипты успешно инициализированы!');
});

// Очистка при выгрузке страницы
window.addEventListener('beforeunload', function() {
    // Очищаем интервалы
    const highestId = window.setTimeout(() => {}, 0);
    for (let i = highestId; i >= 0; i--) {
        window.clearInterval(i);
    }
    
    // Очищаем обработчики событий
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('orientationchange', handleResize);
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

// Добавляем поддержку клавиатуры для доступности
document.addEventListener('keydown', function(e) {
    // Пробел или Enter на ёлке
    if ((e.key === ' ' || e.key === 'Enter') && e.target === document.querySelector('.christmas-tree')) {
        e.target.click();
    }
    
    // Escape закрывает все модальные окна
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal, [style*="position: fixed"]');
        modals.forEach(modal => {
            if (modal.style.opacity !== '0') {
                modal.style.opacity = '0';
                setTimeout(() => modal.remove(), 300);
            }
        });
    }
});

// Service Worker для оффлайн-работы (если нужно)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').catch(function(error) {
            console.log('Service Worker регистрация не удалась:', error);
        });
    });
}