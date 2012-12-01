define(["jquery"], function ($) 
{
	function Popup (parent, params)
	{
		params = params || {};
		this.width = params.width || "100";
		this.height = params.height || "100";
		this.color = params.color || null;
		centerTo = params.centerTo || parent;

		this.construct = function()
		{
			this.div = $("<div></div>").css({"position" : "absolute", "overflow" : "auto"});
			this.div.css(params.css);
			this.resize();
			this.centerPosition();
			this.div.hide();
			$(parent).append(this.div);
		}
		
		this.active = function()
		{
			this.centerPosition();
			this.resize();
			this.div.show();
		}
		
		this.hide = function()
		{
			this.div.hide();
		}
		this.resize=function(_surface)
		{	
			var surface = _surface || {};
			this.width = surface.width || this.width;
			this.height = surface.height || this.height;
			this.div.width(this.width);
			this.div.height(this.height); 
		}

		this.centerPosition = function()
		{
			this.x = ($(centerTo).position().left + $(centerTo).width()/2) - this.width/2;
			this.y = ($(centerTo).position().top + $(centerTo).height()/2) - this.height/2;
			this.div.css({"top": this.y + "px", "left" : this.x + "px"});
		}

		this.append = function(toAppend)
		{
			this.div.append(toAppend);
		}

		this.html = function(toHtml)
		{
			this.div.html(toHtml);
		}

		this.construct();
	}

	return Popup;
})