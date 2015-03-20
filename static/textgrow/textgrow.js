/*
	jQuery Plugin textGrow (leftlogic.com/info/articles/auto_grow_text)
	(c) 2006 Remy Sharp (leftlogic.com)
	$Id$
	
	Usage: jQuery('input').textGrow({ pad: 25 });
		- pad: trailing padding in pixels - default 25px
		- min_width: minimum width of the text box in pixels
		- max_width: maximum width of the text box in pixels
		
	If min and max width are not passed in, you can apply this
	via CSS using min-width and max-width attributes.
	
	See example at: leftlogic.com/info/articles/auto_grow_text	
*/
jQuery.fn.textGrow = function(options) {
	if (!options.pad) options.pad = 25;
	return this.each(function(i){
		var e = jQuery(this);
		// create copy for each element
		var o = { pad: options.pad, min_limit: options.min_limit, max_limit: options.max_limit }; 
		if (e.attr('type') == 'text') {
			if (!o.min_limit) o.min_limit = parseInt(e.css('min-width'));
			if (!o.max_limit) o.max_limit = parseInt(e.css('max-width'));
			
			// Safari reads a non-existant value as -1 making our calcs a mess
			if (o.min_limit < 0 || isNaN(o.min_limit)) o.min_limit = 0;
			if (o.max_limit < 0 || isNaN(o.max_limit)) o.max_limit = 0;

			var html = '<' + 'div style="position:absolute; top:0; visibility:hidden; left:0; padding:0 ' + o.pad + 'px 0 0!important; margin:0!important" id="_grow' + i + '"></' + 'div>';
			var c = jQuery('body').append(html);
			// adjust the style of the container to match the font of this element
			var ff = e.css('font-family');
			var fs = e.css('font-size');

			jQuery('div#_grow' + i).css({ 'font-size': fs, 'font-family': ff });

			resize = function(){
				var dl = jQuery('div#_grow' + i).html(e.val().replace(/ /g,'&nbsp;')).get(0).offsetWidth;
				if (o.max_limit && (dl + o.pad) > o.max_limit) {
					e.css('width', o.max_limit + 'px')
				} else if ((dl + o.pad) <= o.min_limit) {
					e.css('width', o.min_limit + 'px')
				} else { // resize
					e.css('width', dl + 'px')
				}
			}

			// auto resize based on current content
			resize();
			e.keypress(resize);
		}
	})
}
