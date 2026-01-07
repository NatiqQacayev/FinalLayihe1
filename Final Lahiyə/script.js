const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const registerModal = document.getElementById('registerModal');
const loginModal = document.getElementById('loginModal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const showLoginModal = document.getElementById('showLoginModal');
const showRegisterModal = document.getElementById('showRegisterModal');
const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');
const trackBtn = document.getElementById('trackBtn');
const trackingNumberInput = document.getElementById('trackingNumber');
const trackingResult = document.getElementById('trackingResult');
const contactForm = document.getElementById('contactForm');
const orderNowBtn = document.getElementById('orderNowBtn');
const trackingHeroBtn = document.getElementById('trackingHeroBtn');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

function openModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

registerBtn.addEventListener('click', () => openModal(registerModal));
loginBtn.addEventListener('click', () => openModal(loginModal));

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

showLoginModal?.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(registerModal);
    openModal(loginModal);
});

showRegisterModal?.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(registerModal);
});

window.addEventListener('click', (e) => {
    if (e.target === registerModal) closeModal(registerModal);
    if (e.target === loginModal) closeModal(loginModal);
});

registrationForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Şifrələr uyğun gəlmir!');
        return;
    }
    
    if (password.length < 8) {
        alert('Şifrə ən az 8 simvoldan ibarət olmalıdır!');
        return;
    }
    
    console.log('Qeydiyyat məlumatları:', { fullName, email, phone, password });
    
    alert('Qeydiyyat uğurla tamamlandı! Xoş gəlmisiniz, ' + fullName);
    closeModal(registerModal);
    

    this.reset();
});


loginForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    

    console.log('Giriş məlumatları:', { email, password });
    
    alert('Uğurla daxil oldunuz!');
    closeModal(loginModal);
    
    this.reset();
});


trackBtn?.addEventListener('click', trackPackage);
trackingHeroBtn?.addEventListener('click', () => {
    document.getElementById('tracking').scrollIntoView({ behavior: 'smooth' });
});

