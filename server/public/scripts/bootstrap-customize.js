'use strict'

var carouselButtonControll = function() {
  var activeSlide = $('.carousel-indicators').find('.active').attr('data-slide-to')
  var firstSlide = $('.carousel-indicators li:first').attr('data-slide-to')
  var lastSlide = $('.carousel-indicators li:last').attr('data-slide-to')

  if (activeSlide == firstSlide) {
    $('.btn-previous').hide();
    $('.btn-next').show();
  } else if (activeSlide == lastSlide) {
    $('.btn-next').hide();
    $('.btn-previous').show();
  } else {
    $('.btn-previous').show();
    $('.btn-next').show();
  }
}
$(function() {
  carouselButtonControll();

  $('#carousel-form').on('slid.bs.carousel', function () {
      carouselButtonControll();
  });
})
