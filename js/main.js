document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const controls = document.querySelectorAll('.control');
    
    if (testimonials.length > 0 && controls.length > 0) {
        // Initialize the first testimonial and control as active
        testimonials[0].classList.add('active');
        controls[0].classList.add('active');
        
        controls.forEach((control, index) => {
            control.addEventListener('click', () => {
                // Remove active class from all testimonials and controls
                testimonials.forEach(testimonial => testimonial.classList.remove('active'));
                controls.forEach(ctrl => ctrl.classList.remove('active'));
                
                // Add active class to the clicked control and corresponding testimonial
                control.classList.add('active');
                testimonials[index].classList.add('active');
            });
        });
        
        // Auto-rotate testimonials every 5 seconds
        let currentIndex = 0;
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            
            // Remove active class from all testimonials and controls
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            controls.forEach(ctrl => ctrl.classList.remove('active'));
            
            // Add active class to the next testimonial and control
            testimonials[currentIndex].classList.add('active');
            controls[currentIndex].classList.add('active');
        }, 5000);
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Simulate form submission
                alert('Obrigado por se inscrever! Em breve você receberá nossas novidades.');
                emailInput.value = '';
            }
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            alert('Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                    const toggle = item.querySelector('.faq-toggle i');
                    toggle.className = 'fas fa-plus';
                });
                
                // If the clicked item wasn't active, open it
                if (!isActive) {
                    faqItem.classList.add('active');
                    const toggle = question.querySelector('.faq-toggle i');
                    toggle.className = 'fas fa-minus';
                }
            });
        });
    }
    
    // Calendar Filtering
    const filterButton = document.getElementById('filter-button');
    
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            const monthFilter = document.getElementById('filter-month').value;
            const locationFilter = document.getElementById('filter-location').value;
            const distanceFilter = document.getElementById('filter-distance').value;
            
            const events = document.querySelectorAll('.event-item');
            
            events.forEach(event => {
                const eventMonth = event.getAttribute('data-month');
                const eventState = event.getAttribute('data-state');
                const eventDistance = event.getAttribute('data-distance');
                
                let showEvent = true;
                
                if (monthFilter !== 'all' && eventMonth !== monthFilter) {
                    showEvent = false;
                }
                
                if (locationFilter !== 'all' && eventState !== locationFilter) {
                    showEvent = false;
                }
                
                if (distanceFilter !== 'all' && eventDistance !== distanceFilter) {
                    showEvent = false;
                }
                
                if (showEvent) {
                    event.style.display = 'flex';
                } else {
                    event.style.display = 'none';
                }
            });
            
            // Check if there are any visible events
            const visibleEvents = document.querySelectorAll('.event-item[style="display: flex;"]');
            const monthDividers = document.querySelectorAll('.month-divider');
            
            if (visibleEvents.length === 0) {
                // If no events are visible, show a message
                const noEventsMessage = document.createElement('div');
                noEventsMessage.className = 'no-events-message';
                noEventsMessage.innerHTML = '<p>Nenhum evento encontrado com os filtros selecionados.</p>';
                
                // Remove any existing message
                const existingMessage = document.querySelector('.no-events-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                // Add the message after the last month divider
                const eventsContainer = document.querySelector('.events-list');
                eventsContainer.appendChild(noEventsMessage);
                
                // Hide all month dividers
                monthDividers.forEach(divider => {
                    divider.style.display = 'none';
                });
            } else {
                // Remove any existing "no events" message
                const existingMessage = document.querySelector('.no-events-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                // Show month dividers that have visible events
                monthDividers.forEach(divider => {
                    const monthName = divider.querySelector('h2').textContent.trim();
                    const monthNumber = getMonthNumber(monthName);
                    
                    let hasVisibleEvents = false;
                    
                    // Check if there are any visible events for this month
                    events.forEach(event => {
                        if (event.style.display === 'flex' && event.getAttribute('data-month') === monthNumber) {
                            hasVisibleEvents = true;
                        }
                    });
                    
                    if (hasVisibleEvents) {
                        divider.style.display = 'block';
                    } else {
                        divider.style.display = 'none';
                    }
                });
            }
        });
    }
    
    // Helper function to get month number from month name
    function getMonthNumber(monthName) {
        const months = {
            'Janeiro': '01',
            'Fevereiro': '02',
            'Março': '03',
            'Abril': '04',
            'Maio': '05',
            'Junho': '06',
            'Julho': '07',
            'Agosto': '08',
            'Setembro': '09',
            'Outubro': '10',
            'Novembro': '11',
            'Dezembro': '12'
        };
        
        for (const month in months) {
            if (monthName.includes(month)) {
                return months[month];
            }
        }
        
        return null;
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                e.preventDefault();
                
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-box, .event-card, .team-member, .achievement, .partner');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation check on page load
    animateOnScroll();
});
