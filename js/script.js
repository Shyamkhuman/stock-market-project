// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            updateActiveNav(targetId);
        }
    });
});

// Update active navigation link
function updateActiveNav(targetId) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`a[href="${targetId}"]`)?.classList.add('active');
}

// Track scroll position and update active nav
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveNav(`#${section.id}`);
        }
    });
});

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    
    // Show success message
    showNotification(`Thanks ${name}! We'll contact you at ${email} soon.`);
    
    // Reset form
    this.reset();
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #34a853;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.feature-card, .tech-category, .use-case-card, .sdg-card, .metric-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Animate metric bars on scroll
const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const fills = entry.target.querySelectorAll('.metric-fill');
            fills.forEach(fill => {
                fill.style.transition = 'width 1s ease';
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.metric-card').forEach(card => {
    metricObserver.observe(card);
});

// Dynamic model dropdown (for future integration)
function initModelSelector() {
    const models = [
        'Random Forest',
        'Gradient Boosting',
        'LSTM Network',
        'XGBoost',
        'SVR'
    ];
    
    return models;
}

// Stock prediction simulator (for demo purposes)
function simulatePrediction(stockSymbol) {
    const predictions = {
        upward: 'Upward trend detected - Consider buying',
        downward: 'Downward trend detected - Consider caution',
        stable: 'Stable trend detected - Hold position'
    };
    
    const randomTrend = Object.keys(predictions)[Math.floor(Math.random() * 3)];
    return predictions[randomTrend];
}

// Initialize charts (placeholder for actual chart integration)
function initializeCharts() {
    console.log('Charts initialized - Ready for data visualization');
}

// Performance metrics animation
function animateMetrics() {
    const metrics = document.querySelectorAll('.metric-fill');
    metrics.forEach(metric => {
        const width = metric.style.width;
        metric.style.width = '0%';
        
        setTimeout(() => {
            metric.style.width = width;
        }, 100);
    });
}

// Trigger metrics animation when page loads
window.addEventListener('load', () => {
    animateMetrics();
    initializeCharts();
});

// Mobile menu toggle (for future navbar expansion)
function initMobileMenu() {
    const navbar = document.querySelector('.navbar');
    if (window.innerWidth <= 768) {
        // Mobile-specific functionality can go here
    }
}

window.addEventListener('resize', initMobileMenu);
initMobileMenu();

console.log('StockPredict AI Website - All interactive features loaded');
