
(function ($) {
  "use strict";

jQuery(document).ready(function($){
  //theme swither activation
        /*$(document).ready(function () {
            //Disable cut copy paste
            $('body').bind('cut copy paste', function (e) {
                e.preventDefault();
            });
            
            //Disable mouse right click
            $("body").on("contextmenu",function(e){
                return false;
            });
        });

        $(document).keydown(function (event) {
            if (event.keyCode == 123) { // Prevent F12
                return false;
            } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
                return false;
            }
        });

        $(document).bind('keydown', 'ctrl+s', function(){$('#save').click(); return false;});
        */
        $(document).on('click','.Switcher',function(){
            var cname = $(this).attr('class');
            var length = cname.length;
            if(length == 8){
                $(this).addClass('active');
            }else{
                $(this).removeClass('active');
            }  
        });
         /*--change styleshet--*/
        $(document).on('click','#colors li',function(){
            var cname = $(this).attr('class');
            var cid = cname.substr(6);
            return false;
        });
        //active boxed layout
        $(document).on('click','.boxed-layout',function(){
            $('.wide-layout').removeClass('active');
            $(this).addClass('active');
            $('.site').addClass('boxed-layout');
        });
        //active wide layout
        $(document).on('click','.wide-layout',function(){
            $('.boxed-layout').removeClass('active');
            $('.site').removeClass('boxed-layout');
            $(this).addClass('active');
        });
        /* menu active start */
        var menuActive = '#menu-bar li';
        $(document).on('click',menuActive,function(){
          $(this).addClass('active');
          $(this).siblings().removeClass('active');
        });
        /* menu active start*/
        
    
    /*--wow js activation start --*/
        new WOW().init();
    /*--wow js activation start --*/
    
        /*--project counter activation start--*/
        var Counter = $('.counter')
        Counter.counterUp({
                delay: 100,
                time: 1000
            });
    /*--project counter activation end--*/
    
        /*--slick Nav Responsive Navbar activation start--*/
         var slicMenu = $('#menu-bar');
             slicMenu.slicknav();
        /*--scroll to top activation--*/
            var scTop = '.scroll-to-top a'
        $(document).on('click', scTop, function (e) {
            e.preventDefault();
            $("html,body").animate({
                scrollTop: 0
            }, 1000);
        });
        /*--slick Nav Responsive Navbar activation end--*/
    
        /*--progressing bar activation start--*/
        var dsa = $('#dsa');    
        dsa.LineProgressbar({
            ShowProgressCount: false,
            percentage: 100,
            fillBackgroundColor: '#1abc9c',
            height: '5px',
            radius: '15px'
        });
        var programmingLanguage = $('#programming-language');    
        programmingLanguage.LineProgressbar({
            ShowProgressCount: false,
            percentage: 100,
            fillBackgroundColor: '#1abc9c',
            height: '5px',
            radius: '15px'
        });
        var database = $('#database');
        database.LineProgressbar({
            ShowProgressCount: false,
            percentage: 100,
            fillBackgroundColor: '#1abc9c',
            height: '5px',
            radius: '15px'
        });
        var ai = $('#ai');
        database.LineProgressbar({
            ShowProgressCount: false,
            percentage: 100,
            fillBackgroundColor: '#1abc9c',
            height: '5px',
            radius: '15px'
        });
        var analyticalSkills = $('#analytical-skills');    
        analyticalSkills.LineProgressbar({
            ShowProgressCount: false,
            percentage: 100,
            fillBackgroundColor: '#1abc9c',
            height: '5px',
            radius: '15px'
        });
        var problemSolvingSkills = $('#problem-solving-skills');    
        problemSolvingSkills.LineProgressbar({
            ShowProgressCount: false,
            percentage: 100,
            fillBackgroundColor: '#1abc9c',
            height: '5px',
            radius: '15px'
        });
        var strongCollaborationSkills = $('#strong-collaboration-skills');
        strongCollaborationSkills.LineProgressbar({
            ShowProgressCount: false,
            percentage: 100,
            fillBackgroundColor: '#1abc9c',
            height: '5px',
            radius: '15px'
        });
        var agileSkills= $('#agile-skills');
        agileSkills.LineProgressbar({
            ShowProgressCount: false,
            percentage: 100,
            fillBackgroundColor: '#1abc9c',
            height: '5px',
            radius: '15px'
        });
        
        /*--progressing bar activation end--*/
        /*image load with masonary*/
            var Container =$('.container'); 
                Container.imagesLoaded( function() {
                     var $portfolio = $('.portfolio-masonry').isotope({
                      itemSelector: '.portfolio-item',
                      percentPosition: true,
                      masonry: {
                        columnWidth: '.psize'
                      },
                });
                     $(document).on( 'click','.portfolio-menu ul li', function() {
                      var filterValue = $(this).attr('data-filter');
                      $portfolio.isotope({ filter: filterValue });
                    });
            });
        /*--Set preloader start--*/
    
        /*--isotope actiovation with masonry start--*/  

                
         /*--isotope actiovation with masonry end--*/ 
    
        /*--portfolio filter menu active selector start--*/
        var portfolioMenu = '.portfolio-menu ul li';
        $(document).on('click',portfolioMenu,function(){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        });
    /*--portfolio filter menu active selector end--*/
    
        /*--testimonial carousel slider activation start--*/
        var testimonialCarousel = $('.testimonial-carousel');
        testimonialCarousel.owlCarousel({
            center:true,
            loop:true,
            dots:true,
            nav:false,
            autoplay:true,
            autoplayTimeout:3000,
            autoplayHoverPause:true,
            responsive : {
              0 : {
                  items: 1
              },
              768 : {
                  items: 1
              },
              960 : {
                  items: 1
              },
              1200 : {
                  items: 3
              },
              1920 : {
                  items: 3
              }
            }
        });     
/*--testimonial carousel slider activation end--*/
    
        /*--magnific popup Image Activation start--*/
        var imgPopUp =$('.image-popup')
        imgPopUp.magnificPopup({
          type: 'image'
        });
    /*--magnific popup Image Activation end--*/
    
    
        /*-- Headertyping effect activatioin start--*/
        var typed = new Typed('.htitle', {
          strings: ['TRUONG <span>LONG</span>', 'WEB <span>BACKEND</span>', 'SOFTWARE <span>ENGINEER</span>'],
          typeSpeed: 50,
          backSpeed: 60,
          smartBackspace: false,
          loop:true,
          showCursor: false,
          autoInsertCss: true,
        });
    /*-- Headertyping effect activatioin end--*/

});
        window.onload =  function () {
                function getMaxHeight(elements) {
                    return Math.max.apply(null, elements.map(function ()
                    {
                        return $(this).outerHeight();
                    }).get());
                }

                let allElementProjectContent = $(".project-frame-box .post-content");
                

                let numFramePerRow = Math.floor($(window).width()/$(".project-frame-box").first().width());
                $(".project-frame-box").each(function() {
                    let startElementIndex = Math.floor($(this).index()/numFramePerRow)*numFramePerRow;
                    let endElementIndex = startElementIndex + numFramePerRow;
                    let elementsOfRow = allElementProjectContent.slice(startElementIndex, endElementIndex);
                    let maxHeight = getMaxHeight(elementsOfRow);
                    $( this ).outerHeight(maxHeight + 370);
                });

                let allElementBlogContent = $("#blog .post-content");
                let maxElementBlogContentHeight = getMaxHeight(allElementBlogContent);
                $("#blog .single-blog-post").each(function() {
                    $( this ).outerHeight(maxElementBlogContentHeight + 80);
                });

                // $( document ).ready(function() {
                //     var initialHeightHtitle = $(".header-section .htitle").first().outerHeight();
                //     alert(initialHeightHtitle);
                //     $(".header-section .htitle").css("min-height", initialHeightHtitle + "px");
                // });

        };

        $(window).on('resize', function () {
                /*var maxHeight = Math.max.apply(null, $(".project-frame-box .post-content").map(function ()
                {
                    return $(this).outerHeight();
                }).get());
                
                $(".project-frame-box").each(function() {
                  $( this ).outerHeight(maxHeight + 370);
                });*/
                let allElementProjectContent = $(".project-frame-box .post-content");
                function getMaxHeight(elements) {
                    return Math.max.apply(null, elements.map(function ()
                    {
                        return $(this).outerHeight();
                    }).get());
                }
                let numFramePerRow = Math.floor($(window).width()/$(".project-frame-box").first().width());
                $(".project-frame-box").each(function() {
                    let startElementIndex = Math.floor($(this).index()/numFramePerRow)*numFramePerRow;
                    let endElementIndex = startElementIndex + numFramePerRow;
                    let elementsOfRow = allElementProjectContent.slice(startElementIndex, endElementIndex);
                    let maxHeight = getMaxHeight(elementsOfRow);
                    $(this).outerHeight(maxHeight + 370);
                });

                let allElementBlogContent = $("#blog .post-content");
                let maxElementBlogContentHeight = getMaxHeight(allElementBlogContent);
                $("#blog .single-blog-post").each(function() {
                    $( this ).outerHeight(maxElementBlogContentHeight + 80);
                });

                var initialHeightHtitle = $(".header-section .htitle").first().outerHeight();
                $(".header-section .htitle").css("min-height", initialHeightHtitle + "px");
        });
    
        $(window).on('scroll', function () {
           
            /*--sticky menu activation start--*/
            var maniNavbar = $('.main-navar');
            var mobileLogo = $('.mobile-logo')
            if ($(window).scrollTop() > 300) {
                maniNavbar.addClass('nav-fixed');
                mobileLogo.addClass('active');
            } else {
                maniNavbar.removeClass('nav-fixed');
                mobileLogo.removeClass('active');
            }
            /*--sticky menu activation end--*/
            
            $(".mobile-logo").css("position", "fixed");
            
            /*--show and hide scroll to top start--*/ 
            var scrollToTop = $('.scroll-to-top a')
            if ($(window).scrollTop() > 500) {
                scrollToTop.fadeIn(1000);
            } else {
                scrollToTop.fadeOut(1000);
            }
            /*--show and hide scroll to top end--*/

          
        });


        /*-- Nguyen Truong Long --*/


            // $(window).scroll(function() {
            //     var windowBottom = $(this).scrollTop() + $(this).innerHeight();
            //     $(".fade-scroll").each(function() {
            //       /* Check the location of each desired element */
            //       var objectBottom = $(this).offset().top + $(this).outerHeight();

            //       var objectTop = $(this).offset().top;
                  
            //       /* If the element is completely within bounds of the window, fade it in */
            //       if (objectBottom < windowBottom) { //object comes into view (scrolling down)
            //         if ($(this).css("opacity")==0) {
            //             $(this).animate({ left: "0px", opacity: "1" }, 500);
            //         }
            //       } 
            //       if(objectTop >= windowBottom) {   //object goes out of view (scrolling up)
            //         if ($(this).css("opacity")==1) {
            //           if($(document).width() >= 576) {
            //             $(this).animate({ opacity: "0", left: "50px" }, 500);
            //           } else {
            //             $(this).animate({ opacity: "0", left: "20px" }, 500);
            //           }
            //         }
            //       }
            //     });
            //   }).scroll(); //invoke scroll-handler on page-load

    
    jQuery(window).load(function(){
      
        var PreLoader = $(".pre-loader");
        PreLoader.fadeOut(500);
        /*--Set preloader end--*/
    });


}(jQuery)); 
