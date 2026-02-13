// ========== MONKEY D LUFFY - GEAR 5 RED HAWK ==========
// Kapten CALEB! AUTO PLAY MUSIC + VIDEO FOCUS MODE!

document.addEventListener('DOMContentLoaded', function() {
    // ========== LOADING SCREEN ==========
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
        }
        document.getElementById('loading-percentage').textContent = progress + '%';
    }, 20);

    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        document.body.classList.add('loaded');
        
        // PANGGIL FUNGSI MUSIC SETELAH LOADING
        playMusic();
    }, 2000);

    // ========== AUTO PLAY MUSIC - 100% WORKING DI CHROME HP ==========
    function playMusic() {
        const audio = document.getElementById('bg-music');
        audio.volume = 0.2; // Volume enak
        audio.loop = true;
        
        // STRATEGI 1: Coba play langsung (10% work)
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('✅ MUSIC AUTO PLAY SUKSES!');
            }).catch(() => {
                console.log('⚠️ AUTOPLAY DIBLOKIR, PAKAI STRATEGI CADANGAN...');
                
                // STRATEGI 2: Play saat user pertama kali INTERAKSI di mana saja
                const playOnInteraction = function() {
                    audio.play().then(() => {
                        console.log('✅ MUSIC JALAN SETELAH INTERAKSI!');
                        
                        // Hapus tombol kalo ada
                        const btn = document.getElementById('music-toggle-btn');
                        if (btn) btn.remove();
                    }).catch(e => console.log('❌ Gagal juga:', e));
                    
                    document.removeEventListener('touchstart', playOnInteraction);
                    document.removeEventListener('click', playOnInteraction);
                    document.removeEventListener('scroll', playOnInteraction);
                };
                
                document.addEventListener('touchstart', playOnInteraction, { once: true });
                document.addEventListener('click', playOnInteraction, { once: true });
                document.addEventListener('scroll', playOnInteraction, { once: true });
                
                // STRATEGI 3: BUAT BUTTON FLOATING MANUAL (PALING AMPUH!)
                buatTombolMusic();
            });
        }
    }

    // ========== TOMBOL MUSIC FLOATING ==========
    function buatTombolMusic() {
        // Cek udah ada belum
        if (document.getElementById('music-toggle-btn')) return;
        
        // Buat tombol
        const musicBtn = document.createElement('button');
        musicBtn.id = 'music-toggle-btn';
        musicBtn.innerHTML = '<i class="fas fa-music"></i> <span>PUTAR MUSIK</span>';
        musicBtn.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 15px;
            background: linear-gradient(135deg, #FF3B30, #FF2D55);
            color: white;
            border: none;
            border-radius: 50px;
            padding: 12px 20px;
            font-size: 14px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            z-index: 9999;
            cursor: pointer;
            box-shadow: 0 5px 25px rgba(255, 59, 48, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: popIn 0.5s ease;
            backdrop-filter: blur(10px);
        `;
        
        // Tambahin ke body
        document.body.appendChild(musicBtn);
        
        // Event listener
        musicBtn.addEventListener('click', function() {
            const audio = document.getElementById('bg-music');
            audio.play().then(() => {
                musicBtn.innerHTML = '<i class="fas fa-music"></i> <span>MUSIK ON</span>';
                musicBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                
                // Hilangin setelah 3 detik
                setTimeout(() => {
                    musicBtn.style.opacity = '0';
                    musicBtn.style.transition = 'opacity 0.5s';
                    setTimeout(() => musicBtn.remove(), 500);
                }, 2000);
            }).catch(e => console.log('❌ Tetap gagal:', e));
        });
    }

    // ========== PARTICLE CANVAS ==========
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    const particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.1,
            speedY: (Math.random() - 0.5) * 0.1,
            color: `rgba(255, 59, 48, ${Math.random() * 0.2 + 0.1})`
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
    window.addEventListener('resize', resizeCanvas);

    // ========== CUSTOM CURSOR ==========
    const cursor = document.getElementById('cursor');
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .testimonial-card, .btn-copy, .modal-close, #music-toggle-btn').forEach(el => {
            if (el) {
                el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
            }
        });
    }

    // ========== TESTIMONIAL CARDS ==========
    const testimonialTrack = document.getElementById('testimonial-track');
    
    for (let i = 0; i < 16; i++) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        const videoNumber = (i % 8) + 1;
        
        card.innerHTML = `
            <div class="testimonial-video-container">
                <video class="testimonial-video" src="video${videoNumber}.mp4" muted loop playsinline></video>
                <div class="video-overlay">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
            </div>
        `;
        testimonialTrack.appendChild(card);
    }

    // ========== HORIZONTAL SCROLL ==========
    const scrollContainer = document.querySelector('.testimonial-scroll');
    const track = document.querySelector('.testimonial-track');
    const progressBar = document.getElementById('scroll-progress');

    function updateProgress() {
        const scrollLeft = scrollContainer.scrollLeft;
        const scrollWidth = track.scrollWidth - scrollContainer.clientWidth;
        if (scrollWidth > 0) {
            const progress = (scrollLeft / scrollWidth) * 100;
            progressBar.style.width = progress + '%';
        }
    }

    scrollContainer.addEventListener('scroll', updateProgress);
    
    // Drag to scroll
    let isDragging = false;
    let startX, scrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
        scrollContainer.style.cursor = 'grabbing';
    });

    scrollContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mouseup', () => {
        isDragging = false;
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });

    setTimeout(updateProgress, 200);

    // ========== MODAL VIDEO DENGAN AUDIO FOCUS ==========
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const closeModal = document.querySelector('.close-modal');
    const bgMusic = document.getElementById('bg-music');
    let videoPlaying = false; // Flag buat track status video

    // Fungsi pause musik
    function pauseBackgroundMusic() {
        if (bgMusic && !bgMusic.paused) {
            bgMusic.pause();
            console.log('⏸️ MUSIK DI-PAUSE (video dibuka)');
        }
    }

    // Fungsi lanjut musik (dengan pengecekan)
    function resumeBackgroundMusic() {
        // Cuma lanjut kalo video lagi ga diputar dan musik lagi pause
        if (bgMusic && bgMusic.paused && !videoPlaying) {
            bgMusic.play().then(() => {
                console.log('▶️ MUSIK LANJUT (video ditutup)');
            }).catch(e => console.log('❌ Gagal lanjut musik:', e));
        }
    }

    // Event listener buka modal
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.addEventListener('click', function() {
            const videoNumber = (index % 8) + 1;
            modalVideo.src = `video${videoNumber}.mp4`;
            modal.classList.add('active');
            
            // PAUSE MUSIK SAAT MODAL OPEN
            pauseBackgroundMusic();
            
            // Play video
            modalVideo.play().then(() => {
                videoPlaying = true;
            }).catch(e => console.log('❌ Gagal play video:', e));
        });
    });

    // Event listener tutup modal via tombol close
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        videoPlaying = false;
        modalVideo.pause();
        modalVideo.src = '';
        
        // LANJUT MUSIK SAAT MODAL CLOSE
        resumeBackgroundMusic();
    });

    // Event listener tutup modal via klik overlay
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            videoPlaying = false;
            modalVideo.pause();
            modalVideo.src = '';
            
            // LANJUT MUSIK SAAT MODAL CLOSE
            resumeBackgroundMusic();
        }
    });

    // Event listener video selesai diputar
    modalVideo.addEventListener('ended', function() {
        // Otomatis tutup modal pas video abis
        modal.classList.remove('active');
        videoPlaying = false;
        modalVideo.src = '';
        
        // LANJUT MUSIK SAAT VIDEO SELESAI
        resumeBackgroundMusic();
    });

    // Keyboard escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                videoPlaying = false;
                modalVideo.pause();
                modalVideo.src = '';
                
                // LANJUT MUSIK SAAT ESCAPE
                resumeBackgroundMusic();
            }
            if (modalCara && modalCara.classList.contains('active')) {
                closeCaraKerjaModal();
            }
        }
    });

    // ========== SCROLL REVEAL ANIMATION ==========
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
    checkReveal();

    // ========== MODAL CARA KERJA ==========
    const caraKerjaBtn = document.getElementById('caraKerjaBtn');
    const modalCara = document.getElementById('modalCaraKerja');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const copyBtn = document.getElementById('copyBiodataBtn');
    const biodataText = document.getElementById('biodataText');
    const copyNotification = document.getElementById('copyNotification');

    function openCaraKerjaModal() {
        modalCara.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeCaraKerjaModal() {
        modalCara.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
        copyNotification.classList.remove('show');
    }

    caraKerjaBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openCaraKerjaModal();
    });

    closeModalBtn.addEventListener('click', closeCaraKerjaModal);
    modalOverlay.addEventListener('click', closeCaraKerjaModal);

    copyBtn.addEventListener('click', function() {
        const teksBiodata = biodataText.innerText;
        
        navigator.clipboard.writeText(teksBiodata).then(function() {
            copyNotification.classList.add('show');
            
            setTimeout(function() {
                copyNotification.classList.remove('show');
            }, 3000);
        }).catch(function(err) {
            console.error('Gagal menyalin: ', err);
            alert('Gagal menyalin teks. Silakan salin manual.');
        });
    });

    // Video hover play (desktop only)
    if (window.innerWidth > 768) {
        document.querySelectorAll('.testimonial-video').forEach(video => {
            video.addEventListener('mouseenter', function() {
                this.play();
            });
            
            video.addEventListener('mouseleave', function() {
                this.pause();
                this.currentTime = 0;
            });
        });
    }

    console.log('☀️ RED HAWK - AUTO PLAY MUSIC + VIDEO FOCUS MODE AKTIF!');
});