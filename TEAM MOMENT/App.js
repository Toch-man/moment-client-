/* ═══════════════════════════════════════════════════
   app.js  –  Moment Dashboard  (pure Vanilla JS)
═══════════════════════════════════════════════════ */

// ─── DATA ────────────────────────────────────────
const RECRUITERS = [
  { name:"Mark Stanley",    role:"Creative Designer", av:"MS", color:"#f97316", msg:"Hi, I'm interested in your Web Dev services!" },
  { name:"Pearl Issabella", role:"Creative Designer", av:"PI", color:"#8b5cf6", msg:"Could we schedule a quick call this week?" },
  { name:"Fredrick Aisha",  role:"Creative Designer", av:"FA", color:"#10b981", msg:"Love your portfolio! Let's collaborate." },
  { name:"Linda Ayembode",  role:"Creative Designer", av:"LA", color:"#ec4899", msg:"I have a project that matches your skills." },
  { name:"Lisel Kackwol",   role:"Creative Designer", av:"LK", color:"#f59e0b", msg:"Are you available for a 3-month contract?" },
  { name:"Marwell Viva",    role:"Creative Designer", av:"MV", color:"#ef4444", msg:"Saw your Behance – impressive work!" },
];
const CREATIVES = [
  { av:"MK", color:"#f97316", name:"Michael K.", role:"Brand Designer" },
  { av:"JP", color:"#8b5cf6", name:"Jade P.",    role:"Motion Designer" },
  { av:"AR", color:"#ef4444", name:"Aria R.",    role:"3D Artist" },
  { av:"BT", color:"#0891b2", name:"Ben T.",     role:"UX Researcher" },
  { av:"KL", color:"#fbbf24", name:"Kim L.",     role:"Illustrator" },
];
const BOOKINGS = [
  { client:"TechCorp Inc.",  service:"Web Development",    date:"Apr 12, 2026", time:"10:00 AM", status:"Confirmed",   statusColor:"#10b981" },
  { client:"Bloom Agency",   service:"UI Kit Design",       date:"Apr 15, 2026", time:"2:00 PM",  status:"Pending",     statusColor:"#f59e0b" },
  { client:"NovaBrand",      service:"Mobile App Design",   date:"Apr 20, 2026", time:"11:00 AM", status:"Confirmed",   statusColor:"#10b981" },
  { client:"Studio Seven",   service:"Brand Consultation",  date:"Apr 28, 2026", time:"3:30 PM",  status:"Negotiating", statusColor:"#8b5cf6" },
];
const MESSAGES = [
  { from:"Mark Stanley",    preview:"Hi, I'm interested in your Web Dev services!", time:"2m ago",  unread:true,  av:"MS", color:"#f97316" },
  { from:"Pearl Issabella", preview:"Could we schedule a quick call this week?",     time:"1h ago",  unread:true,  av:"PI", color:"#8b5cf6" },
  { from:"TechCorp Inc.",   preview:"Project brief has been updated. Please review.",time:"3h ago",  unread:false, av:"TC", color:"#0891b2" },
  { from:"Fredrick Aisha",  preview:"Love your portfolio! Let's collaborate.",        time:"1d ago",  unread:false, av:"FA", color:"#10b981" },
];
const REQUESTS = [
  { client:"AcmeDesigns",  type:"Logo & Branding",    budget:"$400",   urgency:"Urgent",   urgColor:"#ef4444" },
  { client:"FreshBrew Co.",type:"E-commerce Website", budget:"$1,200", urgency:"Normal",   urgColor:"#10b981" },
  { client:"Stackify",     type:"Mobile UI Design",   budget:"$800",   urgency:"Flexible", urgColor:"#8b5cf6" },
  { client:"Vortex Labs",  type:"Dashboard Design",   budget:"$650",   urgency:"Normal",   urgColor:"#10b981" },
  { client:"UrbanNest",    type:"Brand Strategy",     budget:"$350",   urgency:"Urgent",   urgColor:"#ef4444" },
  { client:"CodeCraft",    type:"Web Development",    budget:"$2,500", urgency:"Flexible", urgColor:"#8b5cf6" },
];
const PAYMENTS_DATA = [
  { desc:"TechCorp – Web Dev Phase 1",     amount:"$1,200", date:"Mar 28", status:"Received",   pct:100, color:"#10b981" },
  { desc:"Amazon Brand UI Kit",            amount:"$850",   date:"Mar 15", status:"Received",   pct:100, color:"#10b981" },
  { desc:"NovaBrand Mobile – Deposit",     amount:"$500",   date:"Apr 1",  status:"Pending",    pct:60,  color:"#f59e0b" },
  { desc:"Studio Seven Consultation",      amount:"$205",   date:"Apr 5",  status:"Processing", pct:80,  color:"#0891b2" },
];
const PACKAGES_DATA = [
  { price:"$14.5", name:"Pro Plan",  desc:"Full creative Designer/Web Developer service with priority support and unlimited revisions.", bg:"#fce7f3", emoji:"📱", features:["Unlimited revisions","Priority support","5-day delivery","Source files included"] },
  { price:"$3.5",  name:"Standard", desc:"Intuitive Designer/Web Developer service for small projects and quick turnarounds.",          bg:"#fef3c7", emoji:"💻", features:["3 revisions","Email support","10-day delivery","Basic files"] },
  { price:"$205",  name:"Boost",    desc:"Premium end-to-end solution with a dedicated manager and full analytics dashboard.",         bg:"#e0f2fe", emoji:"🚀", features:["Unlimited revisions","Dedicated manager","3-day delivery","Full analytics","Source files"] },
];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const CAL_ROWS = [
  [23,24,25,26,27,28,1],[3,4,5,6,7,8,2],[10,11,12,13,14,15,16],
  [17,18,19,20,21,22,23],[24,25,26,27,28,29,30],[31,1,2,3,4,5,6],
];
const CAL_HEADS = ["Mo","Tu","We","Th","Fr","Sa","Su"];

