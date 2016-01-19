window.LessonsDirector = function() {
    var t = this;
}

window.LessonsDirector.prototype = {
    init: function() {
        var t = this;

        t.slides = $('.js_slide');
        // pocet slidu
        t.slideNumber;
        t.context = $('body');
        t.currentSlide = $('.js_currentSlide');
        t.totalSlides = $('.js_totalSlides');
        t.subnavItems = $('.js_subnav_items .tabs-subnav__item');
        t.testBtn = $('.js_testBtn');
        t.testIdentidfier = false;

        //Vytvoření instancí
        t._constructInstances();

        //Bind událostí instacní
        t._bindEvents();

        //Vlastní procesy instancí
        t._initInstances();
    },

    _constructInstances: function() {
        var t = this;

        t.instances = {
            gui: new window.Gui(),
            dataProvider: new window.DataProvider(),
        };
    },

    _bindEvents: function() {
        var t = this;

        t.instances.gui.bindEvents();

        $(t.instances.gui).on('domReady', function() {
            // Nasetuje init slide number
            t.setSlideNumber(t.instances.dataProvider.getInitSlideNum(t.currentSlide));
            t.instances.gui.showSlide(t.instances.dataProvider.getSlide(t.slideNumber));

            // Nasetuju na kterem slidu uzivatel je a kolik je celkem slidu
            t.instances.gui.setTextValue(t.currentSlide, t.slideNumber);
            t.instances.gui.setTextValue(t.totalSlides, t.instances.dataProvider.getSlidesCount(t.slides));

            t.instances.gui.updatePaginationProgress(t.instances.dataProvider.getSlidesCount(t.slides), t.slideNumber);

            // Nastaveni prvku Subnavigace
            t.instances.gui.updateSubnav(t.slideNumber, t.subnavItems);

             if(t.slideNumber == parseInt(t.totalSlides.text())) {
                t.testBtn.css('display', 'inline-block');
            }
        });

        $(t.instances.gui).on('lessonCanceled', function() {
            t.instances.dataProvider.sendSlideNumber(t.slideNumber);
        });

        $(t.instances.gui).on('slideChange', function(e) {
            if(e.elClass.indexOf('js_next') == -1 && t.slideNumber > 1) {
                t.instances.gui.hideSlide(t.instances.dataProvider.getSlide(t.slideNumber));
                t.setSlideNumber(--t.slideNumber);

            } else if(e.elClass.indexOf('js_prev') == -1 && t.slideNumber < t.instances.dataProvider.getSlidesCount(t.slides)) {
                t.instances.gui.hideSlide(t.instances.dataProvider.getSlide(t.slideNumber));
                t.setSlideNumber(++t.slideNumber);

            } else {
                return false;
            }

            // Zbytek uz se bude vykovat vzdy
            t.instances.gui.showSlide(t.instances.dataProvider.getSlide(t.slideNumber));
            t.instances.gui.setTextValue(t.currentSlide, t.slideNumber);
            t.instances.gui.updatePaginationProgress(t.instances.dataProvider.getSlidesCount(t.slides), t.slideNumber);

            // Removnu tridu active ze vsech subnav prvku o pridani tridy active se stara
            // updateSubnav
            t.subnavItems.removeClass('active');
            t.instances.gui.updateSubnav(t.slideNumber, t.subnavItems);

            if(t.slideNumber == parseInt(t.totalSlides.text())) {
                t.testBtn.css('display', 'inline-block');
            }

            // Pokazde poslu na kterem slidu se prave uzivatel nachazi
            // pokud to neni test
            if(!t.testIdentidfier) {
                t.instances.dataProvider.sendSlideNumber(t.slideNumber);
            }
        });

        $(t.instances.gui).on('subnavLinkClicked', function(e) {
            e.preventDefault();
            if(!e.el.hasClass('tabs-subnav__item--disabled')) {
                // Odebrani tridy active
                t.subnavItems.removeClass('active');
                // Skryju soucasny slide
                t.instances.gui.hideSlide(t.instances.dataProvider.getSlide(t.slideNumber));
                // Nasetuju si novy slideNumber podle toho na jaky slidy bylo kliknuto v navigaci
                t.setSlideNumber(t.instances.dataProvider.getSubnavSlideNumber(e.el));
                // Zobrazim novy slide
                t.instances.gui.showSlide(t.instances.dataProvider.getSlide(t.slideNumber));
                // Prekreslim progress
                t.instances.gui.updatePaginationProgress(t.instances.dataProvider.getSlidesCount(t.slides), t.slideNumber);
                // Prekreslim cislo
                t.instances.gui.setTextValue(t.currentSlide, t.slideNumber);
                // Update navigace aby slo jit na dalsi slide
                t.instances.gui.updateSubnav(t.slideNumber, t.subnavItems);
                // Pridani tridy active + toggle subnavigace
                e.el.addClass('active');
                $('.js_subnav').slideUp();
                $('.js_subnav-trigger').removeClass('tabs__hamburger--active');
                // Pokazde poslu na kterem slidu se prave uzivatel nachazi
                t.instances.dataProvider.sendSlideNumber(t.slideNumber);

                if(t.slideNumber == parseInt(t.totalSlides.text())) {
                    t.testBtn.css('display', 'inline-block');
                }
            } else {
            }
        });

        $(t.instances.gui).on('lessonInterrupted', function(e) {
            t.instances.dataProvider.sendSlideNumber(t.slideNumber);
        });
    },

    _initInstances: function() {
        var t = this;

        for (var i in t.instances) {
            t.instances[i].init();
        }
    },

    setContext: function(context) {
        var t = this;
        t.context = context;
    },

    getContext: function() {
        var t = this;
        return t.context;
    },

    setSlideNumber: function(slideNum) {
        var t = this;
        t.slideNumber = slideNum;
    },

    getSlideNumber: function() {
        var t = this;
        return t.slideNumber;
    },

    setIdentifier: function(val) {
        var t = this;
        t.testIdentidfier = val;
    },

    getIdentifier: function() {
        var t = this;
        return t.testIdentidfier;
    }
}
