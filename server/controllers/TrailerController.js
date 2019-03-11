const movieTrailer = require('movie-trailer');

class TrailerController {
  static findByName(req, res) {
    var movieName = req.params.movie

    function getId(url) {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = url.match(regExp);

      if (match && match[2].length == 11) {
        return match[2];
      } else {
        return 'error';
      }
    }

    movieTrailer(movieName)
      .then((response) => {
        var videoId = getId(response);
        var embed = "http://www.youtube.com/embed/" + videoId + ""
        res
          .status(200)
          .json({
            msg: "fetch success",
            data: embed
          })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = TrailerController