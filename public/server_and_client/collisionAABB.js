define(function()
{
	var collisionAABB = function (box1, box2){
		if((box2.x >= box1.x + box1.w) 
		|| (box2.x + box2.w <= box1.x) 
		|| (box2.y >= box1.y + box1.h)
		|| (box2.y + box2.h <= box1.y))  
	          return false; 
	   	else
	          return true; 
	}

	return collisionAABB;
});