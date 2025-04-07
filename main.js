// Import cookie consent
import 'vanilla-cookieconsent/dist/cookieconsent.css';

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('#main-nav')) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Blog search functionality
    const blogSearch = document.getElementById('blogSearch');
    if (blogSearch) {
        const blogList = document.getElementById('blogList');
        const noResults = document.getElementById('noResults');
        const blogCards = document.querySelectorAll('.blog-card');

        blogSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            let hasResults = false;

            blogCards.forEach(card => {
                const title = card.getAttribute('data-title').toLowerCase();
                const content = card.getAttribute('data-content').toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    card.style.display = 'block';
                    hasResults = true;
                } else {
                    card.style.display = 'none';
                }
            });

            if (noResults) {
                noResults.style.display = hasResults ? 'none' : 'block';
            }
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // Basic form validation
            if (!formData.name || !formData.email || !formData.phone || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Phone validation (basic)
            const phoneRegex = /^\+?[\d\s-()]{10,}$/;
            if (!phoneRegex.test(formData.phone)) {
                alert('Please enter a valid phone number.');
                return;
            }

            console.log('Form submitted:', formData);
            alert('Thank you for your message. We will contact you soon!');
            contactForm.reset();
        });
    }

    // Navigation hide/show functionality
    const nav = document.getElementById('main-nav');
    
    // Create and append show navigation button
    const showNavBtn = document.createElement('button');
    showNavBtn.id = 'show-nav-btn';
    showNavBtn.innerHTML = '↑';
    showNavBtn.title = 'Show navigation';
    document.body.appendChild(showNavBtn);

    if (nav) {
        let lastScroll = 0;
        let isNavVisible = true;
        const scrollThreshold = 50; // Minimum scroll amount before hiding nav

        // Show/hide navigation based on scroll direction
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Always show nav at the top of the page
            if (currentScroll <= 0) {
                nav.style.boxShadow = 'none';
                nav.classList.remove('nav-hidden');
                showNavBtn.classList.remove('visible');
                isNavVisible = true;
                return;
            }

            // Add shadow when scrolled
            nav.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';

            // Determine scroll direction and distance
            if (currentScroll > lastScroll && currentScroll > scrollThreshold && isNavVisible) {
                // Scrolling down & nav is visible - hide nav
                nav.classList.add('nav-hidden');
                showNavBtn.classList.add('visible');
                isNavVisible = false;
            } else if (currentScroll < lastScroll && !isNavVisible) {
                // Scrolling up & nav is hidden - show nav
                nav.classList.remove('nav-hidden');
                showNavBtn.classList.remove('visible');
                isNavVisible = true;
            }

            lastScroll = currentScroll;
        });

        // Show navigation when button is clicked
        showNavBtn.addEventListener('click', () => {
            nav.classList.remove('nav-hidden');
            showNavBtn.classList.remove('visible');
            isNavVisible = true;
        });
    }

    // Initialize cookie consent
    import('vanilla-cookieconsent')
        .then((CookieConsent) => {
            window.cookieconsent.init({
                categories: {
                    necessary: {
                        enabled: true,
                        readonly: true,
                        description: 'Essential cookies that enable basic website functionality.'
                    },
                    analytics: {
                        enabled: false,
                        readonly: false,
                        description: 'Cookies that help us understand how you use our website (Google Analytics).'
                    },
                    hotjar: {
                        enabled: false,
                        readonly: false,
                        description: 'Cookies that help us understand user behavior and improve our website experience.'
                    }
                },
                language: {
                    default: 'en',
                    translations: {
                        en: {
                            consentModal: {
                                title: 'Privacy Preferences',
                                description: 'We use cookies to help you navigate efficiently and perform certain functions. You will find detailed information about all cookies under each consent category below.',
                                acceptAllBtn: 'Accept all cookies',
                                acceptNecessaryBtn: 'Reject all',
                                showPreferencesBtn: 'Manage preferences',
                                closeIconLabel: 'Close modal',
                                revision: 1
                            },
                            preferencesModal: {
                                title: 'Cookie Preferences',
                                acceptAllBtn: 'Accept all cookies',
                                acceptNecessaryBtn: 'Reject all',
                                savePreferencesBtn: 'Save preferences',
                                closeIconLabel: 'Close modal',
                                serviceCounterLabel: 'Service|Services',
                                sections: [
                                    {
                                        title: 'Cookie Usage',
                                        description: 'We use cookies to ensure the basic functionalities of the website and to enhance your online experience.'
                                    },
                                    {
                                        title: 'Strictly Necessary Cookies <span class="required">Required</span>',
                                        description: 'These cookies are essential for the proper functioning of our website. Without these cookies, the website would not work properly.',
                                        linkedCategory: 'necessary'
                                    },
                                    {
                                        title: 'Analytics Cookies',
                                        description: 'These cookies collect information about how you use our website. All information collected is aggregated and anonymous.',
                                        linkedCategory: 'analytics',
                                        cookieTable: {
                                            headers: {
                                                name: 'Cookie',
                                                description: 'Description',
                                                duration: 'Duration'
                                            },
                                            body: [
                                                {
                                                    name: '_ga',
                                                    description: 'Google Analytics cookie used to distinguish users',
                                                    duration: '2 years'
                                                },
                                                {
                                                    name: '_ga_*',
                                                    description: 'Google Analytics cookie used to persist session state',
                                                    duration: '2 years'
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        title: 'Behavior Analysis Cookies',
                                        description: 'These cookies help us understand how visitors interact with our website to improve user experience.',
                                        linkedCategory: 'hotjar',
                                        cookieTable: {
                                            headers: {
                                                name: 'Cookie',
                                                description: 'Description',
                                                duration: 'Duration'
                                            },
                                            body: [
                                                {
                                                    name: '_hjSessionUser_*',
                                                    description: 'Hotjar cookie for user session tracking',
                                                    duration: '1 year'
                                                },
                                                {
                                                    name: '_hjSession_*',
                                                    description: 'Hotjar cookie for current session data',
                                                    duration: '30 minutes'
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
                onAccept: function(cookie) {
                    // Initialize analytics based on user consent
                    if (cookie.categories.includes('analytics')) {
                        // Google Analytics initialization
                        const script = document.createElement('script');
                        script.async = true;
                        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-F76356605X';
                        document.head.appendChild(script);

                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-F76356605X', {
                            'cookie_flags': 'max-age=7200;secure;samesite=none'
                        });
                    }

                    // Initialize Hotjar based on user consent
                    if (cookie.categories.includes('hotjar')) {
                        (function(h,o,t,j,a,r){
                            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                            h._hjSettings={hjid:5272400,hjsv:6};
                            a=o.getElementsByTagName('head')[0];
                            r=o.createElement('script');r.async=1;
                            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                            a.appendChild(r);
                        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                    }
                },
                onChange: function(cookie, changedCategories) {
                    // Remove analytics if user disabled the category
                    if (!cookie.categories.includes('analytics')) {
                        // Remove GA cookies
                        document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                        document.cookie = '_ga_F76356605X=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    }

                    // Remove Hotjar if user disabled the category
                    if (!cookie.categories.includes('hotjar')) {
                        // Remove Hotjar cookies
                        document.cookie = '_hjSessionUser_5272400=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                        document.cookie = '_hjSession_5272400=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    }
                }
            });
        })
        .catch(error => {
            console.error('Failed to load cookie consent:', error);
        });
});