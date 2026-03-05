// Express Application Setup — Configures middleware and mounts routes
// This file creates the Express app instance and connects the booking routes

const express = require("express");
const bookingRoutes = require("./modules/booking/booking.route");

// Create the Express application
const app = express();

// Middleware: Parse incoming JSON request bodies
// This allows req.body to contain the parsed JSON data from POST requests
app.use(express.json());

// Landing page — elegant, craft-focused design
app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Distributed Seat Booking — EXP04-C</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Serif+Display&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --bg: #111113;
      --surface: #1a1a1f;
      --border: #2a2a30;
      --text: #e8e4de;
      --text-dim: #8a8680;
      --accent: #c9a96e;
      --available: #6b9e7a;
      --booked: #c47a7a;
      --locked: #c9a96e;
    }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }

    .page {
      max-width: 640px;
      margin: 0 auto;
      padding: 80px 24px 60px;
    }

    /* Header */
    .overline {
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--accent);
      font-weight: 500;
      margin-bottom: 20px;
    }

    h1 {
      font-family: 'DM Serif Display', serif;
      font-size: 2.6rem;
      font-weight: 400;
      line-height: 1.15;
      color: var(--text);
      margin-bottom: 16px;
    }

    .lead {
      font-size: 1.05rem;
      line-height: 1.7;
      color: var(--text-dim);
      font-weight: 300;
      max-width: 480px;
      margin-bottom: 56px;
    }

    .lead em {
      color: var(--text);
      font-style: italic;
    }

    /* Divider */
    .divider {
      height: 1px;
      background: var(--border);
      margin: 48px 0;
    }

    /* Seat Map */
    .section-label {
      font-size: 11px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-bottom: 32px;
    }

    .screen {
      text-align: center;
      margin-bottom: 40px;
    }

    .screen-bar {
      display: inline-block;
      width: 240px;
      height: 3px;
      background: linear-gradient(90deg, transparent, var(--accent), transparent);
      border-radius: 2px;
      opacity: 0.5;
    }

    .screen-text {
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--text-dim);
      margin-top: 8px;
      opacity: 0.5;
    }

    .seats-row {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-bottom: 36px;
    }

    .seat {
      width: 72px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .seat:hover { transform: translateY(-3px); }

    .seat-box {
      width: 52px;
      height: 48px;
      border-radius: 10px 10px 4px 4px;
      border: 1.5px solid var(--border);
      background: var(--surface);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'DM Serif Display', serif;
      font-size: 1.2rem;
      color: var(--text-dim);
      transition: all 0.3s ease;
      position: relative;
    }

    .seat-box::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 6px;
      right: 6px;
      height: 5px;
      background: var(--surface);
      border-radius: 0 0 4px 4px;
      border: 1.5px solid var(--border);
      border-top: none;
      transition: all 0.3s ease;
    }

    .seat.available .seat-box {
      border-color: var(--available);
      background: rgba(107, 158, 122, 0.08);
      color: var(--available);
    }
    .seat.available .seat-box::after {
      border-color: var(--available);
      background: rgba(107, 158, 122, 0.08);
    }

    .seat.booked .seat-box {
      border-color: var(--booked);
      background: rgba(196, 122, 122, 0.1);
      color: var(--booked);
    }
    .seat.booked .seat-box::after {
      border-color: var(--booked);
      background: rgba(196, 122, 122, 0.1);
    }
    .seat.booked { cursor: default; }
    .seat.booked:hover { transform: none; }

    .seat-label {
      font-size: 11px;
      color: var(--text-dim);
      letter-spacing: 0.5px;
    }

    .seat.available .seat-label { color: var(--available); }
    .seat.booked .seat-label { color: var(--booked); }

    /* Legend */
    .legend {
      display: flex;
      justify-content: center;
      gap: 28px;
      margin-bottom: 12px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 12px;
      color: var(--text-dim);
    }

    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .legend-dot.green { background: var(--available); }
    .legend-dot.red { background: var(--booked); }

    /* Feedback */
    .feedback {
      text-align: center;
      min-height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 8px;
    }

    .feedback-msg {
      font-size: 13px;
      padding: 8px 20px;
      border-radius: 8px;
      animation: feedIn 0.3s ease;
    }

    .feedback-msg.success {
      color: var(--available);
      background: rgba(107, 158, 122, 0.1);
      border: 1px solid rgba(107, 158, 122, 0.2);
    }

    .feedback-msg.error {
      color: var(--booked);
      background: rgba(196, 122, 122, 0.1);
      border: 1px solid rgba(196, 122, 122, 0.2);
    }

    @keyframes feedIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* API Section */
    .api-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px 28px;
    }

    .endpoint {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 0;
    }

    .endpoint + .endpoint {
      border-top: 1px solid var(--border);
    }

    .method {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 1px;
      padding: 3px 8px;
      border-radius: 4px;
      font-family: 'DM Sans', sans-serif;
    }

    .method.get {
      color: var(--available);
      background: rgba(107, 158, 122, 0.1);
    }

    .method.post {
      color: var(--accent);
      background: rgba(201, 169, 110, 0.1);
    }

    .path {
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 13px;
      color: var(--text);
    }

    .path-desc {
      font-size: 12px;
      color: var(--text-dim);
      margin-left: auto;
    }

    /* Footer */
    .footer {
      text-align: center;
      font-size: 12px;
      color: var(--text-dim);
      opacity: 0.5;
    }

    .footer span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .tech {
      display: flex;
      justify-content: center;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }

    .tech-tag {
      font-size: 11px;
      color: var(--text-dim);
      padding: 4px 12px;
      border: 1px solid var(--border);
      border-radius: 20px;
    }
  </style>