function trackPackage() {
    const trackingNumber = trackingNumberInput.value.trim();
    
    if (!trackingNumber) {
        alert('Zəhmət olmasa izləmə nömrəsini daxil edin!');
        return;
    }
    

    const trackingData = {
        'CARGO12345': {
            status: 'delivered',
            steps: [
                { step: 'Qəbul edildi', date: '2023-10-15', time: '10:30', location: 'Bakı Filialı' },
                { step: 'Sıralanmada', date: '2023-10-15', time: '14:15', location: 'Bakı Sıralama Mərkəzi' },
                { step: 'Daşıma başladı', date: '2023-10-16', time: '09:00', location: 'Bakı → Gəncə' },
                { step: 'Çatdırıldı', date: '2023-10-17', time: '12:45', location: 'Gəncə Filialı' }
            ],
            from: 'Bakı, Nəsimi rayonu',
            to: 'Gəncə, Nizami küç.',
            estimatedDelivery: '2023-10-17',
            actualDelivery: '2023-10-17 12:45',
            weight: '5.2 kg',
            dimensions: '30x40x20 cm'
        },
        'CARGO67890': {
            status: 'in_transit',
            steps: [
                { step: 'Qəbul edildi', date: '2023-10-18', time: '11:20', location: 'Sumqayıt Filialı' },
                { step: 'Sıralanmada', date: '2023-10-18', time: '16:45', location: 'Sumqayıt Sıralama Mərkəzi' },
                { step: 'Daşıma başladı', date: '2023-10-19', time: '08:30', location: 'Sumqayıt → Bakı' },
                { step: 'Çatdırılma zamanı', date: '2023-10-20', time: '--:--', location: 'Bakı' }
            ],
            from: 'Sumqayıt, Sənaye küç.',
            to: 'Bakı, Xətai rayonu',
            estimatedDelivery: '2023-10-20',
            actualDelivery: null,
            weight: '12.7 kg',
            dimensions: '50x40x30 cm'
        }
    };
    
    if (!trackingData[trackingNumber]) {

        const statuses = ['preparing', 'in_transit', 'delivered'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        

        const demoData = {
            status: randomStatus,
            steps: [
                { step: 'Qəbul edildi', date: '2023-10-20', time: '09:15', location: 'Bakı Filialı' },
                { step: 'Sıralanmada', date: '2023-10-20', time: '14:30', location: 'Bakı Sıralama Mərkəzi' },
                { step: 'Daşıma başladı', date: '2023-10-21', time: '08:00', location: 'Bakı → Filial' },
                { step: 'Çatdırılma zamanı', date: '2023-10-22', time: '--:--', location: 'Hədəf ünvan' }
            ],
            from: 'Bakı, Mərkəzi filial',
            to: 'Hədəf ünvan',
            estimatedDelivery: '2023-10-22',
            actualDelivery: randomStatus === 'delivered' ? '2023-10-22 15:30' : null,
            weight: '8.5 kg',
            dimensions: '40x30x25 cm'
        };
        
        displayTrackingResult(trackingNumber, demoData);
    } else {
        displayTrackingResult(trackingNumber, trackingData[trackingNumber]);
    }
}

function displayTrackingResult(trackingNumber, data) {
    const statusTexts = {
        'preparing': 'Hazırlanır',
        'in_transit': 'Yolda',
        'delivered': 'Çatdırıldı'
    };
    
    const statusColors = {
        'preparing': 'var(--warning-color)',
        'in_transit': 'var(--secondary-color)',
        'delivered': 'var(--success-color)'
    };
    
    const progressWidths = {
        'preparing': '25%',
        'in_transit': '50%',
        'delivered': '100%'
    };
    
    let stepsHtml = '';
    data.steps.forEach((step, index) => {
        const isActive = index <= (data.status === 'preparing' ? 0 : data.status === 'in_transit' ? 2 : 3);
        stepsHtml += `
            <div class="status-point ${isActive ? 'active' : ''}">
                <div class="point"></div>
                <span>${step.step}</span>
                <small>${step.date} ${step.time}</small>
            </div>
        `;
    });
    
    let detailsHtml = '';
    data.steps.forEach(step => {
        detailsHtml += `
            <div class="status-item">
                <div>
                    <strong>${step.step}</strong>
                    <p>${step.location}</p>
                </div>
                <div>${step.date} ${step.time}</div>
            </div>
        `;
    });
    
    const resultHtml = `
        <h3>Yük izləmə nömrəsi: <strong>${trackingNumber}</strong></h3>
        <div class="tracking-status">
            <p>Status: <strong style="color: ${statusColors[data.status]}">${statusTexts[data.status]}</strong></p>
            <div class="status-bar">
                <div class="status-progress" style="width: ${progressWidths[data.status]}"></div>
            </div>
            <div class="status-points">
                ${stepsHtml}
            </div>
        </div>
        <div class="status-details">
            <h4>Yük məlumatları:</h4>
            <div class="status-item">
                <div>Göndərən:</div>
                <div>${data.from}</div>
            </div>
            <div class="status-item">
                <div>Alıcı:</div>
                <div>${data.to}</div>
            </div>
            <div class="status-item">
                <div>Təxmini çatdırılma:</div>
                <div>${data.estimatedDelivery}</div>
            </div>
            <div class="status-item">
                <div>Faktiki çatdırılma:</div>
                <div>${data.actualDelivery || 'Hələ çatdırılmayıb'}</div>
            </div>
            <div class="status-item">
                <div>Çəki:</div>
                <div>${data.weight}</div>
            </div>
            <div class="status-item">
                <div>Ölçülər:</div>
                <div>${data.dimensions}</div>
            </div>
            <h4 style="margin-top: 20px;">Status tarixçəsi:</h4>
            ${detailsHtml}
        </div>
    `;
    
    trackingResult.innerHTML = resultHtml;
    
    if (data.status === 'delivered') {
        setTimeout(() => {
            alert(`Yükünüz ${data.actualDelivery} tarixində uğurla çatdırıldı!`);
        }, 500);
    }
}


contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;
    

    console.log('Əlaqə məlumatları:', { name, email, subject, message });

    alert('Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.');
    

    this.reset();
});


orderNowBtn?.addEventListener('click', () => {
    openModal(registerModal);
    alert('Sifariş vermək üçün zəhmət olmasa qeydiyyatdan keçin və ya hesabınıza daxil olun.');
});

