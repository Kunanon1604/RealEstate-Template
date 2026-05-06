document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Change the icons inside the button based on previous settings
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        if(themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        if(themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
    }

    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            // toggle icons inside button
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');

            // if set via local storage previously
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }

            // if NOT set via local storage previously
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
        });
    }

    // 2. Mobile Menu Toggle (Side Drawer)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');

    if (mobileMenuBtn && mobileMenu) {
        // Open drawer
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('-translate-x-full');
            if (mobileOverlay) {
                mobileOverlay.classList.remove('hidden');
                setTimeout(() => {
                    mobileOverlay.classList.remove('opacity-0');
                }, 10);
            }
            document.body.classList.add('overflow-hidden'); // Prevent background scrolling
        });

        // Close drawer function
        const closeMobileMenu = () => {
            mobileMenu.classList.add('-translate-x-full');
            if (mobileOverlay) {
                mobileOverlay.classList.add('opacity-0');
                setTimeout(() => {
                    mobileOverlay.classList.add('hidden');
                }, 300);
            }
            document.body.classList.remove('overflow-hidden');
        };

        // Close via X button
        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', closeMobileMenu);
        }

        // Close via overlay click
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', closeMobileMenu);
        }
    }

    // 3. Sticky Navbar
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.classList.add('shadow-md', 'glass');
            } else {
                navbar.classList.remove('shadow-md', 'glass');
            }
        });
    }

    // 4. Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 5. Form Validation Simulation (Contact/Agent forms)
    const forms = document.querySelectorAll('form.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                    // Add error message if not exists
                    let errorMsg = input.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        const msg = document.createElement('p');
                        msg.classList.add('error-message', 'text-red-500', 'text-xs', 'mt-1');
                        msg.textContent = 'This field is required.';
                        input.parentNode.insertBefore(msg, input.nextSibling);
                    }
                } else {
                    input.classList.remove('border-red-500');
                    let errorMsg = input.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });

            if (isValid) {
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="inline-block animate-spin mr-2">⟳</span>Sending...';
                submitBtn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    submitBtn.innerHTML = 'Message Sent Successfully!';
                    submitBtn.classList.remove('bg-primary-600', 'hover:bg-primary-700');
                    submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                    form.reset();
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.classList.add('bg-primary-600', 'hover:bg-primary-700');
                        submitBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    });
});

// Gallery Data
const galleryImagesData = [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
];

window.currentMainImageIndex = 0;

// Expose a function for gallery thumbnail click
window.changeMainImage = function(index) {
    if (index >= 0 && index < galleryImagesData.length) {
        window.currentMainImageIndex = index;
        const mainImg = document.getElementById('main-gallery-image');
        
        if (mainImg) {
            mainImg.style.opacity = '0.3';
            setTimeout(() => {
                mainImg.src = galleryImagesData[index];
                mainImg.style.opacity = '1';
            }, 200);
        }

        // Update thumbnails active state
        const thumbs = document.querySelectorAll('.thumbnail-item');
        thumbs.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.remove('opacity-60', 'border-transparent');
                thumb.classList.add('ring-2', 'ring-primary-600', 'ring-offset-2', 'dark:ring-offset-dark-bg');
            } else {
                thumb.classList.add('opacity-60', 'border-transparent');
                thumb.classList.remove('ring-2', 'ring-primary-600', 'ring-offset-2', 'dark:ring-offset-dark-bg');
            }
        });
        
        // Reset auto-slide timer when manually interacted
        if (window.resetSlideInterval) {
            window.resetSlideInterval();
        }
    }
}

// Function to slide left/right on the main image
window.slideMainImage = function(direction) {
    let newIndex = window.currentMainImageIndex + direction;
    if (newIndex < 0) newIndex = galleryImagesData.length - 1;
    if (newIndex >= galleryImagesData.length) newIndex = 0;
    window.changeMainImage(newIndex);
}

// Auto-slide functionality for Swiper gallery
let swiperSlideInterval;

function startSwiperSlide() {
    if (!document.getElementById('gallery-thumbnails')) return; // only run on detail page
    swiperSlideInterval = setInterval(() => {
        window.slideMainImage(1);
    }, 4000);
}

