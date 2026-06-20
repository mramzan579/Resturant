// Menu Data
const menuData = [
    { id: 1, name: "Wagyu Beef Tartare", category: "starters", price: "$28", desc: "Quail egg, truffle oil, crostini", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Truffle Arancini", category: "starters", price: "$18", desc: "Crispy risotto balls, wild mushroom, garlic aioli", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Lobster Bisque", category: "starters", price: "$22", desc: "Creamy bisque with chunks of Maine lobster", image: "https://images.unsplash.com/photo-1548943487-a2e4f43bb222?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Pan-Seared Salmon", category: "main", price: "$38", desc: "Norwegian salmon, lemon butter, quinoa", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80" },
    { id: 5, name: "Black Truffle Linguine", category: "main", price: "$32", desc: "Handmade pasta, wild mushroom, black truffle", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80" },
    { id: 6, name: "Smoked Ribs", category: "bbq", price: "$45", desc: "Slow-cooked for 12 hours, house BBQ sauce", image: "https://images.unsplash.com/photo-1544025162-83b38c2278e1?auto=format&fit=crop&w=400&q=80" },
    { id: 7, name: "Wood-Fired Margherita", category: "pizza", price: "$24", desc: "San Marzano tomatoes, fresh mozzarella, basil", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80" },
    { id: 8, name: "Truffle Mushroom Pizza", category: "pizza", price: "$28", desc: "Wild mushrooms, truffle oil, ricotta", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80" },
    { id: 9, name: "Aura Signature Burger", category: "burgers", price: "$26", desc: "Wagyu patty, brioche bun, aged cheddar", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80" },
    { id: 10, name: "Dark Chocolate Fondant", category: "desserts", price: "$16", desc: "Molten center, vanilla bean ice cream", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80" },
    { id: 11, name: "Artisan Mocktail", category: "drinks", price: "$12", desc: "Fresh berries, mint, sparkling water", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80" },
    { id: 12, name: "Classic Mojito", category: "drinks", price: "$14", desc: "Rum, fresh mint, lime juice", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=400&q=80" }
];

// Document Ready
document.addEventListener('DOMContentLoaded', () => {
    
    // Digital Menu Rendering
    const menuContainer = document.getElementById('menu-container');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const searchInput = document.getElementById('menu-search');
    
    function renderMenu(items) {
        menuContainer.innerHTML = '';
        if(items.length === 0) {
            menuContainer.innerHTML = '<p class="text-muted" style="grid-column: 1/-1; text-align: center;">No items found.</p>';
            return;
        }
        items.forEach(item => {
            const el = document.createElement('div');
            el.className = 'menu-item';
            el.innerHTML = `
                <div class="menu-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.desc}</p>
                </div>
                <div class="menu-item-price">${item.price}</div>
            `;
            menuContainer.appendChild(el);
        });
    }

    // Initial render
    renderMenu(menuData);

    // Tab Filtering
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            searchInput.value = ''; // clear search on tab change
            
            if(category === 'all') {
                renderMenu(menuData);
            } else {
                const filtered = menuData.filter(item => item.category === category);
                renderMenu(filtered);
            }
        });
    });

    // Search Filtering
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        // Reset tabs to 'All'
        tabBtns.forEach(b => b.classList.remove('active'));
        document.querySelector('.tab-btn[data-category="all"]').classList.add('active');
        
        const filtered = menuData.filter(item => 
            item.name.toLowerCase().includes(term) || 
            item.desc.toLowerCase().includes(term)
        );
        renderMenu(filtered);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active')); // close others
            if(!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Testimonials Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        if(index >= slides.length) currentSlide = 0;
        if(index < 0) currentSlide = slides.length - 1;
        slides[currentSlide].classList.add('active');
    }

    if(prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide++;
            showSlide(currentSlide);
        });
        prevBtn.addEventListener('click', () => {
            currentSlide--;
            showSlide(currentSlide);
        });
        // Auto slide
        setInterval(() => {
            currentSlide++;
            showSlide(currentSlide);
        }, 5000);
    }

    // Reservation Form Validation
    const resForm = document.getElementById('reservation-form');
    if(resForm) {
        resForm.addEventListener('submit', (e) => {
            e.preventDefault();
            closeReservationModal();
            openSuccessPopup();
            resForm.reset();
        });
    }

    // Exit Intent Logic
    let exitIntentTriggered = false;
    document.addEventListener('mouseleave', (e) => {
        if(e.clientY < 0 && !exitIntentTriggered) {
            exitIntentTriggered = true;
            openExitPopup();
        }
    });

    // Opening Hours Logic
    updateOpeningStatus();
    setInterval(updateOpeningStatus, 60000);
});

// Modal Functions (Global scope for onclick attributes)
window.openReservationModal = function(e) {
    if(e) e.preventDefault();
    document.getElementById('reservation-modal').classList.add('active');
}

window.closeReservationModal = function() {
    document.getElementById('reservation-modal').classList.remove('active');
}

window.openSuccessPopup = function() {
    document.getElementById('success-popup').classList.add('active');
}

window.closeSuccessPopup = function() {
    document.getElementById('success-popup').classList.remove('active');
}

window.openExitPopup = function() {
    document.getElementById('exit-popup').classList.add('active');
}

window.closeExitPopup = function() {
    document.getElementById('exit-popup').classList.remove('active');
}

window.claimExitOffer = function() {
    closeExitPopup();
    openReservationModal();
    // Pre-fill a hypothetical promo code field or show alert
    alert("Promo code 'WELCOME10' applied to your reservation!");
}

// Live Opening Status Logic
function updateOpeningStatus() {
    const statusEl = document.getElementById('opening-status');
    if(!statusEl) return;
    
    const now = new Date();
    const day = now.getDay(); // 0 = Sun, 1 = Mon...
    const hour = now.getHours();
    
    let isOpen = false;
    let closeTime = '';

    if(day >= 1 && day <= 4) { // Mon - Thu (11am - 10pm)
        if(hour >= 11 && hour < 22) { isOpen = true; closeTime = '10 PM'; }
    } else if (day === 5 || day === 6) { // Fri - Sat (11am - 11:30pm)
        if(hour >= 11 && hour < 23) { isOpen = true; closeTime = '11:30 PM'; } // Simplification for 11:30
    } else if (day === 0) { // Sun (10am - 9pm)
        if(hour >= 10 && hour < 21) { isOpen = true; closeTime = '9 PM'; }
    }

    if(isOpen) {
        statusEl.innerHTML = `Open Now (Closes at ${closeTime})`;
        statusEl.style.color = 'var(--success)';
    } else {
        statusEl.innerHTML = `Closed Now`;
        statusEl.style.color = '#e74c3c';
    }
}
