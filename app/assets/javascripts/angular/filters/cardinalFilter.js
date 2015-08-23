angular.module('app').filter(
  'cardinal', function(){
    return function(angle){
      if (348 <= angle <= 11.25){return 'N'}
      else if (11.25 <= angle <= 33.75){return 'NNE'}
      else if (33.75 <= angle <= 56.25){return 'NE'}
      else if (56.25 <= angle <= 78.75){return 'ENE'}
      else if (78.75 <= angle <= 101.25){return 'E'}
      else if (101.25 <= angle <= 123.75){return 'ESE'}
      else if (123.75 <= angle <= 146.25){return 'SE'}
      else if (146.25 <= angle <= 168.75){return 'SSE'}
      else if (168.75 <= angle <= 191.25){return 'S'}
      else if (191.25 <= angle <= 213.75){return 'SSW'}
      else if (213.75 <= angle <= 236.25){return 'SW'}
      else if (236.25 <= angle <= 258.75){return 'WSW'}
      else if (258.75 <= angle <= 281.25){return 'W'}
      else if (281.25 <= angle <= 303.75){return 'WNW'}
      else if (303.75 <= angle <= 326.25){return 'NW'}
      else if (326.25 <= angle <= 348.75){return 'NNW'}
      else {return 'N/A'}
    }
  }
);

