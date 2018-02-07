const Request = require('../services/request.js');

const BucketlistData = function(url){
  this.url = url;
  this.onLoad = null;
}

BucketlistData.prototype.getData = function(){
  const request = new Request(this.url);
  request.get(this.onLoad);
}

module.exports = BucketlistData;
