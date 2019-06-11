// const http = require('http');

// http.createServer(function (request, response) {
//     console.log('------start-----')

//     var body = [];

//     console.log(request.method);
//     console.log(request.headers);

//     request.on('data', function (chunk) {
//         console.log(chunk)
//         body.push(chunk);
//     });

//     request.on('end', function () {
//         body = Buffer.concat(body);
//         console.log(body.toString());
//         console.log('-------end------')
//     });

// }).listen(80);

(function (i, len, count, callback) {
    for (; i < len; ++i) {
        (function (i) {
            async(arr[i], function (value) {
                arr[i] = value;
                if (++count === len) {
                    callback();
                }
            });
        }(i));
    }
}(0, arr.length, 0, function () {
    console.log(arr)
}));