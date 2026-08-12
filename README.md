<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Smart Parking Prototype</title>
  <style>
    /* ==================== CSS STYLES ==================== */
    :root {
      --bg-dark: #0a0a0a;
      --bg-card: #141414;
      --bg-card-hover: #1f1f1f;
      --border-color: #2a2a2a;
      --text-primary: #ffffff;
      --text-secondary: #a0a0a0;
      --text-muted: #666666;
      --radius-sm: 6px;
      --radius-md: 12px;
      --radius-full: 9999px;
      --font-main: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-mono: "SF Mono", "Fira Code", monospace;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; font-family: var(--font-main); }

    body {
      background-color: #000000;
      color: var(--text-primary);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    /* Mobile Prototype Frame */
    .mobile-frame {
      width: 100%;
      max-width: 390px;
      height: 844px;
      background-color: var(--bg-dark);
      border: 1px solid var(--border-color);
      border-radius: 40px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(255, 255, 255, 0.05);
    }

    /* Status Bar */
    .status-bar {
      display: flex;
      justify-content: space-between;
      padding: 16px 24px 8px;
      font-size: 0.8rem;
      font-family: var(--font-mono);
      color: var(--text-secondary);
    }

    /* Main Screen Content */
    .screen-content {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header h1 {
      font-size: 1.4rem;
      font-weight: 700;
    }

    .tag-badge {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      padding: 4px 8px;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
    }

    .card {
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 16px;
    }

    .card-title {
      font-size: 0.95rem;
      font-weight: 600;
      margin-bottom: 6px;
    }

    .card-desc {
      font-size: 0.82rem;
      color: var(--text-secondary);
      line-height: 1.4;
    }

    /* Metrics Grid */
    .metric-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .metric-value {
      font-family: var(--font-mono);
      font-size: 1.5rem;
      font-weight: 700;
      margin-top: 4px;
    }

    .metric-label {
      font-size: 0.7rem;
      color: var(--text-muted);
      text-transform: uppercase;
    }

    /* Interactive Slot Matrix */
    .slot-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      margin-top: 10px;
    }

    .slot-card {
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      padding: 12px 8px;
      text-align: center;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .slot-card.available {
      border-color: #ffffff;
      background-color: #1a1a1a;
    }

    .slot-card.occupied {
      opacity: 0.3;
      border-color: #333333;
    }

    .slot-name {
      font-family: var(--font-mono);
      font-weight: bold;
      font-size: 0.9rem;
    }

    .slot-status {
      font-size: 0.65rem;
      color: var(--text-muted);
      margin-top: 4px;
      text-transform: uppercase;
    }

    .objective-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 6px;
    }

    .objective-list li {
      font-size: 0.8rem;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .objective-list li::before {
      content: "•";
      color: #ffffff;
    }

    /* Navigation Bar */
    .nav-bar {
      display: flex;
      justify-content: space-around;
      padding: 16px 0 24px;
      border-top: 1px solid var(--border-color);
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--text-muted);
    }

    .nav-item.active {
      color: var(--text-primary);
    }
  </style>
</head>
<body>

  <!-- Mobile Frame Container -->
  <div class="mobile-frame">
    
    <!-- Status Bar -->
    <header class="status-bar">
      <span>09:41</span>
      <span>PARK_PROTOTYPE</span>
    </header>

    <!-- Main Content -->
    <main class="screen-content">
      
      <div class="header">
        <h1>Smart Parking</h1>
        <span class="tag-badge">LIVE DEMO</span>
      </div>

      <!-- Problem Statement Card -->
      <section class="card">
        <h2 class="card-title">Problem Statement</h2>
        <p class="card-desc">
          Drivers waste time and fuel searching for open parking spots, leading to urban congestion and high carbon emissions.
        </p>
      </section>

      <!-- Dynamic Metrics -->
      <div class="metric-grid">
        <div class="card">
          <span class="metric-label">Open Slots</span>
          <div class="metric-value" id="avail-count">0/6</div>
        </div>
        <div class="card">
          <span class="metric-label">Time Saved</span>
          <div class="metric-value">~18m</div>
        </div>
      </div>

      <!-- Interactive Parking Slots -->
      <section class="card">
        <h2 class="card-title">Live Slot Matrix</h2>
        <p class="card-desc" style="font-size: 0.75rem;">Click any slot to toggle Availability / Reservation:</p>
        <div class="slot-grid" id="slot-grid">
          <!-- Slots rendering dynamically via JS -->
        </div>
      </section>

      <!-- Objectives -->
      <section class="card">
        <h2 class="card-title">Core Objectives</h2>
        <ul class="objective-list">
          <li>Real-time availability tracking</li>
          <li>Reduce fuel and time consumption</li>
          <li>Lower carbon footprint & traffic</li>
        </ul>
      </section>

    </main>

    <!-- Bottom Navigation -->
    <nav class="nav-bar">
      <span class="nav-item active">OVERVIEW</span>
      <span class="nav-item">SLOTS</span>
      <span class="nav-item">INFO</span>
    </nav>

  </div>

  <!-- JavaScript Prototype State Engine -->
  <script>
    // Prototype Mock Data
    const slots = [
      { id: 'A1', status: 'AVAILABLE' },
      { id: 'A2', status: 'OCCUPIED' },
      { id: 'A3', status: 'AVAILABLE' },
      { id: 'B1', status: 'AVAILABLE' },
      { id: 'B2', status: 'OCCUPIED' },
      { id: 'B3', status: 'AVAILABLE' }
    ];

    function renderSlots() {
      const grid = document.getElementById('slot-grid');
      grid.innerHTML = '';

      let availableCount = 0;

      slots.forEach((slot, index) => {
        if (slot.status === 'AVAILABLE') availableCount++;

        const div = document.createElement('div');
        const isAvail = slot.status === 'AVAILABLE';
        div.className = `slot-card ${isAvail ? 'available' : 'occupied'}`;
        div.innerHTML = `
          <div class="slot-name">${slot.id}</div>
          <div class="slot-status">${slot.status}</div>
        `;

        // Click interaction to toggle state
        div.onclick = () => {
          slots[index].status = isAvail ? 'OCCUPIED' : 'AVAILABLE';
          renderSlots();
        };

        grid.appendChild(div);
      });

      // Update Open Slots Count
      document.getElementById('avail-count').innerText = `${availableCount}/${slots.length}`;
    }

    // Initial render
    renderSlots();
  </script>
</body>
</html>
