$(document).ready(function(){
	$('.main-menu').slicknav();
	

    $('.navBtn').on('click',function() {
        if($('.slideMenu').css('left')=='0px'){
            $('.slideMenu').animate({left: '-200px'}, 500); 
            $('.pageContent').animate({left: '0'}, 500);        
        }else{
            $('.slideMenu').animate({left:0}, 500); 
            if ($(window).width() < 768) {
            	$('.pageContent').animate({left:'200px'}, 500); 
        	}else{
        		$('.pageContent').animate({left:'40px'}, 500); 
        	}
        }
    });

    $('.tabs-menu a').click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });

    $('.slideProduct').bxSlider({
      pagerCustom: '.slideThumbs'
    });

     $('.GalleryProducts').bxSlider({
      autoControls: false,
      responsive: true,
      hideControlOnEnd: true,
      pagerCustom: '.slideThumbs',

    });

    
    $('.ProductContent').jqte();

    /*
    $('.lDrop').each(function() {
        $(this).show(0).on('click', function(e) {
            // This is only needed if your using an anchor to target the "box" elements
            e.preventDefault();
            
            // Find the next "box" element in the DOM
            $(this).find('.dropMenu').slideToggle({'display':'block'});
            if()

        });
    });   
    */
      $(".lDrop").click(function(e) {
      e.preventDefault();
      var $div = $(this).find('.dropMenu');
      $(".dropMenu").not($div).hide();
        if ($div.is(":visible")) {
            $div.hide()
        }  else {
           $div.show(300);
        }
    });

    $(document).click(function(e){
        var p = $(e.target).closest('.dropdown').length
        if (!p) {
              $(".dropdown-container").hide();
        }
    });


   
        
        $('.lDrop ul li').click(function(){
            $('.overlay').show();
            $('.lightbox').show('fast');
        });


    $('.locationStore').click(function(){
        $('.overlay').show();
        $('.lightbox').show('fast');
        

    });

    $('.close').click(function(){
        $('.overlay').hide();
        $('.lightbox').hide('fast');
        

    });

     $(".subnavegador").hide();
      $(".slideMenu ul li:has(ul)").mouseover(function(){
        $("ul.subnavegador").slideDown('slow');
      });
      $(".subnavegador").mouseleave(function(){
        $(".subnavegador").slideUp('slow').stop;
        
      });

});

