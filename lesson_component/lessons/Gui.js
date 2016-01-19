window.Gui = function() {

};

window.Gui.prototype = {
    init: function() {
        var t = this;

    },

    bindEvents: function() {
        var t = this;

        $(document).ready(function() {
            $(t).trigger({
                type: 'domReady'
            });
        });

        $('.tabs').on('click', '.js_interrupt', function() {
            $(t).trigger({
                type: 'lessonCanceled'
            });
        });

        $('.tab-pagination').on('click', '.js_prev, .js_next', function() {
            $(t).trigger({
                type: 'slideChange',
                elClass: $(this).attr('class')
            });
        });

        $('.tabs-subnav').on('click', 'a', function(e) {
            e.preventDefault();
            $(t).trigger({
                type: 'subnavLinkClicked',
                el: $(this)
            });
        });

        $('.tabs').on('click', '.js_interrupt', function() {
            $(t).trigger({
                type: 'lessonInterrupted',
                el: $(this)
            });
        });
    },

    updateSubnav: function(slideNumber, subnavItem) {
        var t = this;
        subnavItem.each(function(i, e) {
            // +1 protoze se musi povolit slide na kterem sem a ten nasledujici
            if($(this).data('go-to-slide') <= slideNumber + 1) {
                // console.log('povolene cislo goToSlide itemu je: ' + $(this).data('go-to-slide'));
                $(this).removeClass('tabs-subnav__item--disabled');
            }

            if($(this).data('go-to-slide') == slideNumber) {
                $(this).addClass('active');
            }
        });
    },

    showSlide: function(slide) {
        var t = this;
        slide.show();
    },

    hideSlide: function(slide) {
        var t = this;
        slide.hide();
    },

    setTextValue: function(el, value) {
        var t = this;
        el.text(value);
    },

    hideAllSlides: function(slides) {
        var t = this;
        slides.hide();
    },

    updatePaginationProgress: function(slidesCount, currentSlide) {
        var t = this;
        var progressBar = $('.tab-pagination__progress--active');
        progressBar.css('width', (currentSlide / slidesCount) * 100 + '%');
    },
};
