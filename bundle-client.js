(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{}]},{},[1]);
