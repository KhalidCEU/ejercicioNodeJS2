const http = require('http');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json'));

function generatePassword(words, wordCount) {
    const password = [];

    while (password.length < wordCount) {
        const index = Math.floor(Math.random() * words.length);
        password.push(words[index]);
    }

    return password.join('-');
}

const server = http.createServer((req, res) => {
    const urlParams = new URL(req.url, `http://${req.headers.host}`).searchParams;
    const wordCount = parseInt(urlParams.get('wordCount'), 10) || 1;

    words = config.words;
    const password = generatePassword(words, wordCount);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Generated password: ${password}`);
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});