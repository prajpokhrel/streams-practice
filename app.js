const http = require('http');
const fs = require('fs');
const HOSTNAME = '127.0.0.1';
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/html');
    const fileName = __dirname + '/index.html';
    const readStream = fs.createReadStream(fileName);

    /*
    * I was experimenting with core Node and ended up trying 3 methods. (^_^)
    * Can you suggest me which one is the best way to do this?
    * */

    /*
    * METHOD 1:
    * */
    readStream.on('open', () => {
        readStream.pipe(res);
    }).on('error', (error) => {
        res.end(`ERROR: ${error}`);
    });

    /*
    * METHOD 2:
    * */
    // let body = [];
    // readStream.on('data', (chunk) => {
    //     body.push(chunk);
    // }).on('end', () => {
    //     try {
    //         body = Buffer.concat(body).toString();
    //         res.write(body);
    //         res.statusCode = 200;
    //         res.end();
    //     } catch (error) {
    //         res.statusCode = 400;
    //         return res.end(`ERROR: ${error.message}`);
    //     }
    // });

    /*
    * METHOD 3:
    * */
    // readStream.on('data', (chunk) => {
    //     res.write(chunk);
    // }).on('end', () => {
    //     res.end();
    // }).on('error', (error) => {
    //     res.end(`ERROR: ${error}`);
    // });
});

server.listen(PORT, HOSTNAME, () => {
    console.log(`Listening to http://${HOSTNAME}:${PORT}...`);
});