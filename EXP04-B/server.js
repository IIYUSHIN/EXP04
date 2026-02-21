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
        <div class="footer">
          Built for Full Stack Development Practical &bull; Semester 4
        </div>
      </div>
    </body>
    </html>
  `);
});

app.use("/api/cards", require("./routes/cardRoutes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
