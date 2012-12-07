var PlaylistDOMInformation = function() {
	this.container = "#tab-content";
	
    this.parentTable = "table#tracks tbody";
    
    this.lastElementOfParent = this.parentTable + ":last";
    
    this.lastRowInParent = this.parentTable + " tr:last";
    
    this.allRowsInTable = this.parentTable + " tr";
    
    this.getActionForID = function(id, action) {
    	return this.getRowForID(id) + " a." + action;
    }
    
    this.getRowForID = function(id) {
        return this.parentTable + " tr." + id;
    };
    
    this.content = ".content";
    
    this.trackName = "div.name";
    
    this.trackDurationBox = "div.dur-box";
};
/*
function Playlist() {
    this.currentTrack = 0;
    this.currentVolumePercent = 50; // Start at 50% so users can increase/decrease volume if they want to
    this.isChangingState = false,
    this.models = [];
    this.playlistDOM = new PlaylistDOMInformation();
    this.settings = {};
    this.totalDuration = 0; // Duration in seconds
}

Playlist.prototype = {
    get: function(key) {
        return this[key];
    },
    set: function(key, value) {
        this[key] = value;
    },
    _addPlaylistDOMRow: function(mediaObject, index) {
        var obj = this;
        var appendedHTML = this._getDOMRowForMediaObject(mediaObject, index);
        $(this.get("playlistDOM").lastElementOfParent).append(appendedHTML);
        var id = mediaObject.get('id');
        $(this.get("playlistDOM").getActionForID(id, 'remove')).live('click', function() {
            obj.removeTrack(id);
        });
    },
    _addPlaylistDOMRows: function(mediaObjects, insertLocation) {
        var index;
    	if ( !(mediaObjects instanceof Array) ) {
            mediaObjects = [mediaObjects];
        }
        var playlist = this, appendedHTML = '';
        var currentLength = $(this.get("playlistDOM").allRowsInTable).length;
        for (index in mediaObjects){
            var mediaObject = mediaObjects[index];
            appendedHTML += this._getDOMRowForMediaObject(mediaObject, currentLength + parseInt(index) + 1);
        }
        if ($.isNumeric(insertLocation)) {
            if ($(this.get("playlistDOM").allRowsInTable).size()) {
                $($(this.get("playlistDOM").allRowsInTable).get(insertLocation)).after(appendedHTML);
            }
            else {
                $(this.get("playlistDOM").parentTable).append(appendedHTML);
            }
        }
        else {
            $(this.get("playlistDOM").lastElementOfParent).append(appendedHTML);
        }
        for (index in mediaObjects){
        	var row = $(this.get("playlistDOM").getRowForID(mediaObjects[index].get('id')));
            row.find(this.get("playlistDOM").trackName).width(row.find(this.get("playlistDOM").content).width() - row.find(this.get("playlistDOM").trackDurationBox).width());
        	row.dblclick(function() {
                playlist.goToTrack($($(this).closest(playlist.get("playlistDOM").allRowsInTable)).index(), true);
            });
            $(this.get("playlistDOM").getActionForID(mediaObjects[index].get('id'), 'remove')).live('click', function() {
                playlist.removeTrack($($(this).closest(playlist.get("playlistDOM").allRowsInTable)).index());
            });
            $(this.get("playlistDOM").getActionForID(mediaObjects[index].get('id'), 'play')).live('click', function() {
                playlist.goToTrack($($(this).closest(playlist.get("playlistDOM").allRowsInTable)).index(), true);
            });
        }
    },
    _getDOMRowForMediaObject: function(mediaObject, index) {
        return '<tr class=' + mediaObject.get('id') + '>' + this._getDOMTableCellsForMediaObject(mediaObject, index) + '</tr>';
    },
    _getDOMTableCellsForMediaObject: function(mediaObject, index) {
    	var remove = '<a href onclick="return false;" class="btn action remove"><i class="icon-remove""></i></a>';
    	var play = '<a href onclick="return false;" class="btn action play"><i class="icon-play"></i></a>';
    	var actions = '<div class="actions">' + remove + play + '</div>';
    	var actionsCell = '<td class="action-cell">' + actions + '</td>';
    	var uploader = '<td class="uploader-cell" ' + getAttribute('title', mediaObject.get('uploader')) + '>' + mediaObject.get('uploader') + '</td>';
    	var title = '<td class="title-cell" ' + getAttribute('title', mediaObject.get('mediaName')) + '>' + mediaObject.get('mediaName') + '</td>';
    	var seconds = secondsToString(mediaObject.get('duration'));
    	var duration = '<td class="duration-cell" ' + getAttribute('title', seconds) + '>' + seconds + '</td>';
    	var link = '<td class="link-cell"><a href="' + mediaObject.get('permalink') + '"><img src="' + mediaObject.get('icon') + '" /></a></td>';
    	return actionsCell + uploader + title + duration + link;
    },
    addTracks: function(mediaObjects, currentTrack, insertLocation) {
        if ( !(mediaObjects instanceof Array) ) {
            mediaObjects = [mediaObjects];
        }
        var addedDuration = 0;
        if ($.isNumeric(insertLocation)) {
            this.models = this.models.slice(0, insertLocation + 1).concat(mediaObjects).concat(this.models.slice(insertLocation + 1));
        }
        else {
            this.models = this.models.concat(mediaObjects);
        }
        this._addPlaylistDOMRows(mediaObjects, insertLocation);
        for (var i in mediaObjects) {
            var mediaObject = mediaObjects[i];
            addedDuration += mediaObject.get('duration');
        }
        if ($.isNumeric(currentTrack)) {
            this.setCurrentTrack(currentTrack);
        }
        else {
            this.setCurrentTrack(this.get("currentTrack"));
        }
        this.setWindowLocation();
        $('#track-count').text(this.models.length.toString());
        this.set("totalDuration", this.get("totalDuration") + addedDuration);
        $('#playlist-duration').text(secondsToString(this.get("totalDuration")));
        $(this.get("playlistDOM").parentTable).sortable('refresh');
        this.updateTrackEnumeration();
    },
    clear: function() {
        if (!this.isEmpty()) {
            this.stop();
            var media = this.models[this.get("currentTrack")];
            if (media.get('type') == "video") {
                clearVideo();
            }
            this.models = [];
            $(this.get("playlistDOM").allRowsInTable).remove();
            this.setCurrentTrack(0);
            this.setWindowLocation();
            this.setPlayButton(this.isEmpty());
            $('#track-count').text(this.models.length.toString());
            this.set("totalDuration", 0);
            $('#playlist-duration').text(secondsToString(this.get("totalDuration")));
            this.updateTrackEnumeration();
            
        }
    },
    getID: function() {
    	var hash = this.getHash();
    	var result = $.Deferred();
    	if (!hash.length) {
    		result.reject();
    	}
    	else {
    		var queryLink = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + 'fetchid';
    		$.ajax({
    			url: queryLink,
        	dataType: 'json',
        	type: 'POST',
        	data: {query: hash}
    		}).done(function(data) {
    			if (data.id) {
    				result.resolve(data.id);
    			}
    			else {
    				result.reject();
    			}
    		});
    	}
    	return result.promise();
    },
    getHash: function() {
        var newHash = '', slicedList = [];
        if (!this.isEmpty()) {
            newHash = this.models[0].get('siteCode') + '=' + this.models[0].get('siteMediaID');
            slicedList = this.models.slice(1);
        }
        for (var i in slicedList) {
            newHash += '&' + slicedList[i].get('siteCode') + '=' + slicedList[i].get('siteMediaID');
        }
        return newHash;
    },
    getSetting: function(option) {
    	return this.get("settings")[option];
    },
    getVolume: function() {
        return this.get("currentVolumePercent");
    },
    goToTrack: function(index, autostart) {
        var wasPlaying = this.isPlaying();
        this.stop();
        var media = this.models[this.get("currentTrack")];
        if (media.get('type') == "video") {
            clearVideo();
        }
        this.setCurrentTrack(parseInt(index));
        if (wasPlaying || autostart) {
            this.play();
        }
    },
    hasNext: function() {
        return !this.isEmpty() && this.models.length > this.get("currentTrack") + 1;
    },
    hasPrevious: function() {
        return !this.isEmpty() && this.get("currentTrack") - 1 >= 0;
    },
    indexOfTrackID: function(trackID) {
        var pos = -1, tracks = this.models;
        for (track in tracks) {
            if (tracks[track].get('id') == trackID) {
                pos = track;
                break;
            }
        }
        return pos;
    },
    isEmpty: function() {
        return this.models.length == 0;
    },
    isMuted: function() {
        var result = false;
        if (!this.isEmpty()) {
            result = this.models[this.get("currentTrack")].isMuted();
        }
        return result;
    },
    isPaused: function() {
        var status = false;
        if (!this.isEmpty()) {
            status = this.models[this.get("currentTrack")].isPaused();
        }
        return status;
    },
    // Function is asynchronous, because the response can be depending on the media
    isPlaying: function() {
        var status = false;
        if (!this.isEmpty()) {
            status = this.models[this.get("currentTrack")].isPlaying() || this.models[this.get("currentTrack")].isPaused();
        }
        return status;
    },
    moveTrack: function(originalIndex, newIndex) {
        if (!this.isEmpty() && originalIndex != newIndex) {
            if (originalIndex >= 0 && newIndex >= 0 && originalIndex < this.models.length && newIndex < this.models.length) {
                var mediaObject = this.models.splice(originalIndex, 1)[0];
                this.models.splice(newIndex, 0, mediaObject);
                if (this.get("currentTrack") == originalIndex) {
                    this.setCurrentTrack(newIndex);
                }
                else {
                    this.setCurrentTrack(Math.max(0, $(this.get("playlistDOM").allRowsInTable +'.playing').index()));
                }
            
                var minIndex = Math.min(originalIndex, newIndex);
                // Track numbers are now inaccurate, so they are refreshed.
                this.renumberTracks(minIndex);
            }
        }
        else {
            this.renumberTracks();
        }
        this.setWindowLocation();
    },
    nextTrack: function(autostart) {
        var trackInt = parseInt(this.get("currentTrack")), next = trackInt + 1 >= this.models.length ? 0 : trackInt + 1;
        this.goToTrack(next, autostart);
    },
    play: function() {
        if (!this.isEmpty()) {
            var playlist = this;
            var media = this.models[this.get("currentTrack")];
            if (media.get('type') == 'audio') {
                media.play({
                    volume: (playlist.isMuted() ? 0 : playlist.get("currentVolumePercent")),
                    onfinish: function() {
                        playlist.nextTrack(true);
                    },
                    onload: function(success) {
                        if (!success) {
                            playlist.nextTrack(true);
                        }
                    },
                    whileplaying: function() {
                        var position = this.position, seconds = position/ 1000;
                        var percent = Math.min(100 * (position / this.duration), 100);
                        timeElapsed.text(secondsToString(seconds));
                        updateTimebar(percent);
                    }
                });
            }
            else if (media.get('type') == 'video') {
                if (media.get('siteName') == 'YouTube') {
                    if (media.get('interval')) {
                        window.clearInterval(media.get('interval'));
                    }
                    var clearMediaInterval = function() {
                        if (media.get('interval')) {
                            window.clearInterval(media.get('interval'));
                        }
                    };
                    media.play({
                        showControls: false,
                        autoPlay: true,
                        initialVideo: media.get('siteMediaID'),
                        loadSWFObject: false,
                        width: $("#video").width(),
                        height: $("#video").height(),
                        onStop: clearMediaInterval,
                        onPlayerBuffering: clearMediaInterval,
                        onPlayerPaused: clearMediaInterval,
                        volume: playlist.isMuted() ? 0 : playlist.getVolume(),
                        onPlayerPlaying: function() {
                            playlist.setVolume(playlist.isMuted() ? 0 : playlist.get("currentVolumePercent"));
                            media.set('interval', window.setInterval(function() {
                                var data = $("#video").tubeplayer('data');
                                if (data && data.hasOwnProperty('currentTime') && data.hasOwnProperty('duration')) {
                                    var percent =  (data.currentTime / data.duration) * 100;
                                    timeElapsed.text(secondsToString(data.currentTime));
                                    updateTimebar(percent);
                                }
                            }, 333));
                        },
                        onPlayerEnded: function() {
                            clearMediaInterval();
                            media.stop();
                            playlist.nextTrack(true);
                        },
                        onErrorNotEmbeddable: function() {
                            playlist.nextTrack(true);
                        },
                        onErrorNotFound: function() {
                            playlist.nextTrack(true);
                        },
                        onErrorInvalidParameter: function() {
                            playlist.nextTrack(true);
                        }
                    });
                }
            }
            this.setPlayButton(false);
        }
    },
    previousTrack: function(autostart) {
        var trackInt = parseInt(this.get("currentTrack")), next = trackInt - 1 >= 0 ? trackInt - 1 : (this.isEmpty() ? 0 : this.models.length - 1);
        this.goToTrack(next, autostart);
    },
    removeTrack: function(index) {
        if (index >= 0) {
            var wasPlaying = this.isPlaying() && index == this.get("currentTrack");
            if (wasPlaying){
                this.stop();
            }
            var trackDuration = this.models[index].get('duration');
            this.models[index].destruct();
            this.models.splice(index, 1);
            
            $($(this.get("playlistDOM").allRowsInTable).get(index)).remove();
            this.set("currentTrack", ($(".playing").index()));
            this.renumberTracks(Math.max(0, Math.min(this.models.length - 1, index)));
            if (index == this.get("currentTrack")) {
                this.setCurrentTrack(Math.min(this.models.length - 1, index));
            }
            this.setWindowLocation();
            if (!this.isEmpty() && wasPlaying) {
                this.play();
            }
            this.setPlayButton(this.isEmpty());
            $('#track-count').text(this.models.length.toString());
            this.set("totalDuration", this.get("totalDuration") - trackDuration);
            $('#playlist-duration').text(secondsToString(this.get("totalDuration")));
            this.updateTrackEnumeration();
            
        }
    },
    renumberTracks: function(startingIndex) {
        $(this.get("playlistDOM").allRowsInTable).filter(function(index) {
            return index >= startingIndex;
        }).each(function(index, element) {
            // Uses 1-indexed numbers for user
            $(element).find('span.index').html((startingIndex + index) + 1);
        });
    },
    seek: function(decimalPercent) {
        if (!this.isEmpty()) {
            var track = this.models[this.get("currentTrack")];
            track.seek(decimalPercent);
        }
    },
    setCurrentTrack: function(trackNumber) {
        this.set("currentTrack", trackNumber);
        if (!this.isEmpty() && trackNumber >= 0 && trackNumber < this.models.length) {
            $('.playing').removeClass('playing');
            var rowDOM = this.get("playlistDOM").getRowForID(this.models[trackNumber].get('id'));
            $(rowDOM).addClass('playing');
            this.updateState('current', trackNumber);
        }
    },
    setMute: function(mute) {
        if (!this.isEmpty()) {
            this.models[this.get("currentTrack")].setMute(mute);
        }
        if (!mute) {
            this.setVolume(this.get("currentVolumePercent"));
        }
    },
    setSetting: function(option, value) {
        var settings = this.get("settings");
        settings[option] = value;
    	this.set("settings", settings);
    },
    setTracks: function(mediaObjects, currentTrack) {
    	if ( !(mediaObjects instanceof Array) ) {
	        mediaObjects = [mediaObjects];
	    }
	    var addedDuration = 0;
	    this.models = mediaObjects;
	    $(this.get("playlistDOM").allRowsInTable).remove();
	    this._addPlaylistDOMRows(mediaObjects, 0);
	    for (var i in mediaObjects) {
	        var mediaObject = mediaObjects[i];
	        addedDuration += mediaObject.get('duration');
	    }
	    this.setCurrentTrack(currentTrack || 0);
	    this.setWindowLocation();
	    $('#track-count').text(this.models.length.toString());
	    this.set("totalDuration", addedDuration);
	    $('#playlist-duration').text(secondsToString(this.get("totalDuration")));
	    $(this.get("playlistDOM").parentTable).sortable('refresh');
	    this.updateTrackEnumeration();
    },
    setVolume: function(intPercent) {
        intPercent = Math.round(intPercent);
        if (this.isPlaying() || this.isPaused()) {
            var media = this.models[this.get("currentTrack")];
            var setMute = intPercent == 0;
            media.setVolume(intPercent);
            if (setMute) {
                intPercent = 50;
            }
        }
        this.set("currentVolumePercent", intPercent);
        this.setVolumeSymbol(setMute ? 0 : intPercent);
    },
    setVolumeSymbol: function(intPercent) {
        //Update volume bar
        var volumeBarWidth = intPercent.toString();
        $("#volume-inner").width(volumeBarWidth + "%");
        $("#volume-number").text(volumeBarWidth);
        if (intPercent >= 50) {
            $("#volume-symbol").removeClass("icon-volume-down").removeClass("icon-volume-off").addClass("icon-volume-up");
        }
        else if (intPercent > 0) {
            $("#volume-symbol").removeClass("icon-volume-up").removeClass("icon-volume-off").addClass("icon-volume-down");
        }
        else if (intPercent == 0) {
            $("#volume-symbol").removeClass("icon-volume-up").removeClass("icon-volume-down").addClass("icon-volume-off");
        }
    },
    setWindowLocation: function() {
    	var playlist = this, currentHash = this.getHash();
    	var idGetter = playlist.getID();
    	idGetter.done(function(id) {
    		playlist.set("isChangingState", true);
    		History.pushState({id: id, current: playlist.get("currentTrack")}, "Muxamp", id);
    		if (_gaq) {
    			_gaq.push(['_trackPageview', '/' + id]);
    		}
    		playlist.set("isChangingState", false);
    	}).fail(function() {
    		History.pushState({id: null, current: null}, "Muxamp", "/");
    	});
    },
    shuffle: function() {
        if (this.isEmpty()) {
            return false;
        }
        // Fisher-Yates shuffle implementation by Cristoph (http://stackoverflow.com/users/48015/christoph),
        var currentSiteMediaID = this.models[this.get("currentTrack")].get('siteMediaID');
        var newCurrentTrack = this.get("currentTrack"), arrayShuffle = function(array) {
            var tmp, current, top = array.length;

            if(top) while(--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
                if (newCurrentTrack == current) {
                    newCurrentTrack = top;
                } else if (newCurrentTrack == top) {
                    newCurrentTrack = current;
                }
            }

            return array;
        }
        
        var newList = this.models.slice(0), i;
        newList = arrayShuffle(newList);
        // Rewrites the DOM for the new playlist
        this.setTracks(newList, newCurrentTrack);
    },
    stop: function () {
        if (!this.isEmpty()) {
            this.models[this.get("currentTrack")].stop();
            timebar.width(0);
            $('#time-elapsed').text('0:00');
            this.setPlayButton(true);
        }
    },
    toggleMute: function() {
        if (!this.isEmpty()) {
            var shouldUnmute = this.models[this.get("currentTrack")].isMuted();
            this.models[this.get("currentTrack")].toggleMute();
            if (shouldUnmute) {
                this.setVolume(this.get("currentVolumePercent"));
            }
            else {
                this.setVolumeSymbol(0);
            }
        }
    },
    togglePause: function() {
        this.setPlayButton(!this.isPaused());
        this.models[this.get("currentTrack")].togglePause();
    },
    setPlayButton: function(on) {
        if (on) {
            $('#play').find('i').removeClass('icon-pause').addClass('icon-play');
        }
        else {
            $('#play').find('i').removeClass('icon-play').addClass('icon-pause');
        }
    },
    updateTrackEnumeration: function() {
        if (this.models.length == 1 && $("#multiple-tracks").text().length) {
        	$("#multiple-tracks").empty();
        }
        else if (!$("#multiple-tracks").text().length) {
        	$("#multiple-tracks").text("s");
        }
    },
    updateState: function(key, value) {
    	this.set("isChangingState", true);
    	var currentState = History.getState();
    	var currentData = currentState.data;
    	if (!currentData['id']) {
    		this.set("isChangingState", false);
    		return;
    	}
    	currentData[key] = value;
    	var title = currentState.title;
    	var url = currentState.url;
    	History.replaceState(currentData, title, url);
    	this.set("isChangingState", false);
    }
};*/
var playlist = new TrackPlaylist();
$(document).ready(function() {
    var startPos;
    $(playlist.playlistDOM.parentTable).sortable({
        axis: 'y',
        containment: 'document',
        helper: function(event, ui) {
    		var children = ui.children();
    		var helper = ui.clone();
    		helper.children().each(function(index) {
    			$(this).width(children.eq(index).width());
    		});
    		return helper;
    	},
        start: function(event, ui) {
            startPos = $(event.target).parent(playlist.playlistDOM.allRowsInTable).index();
        },
        tolerance: 'pointer',
        stop: function(event, ui) {
            var pos = ui.item.index();
            playlist.moveTrack(startPos, pos);
        }
    });
});

var SearchResults = new SearchResultsProvider();