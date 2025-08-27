class Portfolio {
    constructor() {
        this.$window = $(window);
        this.$document = $(document);
        this.$body = $('body');
        this.$nav = $('.nav');
        this.$preloader = $('.preloader');
        this.$scrollToTop = $('.scroll-to-top');
        this.$header = $('.header');

        // Cache toggle + overlay
        this.$navToggle = $('.nav__toggle');
        this.$navOverlay = $('.nav__overlay');

        // Save scroll position + overflow state
        this._prevOverflow = this.$body.css('overflow');
        this._lockedScrollY = 0;

        this.sections = ['introduction-section', 'working-experience', 'project', 'interest', 'blog'];
        this.init();
    }

    init() {
        this.initializePlugins();
        this.bindEvents();
        this.setupAnimations();
        this.enhanceAccessibility();
    }

    initializePlugins() {
        if (typeof WOW !== 'undefined') new WOW().init();

        const $menuBar = $('#menu-bar');
        if ($menuBar.length) {
            $menuBar.slicknav({
                prependTo: 'body',
                label: '',
                allowParentLinks: true,
                closedSymbol: '▶',
                openedSymbol: '▼',
                init: () => $('.slicknav_menu').css('padding-top', '50px'),
            });
        }

        if (typeof Typed !== 'undefined' && $('.header__title').length) {
            new Typed('.header__title', {
                strings: [
                    'TRUONG <span style="color:#1ABC9C">LONG</span>',
                    'WEB <span style="color:#1ABC9C">BACKEND</span>',
                    'SOFTWARE <span style="color:#1ABC9C">ENGINEER</span>',
                ],
                typeSpeed: 60,
                backSpeed: 40,
                smartBackspace: false,
                loop: true,
                showCursor: false,
                autoInsertCss: true,
                startDelay: 500,
            });
        }

        const $imagePopup = $('.image-popup');
        if ($imagePopup.length && typeof $.fn.magnificPopup !== 'undefined') {
            $imagePopup.magnificPopup({ type: 'image', gallery: { enabled: true } });
        }
    }

    bindEvents() {
        this.$window.on('scroll', this.throttle(this.handleScroll.bind(this), 16));
        this.$window.on('resize', this.debounce(this.handleResize.bind(this), 250));
        this.$window.on('load', this.handleLoad.bind(this));

        this.$document.on('click', '.nav__menu-link', this.handleMenuClick.bind(this));
        this.$document.on('click', '.header__scroll-down', this.handleScrollDown.bind(this));
        this.$document.on('click', '.scroll-to-top__link', this.handleScrollToTop.bind(this));
        this.$document.on('click', 'a[href^="#"]', this.handleSmoothScroll.bind(this));

        // Mobile nav toggle + closing behavior
        this.$navToggle.on('click', this.handleNavToggle.bind(this));

        // Only close immediately for non-anchor links inside overlay
        this.$document.on('click', '.nav__overlay-link', (e) => {
            const href = $(e.currentTarget).attr('href') || '';
            if (!href.startsWith('#')) this.closeMobileNav();
        });

        // Click on dark overlay outside menu container
        this.$navOverlay.on('click', (e) => {
            if (e.target === e.currentTarget) this.closeMobileNav();
        });

        // Esc closes
        this.$document.on('keydown', (e) => {
            if (e.key === 'Escape') this.closeMobileNav();
        });

        // Close overlay when switching to desktop
        this.$window.on('resize', this.debounce(() => {
            if (window.innerWidth > 991) this.closeMobileNav();
        }, 150));
    }

    handleNavToggle(e) {
        e.preventDefault();
        const expanded = this.$navToggle.attr('aria-expanded') === 'true';
        const willOpen = !expanded;

        this.$navToggle.attr('aria-expanded', String(willOpen));
        this.$navOverlay.toggleClass('active', willOpen);

        if (willOpen) {
            this._lockedScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
            $('html, body').addClass('no-scroll');
            this.$body
                .data('prev-overflow', this.$body.css('overflow'))
                .css({
                    position: 'fixed',
                    top: `-${this._lockedScrollY}px`,
                    left: 0,
                    right: 0,
                    width: '100%'
                });
        } else {
            this.unlockScroll();
        }
    }

    closeMobileNav(afterClose) {
        const wasActive = this.$navOverlay.hasClass('active');
        if (wasActive) {
            this.$navOverlay.removeClass('active');
            this.$navToggle.attr('aria-expanded', 'false');
            this.unlockScroll();
        }
        if (typeof afterClose === 'function') {
            requestAnimationFrame(afterClose);
        }
    }

    unlockScroll() {
        const top = parseInt(this.$body.css('top'), 10) || 0;
        this.$body.css({
            position: '',
            top: '',
            left: '',
            right: '',
            width: '',
            overflow: this.$body.data('prev-overflow') || ''
        });
        $('html, body').removeClass('no-scroll');
        if (top) window.scrollTo(0, -top);
    }

    handleScroll() {
        const scrollTop = this.$window.scrollTop();
        const windowHeight = this.$window.height();

        this.toggleStickyNav(scrollTop);
        this.toggleScrollToTop(scrollTop);
        this.animateOnScroll(scrollTop, windowHeight);
        this.updateActiveNav(scrollTop);
    }

    toggleStickyNav(scrollTop) {
        if (scrollTop > 300) {
            this.$nav.addClass('nav--visible');
            $('.mobile-logo').addClass('active');
        } else {
            this.$nav.removeClass('nav--visible');
            $('.mobile-logo').removeClass('active');
        }
    }

    toggleScrollToTop(scrollTop) {
        this.$scrollToTop.toggleClass('scroll-to-top--visible', scrollTop > 500);
    }

    animateOnScroll(scrollTop, windowHeight) {
        $('.fade-scroll').each((_, el) => {
            const $element = $(el);
            if (scrollTop + windowHeight > $element.offset().top + 100) $element.addClass('animated');
        });
    }

    updateActiveNav(scrollTop) {
        let currentSection = '';
        this.sections.forEach(section => {
            const $section = $(`#${section}`);
            if ($section.length) {
                const sectionTop = $section.offset().top - 100;
                const sectionBottom = sectionTop + $section.outerHeight();
                if (scrollTop >= sectionTop && scrollTop < sectionBottom) currentSection = section;
            }
        });

        $('.nav__menu-item').removeClass('nav__menu-item--active');
        if (currentSection) {
            $(`.nav__menu-link[href="#${currentSection}"]`).parent().addClass('nav__menu-item--active');
        } else if (scrollTop < 100) {
            $('.nav__menu-link[href="#"]').parent().addClass('nav__menu-item--active');
        }
    }

    handleResize() {
        this.equalizeHeights();
        this.updateTimelineHeights();
    }

    handleLoad() {
        this.$preloader.fadeOut(500, () => this.$preloader.remove());
        this.equalizeHeights();
        this.updateTimelineHeights();
        this.handleScroll();
    }

    handleMenuClick(e) {
        const $menuItem = $(e.target).parent();
        $('.nav__menu-item').removeClass('nav__menu-item--active');
        $menuItem.addClass('nav__menu-item--active');
        this.closeMobileNav();
    }

    handleScrollDown(e) {
        e.preventDefault();
        const href = $(e.currentTarget).attr('href');
        this.scrollToTarget(href, 1000);
    }

    handleScrollToTop(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    }

    handleSmoothScroll(e) {
        const $link = $(e.target).closest('a[href^="#"]');
        if (!$link.length) return;

        const target = $link.attr('href');
        if (!(target && target.startsWith('#') && target.length > 1)) return;

        e.preventDefault();

        const runScroll = () => {
            requestAnimationFrame(() => this.scrollToTarget(target, 800));
        };

        if (this.$navOverlay.hasClass('active')) {
            this.closeMobileNav(runScroll);
        } else {
            runScroll();
        }
    }

    scrollToTarget(target, duration = 800) {
        const $target = $(target);
        if (!$target.length) return;

        const headerH = this.$nav.outerHeight() || 0;
        const safeGap = 6;
        const top = Math.max(0, $target.offset().top - headerH - safeGap);

        $('html, body').stop(true).animate({ scrollTop: top }, duration);
    }

    setupAnimations() {
        $('.section__heading, .section__description, .info-card, .skills, .timeline__item, .project, .interest-card, .blog-card').addClass('fade-scroll');
    }

    equalizeHeights() {
        this.equalizeBlogCardHeights();
        this.equalizeProjectHeights();
        this.equalizeInfoCardHeights();
    }

    equalizeBlogCardHeights() {
        if (window.innerWidth > 767) {
            const $blogCards = $('.blog-card');
            if ($blogCards.length) {
                let maxHeight = 0;
                $blogCards.css('height', 'auto');
                $blogCards.each((_, el) => {
                    maxHeight = Math.max(maxHeight, $(el).outerHeight());
                });
                $blogCards.css('height', `${maxHeight}px`);
            }
        } else {
            $('.blog-card').css('height', 'auto');
        }
    }

    equalizeProjectHeights() {
        if (window.innerWidth > 767) {
            const $projectColumns = $('.projects__column');
            if ($projectColumns.length > 1) {
                let maxHeight = 0;
                $projectColumns.css('height', 'auto');
                $projectColumns.each((_, el) => {
                    maxHeight = Math.max(maxHeight, $(el).outerHeight());
                });
                $projectColumns.css('height', `${maxHeight}px`);
            }
        } else {
            $('.projects__column').css('height', 'auto');
        }
    }

    equalizeInfoCardHeights() {
        if (window.innerWidth > 767) {
            const $infoCards = $('.info-card, .skills');
            if ($infoCards.length) {
                let maxHeight = 0;
                $infoCards.css('height', 'auto');
                $infoCards.each((_, el) => {
                    maxHeight = Math.max(maxHeight, $(el).outerHeight());
                });
                $infoCards.css('height', `${maxHeight}px`);
            }
        } else {
            $('.info-card, .skills').css('height', 'auto');
        }
    }

    updateTimelineHeights() {
        $('.timeline__item').each((_, item) => {
            const $item = $(item);
            const $left = $item.find('.timeline__left');
            const $right = $item.find('.timeline__right');
            if ($left.length && $right.length && window.innerWidth > 767) {
                $left.css('min-height', `${$right.outerHeight()}px`);
            } else {
                $left.css('min-height', 'auto');
            }
        });
    }

    debounce(func, wait, immediate) {
        let timeout;
        return (...args) => {
            const context = this;
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    }

    enhanceAccessibility() {
        this.$body.prepend('<a href="#main-content" class="skip-link">Skip to main content</a>');
        this.$document.on('keydown', (e) => e.key === 'Tab' && this.$body.addClass('using-keyboard'));
        this.$document.on('mousedown', () => this.$body.removeClass('using-keyboard'));
        $('.scroll-to-top__link, .header__scroll-down, .blog-card__read-more').each((_, el) => {
            const $el = $(el);
            $el.attr('aria-label', `Scroll to ${$el.hasClass('scroll-to-top__link') ? 'top' : $el.hasClass('header__scroll-down') ? 'content' : 'read more about this article'}`);
        });
    }
}

const portfolio = new Portfolio();
window.PortfolioUtils = {
    debounce: portfolio.debounce.bind(portfolio),
    throttle: portfolio.throttle.bind(portfolio),
};
