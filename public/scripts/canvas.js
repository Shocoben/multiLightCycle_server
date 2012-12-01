define(["canvasParams"], function(params)
{
	canvas = {};

	var canvasDiv = null;
	canvas.create = function(parent)
	{
		var width = params.width || 800;
		var height = params.height || 600;
		canvasDiv = document.createElement('canvas');
	    canvasDiv.setAttribute("width", width);
	    canvasDiv.setAttribute("height",height);
	    if (params.id)
	    {
	    	canvasDiv.setAttribute("id", params.id)
	    }
	    if (params.classe)
	    {
	    	canvasDiv.setAttribute("classe", params.classe)
	    }
	    parent.appendChild(canvasDiv);
	}

	canvas.associate = function(o)
	{
	    o.ctx = canvasDiv.getContext("2d");
	    o.canvas = canvasDiv;
	}
	
	return canvas;
});