// Cafeteria Mixer Application Logic

// Icons SVGs Definitions (Chai, Coffee, Juice)
const BREAK_ICONS = {
  chai: `<svg viewBox="0 0 24 24"><path d="M2,21H20V19H2V21M20,8H18V5H20V8M20,3H4v10A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13v-1h2A2,2 0 0,0 22,10V5A2,2 0 0,0 20,3M16,13A2,2 0 0,1 14,15H8A2,2 0 0,1 6,13V5H16V13Z" /></svg>`,
  coffee: `<svg viewBox="0 0 24 24"><path d="M2,21H20V19H2V21M20,8H18V5H20V8M20,3H4v10A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13v-1h2A2,2 0 0,0 22,10V5A2,2 0 0,0 20,3M16,13A2,2 0 0,1 14,15H8A2,2 0 0,1 6,13V5H16V13Z" /></svg>`, // Fallback or coffee cup
  juice: `<svg viewBox="0 0 24 24"><path d="M7.5,2H16.5L19,8H5L7.5,2M6.4,10H17.6L19,20H5L6.4,10M12,11A2,2 0 0,0 10,13A2,2 0 0,0 12,15A2,2 0 0,0 14,13A2,2 0 0,0 12,11Z" /></svg>`
};

const ICON_KEYS = ['chai', 'coffee', 'juice'];
const ICON_LABELS = {
  chai: 'Chai Break ☕',
  coffee: 'Coffee Break ☕',
  juice: 'Juice Break 🍹'
};

const COOL_TEAM_NAMES = [
  "Chai Yapping Session ☕",
  "Espresso Depresso ☕",
  "The Tea Spill 🍵",
  "Main Character Mugs 💅",
  "Vibe Check Cafe ✨",
  "Caffeine & Chaos ⚡",
  "No Cap Cappuccino ☕",
  "Brainrot Break 🧠",
  "Corporate Yappers 🗣️",
  "Era of Espresso 🕰️",
  "Sipping & Judging 👀",
  "Emotional Support Chai ☕",
  "Boba & Besties 🧋",
  "Plot Armor Coffee 🛡️",
  "Rial Tea 💅",
  "Chai-ing Our Best 🥺",
  "Quiet Quitting Cafe 🤫",
  "Delulu Juice 🍹",
  "Aura Boosters 📈",
  "Certified Brews 📜",
  "CEO of Tea Breaks 👑",
  "High Key Hydrated 💦"
];

let GATHERING_POINTS = [
  "Suda Suda ☕",
  "Ponnus Cafe 🍽️",
  "Rasoi 🍛",
  "Tea leaf 🍃"
];

// Application State
let employees = [];
let groups = [];
let currentTheme = 'light';

const FUNNY_EXCUSES = [
  "Excuse of the day: 'My emotional support code just crashed, I must comfort it.' 🥺",
  "Excuse of the day: 'Sorry, I'm currently sharing a single critical braincell with my compiler.' 🧠",
  "Excuse of the day: 'My social battery is at 2% and charging is currently suspended by IT.' 🔋",
  "Excuse of the day: 'I'm in a committed relationship with this bug. We need space.' 🐛",
  "Excuse of the day: 'Calendar invite said \"Deep Staring at Spreadsheet\" and I respect my blocks.' 📊",
  "Excuse of the day: 'I'm experiencing an unplanned introversion update. Estimated time remaining: 2 hours.' ⏳",
  "Excuse of the day: 'My plants need me to explain this architecture diagram to them.' 🌿",
  "Excuse of the day: 'Busy gaslighting myself into thinking this compile will succeed on the first try.' 🕯️",
  "Excuse of the day: 'Sorry, I've hit my social quota for the fiscal quarter.' 📈"
];

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const tabBoard = document.getElementById('tab-board');
const tabDirectory = document.getElementById('tab-directory');
const sectionBoard = document.getElementById('section-board');
const sectionDirectory = document.getElementById('section-directory');

const sheetUrlInput = document.getElementById('sheet-url');
const loadSheetBtn = document.getElementById('load-sheet-btn');
const loadSampleBtn = document.getElementById('load-sample-btn');
const clearDataBtn = document.getElementById('clear-data-btn');

const minGroupSizeInput = document.getElementById('min-group-size');
const maxGroupSizeInput = document.getElementById('max-group-size');
const generateBtn = document.getElementById('generate-btn');

