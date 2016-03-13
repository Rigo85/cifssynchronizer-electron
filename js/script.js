$(function () {

    var W3CWebSocket = require('websocket').w3cwebsocket;

    var client = new W3CWebSocket('ws://localhost:8080/');

    var tbody = $('.table tbody')

    client.onerror = function () {
        console.log('Connection Error');
    };

    client.onopen = function () {
        console.log('WebSocket Client Connected');

        function sendNumber() {
            if (client.readyState === client.OPEN) {
                var number = Math.round(Math.random() * 0xFFFFFF);
                client.send(number.toString());
                setTimeout(sendNumber, 1000);
            }
        }

        sendNumber();
    };

    client.onclose = function () {
        console.log('echo-protocol Client Closed');
    };

    client.onmessage = function (e) {
        if (typeof e.data === 'string') {

            var row = $('<tr></tr>');

            var col1 = $('<td></td>');
            col1.text(e.data);
            col1.appendTo(row);

            var col2 = $('<td>smb://10.1.6.1/descargas$/cemc/abril/fileX</td>');
            col2.appendTo(row);

            var col3 = $('<td>30 Mb</td>');
            col3.appendTo(row);

            var col4 = $('<td>13 03 2016</td>');
            col4.appendTo(row);

            row.appendTo(tbody);
        }
    };

    var date = new Date();
    $('.footer').append('<p>&copy; ' + date.getFullYear() + ' Rigoberto L. Salgado Reyes.</p>');

    //var os = require('os');
    //var prettyBytes = require('pretty-bytes');
    //
    //$('.stats').append('Number of cpu cores: <span>' + os.cpus().length + '</span>');
    //$('.stats').append('Free memory: <span>' + prettyBytes(os.freemem()) + '</span>');

});