function stopSwiperSlide() {
    clearInterval(swiperSlideInterval);
}

// Start auto slide on load
document.addEventListener('DOMContentLoaded', () => {
    startSwiperSlide();

    // Pause on hover
    const galleryContainer = document.getElementById('main-gallery-image');
    if (galleryContainer) {
        const wrapper = galleryContainer.closest('.mb-12');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', stopSwiperSlide);
            wrapper.addEventListener('mouseleave', startSwiperSlide);
        }
    }
});

window.resetSlideInterval = () => {
    stopSwiperSlide();
    startSwiperSlide();
};

// Advanced Lightbox functionality
let currentLightboxIndex = 0;

window.openLightbox = function(index) {
    if (typeof index === 'string') {
        currentLightboxIndex = galleryImagesData.indexOf(index);
        if (currentLightboxIndex === -1) currentLightboxIndex = 0;
    } else {
        currentLightboxIndex = index || 0;
    }

    let lightbox = document.getElementById('custom-lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'custom-lightbox';
        lightbox.className = 'fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 backdrop-blur-md select-none';
        
        // Header (Counter + Close)
        const header = document.createElement('div');
        header.className = 'absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20';
        
        const counter = document.createElement('div');
        counter.id = 'lightbox-counter';
        counter.className = 'text-gray-300 font-medium tracking-wide bg-black/40 px-4 py-2 rounded-full backdrop-blur-md';
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="ph ph-x text-white text-2xl drop-shadow-md"></i>';
        closeBtn.className = 'text-gray-300 hover:text-white transition focus:outline-none bg-black/40 hover:bg-black/60 p-3 rounded-full backdrop-blur-md';
        closeBtn.onclick = closeLightbox;
        
        header.appendChild(counter);
        header.appendChild(closeBtn);
        lightbox.appendChild(header);

        // Navigation Buttons
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="ph ph-caret-left text-white text-3xl drop-shadow-md"></i>';
        prevBtn.className = 'absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition focus:outline-none bg-black/40 hover:bg-black/60 p-4 rounded-full backdrop-blur-md z-20';
        prevBtn.onclick = (e) => { e.stopPropagation(); prevLightboxImage(); };
        
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="ph ph-caret-right text-white text-3xl drop-shadow-md"></i>';
        nextBtn.className = 'absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition focus:outline-none bg-black/40 hover:bg-black/60 p-4 rounded-full backdrop-blur-md z-20';
        nextBtn.onclick = (e) => { e.stopPropagation(); nextLightboxImage(); };

        lightbox.appendChild(prevBtn);
        lightbox.appendChild(nextBtn);
        
        // Image Container
        const imgContainer = document.createElement('div');
        imgContainer.className = 'relative w-full h-full flex items-center justify-center p-4 md:p-12 z-10';
        
        const img = document.createElement('img');
        img.id = 'lightbox-img';
        img.className = 'max-w-full max-h-full object-contain rounded-lg shadow-2xl scale-95 transition-all duration-300';
        
        imgContainer.appendChild(img);
        lightbox.appendChild(imgContainer);
        
        // Close on background click
        imgContainer.addEventListener('click', (e) => {
            if (e.target === imgContainer) closeLightbox();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('pointer-events-none')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevLightboxImage();
            if (e.key === 'ArrowRight') nextLightboxImage();
        });

        document.body.appendChild(lightbox);
    }
    
    updateLightboxImage();
    
    // Trigger animations
    lightbox.classList.remove('pointer-events-none');
    requestAnimationFrame(() => {
        lightbox.classList.remove('opacity-0');
    });
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
}

function updateLightboxImage() {
    const imgEl = document.getElementById('lightbox-img');
    const counterEl = document.getElementById('lightbox-counter');
    if (imgEl && counterEl) {
        imgEl.classList.remove('scale-100');
        imgEl.classList.add('scale-95');
        imgEl.style.opacity = '0';
        
        setTimeout(() => {
            imgEl.src = galleryImagesData[currentLightboxIndex];
            counterEl.textContent = `${currentLightboxIndex + 1} / ${galleryImagesData.length}`;
            imgEl.onload = () => {
                imgEl.classList.remove('scale-95');
                imgEl.classList.add('scale-100');
                imgEl.style.opacity = '1';
            };
            // Fallback for cached images
            if (imgEl.complete) {
                imgEl.classList.remove('scale-95');
                imgEl.classList.add('scale-100');
                imgEl.style.opacity = '1';
            }
        }, 150);
    }
}

