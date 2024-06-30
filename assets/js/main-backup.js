(function ($) {
    "use strict";

    // Document ready function
    $(document).ready(function () {

        // Theme switcher activation
        $(document).on('click', '.theme-switcher', function () {
            var className = $(this).attr('class');
            var classLength = className.length;
            if (classLength == 8) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });

        // Change stylesheet
        $(document).on('click', '#colors li', function () {
            var className = $(this).attr('class');
            var colorId = className.substr(6);
            // Implementation for changing stylesheet based on colorId
            return false;
        });

        // Activate boxed layout
        $(document).on('click', '.boxed-layout', function () {
            $('.wide-layout').removeClass('active');
            $(this).addClass('active');
            $('.site').addClass('boxed-layout');
        });

        // Activate wide layout
        $(document).on('click', '.wide-layout', function () {
            $('.boxed-layout').removeClass('active');
            $('.site').removeClass('boxed-layout');
            $(this).addClass('active');
        });

        // Menu active state
        var menuItems = '#menu-bar li';
        $(document).on('click', menuItems, function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        });

        // WOW.js activation
        new WOW().init();

        // Project counter activation
        var counter = $('.counter');
        counter.counterUp({
            delay: 100,
            time: 1000
        });

        // SlickNav responsive navbar activation
        var slickNavMenu = $('#menu-bar');
        slickNavMenu.slicknav();

        // Scroll to top activation
        var scrollToTopLink = '.scroll-to-top-link';
        $(document).on('click', scrollToTopLink, function (e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, 1000);
        });

        // Progress bars activation
        activateProgressBar('#dsa');
        activateProgressBar('#system-design');
        activateProgressBar('.programming-language');
        activateProgressBar('#database');
        activateProgressBar('#ai');
        activateProgressBar('#analytical-skills');
        activateProgressBar('#problem-solving-skills');
        activateProgressBar('#strong-collaboration-skills');
        activateProgressBar('#agile-skills');

        // Function to activate progress bars
        function activateProgressBar(selector) {
            $(selector).LineProgressbar({
                ShowProgressCount: false,
                percentage: 100,
                fillBackgroundColor: '#1abc9c',
                height: '5px',
                radius: '15px'
            });
        }

        // Image load with Masonry layout
        var container = $('.container');
        container.imagesLoaded(function () {
            var portfolio = $('.portfolio-masonry').isotope({
                itemSelector: '.portfolio-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.psize'
                },
            });

            $(document).on('click', '.portfolio-menu-item', function () {
                var filterValue = $(this).attr('data-filter');
                portfolio.isotope({ filter: filterValue });
            });
        });

        // Portfolio filter menu active selector
        var portfolioMenuItems = '.portfolio-menu-item';
        $(document).on('click', portfolioMenuItems, function () {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        });

        // Testimonial carousel slider activation
        var testimonialCarousel = $('.carousel-testimonial');
        testimonialCarousel.owlCarousel({
            center: true,
            loop: true,
            dots: true,
            nav: false,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            responsive: {
                0: { items: 1 },
                768: { items: 1 },
                960: { items: 1 },
                1200: { items: 3 },
                1920: { items: 3 }
            }
        });

        // Magnific popup image activation
        var imagePopup = $('.image-popup');
        imagePopup.magnificPopup({ type: 'image' });

        // Header typing effect activation
        var typed = new Typed('.title-header', {
            strings: ['TRUONG <span>LONG</span>', 'WEB <span>BACKEND</span>', 'SOFTWARE <span>ENGINEER</span>'],
            typeSpeed: 50,
            backSpeed: 60,
            smartBackspace: false,
            loop: true,
            showCursor: false,
            autoInsertCss: true
        });

    });

    // Window onload function
    window.onload = function () {
        function getMaxHeight(elements) {
            return Math.max.apply(null, elements.map(function () {
                return $(this).outerHeight();
            }).get());
        }

        $(".work-item > div.row").each(function () {
            let elementHeight = $(this).outerHeight() - 15;
            if ($(document).width() > 767) {
                $(this).children("div.row > div:first").css("cssText", "height: " + elementHeight + "px !important;");
            }
        });

        let allElementBlogContent = $("#blog .content-post");
        let maxElementBlogContentHeight = getMaxHeight(allElementBlogContent);
        $("#blog .blog-post").each(function () {
            $(this).outerHeight(maxElementBlogContentHeight + 80);
        });
    };

    // Window resize function
    $(window).on('resize', function () {
        $(".work-item > div.row").each(function () {
            $(this).children("div.row > div:first").css("cssText", "height: '' !important;");
            let elementHeight = $(this).outerHeight() - 15;
            if ($(document).width() > 767) {
                $(this).children("div.row > div:first").css("cssText", "height: " + elementHeight + "px !important;");
            }
        });

        function getMaxHeight(elements) {
            return Math.max.apply(null, elements.map(function () {
                return $(this).outerHeight();
            }).get());
        }

        let allElementBlogContent = $("#blog .content-post");
        let maxElementBlogContentHeight = getMaxHeight(allElementBlogContent);
        $("#blog .blog-post").each(function () {
            $(this).outerHeight(maxElementBlogContentHeight + 80);
        });

        var initialHeightTitleHeader = $(".header-section .title-header").first().outerHeight();
        $(".header-section .title-header").css("min-height", initialHeightTitleHeader + "px");
    });

    // Window scroll function
    $(window).on('scroll', function () {
        // Sticky menu activation
        var mainNavbar = $('.main-navbar');
        var mobileLogo = $('.mobile-logo');
        if ($(window).scrollTop() > 300) {
            mainNavbar.addClass('nav-fixed');
            mobileLogo.addClass('active');
        } else {
            mainNavbar.removeClass('nav-fixed');
            mobileLogo.removeClass('active');
        }

        $(".mobile-logo").css("position", "fixed");

        // Show and hide scroll to top button
        var scrollToTopButton = $('.scroll-to-top-link');
        if ($(window).scrollTop() > 500) {
            scrollToTopButton.fadeIn(1000);
        } else {
            scrollToTopButton.fadeOut(1000);
        }
    });

    // Window load function for preloader
    $(window).on('load', function () {
        var preLoader = $(".pre-loader");
        preLoader.fadeOut(500);
    });

}(jQuery));
