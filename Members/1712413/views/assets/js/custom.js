/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Custom Dropdown
4. Init Page Menu
5. Init Deals Slider
6. Init Tab Lines
7. Init Tabs
8. Init Featured Slider
9. Init Favorites
10. Init ZIndex
11. Init Popular Categories Slider
12. Init Banner 2 Slider
13. Init Arrivals Slider
14. Init Arrivals Slider ZIndex
15. Init Best Sellers Slider
16. Init Trends Slider
17. Init Reviews Slider
18. Init Recently Viewed Slider
19. Init Brands Slider
20. Init Timer


***************************** */

$(document).ready(function () {
  'use strict';

  /*

	1. Vars and Inits

	*/

  let menuActive = false;
  let header = $('.header');

  setHeader();

  initPageMenu();
  initDealsSlider();
  initTabLines();
  initFeaturedSlider();
  featuredSliderZIndex();
  initPopularSlider();
  initBanner2Slider();
  initFavs();
  initArrivalsSlider();
  arrivalsSliderZIndex();
  bestsellersSlider();
  initTabs();
  initTrendsSlider();
  initReviewsSlider();
  initViewedSlider();
  initBrandsSlider();
  initTimer();

  $(window).on('resize', function () {
    setHeader();
    featuredSliderZIndex();
    initTabLines();
  });

  /*

	2. Set Header

	*/

  function setHeader() {
    // To pin main nav to the top of the page when it's reached
    // uncomment the following

    // var controller = new ScrollMagic.Controller(
    // {
    // 	globalSceneOptions:
    // 	{
    // 		triggerHook: 'onLeave'
    // 	}
    // });

    // var pin = new ScrollMagic.Scene(
    // {
    // 	triggerElement: '.main_nav'
    // })
    // .setPin('.main_nav').addTo(controller);

    if (window.innerWidth > 991 && menuActive) {
      closeMenu();
    }
  }

  /*

	3. Init Custom Dropdown

	*/

  function initCustomDropdown() {
    if ($('.custom_dropdown_placeholder').length && $('.custom_list').length) {
      var placeholder = $('.custom_dropdown_placeholder');
      var list = $('.custom_list');
    }

    placeholder.on('click', function (ev) {
      if (list.hasClass('active')) {
        list.removeClass('active');
      } else {
        list.addClass('active');
      }

      $(document).one('click', function closeForm(e) {
        if ($(e.target).hasClass('clc')) {
          $(document).one('click', closeForm);
        } else {
          list.removeClass('active');
        }
      });
    });

    $('.custom_list a').on('click', function (ev) {
      ev.preventDefault();
      let index = $(this)
        .parent()
        .index();

      placeholder.text($(this).text()).css('opacity', '1');

      if (list.hasClass('active')) {
        list.removeClass('active');
      } else {
        list.addClass('active');
      }
    });

    $('select').on('change', function (e) {
      placeholder.text(this.value);

      $(this).animate({ width: `${placeholder.width()}px` });
    });
  }

  /*

	4. Init Page Menu

	*/

  function initPageMenu() {
    if ($('.page_menu').length && $('.page_menu_content').length) {
      let menu = $('.page_menu');
      let menuContent = $('.page_menu_content');
      let menuTrigger = $('.menu_trigger');

      // Open / close page menu
      menuTrigger.on('click', function () {
        if (!menuActive) {
          openMenu();
        } else {
          closeMenu();
        }
      });

      // Handle page menu
      if ($('.page_menu_item').length) {
        let items = $('.page_menu_item');
        items.each(function () {
          let item = $(this);
          if (item.hasClass('has-children')) {
            item.on('click', function (evt) {
              evt.preventDefault();
              evt.stopPropagation();
              let subItem = item.find('> ul');
              if (subItem.hasClass('active')) {
                subItem.toggleClass('active');
                TweenMax.to(subItem, 0.3, { height: 0 });
              } else {
                subItem.toggleClass('active');
                TweenMax.set(subItem, { height: 'auto' });
                TweenMax.from(subItem, 0.3, { height: 0 });
              }
            });
          }
        });
      }
    }
  }

  function openMenu() {
    let menu = $('.page_menu');
    let menuContent = $('.page_menu_content');
    TweenMax.set(menuContent, { height: 'auto' });
    TweenMax.from(menuContent, 0.3, { height: 0 });
    menuActive = true;
  }

  function closeMenu() {
    let menu = $('.page_menu');
    let menuContent = $('.page_menu_content');
    TweenMax.to(menuContent, 0.3, { height: 0 });
    menuActive = false;
  }

  /*

	5. Init Deals Slider

	*/

  function initDealsSlider() {
    if ($('.deals_slider').length) {
      let dealsSlider = $('.deals_slider');
      dealsSlider.owlCarousel({
        items: 1,
        loop: false,
        navClass: ['deals_slider_prev', 'deals_slider_next'],
        nav: false,
        dots: false,
        smartSpeed: 1200,
        margin: 30,
        autoplay: false,
        autoplayTimeout: 5000,
      });

      if ($('.deals_slider_prev').length) {
        let prev = $('.deals_slider_prev');
        prev.on('click', function () {
          dealsSlider.trigger('prev.owl.carousel');
        });
      }

      if ($('.deals_slider_next').length) {
        let next = $('.deals_slider_next');
        next.on('click', function () {
          dealsSlider.trigger('next.owl.carousel');
        });
      }
    }
  }

  /*

	6. Init Tab Lines

	*/

  function initTabLines() {
    if ($('.tabs').length) {
      let tabs = $('.tabs');

      tabs.each(function () {
        let tabsItem = $(this);
        let tabsLine = tabsItem.find('.tabs_line span');
        let tabGroup = tabsItem.find('ul li');

        let posX = $(tabGroup[0]).position().left;
        tabsLine.css({ left: posX, width: $(tabGroup[0]).width() });
        tabGroup.each(function () {
          let tab = $(this);
          tab.on('click', function () {
            if (!tab.hasClass('active')) {
              tabGroup.removeClass('active');
              tab.toggleClass('active');
              let tabXPos = tab.position().left;
              let tabWidth = tab.width();
              tabsLine.css({ left: tabXPos, width: tabWidth });
            }
          });
        });
      });
    }
  }

  /*

	7. Init Tabs

	*/

  function initTabs() {
    if ($('.tabbed_container').length) {
      // Handle tabs switching

      let tabsContainers = $('.tabbed_container');
      tabsContainers.each(function () {
        let tabContainer = $(this);
        let tabs = tabContainer.find('.tabs ul li');
        let panels = tabContainer.find('.panel');
        let sliders = panels.find('.slider');

        tabs.each(function () {
          let tab = $(this);
          tab.on('click', function () {
            panels.removeClass('active');
            let tabIndex = tabs.index(this);
            $($(panels[tabIndex]).addClass('active'));
            sliders.slick('unslick');
            sliders.each(function () {
              let slider = $(this);
              // slider.slick("unslick");
              if (slider.hasClass('bestsellers_slider')) {
                initBSSlider(slider);
              }
              if (slider.hasClass('featured_slider')) {
                initFSlider(slider);
              }
              if (slider.hasClass('arrivals_slider')) {
                initASlider(slider);
              }
            });
          });
        });
      });
    }
  }

  /*

	8. Init Featured Slider

	*/

  function initFeaturedSlider() {
    if ($('.featured_slider').length) {
      let featuredSliders = $('.featured_slider');
      featuredSliders.each(function () {
        let featuredSlider = $(this);
        initFSlider(featuredSlider);
      });
    }
  }

  function initFSlider(fs) {
    let featuredSlider = fs;
    featuredSlider
      .on('init', function () {
        let activeItems = featuredSlider.find('.slick-slide.slick-active');
        for (let x = 0; x < activeItems.length - 1; x++) {
          let item = $(activeItems[x]);
          item.find('.border_active').removeClass('active');
          if (item.hasClass('slick-active')) {
            item.find('.border_active').addClass('active');
          }
        }
      })
      .on({
        afterChange(event, slick, current_slide_index, next_slide_index) {
          var activeItems = featuredSlider.find('.slick-slide.slick-active');
          activeItems.find('.border_active').removeClass('active');
          for (var x = 0; x < activeItems.length - 1; x++) {
            var item = $(activeItems[x]);
            item.find('.border_active').removeClass('active');
            if (item.hasClass('slick-active')) {
              item.find('.border_active').addClass('active');
            }
          }
        },
      })
      .slick({
        rows: 2,
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: false,
        arrows: false,
        dots: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              rows: 2,
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
            },
          },
          {
            breakpoint: 575,
            settings: {
              rows: 2,
              slidesToShow: 2,
              slidesToScroll: 2,
              dots: false,
            },
          },
          {
            breakpoint: 480,
            settings: {
              rows: 1,
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
            },
          },
        ],
      });
  }

  /*

	9. Init Favorites

	*/

  function initFavs() {
    // Handle Favorites
    let items = document.getElementsByClassName('product_fav');
    for (let x = 0; x < items.length; x++) {
      let item = items[x];
      item.addEventListener('click', function (fn) {
        fn.target.classList.toggle('active');
      });
    }
  }

  /*

	10. Init ZIndex

	*/

  function featuredSliderZIndex() {
    // Hide slider dots on item hover
    let items = document.getElementsByClassName('featured_slider_item');

    for (let x = 0; x < items.length; x++) {
      let item = items[x];
      item.addEventListener('mouseenter', function () {
        $('.featured_slider .slick-dots').css('display', 'none');
      });

      item.addEventListener('mouseleave', function () {
        $('.featured_slider .slick-dots').css('display', 'block');
      });
    }
  }

  /*

	11. Init Popular Categories Slider

	*/

  function initPopularSlider() {
    if ($('.popular_categories_slider').length) {
      let popularSlider = $('.popular_categories_slider');

      popularSlider.owlCarousel({
        loop: true,
        autoplay: false,
        nav: false,
        dots: false,
        responsive: {
          0: { items: 1 },
          575: { items: 2 },
          640: { items: 3 },
          768: { items: 4 },
          991: { items: 5 },
        },
      });

      if ($('.popular_categories_prev').length) {
        let prev = $('.popular_categories_prev');
        prev.on('click', function () {
          popularSlider.trigger('prev.owl.carousel');
        });
      }

      if ($('.popular_categories_next').length) {
        let next = $('.popular_categories_next');
        next.on('click', function () {
          popularSlider.trigger('next.owl.carousel');
        });
      }
    }
  }

  /*

	12. Init Banner 2 Slider

	*/

  function initBanner2Slider() {
    if ($('.banner_2_slider').length) {
      let banner2Slider = $('.banner_2_slider');
      banner2Slider.owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: true,
        dotsContainer: '.banner_2_dots',
        smartSpeed: 1200,
      });
    }
  }

  /*

	13. Init Arrivals Slider

	*/

  function initArrivalsSlider() {
    if ($('.arrivals_slider').length) {
      let arrivalsSliders = $('.arrivals_slider');
      arrivalsSliders.each(function () {
        let arrivalsSlider = $(this);
        initASlider(arrivalsSlider);
      });
    }
  }

  function initASlider(as) {
    let arrivalsSlider = as;
    arrivalsSlider
      .on('init', function () {
        let activeItems = arrivalsSlider.find('.slick-slide.slick-active');
        for (let x = 0; x < activeItems.length - 1; x++) {
          let item = $(activeItems[x]);
          item.find('.border_active').removeClass('active');
          if (item.hasClass('slick-active')) {
            item.find('.border_active').addClass('active');
          }
        }
      })
      .on({
        afterChange(event, slick, current_slide_index, next_slide_index) {
          var activeItems = arrivalsSlider.find('.slick-slide.slick-active');
          activeItems.find('.border_active').removeClass('active');
          for (var x = 0; x < activeItems.length - 1; x++) {
            var item = $(activeItems[x]);
            item.find('.border_active').removeClass('active');
            if (item.hasClass('slick-active')) {
              item.find('.border_active').addClass('active');
            }
          }
        },
      })
      .slick({
        rows: 2,
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: false,
        arrows: false,
        dots: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              rows: 2,
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
            },
          },
          {
            breakpoint: 575,
            settings: {
              rows: 2,
              slidesToShow: 2,
              slidesToScroll: 2,
              dots: false,
            },
          },
          {
            breakpoint: 480,
            settings: {
              rows: 1,
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
            },
          },
        ],
      });
  }

  /*

	14. Init Arrivals Slider ZIndex

	*/

  function arrivalsSliderZIndex() {
    // Hide slider dots on item hover
    let items = document.getElementsByClassName('arrivals_slider_item');

    for (let x = 0; x < items.length; x++) {
      let item = items[x];
      item.addEventListener('mouseenter', function () {
        $('.arrivals_slider .slick-dots').css('display', 'none');
      });

      item.addEventListener('mouseleave', function () {
        $('.arrivals_slider .slick-dots').css('display', 'block');
      });
    }
  }

  /*

	15. Init Best Sellers Slider

	*/

  function bestsellersSlider() {
    if ($('.bestsellers_slider').length) {
      let bestsellersSliders = $('.bestsellers_slider');
      bestsellersSliders.each(function () {
        let bestsellersSlider = $(this);

        initBSSlider(bestsellersSlider);
      });
    }
  }

  function initBSSlider(bss) {
    let bestsellersSlider = bss;

    bestsellersSlider.slick({
      rows: 2,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: false,
      dots: true,
      autoplay: true,
      autoplaySpeed: 6000,
      responsive: [
        {
          breakpoint: 1199,
          settings: {
            rows: 2,
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true,
          },
        },
        {
          breakpoint: 991,
          settings: {
            rows: 2,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          },
        },
        {
          breakpoint: 575,
          settings: {
            rows: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
          },
        },
      ],
    });
  }

  /*

	16. Init Trends Slider

	*/

  function initTrendsSlider() {
    if ($('.trends_slider').length) {
      let trendsSlider = $('.trends_slider');
      trendsSlider.owlCarousel({
        loop: false,
        margin: 30,
        nav: false,
        dots: false,
        autoplayHoverPause: true,
        autoplay: false,
        responsive: {
          0: { items: 1 },
          575: { items: 2 },
          991: { items: 3 },
        },
      });

      trendsSlider.on('click', '.trends_fav', function (ev) {
        $(ev.target).toggleClass('active');
      });

      if ($('.trends_prev').length) {
        let prev = $('.trends_prev');
        prev.on('click', function () {
          trendsSlider.trigger('prev.owl.carousel');
        });
      }

      if ($('.trends_next').length) {
        let next = $('.trends_next');
        next.on('click', function () {
          trendsSlider.trigger('next.owl.carousel');
        });
      }
    }
  }

  /*

	17. Init Reviews Slider

	*/

  function initReviewsSlider() {
    if ($('.reviews_slider').length) {
      let reviewsSlider = $('.reviews_slider');

      reviewsSlider.owlCarousel({
        items: 3,
        loop: true,
        margin: 30,
        autoplay: false,
        nav: false,
        dots: true,
        dotsContainer: '.reviews_dots',
        responsive: {
          0: { items: 1 },
          768: { items: 2 },
          991: { items: 3 },
        },
      });
    }
  }

  /*

	18. Init Recently Viewed Slider

	*/

  function initViewedSlider() {
    if ($('.viewed_slider').length) {
      let viewedSlider = $('.viewed_slider');

      viewedSlider.owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        autoplayTimeout: 6000,
        nav: false,
        dots: false,
        responsive: {
          0: { items: 1 },
          575: { items: 2 },
          768: { items: 3 },
          991: { items: 4 },
          1199: { items: 6 },
        },
      });

      if ($('.viewed_prev').length) {
        let prev = $('.viewed_prev');
        prev.on('click', function () {
          viewedSlider.trigger('prev.owl.carousel');
        });
      }

      if ($('.viewed_next').length) {
        let next = $('.viewed_next');
        next.on('click', function () {
          viewedSlider.trigger('next.owl.carousel');
        });
      }
    }
  }

  /*

	19. Init Brands Slider

	*/

  function initBrandsSlider() {
    if ($('.brands_slider').length) {
      let brandsSlider = $('.brands_slider');

      brandsSlider.owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        nav: false,
        dots: false,
        autoWidth: true,
        items: 8,
        margin: 42,
      });

      if ($('.brands_prev').length) {
        let prev = $('.brands_prev');
        prev.on('click', function () {
          brandsSlider.trigger('prev.owl.carousel');
        });
      }

      if ($('.brands_next').length) {
        let next = $('.brands_next');
        next.on('click', function () {
          brandsSlider.trigger('next.owl.carousel');
        });
      }
    }
  }

  /*

	20. Init Timer

	*/

  function initTimer() {
    if ($('.deals_timer_box').length) {
      let timers = $('.deals_timer_box');
      timers.each(function () {
        let timer = $(this);

        let targetTime;
        let target_date;

        // Add a date to data-target-time of the .deals_timer_box
        // Format: "Feb 17, 2018"
        if (timer.data('target-time') !== '') {
          targetTime = timer.data('target-time');
          target_date = new Date(targetTime).getTime();
        } else {
          let date = new Date();
          date.setDate(date.getDate() + 2);
          target_date = date.getTime();
        }

        // variables for time units
        let days; var hours; var minutes; var seconds;

        let h = timer.find('.deals_timer_hr');
        let m = timer.find('.deals_timer_min');
        let s = timer.find('.deals_timer_sec');

        setInterval(function () {
          // find the amount of "seconds" between now and target
          let current_date = new Date().getTime();
          let seconds_left = (target_date - current_date) / 1000;

          // do some time calculations
          days = parseInt(seconds_left / 86400);
          seconds_left %= 86400;

          hours = parseInt(seconds_left / 3600);
          hours += days * 24;
          seconds_left %= 3600;

          minutes = parseInt(seconds_left / 60);
          seconds = parseInt(seconds_left % 60);

          if (hours.toString().length < 2) {
            hours = '0' + hours;
          }
          if (minutes.toString().length < 2) {
            minutes = '0' + minutes;
          }
          if (seconds.toString().length < 2) {
            seconds = '0' + seconds;
          }

          // display results
          h.text(hours);
          m.text(minutes);
          s.text(seconds);
        }, 1000);
      });
    }
  }
});
