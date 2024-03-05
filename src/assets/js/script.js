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

	if ($('.feedback__parameter-wrap-stars')) {
		$('.feedback__parameter-wrap-stars').click(function(){  
			$(this).parent().attr('data-rating',$(this).data('star'));
		});
	}

	if ($('.feedback__product-time-selector')) {
		$('.feedback__product-time-selector').niceSelect()
	}


	let dropZone = $('.feedback__wrap-input-file');
	$('.feedback__input-file').focus(function () {
		$('label').addClass('focus');
	})
		.focusout(function () {
			$('label').removeClass('focus');
		});
	dropZone.on('drag dragstart dragend dragover dragenter dragleave drop', function () {
		return false;
	});
	dropZone.on('dragover dragenter', function () {
		dropZone.addClass('dragover');
	});
	dropZone.on('dragleave', function (e) {
		let dx = e.pageX - dropZone.offset().left;
		let dy = e.pageY - dropZone.offset().top;
		if ((dx < 0) || (dx > dropZone.width()) || (dy < 0) || (dy > dropZone.height())) {
			dropZone.removeClass('dragover');
		}
	});
	dropZone.on('drop', function (e) {
		dropZone.removeClass('dragover');
		let files = e.originalEvent.dataTransfer.files;
		addFiles(files);
	});
	$('.feedback__input-file').change(function () {
		let files = this.files;//список файлов
		addFiles(files);
	});

	let labelTextDefault = $('.feedback__label-file-text').html()
	$('.feedback__input-file-clear').on('click', function (e) {
		clearFiles($(this))
		return false
	});

	function clearFiles(e) {
		e.closest('.feedback__wrap-input-file').find('.feedback__label-file-text').html(labelTextDefault);
		$('.feedback__wrap-input-file').removeClass('added');
	}

	function addFiles(files) {
		$('.feedback__input-file').closest('.feedback__wrap-input-file').find('.feedback__label-file-text').html(files[0].name);
		$('.feedback__wrap-input-file').addClass('added');
		let fileSize = files[0].size; // Размер файла в байтах
		// Функция для конвертации размера файла
		function convertFileSize(size) {
			let suffix = ''
			if (size < 1024) {
				suffix = " B";
			} else if (size < 1048576) {
				size /= 1024;
				suffix = " KB";
			} else if (size < 1073741824) {
				size /= 1048576;
				suffix = " MB";
			} else {
				size /= 1073741824;
				suffix = " GB";
			}
			return size.toFixed(1) + suffix
		}
		let formattedSize = convertFileSize(fileSize);
		$('.feedback__file-size').html(formattedSize)
	}

	$('.button-remove').on("click", function (e) {
		$(this).closest('.input-container').find('.quantityInput').val(parseInt($(this).closest('.input-container').find('.quantityInput').val()) - 1)
    })

	$('.button-add').on("click", function (e) {
		$(this).closest('.input-container').find('.quantityInput').val(parseInt($(this).closest('.input-container').find('.quantityInput').val()) + 1)
    })

	

	productPromoSectionInit() 
	productDescriptionSectionInit() 
	feedbackPageInit() 
	cartPageInit() 
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
			pagination: {
				el: '.promo .pagination',
				clickable: true,
			},

			thumbs: {
				swiper: promoThumb,
			},

			breakpoints: {
				320: {
					slidesPerView: 1,
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

function cartPageInit() {
	if (!document.querySelector(".page-cart")) {
		return
	}

	$('input[name="all"]').on('change', function() {
        if ($(this).is(':checked')) {
            $('.cart__item').find('input[type="checkbox"]').prop('checked', true);
        } else {
            $('.cart__item').find('input[type="checkbox"]').prop('checked', false);
        }
    });

	$('.cart__receiving-tab').on('click', function () {
		$('.cart__receiving-tab').removeClass('active')
		$(this).addClass('active')
	})


	$('.cart__receiving-tab').on('click', function () {
		$('.cart__receiving-tab').removeClass('active')
		$(this).addClass('active')
		$('.cart__receiving-tab-content-item').removeClass('active')


		if ($(this).hasClass('cart-tab-pickup')) {
			$('.tab-content-pickup').addClass('active')
		}
		if ($(this).hasClass('cart-tab-courier')) {
			$('.tab-content-courier').addClass('active')
		}
		if ($(this).hasClass('cart-tab-transport-company')) {
			$('.tab-content-transport-company').addClass('active')
		}
		
	});
}

function feedbackPageInit() {
	if (!document.querySelector(".page-feedback")) {
		return
	}

	new Swiper(".feedback__product-slider", {
		speed: 1000,
		slidesPerView: 1,
		spaceBetween: 10,
		pagination: {
			el: '.feedback .pagination',
			clickable: true,
		},

		breakpoints: {
			320: {
				slidesPerView: 1,
				
			},
			560: {
				pagination: false
			}
		},
	});
}