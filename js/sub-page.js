'use strict';

(() => {
    // EXPRESSION
    let yOffset = 0; // window.pageYOffset
    const filterCate = document.querySelector('.filter-category');
    const itemWrapper = document.querySelector('.product-item-wrapper');
    const productItem = document.querySelectorAll(".product-item");
    const headerHeight = document.querySelector('#header').getBoundingClientRect().height;

    console.log(headerHeight);


    // FUNCTION STICKY NAV
	function stickyCate() {
		if (yOffset > headerHeight) {
			document.body.classList.add('make-nav-sticky');
		} else {
			document.body.classList.remove('make-nav-sticky');
		}
    }
    

    // FUNCTION ARROW UP BUTTON
    function showArrowUp() {
        const arrowUp = document.querySelector('.arrow-up');

        if(yOffset > headerHeight) {
            arrowUp.classList.add('visible');
        } else {
            arrowUp.classList.remove('visible');
        }
        arrowUp.addEventListener('click', () => {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        });
    }


    // SCROLL EVENT
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        stickyCate();
        showArrowUp();
    });


    // FUNCTION FILTERING
    filterCate.addEventListener('click', (e)=>{
        const filter = e.target.dataset.filter;
        if(filter == null) {
            return;
        }

        // Remove selection from the previous item and select the new one
        const active = document.querySelector('.filter-category__link.selected');
        active.classList.remove('selected');
        e.target.classList.add('selected');


        itemWrapper.classList.add('ani-out');
        setTimeout(() => {
            productItem.forEach((item) => {
                if (filter === '*' || item.dataset.type.includes(filter)) {
                    item.classList.remove('invisible');
                } else {
                    item.classList.add('invisible');
                }
            });
            itemWrapper.classList.remove('ani-out');
        }, 300);
    });

})();