// ─── STATE ───────────────────────────────────────
let starred        = false;
let userName       = "Stanley";
let calMonthIdx    = 1;     // mini cal month
let calActiveDay   = 18;
let avCalMonthIdx  = 3;     // availability cal
let avMarked       = { "3-19":"available","3-20":"available","3-5":"busy","3-12":"tentative" };
let tasks          = [
  { id:1, title:"Finalize homepage mockup", project:"TechCorp Web",  due:"Today",  done:false, priority:"High"   },
  { id:2, title:"Submit UI kit to Amazon",  project:"Amazon Brand",  due:"Apr 10", done:true,  priority:"Medium" },
  { id:3, title:"Review mobile auth flow",  project:"NovaMobile",    due:"Apr 12", done:false, priority:"High"   },
  { id:4, title:"Client onboarding prep",   project:"Studio Seven",  due:"Apr 14", done:false, priority:"Low"    },
];
let reqStates      = REQUESTS.map(() => "pending");
let bookingsList   = [...BOOKINGS];
let activeMsg      = null;

// ─── TOAST ───────────────────────────────────────
let toastId = 0;
function showToast(msg, type="info") {
  const icons = { info:"ℹ️", success:"✅", error:"❌", warn:"⚠️" };
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.id = "toast-" + (++toastId);
  el.innerHTML = `<span class="toast-icon">${icons[type]||"ℹ️"}</span><span class="toast-msg">${msg}</span><button class="toast-close" onclick="dismissToast('${el.id}')">✕</button>`;
  document.getElementById("toast-container").appendChild(el);
  setTimeout(() => dismissToast(el.id), 3500);
}
function dismissToast(id) {
  const el = document.getElementById(id);
  if (el) { el.style.animation = "fadeOut 0.25s ease forwards"; setTimeout(() => el.remove(), 250); }
}

// ─── MODAL ───────────────────────────────────────
function openModal(title, bodyHTML, wide=false) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-body").innerHTML = bodyHTML;
  const box = document.getElementById("modal-box");
  box.className = wide ? "modal-box wide" : "modal-box";
  document.getElementById("modal-overlay").classList.remove("hidden");
}
function closeModal() { document.getElementById("modal-overlay").classList.add("hidden"); }
document.getElementById("modal-overlay").addEventListener("click", function(e) {
  if (e.target === this) closeModal();
});