window.prevLightboxImage = function() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryImagesData.length) % galleryImagesData.length;
    updateLightboxImage();
}

window.nextLightboxImage = function() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImagesData.length;
    updateLightboxImage();
}

window.closeLightbox = function() {
    const lightbox = document.getElementById('custom-lightbox');
    if (lightbox) {
        const imgEl = document.getElementById('lightbox-img');
        lightbox.classList.add('opacity-0');
        lightbox.classList.add('pointer-events-none');
        if (imgEl) {
            imgEl.classList.remove('scale-100');
            imgEl.classList.add('scale-95');
        }
        
        // Restore background scrolling
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 300);
    }
}

// Custom Dropdown Logic for Search Bar
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.custom-dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.custom-dropdown-trigger');
        const menu = dropdown.querySelector('.custom-dropdown-menu');
        const label = dropdown.querySelector('.custom-dropdown-label');
        const hiddenInput = dropdown.querySelector('input[type="hidden"]');
        const options = menu.querySelectorAll('li');
        const caret = dropdown.querySelector('.ph-caret-down');

        // Toggle dropdown
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Close other dropdowns first
            document.querySelectorAll('.custom-dropdown-menu').forEach(m => {
                if (m !== menu) {
                    m.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2');
                    m.classList.remove('scale-100');
                    const otherCaret = m.parentElement.querySelector('.ph-caret-down');
                    if(otherCaret) otherCaret.classList.remove('rotate-180');
                }
            });

            menu.classList.toggle('opacity-0');
            menu.classList.toggle('pointer-events-none');
            menu.classList.toggle('-translate-y-2');
            menu.classList.toggle('scale-100');
            if(caret) caret.classList.toggle('rotate-180');
        });

        // Select option
        options.forEach(option => {
            // Append checkmark icon container to each option
            const checkIcon = document.createElement('i');
            checkIcon.className = 'ph ph-check text-primary-600 opacity-0 transition-opacity duration-200 text-lg';
            option.appendChild(checkIcon);

            // Set initial state
            if (option.dataset.value === '') {
                checkIcon.classList.remove('opacity-0');
                option.classList.add('bg-primary-50/50', 'dark:bg-primary-900/20');
            }

            option.addEventListener('click', (e) => {
                e.stopPropagation();
                label.textContent = option.textContent.trim();
                
                // Active styling for label
                label.classList.remove('text-gray-400');
                label.classList.add('text-gray-900', 'dark:text-white', 'font-medium');
                
                if(hiddenInput) hiddenInput.value = option.dataset.value;
                
                // Update checkmarks and background
                options.forEach(opt => {
                    opt.querySelector('.ph-check').classList.add('opacity-0');
                    opt.classList.remove('bg-primary-50', 'dark:bg-primary-900/30', 'bg-primary-50/50', 'dark:bg-primary-900/20', 'text-primary-700', 'dark:text-primary-400');
                });
                checkIcon.classList.remove('opacity-0');
                option.classList.add('bg-primary-50', 'dark:bg-primary-900/30', 'text-primary-700', 'dark:text-primary-400');
                
                // Close menu
                menu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2');
                menu.classList.remove('scale-100');
                if(caret) caret.classList.remove('rotate-180');
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-dropdown-menu').forEach(menu => {
            menu.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2');
            menu.classList.remove('scale-100');
        });
        document.querySelectorAll('.custom-dropdown .ph-caret-down').forEach(caret => {
            caret.classList.remove('rotate-180');
        });
    });
});