const bgFileInput = document.getElementById('bg-file-input');
const clearBgBtn = document.getElementById('clear-bg-btn');
const presentationCanvas = document.getElementById('presentation-canvas');
const groupsGrid = document.getElementById('groups-grid');
const groupStatPill = document.getElementById('group-stat-pill');
const exportImageBtn = document.getElementById('export-image-btn');

const empCountSpan = document.getElementById('emp-count');
const addEmployeeBtn = document.getElementById('add-employee-btn');
const employeeTableBody = document.getElementById('employee-table-body');
const loadingOverlay = document.getElementById('loading-overlay');

// Initialize App
window.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  loadSettingsFromLocalStorage();
  updateFunnyExcuse();
  if (employees.length === 0) {
    loadSampleData(); // Load sample data if none stored
  }
});

// Event Listeners setup
function setupEventListeners() {
  // Theme toggle (Cozy Light vs Dark Cafe)
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    saveSettingsToLocalStorage();
  });

  // Navigation Tabs
  tabBoard.addEventListener('click', () => {
    switchTab('board');
  });
  tabDirectory.addEventListener('click', () => {
    switchTab('directory');
  });

  // Loader Actions
  loadSheetBtn.addEventListener('click', loadFromGoogleSheet);
  loadSampleBtn.addEventListener('click', loadSampleData);
  clearDataBtn.addEventListener('click', clearAllEmployees);
  addEmployeeBtn.addEventListener('click', createNewEmployeeRow);

  // Settings inputs
  minGroupSizeInput.addEventListener('change', saveSettingsToLocalStorage);
  maxGroupSizeInput.addEventListener('change', saveSettingsToLocalStorage);
  sheetUrlInput.addEventListener('input', saveSettingsToLocalStorage);

  // Grouping Engine Action
  generateBtn.addEventListener('click', () => {
    mixAndGenerateTeams();
    switchTab('board');
  });

  // Canvas Customizations
  bgFileInput.addEventListener('change', handleBackgroundUpload);
  clearBgBtn.addEventListener('click', removeBackgroundImage);

  // Image Export Action
  exportImageBtn.addEventListener('click', exportToImage);
}

// Tabs Switcher
function switchTab(target) {
  if (target === 'board') {
    tabBoard.classList.add('active');
    tabDirectory.classList.remove('active');
    sectionBoard.style.display = 'block';
    sectionDirectory.style.display = 'none';
  } else {
    tabBoard.classList.remove('active');
    tabDirectory.classList.add('active');
    sectionBoard.style.display = 'none';
    sectionDirectory.style.display = 'block';
  }
}

// CSV Parser Helper
function parseCSV(text) {
  const lines = [];
  let row = [""];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i+1];
    
    if (c === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push("");
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') {
        i++;
      }
      lines.push(row);
      row = [""];
    } else {
      row[row.length - 1] += c;
    }
  }
  if (row.length > 1 || row[0] !== "") {
    lines.push(row);
  }
  return lines;
}