// ─── NAV ─────────────────────────────────────────
const NAV_ITEMS_MAP = { home:"home", bookings:"bookings", revenue:"revenue", messages:"messages", requests:"requests", stats:"stats", tasks:"tasks", packages:"packages", calendar:"calendar", payments:"payments" };

function setNav(btn, panelId) {
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
  const panel = document.getElementById("panel-" + panelId);
  if (panel) panel.classList.add("active");
  // Close search
  document.getElementById("search-dropdown").classList.add("hidden");
  document.getElementById("search-input").value = "";
  // Lazy-render panels
  if (panelId === "bookings")  renderBookings();
  if (panelId === "revenue")   renderRevenue();
  if (panelId === "messages")  renderMessages();
  if (panelId === "requests")  renderRequests();
  if (panelId === "stats")     renderStats();
  if (panelId === "tasks")     renderTasks();
  if (panelId === "packages")  renderFullPackages();
  if (panelId === "calendar")  renderAvCal();
  if (panelId === "payments")  renderPayments();
}
function showPanel(panelId) {
  const btn = document.querySelector(`[data-panel="${panelId}"]`);
  setNav(btn, panelId);
}

// ─── SEARCH ──────────────────────────────────────
const SEARCH_ITEMS = [
  { icon:"📅", label:"Upcoming bookings", panel:"bookings" },
  { icon:"💰", label:"Revenue summary",   panel:"revenue" },
  { icon:"✉️", label:"Messages",          panel:"messages" },
  { icon:"🔔", label:"New requests",      panel:"requests" },
  { icon:"📊", label:"Performance stats", panel:"stats" },
  { icon:"📋", label:"Task Lists",        panel:"tasks" },
  { icon:"📦", label:"Packages",          panel:"packages" },
  { icon:"📆", label:"Availability calendar", panel:"calendar" },
  { icon:"💳", label:"Payment history",   panel:"payments" },
];
function handleSearch(val) {
  const dd = document.getElementById("search-dropdown");
  if (!val.trim()) { dd.classList.add("hidden"); return; }
  const filtered = SEARCH_ITEMS.filter(i => i.label.toLowerCase().includes(val.toLowerCase()));
  if (!filtered.length) { dd.classList.add("hidden"); return; }
  dd.innerHTML = filtered.map(i =>
    `<div class="search-item" onclick="showPanel('${i.panel}')"><span>${i.icon}</span><span>${i.label}</span></div>`
  ).join("");
  dd.classList.remove("hidden");
}
document.addEventListener("click", e => {
  if (!e.target.closest(".search-wrap")) {
    document.getElementById("search-dropdown").classList.add("hidden");
  }
});

// ─── PROFILE STAR ────────────────────────────────
function toggleStar() {
  starred = !starred;
  const btn = document.getElementById("star-btn");
  btn.textContent = starred ? "⭐ Skills" : "☆ Skills";
  btn.classList.toggle("starred", starred);
  showToast(starred ? "Skills starred!" : "Skills unstarred", starred ? "success" : "info");
}

// ─── MINI CALENDAR ───────────────────────────────
function renderMiniCal() {
  const grid = document.getElementById("cal-grid");
  const label = document.getElementById("cal-month-label");
  label.textContent = MONTHS[calMonthIdx];
  const btn = document.getElementById("cal-add-btn");
  btn.textContent = `+ Add Event on ${MONTHS[calMonthIdx]} ${calActiveDay}`;

  let html = CAL_HEADS.map((d,i) =>
    `<div class="cal-day-header${i>=5?' weekend':''}">${d}</div>`
  ).join("");

  CAL_ROWS.forEach((row, ri) => {
    row.forEach((day, di) => {
      const isActive = day === calActiveDay && ri >= 2;
      const isWeekend = di >= 5;
      const isOther = ri === 0 || (ri === 5 && di >= 1);
      let cls = "cal-day";
      if (isActive) cls += " active";
      else if (isOther) cls += " other";
      else if (isWeekend) cls += " weekend";
      html += `<button class="${cls}" onclick="selectCalDay(${day},${ri})">${day}</button>`;
    });
  });
  grid.innerHTML = html;
}
function selectCalDay(day, ri) {
  if (ri < 2) return;
  calActiveDay = day;
  renderMiniCal();
  showToast(`${MONTHS[calMonthIdx]} ${day} selected`, "info");
}
function calPrev() { calMonthIdx = Math.max(0, calMonthIdx - 1); renderMiniCal(); }
function calNext() { calMonthIdx = Math.min(11, calMonthIdx + 1); renderMiniCal(); }
function calAddEvent() { showToast(`Event added on ${MONTHS[calMonthIdx]} ${calActiveDay}!`, "success"); }

