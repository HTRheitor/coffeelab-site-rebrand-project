
document.addEventListener('DOMContentLoaded', function() {
    
    const header = document.querySelector('.header');
    const themeToggle = document.querySelector('.theme-toggle');
    const searchBtn = document.querySelector('.search-btn');
    const searchOverlay = document.querySelector('.search-overlay');
    const closeSearch = document.querySelector('.close-search');
    const menuCards = document.querySelectorAll('.menu-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const reviewPrev = document.querySelector('.review-prev');
    const reviewNext = document.querySelector('.review-next');
    const reviewsSlider = document.querySelector('.reviews-slider');
    const indicators = document.querySelectorAll('.indicator');
    const scrollTop = document.querySelector('.scroll-top');
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    const cartCount = document.querySelector('.cart-count');
    
    let cartItems = 0;
    
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
       
        if (window.scrollY > 300) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });
    
   
    scrollTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
   
    themeToggle.addEventListener('click', function() {
        document.documentElement.classList.toggle('light-mode');
        
       
        const isLightMode = document.documentElement.classList.contains('light-mode');
        updateThemeIcon(isLightMode ? 'light' : 'dark');
        
      
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });
    
   
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'light') {
            document.documentElement.classList.add('light-mode');
            updateThemeIcon('light');
        } else {
            updateThemeIcon('dark');
        }
    }
    
    
    function updateThemeIcon(mode) {
        if (mode === 'light') {
            themeToggle.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        } else {
            themeToggle.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        }
    }
    
    
    searchBtn.addEventListener('click', function() {
        searchOverlay.classList.add('active');
        setTimeout(() => {
            searchOverlay.querySelector('input').focus();
        }, 100);
    });
    
    closeSearch.addEventListener('click', function() {
        searchOverlay.classList.remove('active');
    });
    
  
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
        }
    });
    
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });
    
  
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
           
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            
            this.classList.add('active');
            
          
            const filter = this.dataset.filter;
            
            menuCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    if (card.dataset.category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
   
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.review-card').length;
    
    function updateSlider() {
        const slideWidth = reviewsSlider.querySelector('.review-card').offsetWidth;
        reviewsSlider.scrollTo({
            left: currentSlide * slideWidth,
            behavior: 'smooth'
        });
        
      
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    reviewPrev.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });
    
    reviewNext.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });
    

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentSlide = index;
            updateSlider();
        });
    });
    
   
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
           
            this.classList.add('clicked');
            
           
            cartItems++;
            cartCount.textContent = cartItems;
            
            
            const cartBtn = document.querySelector('.cart-btn');
            cartBtn.classList.add('pulse');
            setTimeout(() => {
                cartBtn.classList.remove('pulse');
            }, 300);
            
          
            const originalText = this.innerHTML;
            this.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Adicionado!
            `;
            
          
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('clicked');
            }, 2000);
        });
    });
    
  
    window.addEventListener('scroll', function() {
        const parallaxBg = document.querySelector('.parallax-bg');
        if (parallaxBg) {
            const scrollPosition = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
    
  
    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.animationDelay = `${1.5 + (index * 0.2)}s`;
    });
    
    
    function animateOnScroll() {
        const elements = document.querySelectorAll('.menu-card, .review-card, .about-content > *, .cta-content, .section-header');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
   
    animateOnScroll();
    
  
    const createMobileMenu = function() {
        const navbar = document.querySelector('.navbar');
        
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.menu-toggle')) {
                const menuToggle = document.createElement('button');
                menuToggle.classList.add('menu-toggle', 'icon-btn');
                menuToggle.setAttribute('aria-label', 'Menu');
                menuToggle.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                
                header.insertBefore(menuToggle, document.querySelector('.header-actions'));
                
                menuToggle.addEventListener('click', function() {
                    navbar.classList.toggle('active');
                    this.classList.toggle('active');
                    
                    if (this.classList.contains('active')) {
                        this.innerHTML = `
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        `;
                    } else {
                        this.innerHTML = `
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        `;
                    }
                });
                
             
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        if (window.innerWidth <= 768) {
                            navbar.classList.remove('active');
                            document.querySelector('.menu-toggle').classList.remove('active');
                            document.querySelector('.menu-toggle').innerHTML = `
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            `;
                        }
                    });
                });
            }
        } else {
            const menuToggle = document.querySelector('.menu-toggle');
            if (menuToggle) {
                menuToggle.remove();
            }
            navbar.classList.remove('active');
        }
    };
    
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
    
    
    updateSlider();
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (this.getAttribute('href') !== '#') {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});