// Skeleton Loading Simulation for Featured Properties
document.addEventListener('DOMContentLoaded', () => {
    const skeletonGrid = document.getElementById('properties-skeleton');
    const contentGrid = document.getElementById('properties-content');

    if (skeletonGrid && contentGrid) {
        // Simulate network request delay
        setTimeout(() => {
            skeletonGrid.style.display = 'none';
            contentGrid.style.display = '';
            skeletonGrid.classList.add('hidden');
            contentGrid.classList.remove('hidden');
            
            // Re-trigger reveal animation for newly visible content if needed
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, { threshold: 0.1 });
            
            contentGrid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
            // Trigger window scroll to catch any viewport intersections
            window.dispatchEvent(new Event('scroll'));
            
        }, 1500); // 1.5 seconds skeleton duration
    }
});

// Mortgage Calculator
document.addEventListener('DOMContentLoaded', () => {
    const priceInput = document.getElementById('calc-price');
    const downInput = document.getElementById('calc-down');
    const rateInput = document.getElementById('calc-rate');
    const termInput = document.getElementById('calc-term');
    const resultEl = document.getElementById('calc-result');
    const priceLabelEl = document.getElementById('calc-price-label');

    if (priceInput && downInput && rateInput && termInput && resultEl) {
        const getCurrencyPrefix = () => {
            const curr = localStorage.getItem('homeScapeCurr') || 'thb';
            return curr === 'thb' ? '฿' : '$';
        };

        const calculateMortgage = () => {
            const price = parseFloat(priceInput.value) || 0;
            const downPercent = parseFloat(downInput.value) || 0;
            const rate = parseFloat(rateInput.value) || 0;
            const term = parseFloat(termInput.value) || 0;

            const principal = price - (price * (downPercent / 100));
            const r = (rate / 100) / 12;
            const n = term * 12;

            let monthlyPayment = 0;
            if (r === 0) {
                monthlyPayment = principal / n;
            } else {
                monthlyPayment = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            }

            const prefix = getCurrencyPrefix();
            if (isFinite(monthlyPayment) && monthlyPayment >= 0) {
                resultEl.textContent = prefix + Math.round(monthlyPayment).toLocaleString();
            } else {
                resultEl.textContent = prefix + '0';
            }
        };

        // Expose for currency switching — converts price and updates label/result
        window.updateMortgageCalcCurrency = (newCurr, oldCurr) => {
            const exchangeRate = 35;
            const currentPrice = parseFloat(priceInput.value) || 0;

            if (oldCurr === 'usd' && newCurr === 'thb') {
                priceInput.value = Math.round(currentPrice * exchangeRate);
            } else if (oldCurr === 'thb' && newCurr === 'usd') {
                priceInput.value = Math.round(currentPrice / exchangeRate);
            }

            // Update price label prefix
            if (priceLabelEl) {
                const prefix = newCurr === 'thb' ? '฿' : '$';
                priceLabelEl.textContent = 'Property Price (' + prefix + ')';
            }

            calculateMortgage();
        };

        [priceInput, downInput, rateInput, termInput].forEach(input => {
            input.addEventListener('input', calculateMortgage);
        });

        // Initial calculation
        calculateMortgage();
    }
});

// PDF Brochure Download Logic
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-pdf');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Show loading state on button
            const originalHTML = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="ph ph-spinner animate-spin text-xl text-primary-600"></i> <span class="hidden sm:inline">Generating PDF...</span>';
            
            const element = document.getElementById('property-brochure');
            
            // Store current dark mode state and temporarily remove it
            const htmlEl = document.documentElement;
            const wasDark = htmlEl.classList.contains('dark');
            if (wasDark) {
                htmlEl.classList.remove('dark');
            }
            
            // Temporary classes for better PDF rendering
            element.classList.add('bg-white', 'p-4');
            
            // Hide interactive header buttons in PDF
            const actionButtons = element.querySelectorAll('button');
            actionButtons.forEach(btn => btn.style.display = 'none');

            const opt = {
                margin:       15,
                filename:     'HomeScape_Property_Brochure.pdf',
                image:        { type: 'jpeg', quality: 1.0 },
                html2canvas:  { scale: 3, useCORS: true, letterRendering: true },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
            };

            // Generate PDF
            html2pdf().set(opt).from(element).save().then(() => {
                // Restore state
                actionButtons.forEach(btn => btn.style.display = '');
                element.classList.remove('bg-white', 'p-4');
                if (wasDark) {
                    htmlEl.classList.add('dark');
                }
                downloadBtn.innerHTML = originalHTML;
            }).catch(err => {
                console.error("PDF Generation failed", err);
                actionButtons.forEach(btn => btn.style.display = '');
                element.classList.remove('bg-white', 'p-4');
                if (wasDark) {
                    htmlEl.classList.add('dark');
                }
                downloadBtn.innerHTML = originalHTML;
                alert('Failed to generate PDF brochure. Please try again.');
            });
        });
    }
});