// ─── AVAILABILITY CALENDAR ───────────────────────
function renderAvCal() {
  const grid = document.getElementById("av-cal-grid");
  document.getElementById("av-cal-label").textContent = `${MONTHS[avCalMonthIdx]} 2026`;
  if (!grid) return;

  let html = CAL_HEADS.map((d,i) =>
    `<div class="cal-day-header${i>=5?' weekend':''}">${d}</div>`
  ).join("");

  CAL_ROWS.forEach((row, ri) => {
    row.forEach((day, di) => {
      const key = `${avCalMonthIdx}-${day}`;
      const state = avMarked[key];
      let cls = "cal-day";
      if (state) cls += ` ${state}`;
      else if (di >= 5) cls += " weekend";
      else if (ri === 0 || (ri === 5 && di >= 1)) cls += " other";
      html += `<button class="${cls}" onclick="toggleAvDay(${day})" title="Click to toggle">${day}</button>`;
    });
  });
  grid.innerHTML = html;
}
function toggleAvDay(day) {
  const key = `${avCalMonthIdx}-${day}`;
  const states = [undefined, "available", "busy", "tentative"];
  const cur = avMarked[key];
  const next = states[(states.indexOf(cur) + 1) % states.length];
  if (!next) delete avMarked[key]; else avMarked[key] = next;
  showToast(`${MONTHS[avCalMonthIdx]} ${day}: ${next || "cleared"}`, "info");
  renderAvCal();
}
function avCalPrev() { avCalMonthIdx = Math.max(0, avCalMonthIdx - 1); renderAvCal(); }
function avCalNext() { avCalMonthIdx = Math.min(11, avCalMonthIdx + 1); renderAvCal(); }

// ─── RECRUITERS ──────────────────────────────────
function renderRecruiters() {
  const el = document.getElementById("recruiter-list");
  el.innerHTML = RECRUITERS.map(r => `
    <div class="recruiter-row" onclick="openRecruiterModal(${RECRUITERS.indexOf(r)})">
      <div class="rec-avatar" style="background:${r.color}">${r.av}</div>
      <div class="rec-info">
        <div class="rec-name">${r.name}</div>
        <div class="rec-role">${r.role}</div>
      </div>
      <div class="online-dot"></div>
    </div>
  `).join("");
}
function openRecruiterModal(idx) {
  const r = RECRUITERS[idx];
  openModal("Recruiter Profile", `
    <div class="recruiter-modal-header">
      <div class="rec-modal-av" style="background:${r.color}">${r.av}</div>
      <div class="rec-modal-name">${r.name}</div>
      <div class="rec-modal-role">${r.role}</div>
      <span class="online-badge">🟢 Online Now</span>
    </div>
    <div class="rec-msg-bubble">"${r.msg}"</div>
    <div class="modal-btns">
      <button class="btn-primary" onclick="showToast('Message sent to ${r.name}!','success');closeModal()">💬 Message</button>
      <button class="btn-soft" onclick="showToast('Proposal sent to ${r.name}!','success');closeModal()">📤 Send Proposal</button>
    </div>
  `);
}

