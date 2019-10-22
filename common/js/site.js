var App = function() {

    /*===================
          GOTO TOP
    =====================*/
    var _gotoTop = function() {
      // Action
      $('body').on('click','.goto-top',function(e) {
        e.preventDefault();
         $("html, body").animate({ scrollTop: 0 }, 600);
      });
      // Check Visibility
      function checkWinToGoto(){
        if($(window).width() > 767){
          $(window).scroll(function() {
            if ( $(this).scrollTop() >= 350 ) {
              $('.goto-top').fadeIn(500);
            } else if ( $(this).scrollTop() <= 200 ) {
              $('.goto-top').fadeOut(500);
            }
          });
        }
      }

      checkWinToGoto();

      $(window).resize(function() {
        checkWinToGoto();
      });

    };

    /*======================
         CHECK LANGUAGE
    ========================*/
  	var _languageCheck = function(){
  		($('html').attr('dir') == 'ltr') ? $('body').addClass('lang-eng') : $('body').addClass('lang-arb');
  	};



    return {
        init: function(){
            _gotoTop();
        },
        afterInit: function(){
          _languageCheck();
        },
        toster: function(text) {
          function ToastBuilder(options) {
            // options are optional
            var opts = options || {};

            // setup some defaults
            opts.defaultText = opts.defaultText || 'default text';
            opts.displayTime = opts.displayTime || 3000;
            opts.target = opts.target || 'body';

            return function (text) {
              $('<div/>')
                .addClass('toast')
                .prependTo($(opts.target))
                .text(text || opts.defaultText)
                .queue(function(next) {
                  $(this).css({
                    'opacity': 1
                  });
                  var topOffset = 15;
                  $('.toast').each(function() {
                    var $this = $(this);
                    var height = $this.outerHeight();
                    var offset = 15;
                    $this.css('top', topOffset + 'px');

                    topOffset += height + offset;
                  });
                  next();
                })
                .delay(opts.displayTime)
                .queue(function(next) {
                  var $this = $(this);
                  var width = $this.outerWidth() + 20;
                  $this.css({
                    'right': '-' + width + 'px',
                    'opacity': 0
                  });
                  next();
                })
                .delay(600)
                .queue(function(next) {
                  $(this).remove();
                  next();
                });
            };
          }

          // customize it with your own options
          var myOptions = {
            defaultText: 'Toast, yo!',
            displayTime: 3000,
            target: 'body'
          };
            //position: 'top right',   // TODO: make this */
            //bgColor: 'rgba(0,0,0,0.5)', // TODO: make this */

          // to get it started, instantiate a copy of
          // ToastBuilder passing our custom options
          var showtoast = new ToastBuilder(myOptions);

          return showtoast(text);
          /*
          showtoast($('#textbox').val());

          $('body')
          .queue(function(next) {
            showtoast('Hey look, toast!');
            next();
          }).delay(100)
          .queue(function(next) {
            showtoast('Sweet!');
            next();
          })
          .delay(500);
          */
        },
    }
}();

$(document).ready(function(){
    App.init();

    $('#department-gallery').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        items:4,
        dots:false,
        autoplay: false,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        responsive :{
          768 :{
            items:4
          },
          767 : {
            items:2
          },
          640 : {
            items:2
          },
          320 : {
            items:1,
            margin:0,
          }
        }
    });

}); // end document ready

window.onload = function() {

    App.afterInit();

}; // end window.load
