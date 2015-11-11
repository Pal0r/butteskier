angular.module('app').filter("imageFilter", function() {
  return function(items, from, to) {
    var result = [];
    angular.forEach(items, function(item, from, to){
      var itemDate = new Date(item.created_at);
      if(from < itemDate < to){
        result.push(item)
      }
    })           
    return result;
  };
});