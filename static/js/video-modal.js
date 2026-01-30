// Video Modal JavaScript
// Configuration du volume : 0.8 = 80% (peut être ajusté entre 0.0 et 1.0)
const VIDEO_VOLUME_LEVEL = 0.8;

class VideoModal {
    constructor() {
        this.modal = null;
        this.video = null;
        this.isPlaying = false;
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        // Create modal container
        this.modal = document.createElement('div');
        this.modal.className = 'video-modal hidden';
        this.modal.id = 'video-modal';

        // Create video container
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';

        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'video-close';
        closeBtn.innerHTML = '×';
        closeBtn.addEventListener('click', () => this.close());

        // Create video element
        this.video = document.createElement('video');
        this.video.controls = false; // On peut changer en true si on veut les contrôles
        this.video.autoplay = true;
        this.video.muted = false; // Vidéo avec son
        this.video.volume = VIDEO_VOLUME_LEVEL; // Volume configuré (par défaut 80%)
        this.video.preload = 'auto';

        // Assemble modal
        videoContainer.appendChild(closeBtn);
        videoContainer.appendChild(this.video);
        this.modal.appendChild(videoContainer);

        // Add to body
        document.body.appendChild(this.modal);
    }

    bindEvents() {
        // Video events
        this.video.addEventListener('ended', () => {
            this.close();
        });

        this.video.addEventListener('error', (e) => {
            console.error('Erreur vidéo:', e);
            setTimeout(() => this.close(), 3000);
        });

        // Close on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.close();
            }
        });
    }

    show(videoSrc) {
        if (!videoSrc) {
            console.error('Aucune source vidéo fournie');
            return;
        }

        // Clear any existing sources
        this.video.innerHTML = '';

        // If videoSrc is an array, create multiple source elements
        if (Array.isArray(videoSrc)) {
            videoSrc.forEach(src => {
                const source = document.createElement('source');
                source.src = src.url;
                source.type = src.type;
                this.video.appendChild(source);
            });
        } else {
            // Single source
            this.video.src = videoSrc;
        }
        
        // Show modal
        this.modal.classList.remove('hidden');
        this.isPlaying = true;

        // Configure le volume avant la lecture
        this.video.volume = VIDEO_VOLUME_LEVEL;
        console.log(`🔊 Volume vidéo de bienvenue: ${Math.round(this.video.volume * 100)}%`);

        // Add matrix effect
        this.addMatrixEffect();

        // Play video
        this.video.play().catch(e => {
            console.error('Erreur lors de la lecture:', e);
        });

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    close() {
        if (this.video) {
            this.video.pause();
            this.video.currentTime = 0;
        }

        this.modal.classList.add('hidden');
        this.isPlaying = false;

        // Restore body scroll
        document.body.style.overflow = '';

        // Remove matrix effect
        this.removeMatrixEffect();
    }

    addMatrixEffect() {
        // Add glow effect to modal
        this.modal.style.animation = 'matrixGlow 2s ease-in-out infinite alternate';
        
        // Add border animation to video container
        const container = this.modal.querySelector('.video-container');
        if (container) {
            container.style.animation = 'borderGlow 3s ease-in-out infinite';
        }
    }

    removeMatrixEffect() {
        this.modal.style.animation = '';
        const container = this.modal.querySelector('.video-container');
        if (container) {
            container.style.animation = '';
        }
    }

    destroy() {
        if (this.modal && this.modal.parentNode) {
            this.modal.parentNode.removeChild(this.modal);
        }
    }

    // Méthode pour configurer le volume (0.0 à 1.0)
    setVolume(volume) {
        if (this.video) {
            this.video.volume = Math.max(0, Math.min(1, volume));
            console.log(`🔊 Volume vidéo configuré à ${Math.round(this.video.volume * 100)}%`);
        }
    }

    // Méthode pour obtenir le volume actuel
    getVolume() {
        return this.video ? this.video.volume : 0;
    }
}

// CSS animations dynamiques
const style = document.createElement('style');
style.textContent = `
    @keyframes borderGlow {
        0%, 100% { 
            border-color: var(--primary-green);
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
        }
        50% { 
            border-color: var(--secondary-green);
            box-shadow: 0 0 40px rgba(0, 255, 65, 0.6);
        }
    }
`;
document.head.appendChild(style);

// Initialize video modal when DOM is loaded
let videoModal;
document.addEventListener('DOMContentLoaded', () => {
    videoModal = new VideoModal();
});

// Export for global use
window.VideoModal = VideoModal;
window.videoModal = videoModal;