// Property Comparison Logic
document.addEventListener('DOMContentLoaded', () => {
    const maxCompare = 3;
    let compareList = JSON.parse(localStorage.getItem('homeScapeCompare')) || [];

    const saveCompareList = () => {
        localStorage.setItem('homeScapeCompare', JSON.stringify(compareList));
        updateCompareButtons();
        renderCompareWidget();
        renderCompareTable();
    };

    const updateCompareButtons = () => {
        document.querySelectorAll('.btn-compare').forEach(btn => {
            const id = btn.dataset.id;
            const isSelected = compareList.some(p => p.id === id);
            if (isSelected) {
                btn.classList.add('text-primary-500');
                btn.classList.remove('text-gray-500');
            } else {
                btn.classList.remove('text-primary-500');
                btn.classList.add('text-gray-500');
            }
        });
    };

    const toggleCompare = (btn) => {
        const id = btn.dataset.id;
        const existingIndex = compareList.findIndex(p => p.id === id);
        
        if (existingIndex > -1) {
            compareList.splice(existingIndex, 1);
        } else {
            if (compareList.length >= maxCompare) {
                alert(`You can only compare up to ${maxCompare} properties at a time.`);
                return;
            }
            compareList.push({
                id: id,
                title: btn.dataset.title,
                price: btn.dataset.price,
                img: btn.dataset.img,
                beds: btn.dataset.beds,
                baths: btn.dataset.baths,
                sqft: btn.dataset.sqft
            });
        }
        saveCompareList();
    };

    // Attach events to all compare buttons
    document.querySelectorAll('.btn-compare').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleCompare(btn);
        });
    });

    // Render Floating Widget
    const renderCompareWidget = () => {
        let widget = document.getElementById('compare-widget');
        
        if (compareList.length === 0) {
            if (widget) widget.remove();
            return;
        }

        if (!widget) {
            widget = document.createElement('div');
            widget.id = 'compare-widget';
            widget.className = 'fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-dark-card rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center gap-4 z-50 transition-all duration-300 opacity-0 translate-y-10';
            document.body.appendChild(widget);
            
            // Trigger animation
            requestAnimationFrame(() => {
                widget.classList.remove('opacity-0', 'translate-y-10');
            });
        }

        widget.innerHTML = `
            <div class="flex items-center gap-2">
                <div class="flex -space-x-3">
                    ${compareList.map(p => `<img src="${p.img}" class="w-10 h-10 rounded-full border-2 border-white dark:border-dark-card object-cover shadow-sm">`).join('')}
                </div>
                <span class="text-sm font-bold text-gray-700 dark:text-gray-200 ml-2">Compare (${compareList.length}/${maxCompare})</span>
            </div>
            <div class="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
            <a href="compare.html" class="bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold px-5 py-2 rounded-full transition whitespace-nowrap shadow-md">Compare Now</a>
        `;
    };

    // Render Comparison Table (only runs on compare.html)
    const renderCompareTable = () => {
        const container = document.getElementById('compare-container');
        if (!container) return;

        if (compareList.length === 0) {
            container.innerHTML = `
                <div class="p-16 text-center">
                    <i class="ph ph-files text-6xl text-gray-300 dark:text-gray-600 mb-4 inline-block"></i>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No properties selected</h3>
                    <p class="text-gray-500 dark:text-gray-400 mb-6">Select up to 3 properties from the listings to compare them side by side.</p>
                    <a href="index.html" class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-bold transition">Browse Properties</a>
                </div>
            `;
            return;
        }

        let tableHTML = `
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th class="p-4 border-b border-gray-100 dark:border-dark-border w-[130px] min-w-[130px] md:min-w-[200px] md:w-1/4 sticky left-0 z-20 bg-white dark:bg-dark-card md:shadow-none shadow-[4px_0_10px_-5px_rgba(0,0,0,0.1)]"></th>
        `;
        
        // Headers (Images & Titles)
        compareList.forEach(p => {
            tableHTML += `
                <th class="p-4 md:p-6 border-b border-gray-100 dark:border-dark-border w-[260px] min-w-[260px] md:w-1/4 align-top relative">
                    <button class="absolute top-6 right-6 h-8 w-8 bg-white/90 dark:bg-dark-bg/90 backdrop-blur rounded-full shadow flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition remove-compare-btn" data-id="${p.id}" title="Remove">
                        <i class="ph ph-x font-bold"></i>
                    </button>
                    <img src="${p.img}" class="w-full h-32 md:h-48 object-cover rounded-xl mb-4 shadow-sm">
                    <h3 class="font-bold text-gray-900 dark:text-white text-base md:text-lg leading-tight mb-2">${p.title}</h3>
                    <div class="text-primary-600 font-bold text-lg md:text-xl">${p.price}</div>
                </th>
            `;
        });
        
        tableHTML += `</tr></thead><tbody>`;
        
        // Rows
        const features = [
            { label: 'Bedrooms', key: 'beds', icon: 'ph-bed' },
            { label: 'Bathrooms', key: 'baths', icon: 'ph-bathtub' },
            { label: 'Square Area', key: 'sqft', icon: 'ph-square-half' }
        ];

        features.forEach(f => {
            tableHTML += `
                <tr>
                    <td class="p-4 md:p-6 border-b border-gray-100 dark:border-dark-border font-bold text-gray-700 dark:text-gray-300 w-[130px] min-w-[130px] md:min-w-[200px] md:w-1/4 sticky left-0 z-10 bg-white dark:bg-dark-card md:shadow-none shadow-[4px_0_10px_-5px_rgba(0,0,0,0.1)]">
                        <div class="flex items-center gap-2 text-sm md:text-base">
                            <i class="ph ${f.icon} text-lg md:text-2xl text-gray-400"></i>
                            <span class="truncate">${f.label}</span>
                        </div>
                    </td>
            `;
            compareList.forEach(p => {
                tableHTML += `<td class="p-4 md:p-6 border-b border-gray-100 dark:border-dark-border text-gray-900 dark:text-gray-100 font-medium text-base md:text-lg">${p[f.key]}</td>`;
            });
            tableHTML += `</tr>`;
        });

        tableHTML += `
                <tr>
                    <td class="p-4 md:p-6 w-[130px] min-w-[130px] md:min-w-[200px] md:w-1/4 sticky left-0 z-10 bg-white dark:bg-dark-card md:shadow-none shadow-[4px_0_10px_-5px_rgba(0,0,0,0.1)]"></td>
        `;
        compareList.forEach(p => {
            tableHTML += `
                    <td class="p-6">
                        <a href="detail.html" class="block w-full text-center bg-gray-100 hover:bg-gray-200 dark:bg-dark-border dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-3 rounded-lg transition">View Details</a>
                    </td>
            `;
        });

        tableHTML += `</tr></tbody></table>`;
        container.innerHTML = tableHTML;

        // Attach remove events
        container.querySelectorAll('.remove-compare-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                compareList = compareList.filter(p => p.id !== id);
                saveCompareList();
            });
        });
    };

    // Attach Clear All event
    const clearBtn = document.getElementById('clear-compare-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            compareList = [];
            saveCompareList();
        });
    }

    // Initial renders
    updateCompareButtons();
    renderCompareWidget();
    renderCompareTable();
});

