'use strict';


window.addEventListener('load', function () {
	$('.menu-categories__item-icon').click(function() {
		if ($(this).closest('.menu-categories__item').hasClass('active')) {
			$(this).closest('.menu-categories__item').removeClass('active')
		} else {
			$('.menu-categories__item').removeClass('active')
			$(this).closest('.menu-categories__item').addClass('active')
		}
		
    })

	let list = document.querySelectorAll(".menu-categories__sublist");
	let listsWithFewerThanTwoLi = [];
	list.forEach((ul) => {
		const liCount = ul.querySelectorAll('.menu-categories__subitem').length;
		if (liCount < 2) {
			listsWithFewerThanTwoLi.push(ul);
		}
	});

	listsWithFewerThanTwoLi.forEach((ul) => {
		ul.closest('.menu-categories__item').querySelectorAll('svg').forEach((svg) => {
			svg.style.opacity = '0';
			svg.style.visibility = 'hidden';
		});
	});
	$('.catalog__button-filter').click(function() {
		if (!$('.catalog__wrap-menu-categories').hasClass('open')) {
			$('.catalog__wrap-menu-categories').addClass('open')
			$(this).toggleClass('active')
		} else {
			$('.catalog__wrap-menu-categories').removeClass('open')
		$(this).removeClass('active')
		}
		
    })

	if ($('.catalog__sorting-select')) {
		$('.catalog__sorting-select').niceSelect()
	}

	$('.catalog__view-display-button_blocks').click(function() {
		$(this).addClass('active')
		$('.catalog__view-display-button_lists').removeClass('active')
		$('.catalog__content').addClass('view-display-blocks').removeClass('view-display-lists')
    })

	$('.catalog__view-display-button_lists').click(function() {
		$(this).addClass('active')
		$('.catalog__view-display-button_blocks').removeClass('active')
		$('.catalog__content').removeClass('view-display-blocks').addClass('view-display-lists')
    })


	if ($('[data-fancybox="gallery"]')) {
		Fancybox.bind('[data-fancybox="gallery"]', {
			// Your custom options
			Images: {
				zoom: true,
				Panzoom: {
					maxScale: 2,
				},
			},
		});
	}
	if ($('[data-fancybox')) {
		Fancybox.bind('[data-fancybox]', {
			// Your custom options
			Images: {
				zoom: true,
				Panzoom: {
					maxScale: 2,
				},
			},
		});
	}

	new Swiper(".catalog-products .catalog__item-img-slider", {
		speed: 1000,
		slidesPerView: 1,
		spaceBetween: 0,
		loop: false,
		autoHeight: true,
		navigation: false,
		pagination: {
			el: ".catalog__item-img-slider .swiper-pagination",
			clickable: true,
		},
	});



	$('.rating').each(function() {
		const $ratingElement = $(this);
		const $ratingStars = $ratingElement.find('.rating__star_full');
		const ratingValue = parseFloat($ratingElement.data('rating'));
		const starCount = $ratingStars.length;

		const filledStars = Math.floor(ratingValue);
		const hasHalfStar = ratingValue - filledStars >= 0.5;

		$ratingStars.each(function(index, star) {
			const $star = $(star);
			if (index < filledStars) {
				$star.closest('.rating__wrap-star').addClass('filled');
			} else if (hasHalfStar && index === filledStars) {
				$star.closest('.rating__wrap-star').addClass('half-filled');
			}
		});
	});
});