// ─── CREATIVES ───────────────────────────────────
function renderCreatives() {
  const el = document.getElementById("creatives-row");
  el.innerHTML = CREATIVES.map((c, i) => `
    <div class="creative-av" style="background:${c.color}" onclick="openCreativeModal(${i})" title="${c.name}">${c.av}</div>
  `).join("");
}
function openCreativeModal(idx) {
  const c = CREATIVES[idx];
  openModal("Creative Profile", `
    <div class="recruiter-modal-header">
      <div class="rec-modal-av" style="background:${c.color}">${c.av}</div>
      <div class="rec-modal-name">${c.name}</div>
      <div class="rec-modal-role">${c.role}</div>
    </div>
    <div class="modal-btns">
      <button class="btn-primary" onclick="showToast('Following ${c.name}!','success');closeModal()">Follow</button>
      <button class="btn-soft" onclick="showToast('Collaboration request sent!','success');closeModal()">Collaborate</button>
    </div>
  `);
}

// ─── EXPERIENCE MODAL ────────────────────────────
function openExpModal(title, desc, years, tags, color) {
  openModal(title, `
    <p style="font-size:14px;color:#334155;line-height:1.6;margin-bottom:8px">${desc}</p>
    <p style="font-size:12px;color:#94a3b8;margin-bottom:14px">📅 ${years}</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px">
      ${tags.map(t => `<span style="background:${color}20;color:${color};border-radius:10px;padding:4px 12px;font-size:12px;font-weight:600">${t}</span>`).join("")}
    </div>
    <button class="btn-primary w-full" style="padding:10px;font-size:14px" onclick="showToast('Applied for ${title}!','success');closeModal()">Apply / Contact</button>
  `, true);
}

// ─── PAY MODAL ───────────────────────────────────
function openPayModal(name, price, emoji, bg) {
  openModal(`Pay for ${name}`, `
    <div class="modal-pkg-header" style="background:${bg}">
      <div class="mp-emoji">${emoji}</div>
      <div class="mp-price">${price}</div>
      <div class="mp-name">${name}</div>
    </div>
    <div class="form-group"><label>Card Number</label><input placeholder="1234 5678 9012 3456"/></div>
    <div class="form-group"><label>Expiry</label><input placeholder="MM/YY"/></div>
    <div class="form-group"><label>CVV</label><input placeholder="•••" type="password"/></div>
    <button class="btn-primary w-full" style="padding:12px;font-size:14px;margin-top:6px" onclick="showToast('Payment of ${price} successful! 💳','success');closeModal()">Confirm Payment ${price}</button>
  `);
}

// ─── PROFILE MODAL ───────────────────────────────
function openProfileModal() {
  openModal("My Profile", `
    <div class="profile-modal-top">
      <div class="profile-modal-av">👨🏾‍💼</div>
      <div style="font-size:18px;font-weight:700">${userName}</div>
      <div style="font-size:13px;color:#64748b">Creative Designer / Web Developer</div>
    </div>
    <button class="profile-menu-item" onclick="openEditProfileModal();closeModal()">✏️ Edit Profile</button>
    <button class="profile-menu-item" onclick="showToast('Opening Account Settings','info');closeModal()">⚙️ Account Settings</button>
    <button class="profile-menu-item" onclick="showToast('Opening Notifications','info');closeModal()">🔔 Notifications</button>
    <button class="profile-menu-item danger" onclick="showToast('Logging out...','error');closeModal()">🚪 Log Out</button>
  `);
}
function openEditProfileModal() {
  openModal("Edit Profile", `
    <div class="form-group">
      <label>Display Name</label>
      <input id="edit-name-input" value="${userName}"/>
    </div>
    <button class="btn-primary w-full" style="padding:10px;font-size:14px" onclick="saveProfile()">Save Changes</button>
  `);
}
function saveProfile() {
  const val = document.getElementById("edit-name-input").value.trim();
  if (val) {
    userName = val;
    document.getElementById("profile-greeting").textContent = `Hello ${userName},`;
    showToast("Profile updated!", "success");
    closeModal();
  }
}