// Localization & Currency Module
document.addEventListener('DOMContentLoaded', () => {
    // Dictionary
    const dictionary = {
        'en': {
            'nav_home': 'Home',
            'nav_properties': 'Properties',
            'nav_about': 'About',
            'nav_contact': 'Contact',
            'nav_add_listing': 'Add Listing',
            'hero_badge': 'Premium Real Estate',
            'hero_title': 'Find Your Perfect <br>Dream Home',
            'hero_subtitle': 'Discover the most outstanding properties, luxury villas, and modern apartments in top locations.',
            'search_placeholder': 'Search by location, property type...',
            'search_btn': 'Search',
            'feat_badge': 'Best Choice',
            'feat_title': 'Featured Properties',
            'feat_subtitle': 'Handpicked properties with premium amenities, exceptional locations, and beautiful architecture.',
            'footer_desc': 'Providing premium real estate services with a focus on client satisfaction, transparency, and top-tier properties.',
            'footer_links': 'Quick Links',
            'footer_types': 'Property Types',
            'footer_contact': 'Contact Info'
        },
        'th': {
            'nav_home': 'หน้าแรก',
            'nav_properties': 'โครงการทั้งหมด',
            'nav_about': 'เกี่ยวกับเรา',
            'nav_contact': 'ติดต่อเรา',
            'nav_add_listing': 'ลงประกาศ',
            'hero_badge': 'อสังหาริมทรัพย์พรีเมียม',
            'hero_title': 'ค้นพบบ้านในฝัน <br>ที่ใช่สำหรับคุณ',
            'hero_subtitle': 'สัมผัสโครงการบ้านเดี่ยว พูลวิลล่า และคอนโดมิเนียมทำเลทองที่คัดสรรมาอย่างดี',
            'search_placeholder': 'ค้นหาทำเล, ประเภทอสังหาฯ...',
            'search_btn': 'ค้นหา',
            'feat_badge': 'ตัวเลือกที่ดีที่สุด',
            'feat_title': 'โครงการแนะนำ',
            'feat_subtitle': 'คัดสรรบ้านพรีเมียมพร้อมสิ่งอำนวยความสะดวกครบครัน ดีไซน์โดดเด่นบนทำเลศักยภาพ',
            'footer_desc': 'ให้บริการอสังหาริมทรัพย์ระดับพรีเมียม เน้นความพึงพอใจของลูกค้า ความโปร่งใส และคุณภาพโครงการสูงสุด',
            'footer_links': 'เมนูลัด',
            'footer_types': 'ประเภทโครงการ',
            'footer_contact': 'ข้อมูลติดต่อ'
        }
    };

    const exchangeRate = 35; // 1 USD = 35 THB
    
    // Force Language to English and hide Thai (User requested)
    let currentLang = 'en';
    localStorage.setItem('homeScapeLang', 'en'); // Ensure it stays English even if previously TH
    
    let currentCurr = localStorage.getItem('homeScapeCurr') || 'thb'; // Default THB

    // Initialize UI state
    const langSelect = document.getElementById('lang-select');
    const currSelect = document.getElementById('curr-select');
    
    if (langSelect) langSelect.value = currentLang;
    if (currSelect) currSelect.value = currentCurr;

    const applyLocalization = () => {
        // 1. Translate Texts
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dictionary[currentLang] && dictionary[currentLang][key]) {
                el.innerHTML = dictionary[currentLang][key]; // innerHTML supports <br>
            }
        });

        // 2. Format Regular Prices
        document.querySelectorAll('.format-price').forEach(el => {
            const usdValue = parseFloat(el.getAttribute('data-usd-value'));
            if (!isNaN(usdValue)) {
                if (currentCurr === 'thb') {
                    const thbValue = usdValue * exchangeRate;
                    el.textContent = '฿' + thbValue.toLocaleString('en-US'); // Using en-US formatting for commas
                } else {
                    el.textContent = '$' + usdValue.toLocaleString('en-US');
                }
            }
        });
        
        // 3. Format "per month" Prices
        document.querySelectorAll('.format-price-month').forEach(el => {
            const usdValue = parseFloat(el.getAttribute('data-usd-value'));
            if (!isNaN(usdValue)) {
                if (currentCurr === 'thb') {
                    const thbValue = usdValue * exchangeRate;
                    el.textContent = '฿' + thbValue.toLocaleString('en-US') + ' / เดือน';
                } else {
                    el.textContent = '$' + usdValue.toLocaleString('en-US') + ' / month';
                }
            }
        });
        
        // Update document lang
        document.documentElement.lang = currentLang;
    };

    // Listeners for dropdowns
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('homeScapeLang', currentLang);
            applyLocalization();
        });
    }

    if (currSelect) {
        currSelect.addEventListener('change', (e) => {
            const oldCurr = currentCurr;
            currentCurr = e.target.value;
            localStorage.setItem('homeScapeCurr', currentCurr);
            applyLocalization();
            
            // If Mortgage Calculator exists, convert price and update display
            if (window.updateMortgageCalcCurrency) {
                window.updateMortgageCalcCurrency(currentCurr, oldCurr);
            }
        });
    }

    // 17. Agent Booking Calendar Logic
    const toggleBookingBtn = document.getElementById('toggle-booking-btn');
    const bookingSection = document.getElementById('booking-section');
    const bookingDateInput = document.getElementById('booking-date');
    const timeSlotBtns = document.querySelectorAll('.time-slot-btn');

    if (toggleBookingBtn && bookingSection) {
        toggleBookingBtn.addEventListener('click', () => {
            bookingSection.classList.toggle('hidden');
            if (!bookingSection.classList.contains('hidden')) {
                bookingSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    if (bookingDateInput && typeof flatpickr !== 'undefined') {
        flatpickr(bookingDateInput, {
            minDate: "today",
            dateFormat: "Y-m-d"
        });
    }

    if (timeSlotBtns.length > 0) {
        timeSlotBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Reset all
                timeSlotBtns.forEach(b => {
                    b.classList.remove('bg-primary-50', 'dark:bg-primary-900/30', 'border-primary-500', 'text-primary-600');
                    b.classList.add('bg-white', 'dark:bg-dark-card', 'border-gray-200', 'dark:border-gray-700', 'text-gray-700', 'dark:text-gray-300');
                });
                // Activate clicked
                const target = e.target;
                target.classList.remove('bg-white', 'dark:bg-dark-card', 'border-gray-200', 'dark:border-gray-700', 'text-gray-700', 'dark:text-gray-300');
                target.classList.add('bg-primary-50', 'dark:bg-primary-900/30', 'border-primary-500', 'text-primary-600');
            });
        });
    }

    // Initial Apply
    applyLocalization();
});

