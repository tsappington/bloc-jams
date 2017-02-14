 var pointsArray = document.getElementsByClassName('point');
 
 var animatePoints = function(points) {

    var revealPoint = function(x) {
        points[x].style.opacity = 1;
        points[x].style.transform = "scaleX(1) translateY(0)";
        points[x].style.msTransform = "scaleX(1) translateY(0)";
        points[x].style.WebkitTransform = "scaleX(1) translateY(0)";
    };

    for(var x = 0; x < 3; x++){
        revealPoint(x);
    }
    
};

 window.onload = function() {
      if (window.innerHeight > 950) {
         animatePoints(pointsArray);
     }
     var sellingPoints = document.getElementsByClassName('selling-points')[0];
     var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

     
     window.addEventListener('scroll', function(event) {
         if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
             animatePoints(pointsArray);   
         }
      });
 }