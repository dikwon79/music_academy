// 히어로 음표 애니메이션
const noteSymbols = ['♩', '♪', '♫', '♬'];
const notesContainer = document.querySelector('.hero-notes');

function createFloatingNote() {
    if (!notesContainer) return;
    const note = document.createElement('span');
    note.textContent = noteSymbols[Math.floor(Math.random() * noteSymbols.length)];
    note.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        bottom: -50px;
        font-size: ${Math.random() * 24 + 16}px;
        opacity: 0;
        animation: floatNote ${Math.random() * 6 + 7}s ease-in forwards;
        color: rgba(255, 255, 255, ${(Math.random() * 0.2 + 0.1).toFixed(2)});
        pointer-events: none;
    `;
    notesContainer.appendChild(note);
    setTimeout(() => note.remove(), 13000);
}

// 이퀄라이저 바 생성
const equalizerEl = document.querySelector('.hero-equalizer');
if (equalizerEl) {
    for (let i = 0; i < 32; i++) {
        const bar = document.createElement('span');
        const maxH = Math.floor(Math.random() * 50 + 15);
        const dur  = (Math.random() * 0.5 + 0.3).toFixed(2);
        const delay = (Math.random() * 1.5).toFixed(2);
        bar.style.setProperty('--max-h', maxH + 'px');
        bar.style.animationDuration = dur + 's';
        bar.style.animationDelay   = '-' + delay + 's';
        equalizerEl.appendChild(bar);
    }
}

// 초기 음표 생성
for (let i = 0; i < 12; i++) {
    setTimeout(createFloatingNote, i * 500);
}
setInterval(createFloatingNote, 1200);

// 검색 기능
const searchEl = document.querySelector('.search');

if (searchEl) {
    const searchInputEl = searchEl.querySelector('input');

    searchEl.addEventListener('click', function() {
        searchInputEl.focus();
    });

    searchInputEl.addEventListener('focus', function() {
        searchEl.classList.add('focused');
        searchInputEl.setAttribute('placeholder', '검색');
    });

    searchInputEl.addEventListener('blur', function() {
        searchEl.classList.remove('focused');
        searchInputEl.setAttribute('placeholder', '');
    });
}

// 헤더 스크롤 효과
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 애니메이션 대상 요소들
const animateElements = document.querySelectorAll('.program-card, .teacher-card, .feature-item, .facility-item');
animateElements.forEach(el => {
    el.classList.add('fade-in-on-scroll');
    observer.observe(el);
});

// 모바일 메뉴 토글
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainMenu = document.querySelector('.main-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        mainMenu.classList.toggle('active');
    });
}

// 폼 제출 처리
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = new FormData(this);
        const data = {
            name: this.querySelector('input[type="text"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            email: this.querySelector('input[type="email"]').value,
            program: this.querySelector('select').value,
            message: this.querySelector('textarea').value
        };
        
        // 실제로는 서버로 전송해야 하지만, 여기서는 알림만 표시
        alert('상담 신청이 완료되었습니다!\n빠른 시일 내에 연락드리겠습니다.');
        
        // 폼 리셋
        this.reset();
    });
}

// 카드 호버 효과 강화
const cards = document.querySelectorAll('.program-card, .teacher-card, .feature-item');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// 숫자 카운터 애니메이션 (선택사항)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// 페이지 로드 시 애니메이션
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // 히어로 섹션 요소들에 애니메이션 클래스 추가
    const heroElements = document.querySelectorAll('.hero-content h1, .hero-content p, .hero-buttons');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// 스크롤 진행 표시 (선택사항)
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // 스크롤 진행도에 따른 효과를 원하면 여기에 추가
});

// 키보드 접근성 개선
document.addEventListener('keydown', function(e) {
    // ESC 키로 모바일 메뉴 닫기
    if (e.key === 'Escape' && mainMenu.classList.contains('active')) {
        mainMenu.classList.remove('active');
    }
});

// 이미지 로드 에러 처리
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
    });
});

// 푸터 연도 자동 업데이트
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
}
