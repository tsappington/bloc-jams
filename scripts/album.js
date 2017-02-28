 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'     + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     var $row = $(template);
     
     var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        if (currentlyPlayingSongNumber !== songNumber) {
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNumber) {
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            currentlyPlayingSongNumber = null;
            currentSongFromAlbum = null;
        }
     };

     var onHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number');
         var songNumber = parseInt(songNumberCell.attr('data-song-number'));

         if (songNumber !== currentlyPlayingSongNumber) {
             songNumberCell.html(playButtonTemplate);
         }
     };

     var offHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number');
         var songNumber = parseInt(songNumberCell.attr('data-song-number'));

         if (songNumber !== currentlyPlayingSongNumber) {
             songNumberCell.html(songNumber);
         }
     };

     $row.find('.song-item-number').click(clickHandler);
     $row.hover(onHover, offHover);
     return $row;
 };


 var setCurrentAlbum = function(album) {
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
     
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     $albumSongList.empty();
 
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };


var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};


var setSong = function(songNumber){
     currentlyPlayingSongNumber = songNumber;  // Video: parseInt(songNumber);
     currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};


var getSongNumberCell = function(number){
    return $('.song-item-number[data-song-number="' + number + '"]');
};


var changeSong = function(event) {
    
    var direction = event.data.direction;
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);

    if(direction === 'next'){
        var getLastSongNumber = function(index) {
            return index == 0 ? currentAlbum.songs.length : index;
        };
        currentSongIndex++;

        if (currentSongIndex >= currentAlbum.songs.length) {
            currentSongIndex = 0;
        }
    } else {
        var getLastSongNumber = function(index) {
            return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
        };        
        currentSongIndex--;

        if (currentSongIndex < 0) {
            currentSongIndex = currentAlbum.songs.length - 1;
        }        
        $('.main-controls .play-pause').html(playerBarPauseButton);
    }

    setSong(currentSongIndex + 1);
    updatePlayerBarSong();

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $changeSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $changeSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};


var updatePlayerBarSong = function(){
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};


var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');


$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.on('click', {direction: 'prev'}, changeSong);
    $nextButton.on('click', {direction: 'next'}, changeSong);
         
    var albums = [albumPicasso, albumMarconi, albumLaika];
    var toggleAlbum = function(){

        var albumCurrent = this.src;
        for(var i = 0; i < albums.length; i++){
            if(albumCurrent.includes(albums[i].albumArtUrl)){
                var next = i + 1;
                if((albums[next]) === undefined){
                    next = 0;
                }
                setCurrentAlbum(albums[next]);
                break;
            }        
        }  
    };

    var album = document.getElementsByClassName('album-cover-art')[0];
    album.addEventListener('click',toggleAlbum);
     
 });