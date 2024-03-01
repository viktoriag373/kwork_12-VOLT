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


	productPromoSectionInit() 
	productDescriptionSectionInit() 
});


function productPromoSectionInit() {
	if (!document.querySelector(".section-product-promo")) {
		return
	}
	if ($(".promo__slider-thumb")) {
		let promoThumb = new Swiper(".promo__slider-thumb", {
			speed: 1000,
			// slidesPerView: 5,
			slidesPerView: 'auto',
			spaceBetween: 20,
			autoHeight: true,

			navigation: {
				nextEl: ".promo__thumb-next",
				prevEl: ".promo__thumb-prev",
			},

			breakpoints: {
				320: {
					// slidesPerView: 3,
					
				},
				951: {
					direction: 'vertical',
				},
				1441: {
					// slidesPerView: 5,
					direction: 'vertical',
				}
			},
		});

		new Swiper(".promo__slider", {
			speed: 1000,
			slidesPerView: 1,
			spaceBetween: 10,
			effect: "fade",

			thumbs: {
				swiper: promoThumb,
			},

			breakpoints: {
				320: {
					slidesPerView: 1,
					navigation: {
						nextEl: ".promo .slider-button_next",
						prevEl: ".promo .slider-button_prev",
					},
					pagination: {
						el: '.promo .pagination',
						clickable: true,
					},
				},
				768: {
					navigation: false,
					pagination: false,
				}
			},
		});
	}

}

function productDescriptionSectionInit() {
	if (!document.querySelector(".section-description-product")) {
		return
	}

	$('.description__tab-title').on('click', function () {
		$('.description__tab-title').removeClass('active')
		$(this).addClass('active')
		$('.description__content-item').removeClass('active')

		if ($(this).hasClass('tab-description')) {
			$('.description__content-description').addClass('active')
		}
		if ($(this).hasClass('tab-characteristics')) {
			$('.description__content-characteristic').addClass('active')
		}

		if ($(this).hasClass('tab-feedbacks')) {
			$('.description__content-feedbacks').addClass('active')
		}
	});


	new Swiper(".description__feedbacks-gallary-slider", {
		speed: 1000,
		// slidesPerView: 14,
		spaceBetween: 10,
		slidesPerView: 'auto',
		loop: false,
		navigation: {
			nextEl: ".description__thumb-next.slider-button_next",
		},

		breakpoints: {
			320: {
				// slidesPerView: 1,
			},
			768: {
				// slidesPerView: 10,
			},
			1280: {
				// slidesPerView: 14,
			}
		},
	});

	let feedbacksSlider = new Swiper(".feedbacks__slider", {
		speed: 1000,
		slidesPerView: 1,
		spaceBetween: 25,
		loop: false,
		autoplay: false,

		breakpoints: {
			320: {
				spaceBetween: 5,
				slidesPerView: 1,
				// grid: {
				// 	rows: 2,
				// },
				// autoHeight: true,
				pagination: {
					el: '.feedbacks__slider-pagination.pagination',
					clickable: true,
				},
			},
		},
	});


	$('.feedbacks__item-reply-button').on("click", function (e) {
		if ($(this).closest('.feedbacks__item-reply').hasClass('open-form')) {
			$(this).closest('.feedbacks__item-reply').removeClass('open-form')
		} else {
			$(this).closest('.feedbacks__item-reply').addClass('open-form')
		}
	});
	$('.feedbacks__item-reply-form_one-level .feedbacks__item-reply-form-button-cancel').on("click", function (e) {
		$(this).closest('.feedbacks__item-reply').removeClass('open-form')	
	});


	$('.feedbacks__item-answer .feedbacks__item-answer-button').on("click", function (e) {
		if ($(this).closest('.feedbacks__item-answer').hasClass('open-form')) {
			$(this).closest('.feedbacks__item-answer').removeClass('open-form')
		} else {
			$(this).closest('.feedbacks__item-answer').addClass('open-form')
		}
	});
	$('.feedbacks__item-answers .feedbacks__item-reply-form-button-cancel').on("click", function (e) {
		$(this).closest('.feedbacks__item-answer').removeClass('open-form')
	});


	$('.feedbacks__item-reply-button-answers').on("click", function (e) {
		$(this).closest('.feedbacks__item-reply').toggleClass('close-answers')
		$(this).toggleClass('close-answers')
	});

	if ($(window).width() < 768) {
		$('.feedbacks__item-reply-button-answers').closest('.feedbacks__item-reply').toggleClass('close-answers')
		$('.feedbacks__item-reply-button-answers').toggleClass('close-answers')
	}

	$('.feedbacks__item-more-button').on("click", function (e) {
		$(this).closest('.feedbacks__item').addClass('visible-more')
	});

	$('.feedbacks__wrap-rating-mobile svg').on("click", function (e) {
		$(this).closest('.feedbacks__item').removeClass('visible-more')
	});
	


	$(".feedbacks__linear-rating-item").each(function() {
		var score = parseFloat($(this).data("score"));
		var percentage = (score / 5) * 100;
		$(this).find(".feedbacks__linear-rating span").css('width', percentage + "%")
	});

	if ($('.feedbacks__sorting-selector')) {
		$('.feedbacks__sorting-selector').niceSelect()
	}




	/* input-file */
	var dt = new DataTransfer();
 
	$('.input-file input[type=file]').on('change', function(){
		let $files_list = $(this).closest('.input-file').next();
		$files_list.empty();
	
		// for(var i = 0; i < this.files.length; i++){
		// 	let new_file_input = '<div class="input-file-list-item">' +
		// 		'<span class="input-file-list-name">' + this.files.item(i).name + '</span>' +
		// 		'<a href="#" onclick="removeFilesItem(this); return false;" class="input-file-list-remove">x</a>' +
		// 		'</div>';
		// 	$files_list.append(new_file_input);
		// 	dt.items.add(this.files.item(i));
		// };

		for(var i = 0; i < this.files.length; i++){
			// let new_file_input = '<a href="#" onclick="removeFilesItem(this); return false;" class="input-file-list-remove">x</a>';
			// $files_list.append(new_file_input);
			dt.items.add(this.files.item(i));
		};

		this.files = dt.files;
	});
	
	// function removeFilesItem(target){
	// 	let name = $(target).prev().text();
	// 	let input = $(target).closest('.input-file-row').find('input[type=file]');	
	// 	$(target).closest('.input-file-list-item').remove();	
	// 	for(let i = 0; i < dt.items.length; i++){
	// 		if(name === dt.items[i].getAsFile().name){
	// 			dt.items.remove(i);
	// 		}
	// 	}
	// 	input[0].files = dt.files;  
	// }
}