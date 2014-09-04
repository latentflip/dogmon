var peer = new Peer('dog-client', { key: 'qyeq8841u3kmaemi' });
var conn = peer.connect('dog-server');

document.addEventListener('DOMContentLoaded', function () {
    var button = document.createElement('button');
    button.innerText = "notify me";
    button.addEventListener('click', function () {
        Notification.requestPermission(function (resp) {
            if (resp !== 'granted') return;

            var timeStart, timeEnd, delta;
            conn.on('data', function (value) {
                var msg, notification;

                if (value === 'speaking') {
                    console.log('Started');
                    msg = "Barking :(.";
                    //notification = new Notification(msg);
                    timeStart = Date.now();
                } else {
                    console.log('Ended');
                    timeEnd = Date.now();
                    delta = Math.ceil((timeEnd - timeStart)/1000);
                    msg = "Barked for " + delta + 's.';
                    notification = new Notification(msg);
                    setTimeout(function () {
                        notification.close();
                    }, 2000);
                }

            });
        });
    }, false);
    document.body.appendChild(button);
});

