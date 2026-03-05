// Express Application Setup — Configures middleware and mounts routes
// This file creates the Express app instance and connects the booking routes

const express = require("express");
const bookingRoutes = require("./modules/booking/booking.route");

// Create the Express application
const app = express();

// Middleware: Parse incoming JSON request bodies
// This allows req.body to contain the parsed JSON data from POST requests
app.use(express.json());

// Landing page
app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seat Booking — EXP04-C</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;450;500;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: #f8f6f1;
      color: #2c2825;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      font-size: 15px;
      line-height: 1.6;
    }

    .page {
      max-width: 560px;
      margin: 0 auto;
      padding: 72px 28px 56px;
    }

    .tag {
      display: inline-block;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.8px;
      color: #7a6e62;
      background: #eee9e0;
      padding: 5px 12px;
      border-radius: 6px;
      margin-bottom: 28px;
    }

    h1 {
      font-size: 1.65rem;
      font-weight: 600;
      line-height: 1.3;
      color: #1a1816;
      letter-spacing: -0.3px;
      margin-bottom: 12px;
    }

    .desc {
      font-size: 14.5px;
      color: #6b635a;
      font-weight: 400;
      line-height: 1.65;
      max-width: 440px;
      margin-bottom: 48px;
    }

    .desc strong {
      color: #3d3832;
      font-weight: 500;
    }

    .card {
      background: #fff;
      border-radius: 14px;
      padding: 32px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03);
      margin-bottom: 20px;
    }

    .card-label {
      font-size: 11.5px;
      font-weight: 500;
      letter-spacing: 0.5px;
      color: #9a928a;
      text-transform: uppercase;
      margin-bottom: 24px;
    }

    .screen-area {
      text-align: center;
      margin-bottom: 32px;
      padding-bottom: 28px;
      border-bottom: 1px solid #f0ece6;
    }

    .screen-line {
      width: 160px;
      height: 2px;
      background: #d9d2c8;
      border-radius: 1px;
      margin: 0 auto 6px;
    }

    .screen-hint {
      font-size: 10px;
      color: #b8b0a5;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    .seats {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 24px;
    }

    .seat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      transition: transform 0.15s ease;
    }

    .seat:hover { transform: translateY(-2px); }
    .seat.booked { cursor: default; }
    .seat.booked:hover { transform: none; }

    .seat-shape {
      width: 48px;
      height: 42px;
      border-radius: 8px 8px 3px 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.25s ease;
      position: relative;
    }

    .seat-shape::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 5px;
      right: 5px;
      height: 4px;
      border-radius: 0 0 3px 3px;
      transition: all 0.25s ease;
    }

    .seat.available .seat-shape {
      background: #e8f2eb;
      color: #3d7a52;
    }
    .seat.available .seat-shape::after {
      background: #d4e8da;
    }

    .seat.booked .seat-shape {
      background: #f5e8e6;
      color: #a85c52;
    }
    .seat.booked .seat-shape::after {
      background: #ebd7d3;
    }

    .seat-text {
      font-size: 10.5px;
      font-weight: 450;
      color: #a09890;
    }

    .seat.available .seat-text { color: #5a9a6e; }
    .seat.booked .seat-text { color: #b87a72; }

    .legend {
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    .legend span {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #9a928a;
    }

    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
    }

    .dot.g { background: #5a9a6e; }
    .dot.r { background: #b87a72; }

    .feedback {
      text-align: center;
      min-height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 4px;
    }

    .fb {
      font-size: 13px;
      font-weight: 450;
      padding: 7px 18px;
      border-radius: 8px;
      animation: show 0.25s ease;
    }

    .fb.ok { color: #3d7a52; background: #e8f2eb; }
    .fb.err { color: #a85c52; background: #f5e8e6; }

    @keyframes show {
      from { opacity: 0; transform: translateY(3px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .ep {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 11px 0;
    }

    .ep + .ep { border-top: 1px solid #f0ece6; }

    .m {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.8px;
      padding: 3px 7px;
      border-radius: 4px;
    }

    .m.get { color: #3d7a52; background: #e8f2eb; }
    .m.post { color: #8a6d3b; background: #f5eee0; }

    .ep code {
      font-family: 'SF Mono', 'Menlo', monospace;
      font-size: 12.5px;
      color: #3d3832;
    }

    .ep .info {
      font-size: 12px;
      color: #a09890;
      margin-left: auto;
    }

    .foot {
      display: flex;
      justify-content: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 36px;
    }

    .pill {
      font-size: 11px;
      color: #9a928a;
      padding: 4px 12px;
      background: #f0ece6;
      border-radius: 20px;
    }

    .copy {
      text-align: center;
      font-size: 11px;
      color: #bbb4aa;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="tag">EXP04-C</div>
    <h1>Distributed Seat Booking</h1>
    <p class="desc">
      A booking API that uses <strong>Redis distributed locks</strong> to
      prevent race conditions. Click any available seat below to book it
      through the live API.
    </p>

    <div class="card">
      <div class="card-label">Seat Map</div>
      <div class="screen-area">
        <div class="screen-line"></div>
        <div class="screen-hint">screen</div>
      </div>
      <div class="seats" id="seats"></div>
      <div class="legend">
        <span><i class="dot g"></i> Available</span>
        <span><i class="dot r"></i> Booked</span>
      </div>
      <div class="feedback" id="fb"></div>
    </div>

    <div class="card">
      <div class="card-label">Endpoints</div>
      <div class="ep">
        <span class="m get">GET</span>
        <code>/api/seats</code>
        <span class="info">All statuses</span>
      </div>
      <div class="ep">
        <span class="m post">POST</span>
        <code>/api/book/:seatId</code>
        <span class="info">Book a seat</span>
      </div>
    </div>

    <div class="foot">
      <span class="pill">Node.js</span>
      <span class="pill">Express</span>
      <span class="pill">Redis</span>
      <span class="pill">UUID</span>
    </div>
    <p class="copy">Full Stack Development &middot; Semester 4</p>
  </div>

  <script>
    var fbEl = document.getElementById('fb');
    var seEl = document.getElementById('seats');

    function msg(t, c) {
      fbEl.innerHTML = '<div class="fb ' + c + '">' + t + '</div>';
      setTimeout(function() { fbEl.innerHTML = ''; }, 3000);
    }

    function load() {
      fetch('/api/seats')
        .then(function(r) { return r.json(); })
        .then(function(d) {
          var html = '';
          var keys = Object.keys(d);
          for (var i = 0; i < keys.length; i++) {
            var id = keys[i];
            var st = d[id];
            html += '<div class="seat ' + st + '" onclick="book(' + id + ')">';
            html += '<div class="seat-shape">' + id + '</div>';
            html += '<span class="seat-text">' + (st === 'available' ? 'Open' : 'Taken') + '</span>';
            html += '</div>';
          }
          seEl.innerHTML = html;
        })
        .catch(function() {
          seEl.innerHTML = '<p style="color:#a09890;font-size:13px">Could not load seats</p>';
        });
    }

    function book(id) {
      fetch('/api/book/' + id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'visitor' })
      })
        .then(function(r) {
          return r.json().then(function(d) {
            msg(d.message, r.ok ? 'ok' : 'err');
            load();
          });
        })
        .catch(function() { msg('Connection error', 'err'); });
    }

    load();
  </script>
</body>
</html>`);
});

// Mount booking routes under /api prefix
// So POST /book/:seatId becomes POST /api/book/:seatId
app.use("/api", bookingRoutes);

module.exports = app;