</head>
<body>
  <div class="page">
    <p class="overline">EXP04-C</p>
    <h1>Distributed Seat<br>Booking System</h1>
    <p class="lead">
      A concurrency-safe booking API that uses <em>Redis distributed locks</em>
      to prevent race conditions. Two users can never book the same seat.
    </p>

    <div class="section-label">Live Seat Map</div>

    <div class="screen">
      <div class="screen-bar"></div>
      <div class="screen-text">screen</div>
    </div>

    <div class="seats-row" id="seats">
      <!-- JS will render seats here -->
    </div>

    <div class="legend">
      <div class="legend-item"><span class="legend-dot green"></span> Available</div>
      <div class="legend-item"><span class="legend-dot red"></span> Booked</div>
    </div>

    <div class="feedback" id="feedback"></div>

    <div class="divider"></div>

    <div class="section-label">API</div>
    <div class="api-card">
      <div class="endpoint">
        <span class="method get">GET</span>
        <span class="path">/api/seats</span>
        <span class="path-desc">All seat statuses</span>
      </div>
      <div class="endpoint">
        <span class="method post">POST</span>
        <span class="path">/api/book/:seatId</span>
        <span class="path-desc">Book a seat</span>
      </div>
    </div>

    <div class="divider"></div>

    <div class="tech">
      <span class="tech-tag">Node.js</span>
      <span class="tech-tag">Express</span>
      <span class="tech-tag">Redis</span>
      <span class="tech-tag">UUID</span>
    </div>

    <div class="footer">
      <span>Full Stack Development &middot; Semester 4</span>
    </div>
  </div>

  <script>
    const feedbackEl = document.getElementById('feedback');
    const seatsEl = document.getElementById('seats');

    function showFeedback(msg, type) {
      feedbackEl.innerHTML = '<div class="feedback-msg ' + type + '">' + msg + '</div>';
      setTimeout(() => { feedbackEl.innerHTML = ''; }, 3500);
    }

    async function loadSeats() {
      try {
        const res = await fetch('/api/seats');
        const seats = await res.json();
        seatsEl.innerHTML = Object.entries(seats).map(([id, status]) => {
          return '<div class="seat ' + status + '" data-id="' + id + '" onclick="bookSeat(\\'' + id + '\\')">' +
            '<div class="seat-box">' + id + '</div>' +
            '<span class="seat-label">' + (status === 'available' ? 'Open' : 'Taken') + '</span>' +
          '</div>';
        }).join('');
      } catch(e) {
        seatsEl.innerHTML = '<p style="color:var(--text-dim);font-size:13px;">Could not load seats</p>';
      }
    }

    async function bookSeat(id) {
      const seat = document.querySelector('.seat[data-id="' + id + '"]');
      if (seat && seat.classList.contains('booked')) return;
      try {
        const res = await fetch('/api/book/' + id, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 'visitor' })
        });
        const data = await res.json();
        if (res.ok) {
          showFeedback('Seat ' + id + ' booked', 'success');
        } else {
          showFeedback(data.message, 'error');
        }
        loadSeats();
      } catch(e) {
        showFeedback('Connection error', 'error');
      }
    }

    loadSeats();
  </script>
</body>
</html>`);
});

// Mount booking routes under /api prefix
// So POST /book/:seatId becomes POST /api/book/:seatId
app.use("/api", bookingRoutes);

module.exports = app;