mobileMenuBtn?.addEventListener('click', () => {
    const navUl = document.querySelector('nav ul');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (navUl.style.display === 'flex') {
        navUl.style.display = 'none';
        authButtons.style.display = 'none';
    } else {
        navUl.style.display = 'flex';
        authButtons.style.display = 'flex';
        

        if (window.innerWidth <= 768) {
            navUl.style.flexDirection = 'column';
            navUl.style.position = 'absolute';
            navUl.style.top = '100%';
            navUl.style.left = '0';
            navUl.style.width = '100%';
            navUl.style.backgroundColor = 'white';
            navUl.style.padding = '20px';
            navUl.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            
            authButtons.style.flexDirection = 'column';
            authButtons.style.position = 'absolute';
            authButtons.style.top = 'calc(100% + 200px)';
            authButtons.style.left = '0';
            authButtons.style.width = '100%';
            authButtons.style.backgroundColor = 'white';
            authButtons.style.padding = '20px';
            authButtons.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        }
    }
});


document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        

        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                if (window.innerWidth <= 768) {
                    const navUl = document.querySelector('nav ul');
                    const authButtons = document.querySelector('.auth-buttons');
                    navUl.style.display = 'none';
                    authButtons.style.display = 'none';
                }
            }
        }
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        header.style.padding = '10px 0';
    } else {
        header.style.boxShadow = 'var(--shadow)';
        header.style.padding = '15px 0';
    }
});


let allBranches = [];


async function loadBranches() {
    const branchesGrid = document.getElementById('branchesGrid');

    branchesGrid.innerHTML = `
        <div style="text-align: center; padding: 50px; grid-column: 1/-1;">
            <i class="fas fa-spinner fa-spin" style="font-size: 3rem; color: var(--secondary-color);"></i>
            <p style="margin-top: 20px; color: var(--gray-color);">Filiallar yüklənir...</p>
        </div>
    `;
    
    try {
        const response = await fetch('https://695d795f2556fd22f675b99f.mockapi.io/cargo/filiallar');
        
        if (!response.ok) {
            throw new Error('API sorğusu uğursuz oldu');
        }
        
        const branches = await response.json();
        allBranches = branches;
        
 
        displayBranches(branches);
        
        updateBranchStats(branches.length);
        
        console.log('Filiallar uğurla yükləndi:', branches);
        
    } catch (error) {
        console.error('Filialları yükləmək mümkün olmadı:', error);
        branchesGrid.innerHTML = `
            <div style="text-align: center; padding: 50px; grid-column: 1/-1; color: var(--accent-color);">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <p><strong>Xəta!</strong> Filialları yükləmək mümkün olmadı.</p>
                <p style="margin-top: 10px; font-size: 0.9rem;">Zəhmət olmasa səhifəni yeniləyin və ya bir az sonra yenidən cəhd edin.</p>
            </div>
        `;
    }
}


