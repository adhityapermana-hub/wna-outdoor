// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const preloader = document.querySelector('.preloader');
const currentYear = document.getElementById('currentYear');
const animateElements = document.querySelectorAll('.animate-on-scroll');
const backToTopButton = document.querySelector('.back-to-top');
const floatingWA = document.querySelector('.floating-wa');
const categoryButtons = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');
const quickViewButtons = document.querySelectorAll('.product-quick-view');
const detailButtons = document.querySelectorAll('.product-detail-btn');
const consultationForm = document.getElementById('consultationForm');
const productModal = document.getElementById('productModal');
const modalClose = document.querySelector('.modal-close');
const statNumbers = document.querySelectorAll('.stat-number');

// Set current year
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Animate stats counting
        animateStats();
    }, 2000);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    // Navbar background on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
    
    // Animate elements on scroll
    animateOnScroll();
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Back to top functionality
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Product category filtering
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.dataset.category;
        
        // Filter product cards
        productCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Product quick view and detail buttons
const productData = {
    1: {
        title: "Tenda Camping 4 Person",
        price: "Rp 1.200.000",
        description: "Tenda waterproof dengan ventilasi baik, cocok untuk keluarga kecil atau kelompok hiking. Dilengkapi dengan rainfly dan groundsheet untuk proteksi maksimal.",
        features: [
            "Kapasitas: 4 orang",
            "Material: Polyester 210T dengan coating waterproof",
            "Ventilasi: 2 jendela + 1 pintu dengan screen mesh",
            "Dimensi: 240 x 240 x 160 cm",
            "Berat: 4.2 kg",
            "Warna: Hijau/Hitam"
        ],
        image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1465&q=80"
    },
    2: {
        title: "Carrier 60L",
        price: "Rp 850.000",
        description: "Backpack kapasitas besar dengan sistem beban terdistribusi yang ergonomis. Cocok untuk hiking atau trekking multi-day.",
        features: [
            "Kapasitas: 60 liter",
            "Frame: Aluminum internal frame",
            "Sistem beban: Adjustable load lifter",
            "Compartments: Multiple pockets + sleeping bag compartment",
            "Material: Ripstop nylon",
            "Berat: 1.8 kg"
        ],
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
    },
    3: {
        title: "Sleeping Bag -5°C",
        price: "Rp 450.000",
        description: "Sleeping bag tahan dingin hingga -5°C, ringan dan compact. Cocok untuk pendakian gunung atau camping di daerah dingin.",
        features: [
            "Temperature rating: -5°C",
            "Filling: Hollow fiber insulation",
            "Shell: Nylon taffeta",
            "Dimensi terbuka: 220 x 85 cm",
            "Dimensi pack: 35 x 20 cm",
            "Berat: 1.2 kg"
        ],
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1468&q=80"
    },
    4: {
        title: "Kompor Portable Gas",
        price: "Rp 350.000",
        description: "Kompor mini dengan burner efisien, mudah dibawa kemana saja. Cocok untuk backpacking atau camping minimalis.",
        features: [
            "Type: Canister gas stove",
            "Output: 2800W",
            "Fuel: Butane/propane mix",
            "Boil time: 3.5 menit untuk 1L air",
            "Dimensi: 8 x 8 x 4 cm",
            "Berat: 85 gram"
        ],
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
    },
    5: {
        title: "Headlamp LED",
        price: "Rp 125.000",
        description: "Lampu kepala dengan 3 mode cahaya, tahan air, battery rechargeable. Essential gear untuk camping malam.",
        features: [
            "Brightness: 200 lumens",
            "Modes: High, medium, low, strobe",
            "Battery: Rechargeable lithium (included)",
            "Runtime: 8 jam (low mode)",
            "Water resistance: IPX4",
            "Berat: 85 gram"
        ],
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    6: {
        title: "Matras Camping",
        price: "Rp 275.000",
        description: "Matras self-inflating dengan ketebalan 5cm, nyaman dan praktis. Menyediakan insulasi dari tanah yang dingin.",
        features: [
            "Type: Self-inflating",
            "Thickness: 5 cm",
            "Material: Nylon oxford + foam core",
            "Dimensi: 183 x 51 cm",
            "Pack size: 28 x 15 cm",
            "Berat: 850 gram"
        ],
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
    }
};

// Handle product quick view and detail buttons
function showProductModal(productId) {
    const product = productData[productId];
    if (!product) return;
    
    const modalBody = productModal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="product-modal-content">
            <div class="product-modal-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-modal-details">
                <h2>${product.title}</h2>
                <div class="product-modal-price">${product.price}</div>
                <p class="product-modal-description">${product.description}</p>
                <div class="product-modal-features">
                    <h4>Spesifikasi:</h4>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="product-modal-actions">
                    <a href="https://wa.me/6281234567890?text=Saya%20tertarik%20dengan%20${encodeURIComponent(product.title)}%20dengan%20harga%20${encodeURIComponent(product.price)}" 
                       target="_blank" 
                       class="btn btn-whatsapp">
                        <i class="fab fa-whatsapp"></i> Beli via WhatsApp
                    </a>
                    <button class="btn btn-outline modal-close">Tutup</button>
                </div>
            </div>
        </div>
    `;
    
    // Add CSS for modal content
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .product-modal-content {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-xl);
        }
        
        @media (min-width: 768px) {
            .product-modal-content {
                grid-template-columns: 1fr 1fr;
            }
        }
        
        .product-modal-image img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: var(--radius-md);
        }
        
        .product-modal-price {
            font-family: 'Poppins', sans-serif;
            font-size: var(--text-2xl);
            font-weight: 700;
            color: var(--color-forest);
            margin-bottom: var(--space-lg);
        }
        
        .product-modal-features h4 {
            margin-bottom: var(--space-md);
        }
        
        .product-modal-features ul {
            list-style: none;
            margin-bottom: var(--space-xl);
        }
        
        .product-modal-features li {
            margin-bottom: var(--space-sm);
            padding-left: 20px;
            position: relative;
        }
        
        .product-modal-features li:before {
            content: '✓';
            color: var(--color-forest);
            position: absolute;
            left: 0;
            font-weight: bold;
        }
        
        .product-modal-actions {
            display: flex;
            gap: var(--space-md);
            flex-wrap: wrap;
        }
        
        .product-modal-actions .btn {
            flex: 1;
            min-width: 150px;
        }
    `;
    document.head.appendChild(modalStyle);
    
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add close event to modal close button
    const modalCloseBtn = modalBody.querySelector('.modal-close');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            productModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// Add event listeners to quick view and detail buttons
quickViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const productId = button.dataset.id;
        showProductModal(productId);
    });
});

detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const productId = button.dataset.id;
        showProductModal(productId);
    });
});

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal.classList.contains('active')) {
        productModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal when clicking outside
productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
        productModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal with close button
modalClose.addEventListener('click', () => {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Consultation form submission
if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!name || !phone || !service || !message) {
            showNotification('Harap isi semua field!', 'error');
            return;
        }
        
        // Create WhatsApp message
        const serviceText = {
            'rental': 'Sewa Alat',
            'purchase': 'Beli Produk',
            'consultation': 'Konsultasi',
            'other': 'Lainnya'
        }[service] || service;
        
        const whatsappMessage = `Halo WNA Outdoor,\n\nNama: ${name}\nNomor: ${phone}\nLayanan: ${serviceText}\nPertanyaan: ${message}`;
        const whatsappURL = `https://wa.me/6281234567890?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Reset form
        consultationForm.reset();
        
        // Show success message
        showNotification('Pesan berhasil dikirim! Anda akan diarahkan ke WhatsApp.', 'success');
    });
}

// Animate stats counting
function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const duration = 2000;
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current).toLocaleString();
        }, 16);
    });
}

// Notification system
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    // Add animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Animate elements on scroll
function animateOnScroll() {
    const windowHeight = window.innerHeight;
    const triggerBottom = windowHeight * 0.85;
    
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('visible');
            
            // Apply delay if specified
            const delay = element.getAttribute('data-delay');
            if (delay) {
                element.style.transitionDelay = `${delay}s`;
            }
        }
    });
}

// Initial animation check
animateOnScroll();

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        const rate = scrolled * -0.3;
        heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effect to product cards
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            card.style.transform = 'translateY(-10px)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            card.style.transform = 'translateY(0)';
        }
    });
    
    // Touch support for mobile
    card.addEventListener('touchstart', () => {
        card.classList.add('touched');
    }, { passive: true });
    
    card.addEventListener('touchend', () => {
        setTimeout(() => {
            card.classList.remove('touched');
        }, 150);
    }, { passive: true });
});

// Add CSS for touch effect
const touchStyle = document.createElement('style');
touchStyle.textContent = `
    .product-card.touched {
        transform: scale(0.98) !important;
        transition: transform 0.1s ease !important;
    }
`;
document.head.appendChild(touchStyle);

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on desktop
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Re-check animations
        animateOnScroll();
    }, 250);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});