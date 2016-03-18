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
    };

    client.onclose = function () {
        console.log('Client Closed');
    };

    client.onmessage = function (e) {
        if (typeof e.data === 'string') {
            var rowData = JSON.parse(e.data);

            var tableRow = $('<tr></tr>');

            var nameCol = $('<td></td>');
            nameCol.text(rowData.name);
            nameCol.appendTo(tableRow);

            var pathCol = $('<td></td>');
            pathCol.text(rowData.path);
            pathCol.appendTo(tableRow);

            var sizeCol = $('<td></td>');
            sizeCol.text(prettyBytes(rowData.size));
            sizeCol.appendTo(tableRow);

            var timeCol = $('<td></td>');
            timeCol.text(dateFormat(new Date(rowData.time), 'yyyy-mm-dd hh:MM:ss TT'));
            timeCol.appendTo(tableRow);

            tableRow.appendTo(tbody);

            var table = $('table');
            table.trigger('update');
            var sorting = [[3, 1]];
            table.trigger("sorton", [sorting]);

            client.send(JSON.stringify({tag: 1}));
        }
    };

    document.querySelector('#form-credentials').onsubmit = function (e) {
        e.preventDefault();

        client.send(JSON.stringify($('#form-credentials').serializeArray().reduce(function (obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {tag: 0})));
    };

    $('.footer').append('<p>&copy; ' + new Date().getFullYear() + ' Rigoberto L. Salgado Reyes.</p>');
});
