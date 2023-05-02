// Preload environmental variables in ES6
import _ from './env';
// Import for deployment
import "core-js/stable";
import "regenerator-runtime/runtime";

/*  Declaring npm modules */
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const schedule = require('node-schedule');
const cookieParser = require('cookie-parser');

// Configure express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

// Routes
// app.use('/api/auth/v1', authV1Routes);
// app.use('/api/leagues/v1', leagueV1Routes);
// app.use('/api/season/v1', seasonV1Routes);
// app.use('/api/tournament/v1', tournamentV1Routes);
// app.use('/api/profile/v1', profileV1Routes);
// app.use('/api/team/v1', teamV1Routes);
// app.use('/api/match/v1', matchV1Routes);
// app.use('/api/staff/v1', staffV1Routes);
// app.use('/api/service/v1', serviceV1Routes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}


// Task 2: Create PostgreSQL backups/snapshots once per week on Saturday


// Task 3: Update PostgreSQL Database from the backups once every month (on the 1st)


// Task 4: Update VersionList and ChampByIds from Ddragon once a week 
// (on Thursday @6pmEST since patch day is Wednesday)


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Stats server started on port ${port}`));
console.log((process.env.TEST_DB === 'false' || process.env.NODE_ENV === 'production') ?
  "Connected to DB Production endpoints!" :
  "Connected to DB Test endpoints."
);