// Convert CSV rows to employee objects
function processLoadedCSV(rows) {
  if (rows.length < 2) return;

  // Check if data contains HTML/script tags (e.g. user pasted Google Drive preview link instead of raw CSV export link)
  const sampleText = rows.slice(0, 3).map(r => r.join(' ')).join(' ');
  if (sampleText.includes('<!DOCTYPE') || sampleText.includes('<html') || sampleText.includes('<script') || sampleText.includes('WIZ_global_data')) {
    alert("Error: The source link returned an HTML page (like a Google Drive view page) instead of raw CSV. Please follow the instructions to 'Publish to web' as 'Comma-separated values (.csv)'.");
    return;
  }
  
  // Try to find headers: Name, Gender, Department, and Gathering/Meeting/Grouping points
  const header = rows[0].map(h => h.trim().toLowerCase());
  const nameIdx = header.findIndex(h => h.includes('name'));
  const genderIdx = header.findIndex(h => h.includes('gender') || h.includes('sex'));
  const deptIdx = header.findIndex(h => h.includes('department') || h.includes('team') || h.includes('dept'));
  const spotIdx = header.findIndex(h => 
    h.includes('gathering') || 
    h.includes('meeting') || 
    h.includes('location') || 
    h.includes('spot') || 
    h.includes('grouping') ||
    h.includes('venue') ||
    h.includes('pantry') ||
    h.includes('place') ||
    h.includes('cafe') ||
    h.includes('destination') ||
    h.includes('point') ||
    h.includes('room') ||
    h.includes('area')
  );
  
  // If headers not matching perfectly, use columns 0, 1, 2 as fallback
  const mapIdx = {
    name: nameIdx !== -1 ? nameIdx : 0,
    gender: genderIdx !== -1 ? genderIdx : 1,
    dept: deptIdx !== -1 ? deptIdx : 2
  };

  const parsedSpots = new Set();
  const newEmployees = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 2) continue;

    // Extract gathering spot if present in sheet row (even if name/gender/dept are blank)
    if (spotIdx !== -1 && row[spotIdx]) {
      const spot = row[spotIdx].trim();
      if (spot) parsedSpots.add(spot);
    }

    if (!row[mapIdx.name]) continue;

    const name = row[mapIdx.name].trim();
    let gender = (row[mapIdx.gender] || '').trim().toLowerCase();
    
    // Normalize gender values
    if (gender.startsWith('f')) gender = 'Female';
    else if (gender.startsWith('m')) gender = 'Male';
    else gender = 'Other';

    const dept = (row[mapIdx.dept] || 'General').trim();

    newEmployees.push({
      id: generateUUID(),
      name,
      gender,
      department: dept
    });
  }

  if (parsedSpots.size > 0) {
    GATHERING_POINTS = Array.from(parsedSpots);
  }

  if (newEmployees.length > 0) {
    employees = newEmployees;
    renderEmployeeTable();
    updateEmployeeCountBadge();
    
    const spotInfo = parsedSpots.size > 0 
      ? `<br><span style="font-size: 0.9rem; color: var(--accent); font-weight: 600;">📍 Loaded ${parsedSpots.size} meeting spots: ${Array.from(parsedSpots).join(', ')}</span>`
      : `<br><span style="font-size: 0.85rem; color: var(--text-muted);">No custom meeting spots found in sheet. Using defaults.</span>`;

    groupsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem; font-weight: 600;">Data Loaded (${employees.length} Employees)</p>
        <p>Set settings and click <strong>"Mix Employees"</strong> to build tea break groups.</p>
        ${spotInfo}
      </div>
    `;
    groupStatPill.textContent = "0 Groups Generated";
    saveSettingsToLocalStorage();
  }
}

// Fetch published CSV from Google Sheet
async function loadFromGoogleSheet() {
  const url = sheetUrlInput.value.trim();
  if (!url) {
    alert("Please enter a Google Sheets published CSV URL.");
    return;
  }

  showLoader(true);
  try {
    // Append timestamp to bypass browser and CDN cache
    const cacheBusterUrl = url.includes('?') 
      ? `${url}&t=${Date.now()}` 
      : `${url}?t=${Date.now()}`;

    const response = await fetch(cacheBusterUrl);
    if (!response.ok) throw new Error("Network error loading sheet. Make sure the URL is correct and published publicly.");
    const data = await response.text();
    const parsed = parseCSV(data);
    processLoadedCSV(parsed);
  } catch (error) {
    console.error(error);
    alert("Failed to load Google Sheet. Ensure it is published as CSV and accessible.");
  } finally {
    showLoader(false);
  }
}

// Load default sample data
async function loadSampleData() {
  showLoader(true);
  try {
    const response = await fetch('./employees_sample.csv?t=' + Date.now());
    if (!response.ok) throw new Error("Could not load local sample data.");
    const text = await response.text();
    const parsed = parseCSV(text);
    processLoadedCSV(parsed);
  } catch (error) {
    console.error(error);
  } finally {
    showLoader(false);
  }
}

// Clear employee lists
function clearAllEmployees() {
  employees = [];
  groups = [];
  renderEmployeeTable();
  updateEmployeeCountBadge();
  groupsGrid.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
      <p style="font-size: 1.2rem; margin-bottom: 0.5rem; font-weight: 600;">No Employees Available</p>
      <p>Please load or add employees to start mixing break teams.</p>
    </div>
  `;
  groupStatPill.textContent = "0 Groups Generated";
  saveSettingsToLocalStorage();
}

// UUID helper
function generateUUID() {
  return 'emp-' + Math.random().toString(36).substr(2, 9);
}

