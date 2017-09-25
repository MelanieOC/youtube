"use strict";

const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

class App {
      constructor() {
            this.result = {
                  videos: [],
                  selectedVideo: null,
                  searchTerm: null
            };
      }
      init() {
            this.youtubeSearch("iPhone X");
            this.events();
      }
      getVideoList(videos) {
            return videos.map((video, index) => {
                  const imageUrl = video.snippet.thumbnails.default.url;
                  const title = video.snippet.title;
                  const channel = video.snippet.channelTitle;
                  const url = `https://www.youtube.com/embed/${video.id.videoId}`;
                  let div= `<div class="row videos">
                              <div class="col-md-6">
                                    <img src=${imageUrl}>
                              </div>
                              <div class="col-md-6">
                                    <h4>${title}</h4>
                                    <p>${channel}</p>
                              </div>
                        </div>`;
                  $(div).click(()=>this.youtubeSearch(title));
                  return div;
            });
      }
      currentVideo(video) {
            const url = `https://www.youtube.com/embed/${video.id.videoId}`;
            const title = video.snippet.title;
            const description = video.snippet.description;
            return `<div class="embed-responsive embed-responsive-16by9">
                        <iframe class="embed-responsive-item" src=${url}> </iframe>
                  </div>
                  <h2>${title}</h2>
                  <p>${description}</p>`;
      }
      youtubeSearch(searchTerm) {
            YTSearch({ key: API_KEY, term: searchTerm }, data => {
                  this.result = {
                        videos: data,
                        selectedVideo: data[0],
                        searchTerm: searchTerm
                  };
                  console.log(this.result.videos);
                  var list = this.getVideoList(this.result.videos);
                  let actual = this.currentVideo(this.result.selectedVideo);
                  $("#root").append(list);
                  $('#actual').append(actual);
            });
      }
      events() {
            $('#search').keypress((event) => {
                  if (event.keyCode == 13) {
                        event.preventDefault();
                        $('#actual').empty();
                        $("#root").empty();
                        this.youtubeSearch($('#search').val());
                  }
            })
      }
      videoSearch(searchTerm) {
            jQuery.getJSON("list.json", data => {
                  this.result = {
                        videos: data.items,
                        selectedVideo: data.items[0],
                        searchTerm: searchTerm
                  };
                  var list = this.getVideoList(this.result.videos);
                  $("#root").append(list);
            });
      }
};

$(document).ready(() => {
      let prueba = new App();
      prueba.init();
});
