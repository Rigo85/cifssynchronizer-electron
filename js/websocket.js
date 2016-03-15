$(function () {

    var W3CWebSocket = require('websocket').w3cwebsocket;

    var client = new W3CWebSocket('ws://localhost:8080/');

    var tbody = $('.table tbody');

    var prettyBytes = require('pretty-bytes');

    var dateFormat = require('dateformat');

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

            var col3 = $('<td>' + prettyBytes(parseInt(e.data)) + '</td>');
            col3.appendTo(row);

            var col4 = $('<td>' + dateFormat(new Date(parseInt(e.data) * 1000), 'yyyy-mm-dd hh:MM:ss TT') + '</td>');
            col4.appendTo(row);

            row.appendTo(tbody);

            var table = $('table');
            table.trigger('update');
            var sorting = [[3, 1]];
            table.trigger("sorton", [sorting]);
        }
    };

    var date = new Date();
    $('.footer').append('<p>&copy; ' + date.getFullYear() + ' Rigoberto L. Salgado Reyes.</p>');
});
