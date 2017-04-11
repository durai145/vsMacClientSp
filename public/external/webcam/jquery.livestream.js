/*
Livestream jQuery Plugin
Author: Aldehir Rojas
Version: 0.9

The MIT License (MIT)
--------------------------------------------------------------------------------
Copyright (c) 2012 Aldehir Rojas

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function($) {

  // LiveStream class
  var LiveStream = function(element, streamers, options) {
    this.baseUrl = "http://api.justin.tv/api/stream/list.json?limit=1&channel=";
    this.element = $(element);
    this.streamers = streamers;
    this.options = $.extend({}, this.defaults, options);
    this.requestStreamer();
  };

  // LiveStream instance variables and methods
  LiveStream.prototype = {
    // Defaults
    defaults: {
      startVolume: 25,
      autoPlay: true,
      width: 620,
      height: 378,
      onSuccess: function(element, streamer) { },
      onFailure: function(element) { }
    },

    // Send an AJAX request to find if the streamer at the front of the queue is
    // currently streaming.
    requestStreamer: function() {
      // If we're at the end of the queue, then call onFailure callback function
      // and return.
      if(this.streamers.length <= 0) {
        this.options.onFailure(this.element);
        return;
      }

      // Get the streamer from the queue
      var streamer = this.streamers.shift();
      var streamUrl = this.baseUrl + streamer;

      // Ajax call
      var $this = this;
      $.ajax({
        url: streamUrl,
        dataType: 'jsonp',
        jsonp: 'jsonp',

        success: function(resp) {
          if(resp.length > 0) {
            // Build the embed code and replace all contents in the element with
            // the embed code.
            var embedCode = $this.buildEmbedCode(streamer);
            $this.element.html(embedCode);

            // Call onSuccess callback function
            $this.options.onSuccess($this.element, streamer);
          } else {
            // Move on to the next streamer
            $this.requestStreamer();
          }
        },

        error: function(resp) {
          // Move on to the next streamer
          $this.requestStreamer();
        }

      });
    },

    // Build the embed code for the given streamer
    buildEmbedCode: function(streamer) {
      // Build the flash object
      var object = $('<object/>', {
        type: 'application/x-shockwave-flash',
        id: 'live_embed_player_flash'
      });

      // Specifying these attributes in the hash above does some magical jQuery
      // stuff that we don't want.
      object.attr('height', this.options.height);
      object.attr('width', this.options.width);
      object.attr('data', 'http://www.twitch.tv/widgets/live_embed_player.swf?channel=' + streamer);

      // Add in the parameters
      object.append($('<param/>', { name: 'allowFullScreen', value: 'true' }));
      object.append($('<param/>', { name: 'allowScriptAccess', value: 'always' }));
      object.append($('<param/>', { name: 'allowNetworking', value: 'all' }));
      object.append($('<param/>', {
        name: 'movie',
        value: 'http://www.twitch.tv/widgets/live_embed_player.swf'
      }));
      object.append($('<param/>', {
        name: 'flashvars',
        value: $.param({
          hostname: 'www.twitch.tv',
          channel: streamer,
          auto_play: this.options.autoPlay ? 'true' : 'false',
          start_volume: this.options.startVolume
        })
      }));

      return object;
    }
  };

  $.fn.livestream = function(streamers, options) {
    this.each(function() {
      new LiveStream(this, streamers, options);
    });
    return this;
  };

})(jQuery);

