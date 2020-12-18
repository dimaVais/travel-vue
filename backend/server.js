const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const path = require('path');

const devPort = 3002;
const app = express();
const http = require('http').createServer(app);

app.use(bodyParser.json());
app.use(cookieParser()),
app.use(session({
    secret: 'my secret yabadabadoo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

const travelRouts = require('./api/travel/travel.routes');
app.use('/api/travel', travelRouts );

const port = process.env.PORT || devPort;
app.get('/**', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

http.listen(port, () => {
    // console.log(`Example app listening at http://localhost:${port}`);
})