function displayBranches(branches) {
    const branchesGrid = document.getElementById('branchesGrid');
    
    if (branches.length === 0) {
        branchesGrid.innerHTML = `
            <div style="text-align: center; padding: 50px; grid-column: 1/-1;">
                <p style="color: var(--gray-color);">Heç bir filial tapılmadı.</p>
            </div>
        `;
        return;
    }
    
    branchesGrid.innerHTML = branches.map(branch => {
 
        const name = branch.name || branch.filialAdi || branch.ad || 'Filial';
        const address = branch.address || branch.unvan || branch.location || '';
        const phone = branch.phone || branch.telefon || '';
        const whatsapp = branch.whatsapp || branch.whatsappPhone || '';
        const workingHours = branch.workingHours || branch.isSaatlari || branch.hours || '';
        const weekend = branch.weekend || branch.weekend_hours || '';
        const manager = branch.manager || branch.rehber || branch.filialRehberi || '';
        const services = branch.services || branch.xidmetler || [];
        const location = branch.location_coordinates || branch.koordinatlar || branch.coordinates || '';
        const type = branch.type || branch.tip || 'Standart';
        const isPrimary = branch.isPrimary || branch.esasFilial || false;
        const category = branch.category || branch.kateqoriya || 'regions';
        
        return `
            <div class="branch-card" data-category="${category}">
                <div class="branch-header">
                    <h3>${name}</h3>
                    <span class="branch-badge ${isPrimary ? 'primary' : ''}">${type}</span>
                </div>
                <div class="branch-info">
                    ${address ? `
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <div>
                            <h4>Ünvan</h4>
                            <p>${address}</p>
                        </div>
                    </div>
                    ` : ''}
                    
                    ${phone ? `
                    <div class="info-item">
                        <i class="fas fa-phone"></i>
                        <div>
                            <h4>Telefon</h4>
                            <p>${phone}</p>
                            ${whatsapp ? `<p>${whatsapp} (WhatsApp)</p>` : ''}
                        </div>
                    </div>
                    ` : ''}
                    
                    ${workingHours ? `
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <div>
                            <h4>İş saatları</h4>
                            <p>${workingHours}</p>
                            ${weekend ? `<p>${weekend}</p>` : ''}
                        </div>
                    </div>
                    ` : ''}
                    
                    ${manager ? `
                    <div class="info-item">
                        <i class="fas fa-user-tie"></i>
                        <div>
                            <h4>Filial rəhbəri</h4>
                            <p>${manager}</p>
                        </div>
                    </div>
                    ` : ''}
                </div>
                
                ${services.length > 0 ? `
                <div class="branch-services">
                    ${services.map(service => `<span class="service-tag">${service}</span>`).join('')}
                </div>
                ` : ''}
                
                ${location ? `
                <button class="btn-outline btn-small branch-map-btn" data-location="${location}">
                    Xəritədə göstər
                </button>
                ` : ''}
            </div>
        `;
    }).join('');
    
  
    initMapButtons();
}

function initBranchFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
        
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            if (filterValue === 'all') {
                displayBranches(allBranches);
            } else {
                const filtered = allBranches.filter(branch => {
                    const category = (branch.category || branch.kateqoriya || '').toLowerCase();
                    const name = (branch.name || branch.filialAdi || '').toLowerCase();
                    return category.includes(filterValue) || name.includes(filterValue);
                });
                displayBranches(filtered);
            }
        });
    });
}

function initMapButtons() {
    const mapButtons = document.querySelectorAll('.branch-map-btn');
    
    mapButtons.forEach(button => {
        button.addEventListener('click', () => {
            const location = button.getAttribute('data-location');
            
            if (location && location.includes(',')) {
                const [lat, lng] = location.split(',');
                const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
                window.open(mapsUrl, '_blank');
            } else {
                alert('Xəritə məlumatı mövcud deyil');
            }
        });
    });
}


function initBranchSearch() {
    const searchInput = document.getElementById('branchSearchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            displayBranches(allBranches);
        } else {
            const filtered = allBranches.filter(branch => {
                const name = (branch.name || branch.filialAdi || branch.ad || '').toLowerCase();
                const address = (branch.address || branch.unvan || '').toLowerCase();
                const city = (branch.category || branch.kateqoriya || '').toLowerCase();
                
                return name.includes(searchTerm) || 
                       address.includes(searchTerm) || 
                       city.includes(searchTerm);
            });
            displayBranches(filtered);
        }
    });
}

function updateBranchStats(totalBranches) {
    const totalBranchesEl = document.getElementById('totalBranches');
    if (totalBranchesEl) {
        totalBranchesEl.textContent = totalBranches + '+';
    }
}

function animateBranchStats() {
    const stats = document.querySelectorAll('.stat-item h3');
    
    stats.forEach(stat => {
        const originalText = stat.textContent;
        const targetValue = parseInt(originalText);
        
        if (isNaN(targetValue)) return;
        
        let currentValue = 0;
        const increment = targetValue / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
                stat.textContent = originalText;
            } else {
                stat.textContent = Math.floor(currentValue) + (originalText.includes('+') ? '+' : '');
            }
        }, stepTime);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    console.log('Cargo Express saytı uğurla yükləndi!');
    

    if (trackingNumberInput) {
        trackingNumberInput.value = 'CARGO12345';
        trackingNumberInput.setAttribute('placeholder', 'Məs: CARGO12345 (demo nömrə)');
    }
    
    loadBranches();
 
    initBranchFilter();
    initBranchSearch();
    
 
    const branchesSection = document.getElementById('branches');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateBranchStats, 500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (branchesSection) {
        observer.observe(branchesSection);
    }
});