// Returns a deterministic inline-SVG data URI — generic person silhouette.
// Completely offline, no external API, no cultural features.
// Background shade varies per name so each card looks visually distinct.
function getAvatarUrl(name, gender) {
  // Stable hash from name for background shade selection
  let hash = 0;
  const str = (name || 'user').toLowerCase();
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  const shade = Math.abs(hash) % 5;

  // Soft pastel background palettes per gender
  const palettes = {
    Male:   { bgs: ['#DBEAFE','#BFDBFE','#BAE6FD','#E0E7FF','#CFFAFE'], figure: '#3B82F6' },
    Female: { bgs: ['#FCE7F3','#FBCFE8','#FEE2E2','#FED7AA','#FDE68A'], figure: '#EC4899' },
    Other:  { bgs: ['#EDE9FE','#DDD6FE','#F3E8FF','#FDF4FF','#E0F2FE'], figure: '#8B5CF6' }
  };

  const p = palettes[gender] || palettes.Other;
  const bg = p.bgs[shade];
  const fg = p.figure;

  // Female → dress/skirt silhouette  |  Male/Other → rounded-shoulder silhouette
  const body = gender === 'Female'
    ? `<path d='M24 37 L19 55 L45 55 L40 37 Q32 44 24 37Z' fill='${fg}'/>`
    : `<path d='M14 56 C14 43 22 37 32 37 C42 37 50 43 50 56' fill='${fg}'/>`;

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>`
    + `<circle cx='32' cy='32' r='32' fill='${bg}'/>`
    + `<circle cx='32' cy='21' r='11' fill='${fg}'/>`
    + body
    + `</svg>`;

  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

// Update Employee Count in header
function updateEmployeeCountBadge() {
  empCountSpan.textContent = employees.length;
}

// Render the Editable Employee Grid
function renderEmployeeTable() {
  employeeTableBody.innerHTML = '';
  employees.forEach(emp => {
    const tr = document.createElement('tr');
    tr.dataset.id = emp.id;
    
    tr.innerHTML = `
      <td><div class="editable-cell" contenteditable="true" data-field="name">${escapeHTML(emp.name)}</div></td>
      <td>
        <select class="gender-select" style="padding: 0.25rem 0.5rem; font-size: 0.9rem;">
          <option value="Male" ${emp.gender === 'Male' ? 'selected' : ''}>Male</option>
          <option value="Female" ${emp.gender === 'Female' ? 'selected' : ''}>Female</option>
          <option value="Other" ${emp.gender === 'Other' ? 'selected' : ''}>Other</option>
        </select>
      </td>
      <td><div class="editable-cell" contenteditable="true" data-field="department">${escapeHTML(emp.department)}</div></td>
      <td style="text-align: center;">
        <button class="btn btn-danger btn-sm delete-row-btn" title="Delete employee">Delete</button>
      </td>
    `;
    
    // Listen for inline edits
    const nameCell = tr.querySelector('[data-field="name"]');
    const deptCell = tr.querySelector('[data-field="department"]');
    const genderSelect = tr.querySelector('.gender-select');
    const deleteBtn = tr.querySelector('.delete-row-btn');

    const updateValue = (field, cell) => {
      const val = cell.textContent.trim();
      const targetEmp = employees.find(e => e.id === emp.id);
      if (targetEmp) {
        targetEmp[field] = val;
        saveSettingsToLocalStorage();
      }
    };

    nameCell.addEventListener('blur', () => updateValue('name', nameCell));
    deptCell.addEventListener('blur', () => updateValue('department', deptCell));
    genderSelect.addEventListener('change', () => {
      const targetEmp = employees.find(e => e.id === emp.id);
      if (targetEmp) {
        targetEmp.gender = genderSelect.value;
        saveSettingsToLocalStorage();
      }
    });

    deleteBtn.addEventListener('click', () => {
      employees = employees.filter(e => e.id !== emp.id);
      tr.remove();
      updateEmployeeCountBadge();
      saveSettingsToLocalStorage();
    });

    employeeTableBody.appendChild(tr);
  });
}

// Add a single employee row manually
function createNewEmployeeRow() {
  const newEmp = {
    id: generateUUID(),
    name: 'New Employee',
    gender: 'Female',
    department: 'Engineering'
  };
  employees.push(newEmp);
  renderEmployeeTable();
  updateEmployeeCountBadge();
  saveSettingsToLocalStorage();
  
  // Highlight and focus name of the newly added employee
  setTimeout(() => {
    const row = employeeTableBody.querySelector(`[data-id="${newEmp.id}"]`);
    if (row) {
      const nameCell = row.querySelector('[data-field="name"]');
      nameCell.focus();
      // Select all text in cell
      const range = document.createRange();
      range.selectNodeContents(nameCell);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, 50);
}

// Generate meeting time slots and gather points
function generateTimeSlots(numGroups) {
  if (numGroups <= 0) return [];
  if (numGroups === 1) {
    return ["4:00 PM"];
  }
  
  const startHour = 16; // 4:00 PM
  const startMin = 0;
  const totalMinutes = 90; // 4:00 PM to 5:30 PM
  
  // Determine slot interval in minutes
  let rawInterval = totalMinutes / (numGroups - 1);
  
  // Round rawInterval to nearest 5 minutes, minimum 5
  let interval = Math.max(5, Math.round(rawInterval / 5) * 5);
  
  const slots = [];
  for (let i = 0; i < numGroups; i++) {
    let totalMins = i * interval;
    if (totalMins > totalMinutes) {
      totalMins = totalMinutes;
    }
    const currentTotalMin = startMin + totalMins;
    const hour = startHour + Math.floor(currentTotalMin / 60);
    const min = currentTotalMin % 60;
    
    // Format to 12-hour AM/PM format
    const hour12 = hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedMin = min < 10 ? '0' + min : min;
    
    slots.push(`${hour12}:${formattedMin} ${ampm}`);
  }
  return slots;
}

// Group Optimizer and Solver Engine
function mixAndGenerateTeams() {
  if (employees.length === 0) {
    alert("Please add or load employees first.");
    return;
  }

  const minSize = parseInt(minGroupSizeInput.value) || 2;
  const maxSize = parseInt(maxGroupSizeInput.value) || 6;

  if (minSize < 1 || maxSize < minSize) {
    alert("Invalid group size parameters. Max size must be greater than or equal to min size.");
    return;
  }

  const totalEmp = employees.length;
  
  // Determine number of groups G
  // G must satisfy: G * minSize <= totalEmp <= G * maxSize
  // Find G that minimizes group size variance and keeps group sizes balanced.
  let validG = [];
  for (let g = 1; g <= totalEmp; g++) {
    if (g * minSize <= totalEmp && totalEmp <= g * maxSize) {
      validG.push(g);
    }
  }

  if (validG.length === 0) {
    alert(`Cannot create groups of size ${minSize}-${maxSize} with ${totalEmp} employees. Try broadening the group limits.`);
    return;
  }

  // Choose the optimal G (closest to average target size)
  const targetSize = Math.round((minSize + maxSize) / 2);
  let bestG = validG[0];
  let minDiff = Math.abs((totalEmp / bestG) - targetSize);

  for (let i = 1; i < validG.length; i++) {
    const diff = Math.abs((totalEmp / validG[i]) - targetSize);
    if (diff < minDiff) {
      minDiff = diff;
      bestG = validG[i];
    }
  }

  const numGroups = bestG;
  
  // Shuffle cool team names and select/cycle them
  const shuffledNames = [...COOL_TEAM_NAMES].sort(() => Math.random() - 0.5);

  // Generate meeting time slots and gather points
  const times = generateTimeSlots(numGroups);
  const shuffledTimes = [...times].sort(() => Math.random() - 0.5);
  const shuffledPoints = [...GATHERING_POINTS].sort(() => Math.random() - 0.5);

  // Create numGroups groups
  const localGroups = Array.from({ length: numGroups }, (_, i) => {
    const name = shuffledNames[i % shuffledNames.length];
    return {
      id: `group-${i + 1}`,
      name: name,
      iconKey: ICON_KEYS[i % ICON_KEYS.length], // distribute initial icons
      members: [],
      gatheringPoint: shuffledPoints[i % shuffledPoints.length],
      timeSlot: shuffledTimes[i]
    };
  });

  // Initial distribution: distribute employees randomly but unevenly
  const shuffledEmployees = [...employees].sort(() => Math.random() - 0.5);
  
  // 1. Give each group its minSize members first
  let empIdx = 0;
  localGroups.forEach(grp => {
    for (let s = 0; s < minSize; s++) {
      if (empIdx < shuffledEmployees.length) {
        grp.members.push(shuffledEmployees[empIdx++]);
      }
    }
  });

  // 2. Distribute the rest randomly to groups that are below maxSize
  while (empIdx < shuffledEmployees.length) {
    const eligibleGroups = localGroups.filter(g => g.members.length < maxSize);
    if (eligibleGroups.length === 0) break;

    const randomGrp = eligibleGroups[Math.floor(Math.random() * eligibleGroups.length)];
    randomGrp.members.push(shuffledEmployees[empIdx++]);
  }

  // Optimization: simulated annealing/iterative swap/move optimizer
  // Penalty Scoring:
  // Penalty for same department: 15 per same-department pair inside a group
  // Penalty for single gender: 20 per group containing >1 person with only 1 gender (if mixed is possible)
  // Penalty for size deviation: 100 for size outside [minSize, maxSize]
  
  function getPenaltyScore(grps) {
    let score = 0;
    
    grps.forEach(g => {
      const size = g.members.length;
      if (size < minSize || size > maxSize) {
        score += 100 * Math.abs(size - (size < minSize ? minSize : maxSize));
      }

      // Department balance
      const depts = g.members.map(m => m.department);
      const deptCounts = {};
      depts.forEach(d => {
        deptCounts[d] = (deptCounts[d] || 0) + 1;
      });
      Object.values(deptCounts).forEach(c => {
        if (c > 1) {
          score += 15 * (c - 1); // penalize overlaps
        }
      });

      // Gender balance
      if (size > 1) {
        const genders = g.members.map(m => m.gender);
        const uniqueGenders = new Set(genders);
        // If the group is purely one gender, but general pool has both male and female
        const hasMalesInPool = employees.some(e => e.gender === 'Male');
        const hasFemalesInPool = employees.some(e => e.gender === 'Female');
        if (uniqueGenders.size === 1 && hasMalesInPool && hasFemalesInPool) {
          score += 25;
        }
      }
    });

    return score;
  }

  let currentScore = getPenaltyScore(localGroups);
  const maxIterations = 3000;

  for (let iter = 0; iter < maxIterations; iter++) {
    // Pick two random groups
    const g1Idx = Math.floor(Math.random() * numGroups);
    let g2Idx = Math.floor(Math.random() * numGroups);
    if (g1Idx === g2Idx) continue;

    const g1 = localGroups[g1Idx];
    const g2 = localGroups[g2Idx];

    // 40% chance to move a member, 60% chance to swap
    const isMove = Math.random() < 0.4;

    if (isMove) {
      if (g1.members.length === 0) continue;
      
      const mIdx = Math.floor(Math.random() * g1.members.length);
      const member = g1.members[mIdx];
      
      g1.members.splice(mIdx, 1);
      g2.members.push(member);
      
      const newScore = getPenaltyScore(localGroups);
      if (newScore < currentScore || (newScore === currentScore && Math.random() < 0.1)) {
        currentScore = newScore;
      } else {
        // Revert move
        g2.members.pop();
        g1.members.push(member);
      }
    } else {
      if (g1.members.length === 0 || g2.members.length === 0) continue;
      
      // Pick a random employee from each group
      const m1Idx = Math.floor(Math.random() * g1.members.length);
      const m2Idx = Math.floor(Math.random() * g2.members.length);

      // Swap members temporarily
      const temp = g1.members[m1Idx];
      g1.members[m1Idx] = g2.members[m2Idx];
      g2.members[m2Idx] = temp;

      const newScore = getPenaltyScore(localGroups);
      if (newScore < currentScore || (newScore === currentScore && Math.random() < 0.1)) {
        currentScore = newScore;
      } else {
        // Revert swap
        const revertTemp = g1.members[m1Idx];
        g1.members[m1Idx] = g2.members[m2Idx];
        g2.members[m2Idx] = revertTemp;
      }
    }
  }

  groups = localGroups;
  renderGroupsGrid();
  updateFunnyExcuse();
  saveSettingsToLocalStorage();
}

// Render generated Groups Grid on the visual board
function renderGroupsGrid() {
  groupsGrid.innerHTML = '';
  
  if (groups.length === 0) {
    groupsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem; font-weight: 600;">No Groups Mixed Yet</p>
        <p>Load some employees in the sidebar and click <strong>"Mix Employees"</strong> to create break groupings!</p>
      </div>
    `;
    groupStatPill.textContent = "0 Groups Generated";
    return;
  }

  groupStatPill.textContent = `${groups.length} Groups Generated`;

  groups.forEach(g => {
    const card = document.createElement('div');
    card.classList.add('group-card');
    card.dataset.id = g.id;

    // Drop Target listeners on group card
    card.addEventListener('dragover', (e) => {
      const draggedSourceGroupId = localStorage.getItem('dragged_source_group_id');
      
      // Allow drop only if target has less than 5 members AND we are not dropping in the same group
      if (g.members.length < 5 && draggedSourceGroupId !== g.id) {
        e.preventDefault(); // Allows drop
        card.classList.add('drag-hover');
      }
    });

    card.addEventListener('dragleave', () => {
      card.classList.remove('drag-hover');
    });

    card.addEventListener('drop', (e) => {
      card.classList.remove('drag-hover');
      
      const empId = e.dataTransfer.getData('text/plain') || localStorage.getItem('dragged_emp_id');
      const sourceGroupId = localStorage.getItem('dragged_source_group_id');
      
      if (!empId || !sourceGroupId || sourceGroupId === g.id) return;
      if (g.members.length >= 5) return; // Drop constraint: max 5 members

      const sourceGroup = groups.find(grp => grp.id === sourceGroupId);
      if (!sourceGroup) return;

      const empIndex = sourceGroup.members.findIndex(m => m.id === empId);
      if (empIndex === -1) return;

      const [member] = sourceGroup.members.splice(empIndex, 1);
      g.members.push(member);

      // Re-render and persist
      renderGroupsGrid();
      saveSettingsToLocalStorage();
    });

    const membersHtml = g.members.map(m => {
      let avatarClass = 'avatar-other';
      if (m.gender === 'Male') avatarClass = 'avatar-male';
      if (m.gender === 'Female') avatarClass = 'avatar-female';

      const avatarUrl = getAvatarUrl(m.name, m.gender);

      return `
        <div class="member-row" draggable="true" data-emp-id="${m.id}" data-group-id="${g.id}">
          <div class="member-info">
            <img
              class="member-avatar ${avatarClass}"
              src="${avatarUrl}"
              alt="${escapeHTML(m.name)}"
            />
            <span class="member-name">${escapeHTML(m.name)}</span>
          </div>
        </div>
      `;
    }).join('');

    card.innerHTML = `
      <div class="group-card-header">
        <div class="group-title-wrap">
          <span class="group-title">${escapeHTML(g.name)}</span>
        </div>
        <div class="group-theme-icon" title="Click to cycle theme icon">
          ${BREAK_ICONS[g.iconKey]}
        </div>
      </div>
      
      <!-- Group Meeting Details -->
      <div class="group-meeting-info">
        <div class="meeting-detail">
          <svg class="meeting-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
          </svg>
          <span class="meeting-text editable-meeting-field" contenteditable="true" data-field="timeSlot">${escapeHTML(g.timeSlot || '4:00 PM')}</span>
        </div>
        <div class="meeting-detail">
          <svg class="meeting-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
          </svg>
          <span class="meeting-text editable-meeting-field" contenteditable="true" data-field="gatheringPoint">${escapeHTML(g.gatheringPoint || 'Cafeteria Area A ☕')}</span>
        </div>
      </div>

      <div class="group-members">
        ${membersHtml}
      </div>
    `;

    // Listen for meeting details inline edits
    const timeEdit = card.querySelector('[data-field="timeSlot"]');
    const locationEdit = card.querySelector('[data-field="gatheringPoint"]');

    const updateGroupValue = (field, cell) => {
      const val = cell.textContent.trim();
      const targetGroup = groups.find(grp => grp.id === g.id);
      if (targetGroup) {
        targetGroup[field] = val;
        saveSettingsToLocalStorage();
      }
    };

    const preventLineBreak = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.target.blur();
      }
    };

    timeEdit.addEventListener('blur', () => updateGroupValue('timeSlot', timeEdit));
    timeEdit.addEventListener('keydown', preventLineBreak);

    locationEdit.addEventListener('blur', () => updateGroupValue('gatheringPoint', locationEdit));
    locationEdit.addEventListener('keydown', preventLineBreak);

    // Attach dragstart and dragend listeners to row elements
    const rows = card.querySelectorAll('.member-row');
    rows.forEach(row => {
      row.addEventListener('dragstart', (e) => {
        const empId = row.dataset.empId;
        const groupId = row.dataset.groupId;
        e.dataTransfer.setData('text/plain', empId);
        
        localStorage.setItem('dragged_emp_id', empId);
        localStorage.setItem('dragged_source_group_id', groupId);
        
        row.classList.add('dragging');
      });

      row.addEventListener('dragend', () => {
        row.classList.remove('dragging');
        localStorage.removeItem('dragged_emp_id');
        localStorage.removeItem('dragged_source_group_id');
      });
    });

    // Add click event on group-theme-icon to cycle
    const iconBtn = card.querySelector('.group-theme-icon');
    
    iconBtn.addEventListener('click', () => {
      // Find current index
      const currIdx = ICON_KEYS.indexOf(g.iconKey);
      const nextIdx = (currIdx + 1) % ICON_KEYS.length;
      g.iconKey = ICON_KEYS[nextIdx];
      
      // Update DOM directly
      iconBtn.innerHTML = BREAK_ICONS[g.iconKey];
      saveSettingsToLocalStorage();
    });

    groupsGrid.appendChild(card);
  });
}

