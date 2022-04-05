const http = require('http');
const fs = require('fs');
const path = require('path');
const { registroUsuario, loginUsuario, getUsuarios } = require('./queries');
const port = 3000;

http.createServer(async (req, res) => {
    //Disponibilizacion HTML
    if (req.url == '/' && req.method == 'GET') {
        fs.readFile(path.join(__dirname, '..', 'index.html'), (err, html) => {
            if (err) {
                res.statusCode = 500;
                res.end();
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(html);
            }
        });
    }
    //Disponibilizacion CSS
    if (req.url == '/style' && req.method == 'GET') {
        fs.readFile(path.join(__dirname, '..', 'assets/css/style.css'), (err, css) => {
            if (err) {
                res.statusCode = 500;
                res.end();
            } else {
                res.setHeader('Content-Type', 'text/css');
                res.end(css);
            }
        });
    }
    //Disponibilizacion JAVASCRIPT
    if (req.url == '/script' && req.method == 'GET') {
        fs.readFile(path.join(__dirname, '..', 'assets/js/script.js'), (err, js) => {
            if (err) {
                res.statusCode = 500;
                res.end();
            } else {
                res.setHeader('Content-Type', 'text/javascript');
                res.end(js);
            }
        })
    }
    //Disponibilizar ruta /usuario POST (Requerimiento 1)
    if (req.url == '/usuario' && req.method == 'POST') {
        let body;
        req.on('data', (chunk) => {
            body = chunk.toString();
        });
        req.on('end', async () => {
            try {
                const datos = Object.values(JSON.parse(body));
                const result = await registroUsuario(datos);
                res.statusCode = 201;
                res.end(JSON.stringify(result))
            } catch (err) {
                res.statusCode = 500;
                res.end('Problema en el servidor => ', err);
            }
        });
    }
    //Disponibilizar ruta /login POST (Requerimiento 2)
    if (req.url == '/login' && req.method == 'POST') {
        let body;
        req.on('data', (chunk) => {
            body = chunk.toString();
        });
        req.on('end', async () => {
            try {
                const datos = Object.values(JSON.parse(body));
                const result = await loginUsuario(datos);
                console.log(result);
                res.statusCode = 201;
                res.end(JSON.stringify(result));
            } catch (err) {
                res.statusCode = 500;
                res.end('Problema en el servidor => ', err);
            }
        })
    }
    //Disponibilizar ruta /usuarios GET (Requerimiento 3)
    if (req.url == '/usuarios' && req.method == 'GET') {
        try {
            const usuarios = await getUsuarios();
            res.statusCode = 201;
            res.end(JSON.stringify(usuarios.rows));
        } catch (err) {
            res.statusCode = 500;
            res.end('Problema en el servidor => ', err);
        }
    }

}).listen(port, () => console.log(`Server on => ${port}`));