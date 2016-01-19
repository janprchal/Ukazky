window.DataProvider = function() {

}

window.DataProvider.prototype = {
    init: function() {
        var t = this;
    },

    bindEvents: function() {
        var t = this;
    },

    getInitSlideNum: function(el) {
        var t = this;
        return parseInt(el.text());
    },

    getSlidesCount: function(slides) {
        var t = this;
        return slides.length;
    },

    getSlide: function(slideNumber) {
        var t = this;
        return $('.js_slide[data-slide-num=' + slideNumber + ']');
    },

    getSubnavSlideNumber: function(el) {
        var t = this;
        return el.data('go-to-slide');
    },

    getData: function(el) {
        var t = this;
        return el.data();
    },

    sendSlideNumber: function(currentSlideNumber) {
        var t = this;

        var materialId = $("#data").attr("data-id");
        var updateMaterialDataUrl = $("#data").attr("data-url");

        $.ajax({
            method: 'POST',
            url: updateMaterialDataUrl,
            data: {materialId: materialId, currentLesson: currentSlideNumber},
            success: function(data) {
            },
            error: function(data) {
            }
        });
    },
}