// Background image handler
function handleBackgroundUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const dataUrl = event.target.result;
    presentationCanvas.style.backgroundImage = `url('${dataUrl}')`;
    presentationCanvas.classList.add('has-bg');
    clearBgBtn.style.display = 'inline-flex';
    
    try {
      localStorage.setItem('mixer_bg', dataUrl);
    } catch (err) {
      console.warn("Background image too large to save to localStorage settings.");
    }
  };
  reader.readAsDataURL(file);
}

function removeBackgroundImage() {
  presentationCanvas.style.backgroundImage = '';
  presentationCanvas.classList.remove('has-bg');
  clearBgBtn.style.display = 'none';
  bgFileInput.value = '';
  localStorage.removeItem('mixer_bg');
}

// Export presentation view to image format
function exportToImage() {
  if (groups.length === 0) {
    alert("Nothing to export. Mix employees first.");
    return;
  }

  showLoader(true);
  
  // Apply exporting styles to disable animations, hide buttons and editing icons
  document.body.classList.add('exporting');
  
  // We want to export only the group grids inside the presentation canvas
  const canvasElement = document.getElementById('presentation-canvas');

  // Small delay to ensure render tree reflects the 'exporting' class state change
  setTimeout(() => {
    html2canvas(canvasElement, {
      scale: 2, // High resolution export
      backgroundColor: null, // support transparent background if set
      logging: false,
      useCORS: true
    }).then(exportedCanvas => {
      // Create download link
      const link = document.createElement('a');
      link.download = `office-break-groups-${new Date().toISOString().split('T')[0]}.png`;
      link.href = exportedCanvas.toDataURL('image/png');
      link.click();
      
      // Clean up
      document.body.classList.remove('exporting');
      showLoader(false);
    }).catch(err => {
      console.error("html2canvas export error:", err);
      alert("Failed to export image. Try again.");
      document.body.classList.remove('exporting');
      showLoader(false);
    });
  }, 200);
}

