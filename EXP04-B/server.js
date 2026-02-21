const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

// Load .env from the SAME folder as this server.js file
dotenv.config({ path: path.join(__dirname, ".env") });

// Connect to MongoDB Atlas
connectDB();

const app = express();
app.use(express.json());

// Root route — shows a beautiful API documentation page
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>EXP04-B | Playing Card Collection API</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          min-height: 100vh;
          color: #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .container {
          max-width: 700px;
          width: 100%;
          animation: fadeIn 0.8s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .badge {
          display: inline-block;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #fff;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        h1 {
          font-size: 2.2rem;
          font-weight: 700;
          background: linear-gradient(to right, #667eea, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }
        .subtitle {
          color: #9ca3af;
          font-size: 1rem;
          font-weight: 300;
        }
        .card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          transition: transform 0.2s, border-color 0.2s;
        }
        .card:hover {
          transform: translateY(-2px);
          border-color: rgba(102, 126, 234, 0.4);
        }
        .endpoint {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .endpoint:last-child { border-bottom: none; }
        .method {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          min-width: 55px;
          text-align: center;
        }
        .get { background: #065f46; color: #6ee7b7; }
        .post { background: #1e40af; color: #93c5fd; }
        .put { background: #92400e; color: #fcd34d; }
        .delete { background: #991b1b; color: #fca5a5; }
        .path {
          font-family: 'Courier New', monospace;
          color: #c4b5fd;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .desc {
          color: #9ca3af;
          font-size: 0.8rem;
          margin-left: auto;
        }
        .section-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 0.8rem;
        }
        .footer {
          text-align: center;
          color: #6b7280;
          font-size: 0.75rem;
          margin-top: 2rem;
        }
        .status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 0.8rem;
          color: #6ee7b7;
          margin-bottom: 1.5rem;
        }
        .dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="hero">
          <div class="badge">EXP04-B</div>
          <h1>Playing Card Collection API</h1>
          <p class="subtitle">RESTful API built with Express.js &amp; MongoDB Atlas</p>
          <br>
          <div class="status"><span class="dot"></span> Server Online</div>
        </div>
        <div class="card">
          <div class="section-title">API Endpoints</div>
          <div class="endpoint">
            <span class="method get">GET</span>
            <span class="path">/api/cards</span>
            <span class="desc">Get all cards</span>
          </div>
          <div class="endpoint">
            <span class="method get">GET</span>
            <span class="path">/api/cards/:id</span>
            <span class="desc">Get one card</span>
          </div>
          <div class="endpoint">
            <span class="method post">POST</span>
            <span class="path">/api/cards</span>
            <span class="desc">Create a card</span>
          </div>
          <div class="endpoint">
            <span class="method put">PUT</span>
            <span class="path">/api/cards/:id</span>
            <span class="desc">Update a card</span>
          </div>
          <div class="endpoint">
            <span class="method delete">DELETE</span>
            <span class="path">/api/cards/:id</span>
            <span class="desc">Delete a card</span>
          </div>
        </div>
        <div class="card">
          <div class="section-title">Tech Stack</div>
          <p style="color:#c4b5fd; font-size:0.9rem;">Node.js &bull; Express.js &bull; MongoDB Atlas &bull; Mongoose</p>
        </div>
        <div style="text-align:center; margin-top:1.5rem;">
          <a href="/view/cards" style="display:inline-block; background:linear-gradient(135deg,#667eea,#764ba2); color:#fff; padding:12px 28px; border-radius:50px; text-decoration:none; font-weight:600; font-size:0.9rem; transition:transform 0.2s,box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 8px 25px rgba(102,126,234,0.4)'" onmouseout="this.style.transform='';this.style.boxShadow=''">🃏 View Card Collection</a>
        </div>
        <div class="footer">
          Built for Full Stack Development Practical &bull; Semester 4
        </div>
      </div>
    </body>
    </html>
  `);
});
// Visual cards viewer — beautiful page to see all cards in the browser
app.get("/view/cards", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My Card Collection | EXP04-B</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          min-height: 100vh;
          color: #e0e0e0;
          padding: 2rem;
        }
        .header {
          text-align: center;
          margin-bottom: 2.5rem;
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .back-link {
          color: #667eea;
          text-decoration: none;
          font-size: 0.85rem;
          display: inline-block;
          margin-bottom: 1rem;
          transition: color 0.2s;
        }
        .back-link:hover { color: #a855f7; }
        h1 {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(to right, #667eea, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.3rem;
        }
        .count { color: #9ca3af; font-size: 0.9rem; }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.2rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .playing-card {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
          animation: cardIn 0.5s ease-out backwards;
          cursor: default;
        }
        .playing-card:hover {
          transform: translateY(-6px) scale(1.02);
          border-color: rgba(102,126,234,0.5);
          box-shadow: 0 12px 40px rgba(102,126,234,0.15);
        }
        .suit-symbol {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          filter: drop-shadow(0 0 8px currentColor);
        }
        .suit-red { color: #ef4444; }
        .suit-black { color: #e0e0e0; }
        .card-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #f3f4f6;
          margin-bottom: 0.3rem;
        }
        .card-details {
          font-size: 0.8rem;
          color: #9ca3af;
        }
        .card-value {
          position: absolute;
          top: 10px;
          left: 14px;
          font-size: 1.4rem;
          font-weight: 700;
          color: inherit;
        }
        .playing-card { position: relative; padding-top: 2.5rem; }
        .empty {
          text-align: center;
          color: #6b7280;
          font-size: 1.1rem;
          margin-top: 3rem;
        }
        .empty-icon { font-size: 3rem; margin-bottom: 1rem; }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <a href="/" class="back-link">← Back to API Docs</a>
        <h1>🃏 My Card Collection</h1>
        <p class="count" id="count">Loading...</p>
      </div>
      <div class="grid" id="grid"></div>
      <script>
        const suitSymbols = {
          'spades': '♠', 'hearts': '♥', 'diamonds': '♦', 'clubs': '♣'
        };
        async function loadCards() {
          try {
            const res = await fetch('/api/cards');
            const cards = await res.json();
            const countEl = document.getElementById('count');
            const gridEl = document.getElementById('grid');
            countEl.textContent = cards.length + ' card' + (cards.length !== 1 ? 's' : '') + ' in collection';
            if (cards.length === 0) {
              gridEl.innerHTML = '<div class="empty"><div class="empty-icon">📭</div>No cards yet!<br><small>Use POST /api/cards in Postman to add cards</small></div>';
              return;
            }
            gridEl.innerHTML = cards.map((card, i) => {
              const suit = (card.suit || '').toLowerCase();
              const symbol = suitSymbols[suit] || '🂠';
              const colorClass = (card.color || '').toLowerCase() === 'red' ? 'suit-red' : 'suit-black';
              return '<div class="playing-card" style="animation-delay:' + (i * 0.08) + 's">' +
                '<span class="card-value ' + colorClass + '">' + (card.value || '?') + '</span>' +
                '<div class="suit-symbol ' + colorClass + '">' + symbol + '</div>' +
                '<div class="card-name">' + (card.name || 'Unknown') + '</div>' +
                '<div class="card-details">' + (card.suit || '') + ' • ' + (card.color || '') + '</div>' +
              '</div>';
            }).join('');
          } catch(e) {
            document.getElementById('grid').innerHTML = '<div class="empty">Error loading cards</div>';
          }
        }
        loadCards();
      </script>
    </body>
    </html>
  `);
});

app.use("/api/cards", require("./routes/cardRoutes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
