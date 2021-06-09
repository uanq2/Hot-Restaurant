// Dependencies
const express = require('express');
const path = require('path');

// Sets up the Express App
const app = express();

// set initial port
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// database
const tables = [{
    customerName: 'Uriel', phoneNumber: '773-222-3333', customerEmail: 'dealta@aol.com', customerID: '12345'
},
{
    customerName: 'Sebastian', phoneNumber: '773-222-4444', customerEmail: 'sebas@aol.com', customerID: '12345'
}];

const waitList = [{
    customerName: 'Waiting', phoneNumber: '773-222-3333', customerEmail: 'dealta@aol.com', customerID: '12345'
}];

// Routes
// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/home.html'))
});

app.get('/tables', (req, res) => {
    res.sendFile(path.join(__dirname, './public/tables.html'))
});

app.get('/reservation', (req, res) => {
    res.sendFile(path.join(__dirname, './public/reservation.html'))
});

// get all tables
app.get('/api/tables', (req, res) => res.json(tables));

// get wait list tables
app.get('/api/waitlist', (req, res) => res.json(waitList));

app.post('/api/tables', (req, res) => {
    const newTable = req.body;
    console.log(newTable);
    if (tables.length < 5) {
        tables.push(newTable);
        res.json(true);
    } else {
        waitList.push(newTable);
        res.json(false);
    }
});

// clear out the data
app.post('/api/clear', (req, res) => {
    tables.length = 0;
    waitlist.length = 0;

    res.json({ ok: true });
});

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
