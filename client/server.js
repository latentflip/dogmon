var hark = require('hark');
var getUserMedia = require('getusermedia');

var peer = new Peer('dog-server', { key: 'qyeq8841u3kmaemi' });

getUserMedia(function(err, stream) {
    if (err) throw err;

    peer.on('connection', function (conn) {

        var options = {
            threshold: -40
        };
        var speechEvents = hark(stream, options);

        speechEvents.on('volume_change', function (vol) {
            console.log(vol);
        });

        speechEvents.on('speaking', function (vol) {
            console.log('Speaking');
            conn.send('speaking');
        });

        speechEvents.on('stopped_speaking', function (vol) {
            console.log('Not Speaking');
            conn.send('stopped_speaking');
        });
    });
});