// ─── ADD TASK MODAL ──────────────────────────────
function openAddTaskModal() {
  openModal("Add New Task", `
    <div class="form-group">
      <label>Task Title</label>
      <input id="global-task-input" placeholder="What needs to be done?" onkeydown="if(event.key==='Enter')saveGlobalTask()"/>
    </div>
    <button class="btn-primary w-full" style="padding:10px;font-size:14px" onclick="saveGlobalTask()">Add Task</button>
  `);
  setTimeout(() => document.getElementById("global-task-input")?.focus(), 100);
}
function saveGlobalTask() {
  const val = document.getElementById("global-task-input")?.value.trim();
  if (val) {
    tasks.push({ id: Date.now(), title: val, project:"Personal", due:"TBD", done:false, priority:"Medium" });
    showToast(`Task "${val}" added! ✅`, "success");
    closeModal();
  }
}

// ─── BOOKINGS ────────────────────────────────────
function renderBookings() {
  const el = document.getElementById("bookings-list");
  if (!el) return;
  if (!bookingsList.length) { el.innerHTML = `<p style="color:#94a3b8;text-align:center;padding:40px">No upcoming bookings.</p>`; return; }
  el.innerHTML = bookingsList.map((b, i) => `
    <div class="booking-card" id="booking-${i}">
      <div class="booking-icon">📅</div>
      <div class="booking-info">
        <div class="name">${b.client}</div>
        <div class="service">${b.service}</div>
        <div class="datetime">${b.date} · ${b.time}</div>
      </div>
      <span class="booking-status" style="background:${b.statusColor}20;color:${b.statusColor}">${b.status}</span>
      <div class="booking-btns">
        <button class="btn-primary sm" onclick="confirmBooking(${i})">Confirm</button>
        <button class="btn-danger" onclick="cancelBooking(${i})">Cancel</button>
      </div>
    </div>
  `).join("");
}
function confirmBooking(i) {
  showToast(`Confirmed booking with ${bookingsList[i].client}!`, "success");
  bookingsList[i].status = "Confirmed";
  bookingsList[i].statusColor = "#10b981";
  renderBookings();
}
function cancelBooking(i) {
  showToast(`Booking with ${bookingsList[i].client} cancelled`, "error");
  bookingsList.splice(i, 1);
  renderBookings();
}

// ─── REVENUE ─────────────────────────────────────
function renderRevenue() {
  const statsEl = document.getElementById("revenue-stats");
  const chartEl = document.getElementById("bar-chart");
  if (!statsEl) return;
  const stats = [
    { lbl:"Total Earned", val:"$8,280", sub:"↑ 18% this month", subColor:"#10b981" },
    { lbl:"This Month",   val:"$2,450", sub:"↑ 36% this month", subColor:"#10b981" },
    { lbl:"Pending",      val:"$705",   sub:"Processing",        subColor:"#0891b2" },
  ];
  statsEl.innerHTML = stats.map(s => `
    <div class="stat-card" onclick="showToast('${s.lbl}: ${s.val}','info')">
      <div class="stat-val">${s.val}</div>
      <div class="stat-lbl">${s.lbl}</div>
      <div class="stat-sub" style="color:${s.subColor}">${s.sub}</div>
    </div>
  `).join("");

  const months = ["Jan","Feb","Mar","Apr","May","Jun"];
  const vals   = [1200, 980, 1550, 2100, 1800, 2450];
  const max = Math.max(...vals);
  chartEl.innerHTML = vals.map((v,i) => `
    <div class="bar-wrap" onclick="showToast('${months[i]}: $${v.toLocaleString()}','info')">
      <div class="bar" style="height:${(v/max)*100}px"></div>
      <span class="bar-lbl">${months[i]}</span>
    </div>
  `).join("");
}

