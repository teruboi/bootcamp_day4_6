const http = require('http');
const fs = require('fs');

function page(url) {
    if (url === '/') {
        url = '/index'
    }

    fs.readFile(`.${url}.html`, (err, data) => {
        if(err) {
            res.writeHead(404);
            res.write('Error: Page not found');
        } else {
            res.write(data);
        }
        res.end();
    })
}

http
    .createServer((req, res) => {
        const url = req.url;
        console.log(url);

        res.writeHead(200, {
            'Content-Type': 'text/html',
        });

        page(url);
        
    })
    .listen(3000, () => {
        console.log('Server is listening on port 3000');
    });
