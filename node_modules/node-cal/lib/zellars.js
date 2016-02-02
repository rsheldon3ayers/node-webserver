var zeller = function (obj) {
  // convert to ints
  for(var key in obj){
    obj[key] = obj[key] * 1;
  }
  return (obj.q + Math.floor((obj.m + 1)*26/10) + obj.y + Math.floor(obj.y/4) + 6 * Math.floor(obj.y/100) + Math.floor(obj.y/400)) % 7 + '';
}

module.exports = zeller;
