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
		$('.catalog__wrap-menu-categories').toggle('open')
		$(this).toggleClass('active')
    })

});


