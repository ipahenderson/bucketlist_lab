const BucketlistData = require("./models/bucketlistData.js");
const BucketlistView = require("./views/bucketlistView.js");

const app = function () {
  const bucketlistData = new BucketlistData("http://localhost:5000/api/bucketlist")
  const bucketlistView = new BucketlistView(document.querySelector("#bucketlist-list"))
  bucketlistData.onLoad = bucketlistView.render;
  bucketlistData.getData();
}

document.addEventListener("DOMContentLoaded", app);
