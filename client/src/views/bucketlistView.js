const BucketlistView = function(container){
  this.container = container;
}

BucketlistView.prototype.render = function(data){
  console.log("Rendering ", data, this.container);
  const ul = document.querySelector('#bucketlist-list');
  for (item of data){
  const li = document.createElement('li');
  li.innerText = `${item.country}`;
  ul.appendChild(li);
}
}

module.exports = BucketlistView;