// ─── MESSAGES ────────────────────────────────────
function renderMessages() {
  const list = document.getElementById("messages-list");
  if (!list) return;
  list.innerHTML = MESSAGES.map((m,i) => `
    <div class="msg-row${activeMsg===i?' active':''}" id="msgrow-${i}" onclick="openMessageThread(${i})">
      <div class="msg-av" style="background:${m.color}">${m.av}</div>
      <div class="msg-body">
        <div class="msg-top">
          <span class="msg-from">${m.from}</span>
          <span class="msg-time">${m.time}</span>
        </div>
        <div class="msg-preview">${m.preview}</div>
      </div>
      ${m.unread ? '<div class="unread-dot"></div>' : ''}
    </div>
  `).join("");

  const thread = document.getElementById("message-thread");
  const layout = document.querySelector(".messages-layout");
  if (activeMsg === null) {
    thread.classList.add("hidden");
    layout.classList.add("no-thread");
  } else {
    thread.classList.remove("hidden");
    layout.classList.remove("no-thread");
    renderThread(MESSAGES[activeMsg]);
  }
}
function openMessageThread(i) {
  activeMsg = i;
  MESSAGES[i].unread = false;
  renderMessages();
}
function renderThread(m) {
  document.getElementById("message-thread").innerHTML = `
    <div class="thread-header">
      <div class="msg-av" style="background:${m.color}">${m.av}</div>
      <div>
        <div style="font-weight:700;font-size:14px">${m.from}</div>
        <div style="font-size:11px;color:#94a3b8">${m.role||'Recruiter'}</div>
      </div>
      <button class="btn-icon" style="margin-left:auto" onclick="activeMsg=null;renderMessages()">✕</button>
    </div>
    <div class="thread-bubble">${m.preview}</div>
    <div class="thread-input-row">
      <input id="reply-input" placeholder="Type a reply..." onkeydown="if(event.key==='Enter')sendReply('${m.from}')"/>
      <button class="btn-primary" onclick="sendReply('${m.from}')">Send</button>
    </div>
  `;
}
function sendReply(name) {
  const val = document.getElementById("reply-input")?.value.trim();
  if (val) { showToast(`Reply sent to ${name}!`, "success"); document.getElementById("reply-input").value = ""; }
}

// ─── REQUESTS ────────────────────────────────────
function renderRequests() {
  const el = document.getElementById("requests-list");
  if (!el) return;
  el.innerHTML = REQUESTS.map((r,i) => `
    <div class="req-card${reqStates[i]!=='pending'?' done':''}">
      <div class="req-icon" style="background:${r.urgColor}20">💼</div>
      <div class="req-info">
        <div class="rname">${r.client}</div>
        <div class="rdetail">${r.type} · ${r.budget}</div>
      </div>
      <span class="req-urgency" style="background:${r.urgColor}18;color:${r.urgColor}">${r.urgency}</span>
      ${reqStates[i]==='accepted'
        ? `<span style="font-size:11px;color:#10b981;font-weight:700">✓ Accepted</span>`
        : reqStates[i]==='declined'
        ? `<span style="font-size:11px;color:#ef4444;font-weight:700">✗ Declined</span>`
        : `<div class="req-btns">
            <button class="btn-primary sm" onclick="respondReq(${i},'accepted')">Accept</button>
            <button class="btn-danger" onclick="respondReq(${i},'declined')">Decline</button>
           </div>`
      }
    </div>
  `).join("");
  const pending = reqStates.filter(s => s==='pending').length;
  const badge = document.getElementById("req-badge");
  if (badge) badge.textContent = pending;
}
function respondReq(i, state) {
  reqStates[i] = state;
  showToast(state==='accepted' ? `${REQUESTS[i].client} accepted! 🎉` : `${REQUESTS[i].client} declined`, state==='accepted'?'success':'error');
  renderRequests();
}

// ─── STATS ───────────────────────────────────────
function renderStats() {
  const perf = document.getElementById("perf-stats");
  const skillsEl = document.getElementById("skill-bars");
  if (!perf) return;
  const items = [
    { icon:"👁️", val:"4,820", lbl:"Profile Views", sub:"+12% this month", c:"#10b981" },
    { icon:"📤", val:"38",    lbl:"Proposals Sent", sub:"+5 this month",   c:"#10b981" },
    { icon:"🏆", val:"14",    lbl:"Jobs Won",        sub:"+3 this month",   c:"#10b981" },
    { icon:"⭐", val:"4.9 ★", lbl:"Avg Rating",      sub:"Top 5%",         c:"#0891b2" },
  ];
  perf.style.gridTemplateColumns = "repeat(2,1fr)";
  perf.innerHTML = items.map(s => `
    <div class="stat-card" onclick="showToast('${s.lbl}: ${s.val}','info')">
      <div class="stat-icon">${s.icon}</div>
      <div class="stat-val">${s.val}</div>
      <div class="stat-lbl">${s.lbl}</div>
      <div class="stat-sub" style="color:${s.c}">${s.sub}</div>
    </div>
  `).join("");

  skillsEl.innerHTML = [["UI Design",92],["Web Dev",88],["Mobile UX",80],["Branding",75]].map(([name,pct]) => `
    <div class="skill-bar-row">
      <div class="skill-bar-top"><span>${name}</span><span>${pct}%</span></div>
      <div class="skill-bar-bg"><div class="skill-bar-fill" style="width:${pct}%"></div></div>
    </div>
  `).join("");
}

