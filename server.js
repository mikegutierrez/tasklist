const SERVER_PORT = process.env.PORT || 3000;
const path = require('path');
const favicon = require('serve-favicon');
const express = require('express');

const app = express();

app.use(favicon(path.join(__dirname, '/build/assets/images', 'favicon.ico')));

app.use('/build', express.static(path.join(__dirname, '/build/')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(SERVER_PORT, () => {
	console.log(`listening on port ${SERVER_PORT}`);
});
