// App.js
// ===========

// > (c) 2013 Ngo Minh Tri, Mucinis Inc.
// > App may be freely distributed under the MIT license.
// > For all details and documentation: http://www.mucinis.com

// Initial Setup
// ------------------------------------------------------------
(function(){
	var root = this;
	jQuery(document).ready(function($) {
		// Auto width
		$(".scroll-section-container .item:not(:first)").width($(window).width()).find(".section-inner").height(460);
		
		// select #flowplanes and make it scrollable. use circular and navigator plugins
		$(".scroll-section-container").scrollable({ circular: false, mousewheel: false }).navigator({
			// select #flowtabs to be used as navigator
			navi: ".main",
			// select A tags inside the navigator to work as items (not direct children)
			naviItem: 'a',
			// assign "current" class name for the active A tag inside navigator
			activeClass: 'current',
			// make browser's back button work
			history: true
		});
		// FAQs
		// Using backbone for FAQs
		jQuery(".faqEntry .question a").click(function(event){
			if(jQuery(this).hasClass('link_collapse')){
				jQuery(this).removeClass('link_collapse').addClass('link_expand');
				jQuery(this).parent().next(".collapse").removeClass('collapse').addClass('expand');
			}else{
				jQuery(this).removeClass('link_expand').addClass('link_collapse');
				jQuery(this).parent().next(".expand").removeClass('expand').addClass('collapse');
			}
			return false;
		});
		jQuery("#faqs .link_expandAll").click(function(event){
			if(jQuery(this).hasClass('link_expandAll')){
				jQuery(this).removeClass('link_expandAll').addClass('link_collapseAll');
				jQuery(this).text("Hide All");
				jQuery("#faqs .collapse").removeClass('collapse').addClass('expand');
			}else{
				jQuery(this).removeClass('link_collapseAll').addClass('link_expandAll');
				jQuery(this).text("Show All");
				jQuery("#faqs .expand").removeClass('expand').addClass('collapse');
			}
			//$('.vscroll').jScrollPane({scrollbarWidth:20, scrollbarMargin:10});
			return false;
		});
		
		  // main vertical scroll
      $("#main").scrollable({

        // basic settings
        vertical: true,

        // up/down keys will always control this scrollable
        keyboard: 'static',

        // assign left/right keys to the actively viewed scrollable
        onSeek: function(event, i) {
          horizontal.eq(i).data("scrollable").focus();
        }

        // main navigator (thumbnail images)
      }).navigator("#main_navi");

      // horizontal scrollables. each one is circular and has its own navigator instance
      var horizontal = $(".scrollable").scrollable({ circular: true }).navigator(".navi");


      // when page loads setup keyboard focus on the first horzontal scrollable
      horizontal.eq(0).data("scrollable").focus();
		
		jQuery(".scroll").niceScroll({cursorcolor:"#00F"});
	});
}).call(this);