// Loading UI triggers
function showLoader(show) {
  if (show) {
    loadingOverlay.classList.add('show');
  } else {
    loadingOverlay.classList.remove('show');
  }
}

// HTML Escaping Utility to prevent XSS
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// LocalStorage Persistence Hooks
function saveSettingsToLocalStorage() {
  try {
    localStorage.setItem('mixer_sheet_url', sheetUrlInput.value.trim());
    localStorage.setItem('mixer_min_group_size', minGroupSizeInput.value);
    localStorage.setItem('mixer_max_group_size', maxGroupSizeInput.value);
    localStorage.setItem('mixer_theme', currentTheme);
    localStorage.setItem('mixer_employees', JSON.stringify(employees));
    localStorage.setItem('mixer_groups', JSON.stringify(groups));
    localStorage.setItem('mixer_gathering_points', JSON.stringify(GATHERING_POINTS));
  } catch (e) {
    console.error("Failed to save state to localStorage:", e);
  }
}

function loadSettingsFromLocalStorage() {
  try {
    const savedTheme = localStorage.getItem('mixer_theme');
    if (savedTheme) {
      currentTheme = savedTheme;
      document.documentElement.setAttribute('data-theme', currentTheme);
    }

    const savedUrl = localStorage.getItem('mixer_sheet_url');
    if (savedUrl !== null) sheetUrlInput.value = savedUrl;

    const savedMin = localStorage.getItem('mixer_min_group_size');
    if (savedMin !== null) minGroupSizeInput.value = savedMin;

    const savedMax = localStorage.getItem('mixer_max_group_size');
    if (savedMax !== null) maxGroupSizeInput.value = savedMax;

    const savedEmps = localStorage.getItem('mixer_employees');
    if (savedEmps) {
      employees = JSON.parse(savedEmps);
      renderEmployeeTable();
      updateEmployeeCountBadge();
    }

    const savedGroups = localStorage.getItem('mixer_groups');
    if (savedGroups) {
      groups = JSON.parse(savedGroups);
      renderGroupsGrid();
    }

    const savedPoints = localStorage.getItem('mixer_gathering_points');
    if (savedPoints) {
      GATHERING_POINTS = JSON.parse(savedPoints);
    }

    const savedBg = localStorage.getItem('mixer_bg');
    if (savedBg) {
      presentationCanvas.style.backgroundImage = `url('${savedBg}')`;
      presentationCanvas.classList.add('has-bg');
      clearBgBtn.style.display = 'inline-flex';
    }
  } catch (e) {
    console.error("Failed to load state from localStorage:", e);
  }
}

function updateFunnyExcuse() {
  const excuseTip = document.getElementById('excuse-tip');
  if (excuseTip) {
    const randomExcuse = FUNNY_EXCUSES[Math.floor(Math.random() * FUNNY_EXCUSES.length)];
    excuseTip.textContent = randomExcuse;
  }
}