// ─── TASKS ───────────────────────────────────────
function renderTasks() {
  const el = document.getElementById("tasks-list");
  if (!el) return;
  const pc = p => p==="High"?"#ef4444":p==="Medium"?"#f59e0b":"#10b981";
  el.innerHTML = tasks.map(t => `
    <div class="task-card">
      <div class="task-check${t.done?' done':''}" onclick="toggleTask(${t.id})">
        ${t.done ? '✓' : ''}
      </div>
      <div class="task-info">
        <div class="task-title${t.done?' done':''}">${t.title}</div>
        <div class="task-meta">${t.project} · Due ${t.due}</div>
      </div>
      <span class="task-priority" style="background:${pc(t.priority)}18;color:${pc(t.priority)}">${t.priority}</span>
      <button class="task-del" onclick="deleteTask(${t.id})">🗑</button>
    </div>
  `).join("");
}
function addTask() {
  const input = document.getElementById("task-input");
  const val = input.value.trim();
  if (!val) return;
  tasks.push({ id:Date.now(), title:val, project:"Personal", due:"TBD", done:false, priority:"Medium" });
  input.value = "";
  showToast("Task added! ✅", "success");
  renderTasks();
}
function toggleTask(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.done = !t.done;
  showToast(t.done ? "Task completed! 🎉" : "Task reopened", t.done ? "success" : "info");
  renderTasks();
}
function deleteTask(id) {
  tasks = tasks.filter(x => x.id !== id);
  showToast("Task removed", "error");
  renderTasks();
}
document.addEventListener("keydown", e => {
  if (e.key === "Enter" && document.activeElement.id === "task-input") addTask();
});

// ─── FULL PACKAGES ───────────────────────────────
function renderFullPackages() {
  const el = document.getElementById("full-packages");
  if (!el) return;
  el.innerHTML = PACKAGES_DATA.map(p => `
    <div class="full-pkg-card" style="background:${p.bg}">
      <div class="fp-emoji">${p.emoji}</div>
      <div class="fp-price">${p.price}</div>
      <div class="fp-name">${p.name}</div>
      <div class="fp-desc">${p.desc}</div>
      <ul>${p.features.map(f => `<li>${f}</li>`).join("")}</ul>
      <div class="fp-btns">
        <button class="btn-primary" style="flex:1;padding:9px;font-size:13px" onclick="openPayModal('${p.name}','${p.price}','${p.emoji}','${p.bg}')">Buy Now</button>
        <button class="btn-soft" onclick="showToast('${p.name} details viewed','info')">Info</button>
      </div>
    </div>
  `).join("");
}

// ─── PAYMENTS ────────────────────────────────────
function renderPayments() {
  const el = document.getElementById("payments-list");
  if (!el) return;
  el.innerHTML = PAYMENTS_DATA.map(p => `
    <div class="pay-card" onclick="showToast('${p.desc}: ${p.amount} – ${p.status}','info')">
      <div class="pay-card-top">
        <div class="pay-card-left">
          <div class="pay-desc">${p.desc}</div>
          <div class="pay-date">${p.date}</div>
        </div>
        <div class="pay-card-right">
          <div class="pay-amount">${p.amount}</div>
          <span class="pay-status ${p.status.toLowerCase()}">${p.status}</span>
        </div>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width:${p.pct}%;background:${p.color}"></div></div>
    </div>
  `).join("");
}

// ─── INIT ────────────────────────────────────────
(function init() {
  renderRecruiters();
  renderCreatives();
  renderMiniCal();
})();