// Back to Top functionality
document.addEventListener('DOMContentLoaded', () => {
    // Create button dynamically
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.className = 'fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/30 transition-all duration-300 opacity-0 translate-y-10 pointer-events-none z-[60]';
    backToTopBtn.innerHTML = '<i class="ph ph-arrow-up text-xl"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(backToTopBtn);

    // Show/Hide on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
            backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
            backToTopBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});


// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 50,
            duration: 800,
            easing: 'ease-out-cubic',
        });
    }
});


// Page Transitions (Smooth Page Load)
(function() {
    // Apply initial transition classes to body
    document.body.classList.add('transition-opacity', 'duration-300', 'ease-in-out');
    
    // Ensure body is visible (it should be by default, but just in case)
    setTimeout(() => {
        document.body.classList.remove('opacity-0');
    }, 50);

    // Fade out effect on internal links
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = this.getAttribute('target');
            const href = this.getAttribute('href');
            
            // Exclude external links, new tabs, empty links, and anchor links
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && target !== '_blank') {
                
                // Exclude Javascript void
                if(href.startsWith('javascript:')) return;

                // Check if it's a relative link or same domain
                const isInternal = (this.hostname === window.location.hostname || !this.hostname);
                
                if (isInternal) {
                    e.preventDefault();
                    const targetUrl = this.href;
                    
                    document.body.classList.add('opacity-0');
                    
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 300); // Wait for fade out
                }
            }
        });
    });

    // Handle back button (pageshow event fires when page is loaded from bfcache)
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            document.body.classList.remove('opacity-0');
        }
    });
})();

// Mobile Property Slider Navigation
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('btn-prev-prop');
    const nextBtn = document.getElementById('btn-next-prop');
    const contentGrid = document.getElementById('properties-content');
    
    if (prevBtn && nextBtn && contentGrid) {
        prevBtn.addEventListener('click', () => {
            const scrollAmount = window.innerWidth * 0.8;
            contentGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            const scrollAmount = window.innerWidth * 0.8;
            contentGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
});
