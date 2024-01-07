const http = require('http');
const port = 4000;
const targetObejct = {a: 'a', b: 'b'}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/home') {
        req.on('data', (data) => {
            console.log(data);
            const stringfiedData = data.toString();
            console.log(stringfiedData);
            Object.assign(targetObejct, JSON.parse(stringfiedData));
        })
    } else {
        if (req.url === '/home'){
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');        
            res.end(JSON.stringify(targetObejct));
        }else if (req.url === '/about'){
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<body>');
            res.write('<h1>About Page</h1>');
            res.write('</body>');
            res.write('</html>');
            res.end();
        } else {
            res.statusCode = 400;
            res.end();
        }
    }

})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})