/* ==========================================================================
   Salesforce Service Console - Chat & CRM State Controller
   ========================================================================== */

// 1. Database of Customer Support Sessions (Mock CRM Data)
const sessionDatabase = {
  '9XYZ789': {
    serviceTag: '9XYZ789',
    status: 'active', // 'active', 'incoming', 'ended', 'missed'
    ahtSeconds: 728, // Starts at 12:08 mins
    ahtRunning: true,
    customer: {
      name: 'Rohan Sharma',
      mobile: '+91 98765 43210',
      altPhone: 'N/A',
      email: 'rohan.sharma@enterprise.in'
    },
    hardware: {
      model: 'Inspiron 15 5000',
      cpu: 'Intel Core i5 (11th Gen)',
      ram: '8 GB DDR4',
      storage: '512 GB NVMe SSD',
      age: '3 Years, 2 Months' // Constrained to fit OOW (1.0 - 3.9 years)
    },
    warranty: {
      badge: '🔴 OUT OF WARRANTY',
      history: 'Previous Plan: Premium Support Plus | Expired: 6 Months Ago.'
    },
    case: {
      id: '5008W00000XYZ99',
      created: '2026-06-19 11:20 PM',
      origin: 'Chat',
      status: 'Open',
      timeline: [
        { time: '11:20 PM', type: 'system-ok', text: 'Incoming chat route initiated. Customer authenticated via portal.' },
        { time: '11:22 PM', type: 'system-ok', text: 'Bot self-service completed. Customer requested live-agent handoff.' },
        { time: '11:23 PM', type: 'system-ok', text: 'Session routed to agent queue. Assigned to Agent: Arjun.' },
        { time: '11:23 PM', type: 'note-added', text: 'Chat session accepted. Auto-greeting sent to customer.' }
      ]
    },
    chatTranscript: [
      { sender: 'bot', text: 'Hello! Thank you for contacting Dell Technical Support. I am your Dell Virtual Assistant. To get started, please enter your Service Tag or Express Service Code.' },
      { sender: 'customer', text: 'Service Tag: 9XYZ789' },
      { sender: 'bot', text: 'Thank you. To help me guide you to the right solution, please select an option from the menu below:' },
      { sender: 'customer', text: '💻 Hardware & Performance Issues' },
      { sender: 'bot', text: 'Transferring you to a human agent. Please hold.' },
      { sender: 'agent', text: "Thank you for contacting Dell Technologies. My name is Arjun. I see you're reaching out about an issue with your system (Service Tag: 9XYZ789). Let me review the details you provided, and I will help you resolve this right away. Meanwhile, please feel free to share any further details or specific error messages about the issue you are facing." }
    ]
  },
  '4ABC123': {
    serviceTag: '4ABC123',
    status: 'incoming',
    ahtSeconds: 0,
    ahtRunning: false,
    customer: {
      name: 'Priya Patel',
      mobile: '+91 91234 56789',
      altPhone: '+91 22 2844 1234 (Home)',
      email: 'priya.patel@optiplex.org.in'
    },
    hardware: {
      model: 'XPS 13 9310',
      cpu: 'Intel Core i7 (11th Gen)',
      ram: '16 GB LPDDR4x',
      storage: '1 TB NVMe SSD',
      age: '1 Year, 8 Months' // Constrained to fit OOW (1.0 - 3.9 years)
    },
    warranty: {
      badge: '🔴 OUT OF WARRANTY',
      history: 'Previous Plan: Basic Mail-in Warranty | Expired: 2 Months Ago.'
    },
    case: {
      id: '5008W00000ABC12',
      created: '2026-06-20 01:05 AM',
      origin: 'Chat',
      status: 'Open',
      timeline: [
        { time: '01:05 AM', type: 'system-ok', text: 'Incoming chat route initiated. Customer authenticated via SupportAssist.' },
        { time: '01:07 AM', type: 'system-ok', text: 'Bot self-service completed. Customer requested live-agent handoff.' }
      ]
    },
    chatTranscript: [
      { sender: 'bot', text: 'Hello! Thank you for contacting Dell Technical Support. I am your Dell Virtual Assistant. To get started, please enter your Service Tag or Express Service Code.' },
      { sender: 'customer', text: 'Service Tag: 4ABC123' },
      { sender: 'bot', text: 'Thank you. To help me guide you to the right solution, please select an option from the menu below:' },
      { sender: 'customer', text: '🧑‍💻 Connect to Live Agent' },
      { sender: 'bot', text: 'Transferring you to a human agent. Please hold.' }
    ]
  },
  '2LMN456': {
    serviceTag: '2LMN456',
    status: 'ended',
    ahtSeconds: 728, // Stopped at 12:08 mins
    ahtRunning: false,
    customer: {
      name: 'Aarav Mehta',
      mobile: '+91 99887 76655',
      altPhone: 'N/A',
      email: 'aarav.mehta@latitude-dev.in'
    },
    hardware: {
      model: 'Latitude 7420',
      cpu: 'Intel Core i7 (11th Gen)',
      ram: '16 GB DDR4',
      storage: '512 GB SSD',
      age: '2 Years, 11 Months' // Constrained to fit OOW (1.0 - 3.9 years)
    },
    warranty: {
      badge: '🔴 OUT OF WARRANTY',
      history: 'Previous Plan: ProSupport Plus | Expired: 1 Year Ago.'
    },
    case: {
      id: '5008W00000LMN88',
      created: '2026-06-18 03:10 PM',
      origin: 'Chat',
      status: 'Closed',
      timeline: [
        { time: '03:10 PM', type: 'system-ok', text: 'Incoming chat route initiated. Customer authenticated.' },
        { time: '03:12 PM', type: 'system-ok', text: 'Bot self-service completed. Customer requested live-agent handoff.' },
        { time: '03:13 PM', type: 'system-ok', text: 'Session routed to agent queue. Assigned to Agent: Arjun.' },
        { time: '03:13 PM', type: 'note-added', text: 'Chat session accepted. Auto-greeting sent to customer.' },
        { time: '03:22 PM', type: 'note-added', text: 'Guided customer to perform a hard reset. System booted successfully and issue resolved.' },
        { time: '03:45 PM', type: 'system-ok', text: 'Chat session terminated by customer. Case closed.' }
      ]
    },
    chatTranscript: [
      { sender: 'bot', text: 'Hello! Thank you for contacting Dell Technical Support. I am your Dell Virtual Assistant. To get started, please enter your Service Tag or Express Service Code.' },
      { sender: 'customer', text: 'Service Tag: 2LMN456' },
      { sender: 'bot', text: 'Thank you. To help me guide you to the right solution, please select an option from the menu below:' },
      { sender: 'customer', text: '💻 Hardware & Performance Issues' },
      { sender: 'bot', text: 'Transferring you to a human agent. Please hold.' },
      { sender: 'agent', text: "Thank you for contacting Dell Technologies. My name is Arjun. I see you're reaching out about an issue with your system (Service Tag: 2LMN456). Let me review the details." },
      { sender: 'customer', text: 'My laptop does not boot up. It flashes diagnostic lights.' },
      { sender: 'agent', text: 'I understand. Let me guide you to perform a hard reset. Please hold.' },
      { sender: 'agent', text: 'To perform a hard reset, please disconnect all external devices, unplug the power adapter, and hold down the power button for 15 seconds. Then, plug in the adapter and power it back on.' },
      { sender: 'customer', text: 'That worked. The laptop is booting up normally now. Thank you so much for resolving the issue.' },
      { sender: 'agent', text: 'You are welcome. Thank you for choosing Dell Technologies. Have a wonderful day.' },
      { sender: 'customer', text: 'Have a great day. Goodbye.' },
      { sender: 'system', text: 'Chat session ended by customer.' }
    ]
  }
};

// 2. Active Session Configuration State
const state = {
  activeSessionId: '9XYZ789',
  activeWorkspaceTab: 'system', // 'system' or 'case'
  slaCountdownSeconds: 30, // Incoming 30s countdown SLA
  slaTimerInterval: null,
  ahtTimerInterval: null,
  isIncomingOpen: true,
  isEditingProfile: false
};

// 3. UI Selectors
const ui = {
  // Navigation Tabs
  tabActive: document.getElementById('tab-session-active'),
  tabIncoming: document.getElementById('tab-session-incoming'),
  tabEnded: document.getElementById('tab-session-ended'),
  labelActive: document.getElementById('tab-label-active'),
  labelIncoming: document.getElementById('tab-label-incoming'),

  // Right Workspace Tab Toggles
  btnSystemDetails: document.getElementById('subtab-system-details'),
  btnCaseManagement: document.getElementById('subtab-case-management'),
  panelSystemDetails: document.getElementById('panel-system-details'),
  panelCaseManagement: document.getElementById('panel-case-management'),

  // System Card Fields
  editProfileBtn: document.getElementById('edit-profile-btn'),
  custName: document.getElementById('crm-cust-name'),
  custMobile: document.getElementById('crm-cust-mobile'),
  custAltPhone: document.getElementById('crm-cust-altphone'),
  custEmail: document.getElementById('crm-cust-email'),
  sysModel: document.getElementById('crm-sys-model'),
  sysCpu: document.getElementById('crm-sys-cpu'),
  sysRam: document.getElementById('crm-sys-ram'),
  sysStorage: document.getElementById('crm-sys-storage'),
  sysAge: document.getElementById('crm-sys-age'),
  warrantyBadge: document.getElementById('crm-warranty-badge'),
  warrantyHistory: document.getElementById('crm-warranty-history'),

  // Case Details Fields
  caseId: document.getElementById('case-id'),
  caseCreated: document.getElementById('case-created'),
  caseOrigin: document.getElementById('case-origin'),
  caseStatus: document.getElementById('case-status'),
  timelineLogList: document.getElementById('timeline-log-list'),
  notesTextarea: document.getElementById('notes-textarea'),
  notesSubmitBtn: document.getElementById('notes-submit-btn'),
  emailToInput: document.getElementById('email-to-input'),
  emailSubjectInput: document.getElementById('email-subject-input'),
  emailBodyTextarea: document.getElementById('email-body-textarea'),
  emailSendBtn: document.getElementById('email-send-btn'),


  // Chat Logs & Inputs
  chatHistoryLog: document.getElementById('chat-history-log'),
  agentChatTextarea: document.getElementById('agent-chat-textarea'),
  agentSendBtn: document.getElementById('agent-send-btn'),

  // Clocks
  ahtClock: document.getElementById('aht-clock'),
  queueVolume: document.getElementById('queue-volume'),

  // SLA Overlays
  incomingAcceptOverlay: document.getElementById('incoming-accept-overlay'),
  overlayTimer: document.getElementById('overlay-timer'),
  acceptChatActionBtn: document.getElementById('accept-chat-action-btn')
};


// ==========================================================================
// INITIALIZER
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Bind left sidebar chat session tabs
  ui.tabActive.addEventListener('click', () => selectSession('9XYZ789'));
  ui.tabIncoming.addEventListener('click', openIncomingOverlay);
  ui.tabEnded.addEventListener('click', () => selectSession('2LMN456'));

  // Bind right workspace CRM sub-tabs
  ui.btnSystemDetails.addEventListener('click', () => setWorkspaceTab('system'));
  ui.btnCaseManagement.addEventListener('click', () => setWorkspaceTab('case'));

  // Bind notes submit action
  ui.notesSubmitBtn.addEventListener('click', submitAgentNote);

  // Bind overlay accept button
  ui.acceptChatActionBtn.addEventListener('click', acceptIncomingChat);

  // Bind chat message sender actions
  ui.agentSendBtn.addEventListener('click', submitAgentChatMessage);
  ui.agentChatTextarea.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitAgentChatMessage();
    }
  });

  // Start AHT running timer
  startAhtTimer();

  // Start incoming request SLA countdown
  startSlaCountdown();

  // Bind Edit Profile button
  ui.editProfileBtn.addEventListener('click', toggleEditProfile);

  // Bind Send Email button
  ui.emailSendBtn.addEventListener('click', sendMockEmail);

  // Initial database render (Active tag details load)
  loadSessionData(state.activeSessionId);
});

// ==========================================================================
// WORKSPACE TAB & SESSION TOGGLING
// ==========================================================================

function setWorkspaceTab(tabName) {
  state.activeWorkspaceTab = tabName;

  if (tabName === 'system') {
    ui.btnSystemDetails.classList.add('active');
    ui.btnSystemDetails.setAttribute('aria-selected', 'true');
    ui.btnCaseManagement.classList.remove('active');
    ui.btnCaseManagement.setAttribute('aria-selected', 'false');

    ui.panelSystemDetails.classList.add('active');
    ui.panelCaseManagement.classList.remove('active');
  } else {
    ui.btnCaseManagement.classList.add('active');
    ui.btnCaseManagement.setAttribute('aria-selected', 'true');
    ui.btnSystemDetails.classList.remove('active');
    ui.btnSystemDetails.setAttribute('aria-selected', 'false');

    ui.panelCaseManagement.classList.add('active');
    ui.panelSystemDetails.classList.remove('active');
  }
}

function selectSession(sessionId) {
  state.activeSessionId = sessionId;

  // Update selected highlight in left tabs
  ui.tabActive.classList.remove('active');
  ui.tabIncoming.classList.remove('active');
  ui.tabEnded.classList.remove('active');

  if (sessionId === '9XYZ789') {
    ui.tabActive.classList.add('active');
  } else if (sessionId === '2LMN456') {
    ui.tabEnded.classList.add('active');
  } else if (sessionId === '4ABC123') {
    ui.tabIncoming.classList.add('active');
  }

  // Load session data details into all panels
  loadSessionData(sessionId);
}

function loadSessionData(sessionId) {
  const data = sessionDatabase[sessionId];
  if (!data) return;

  // Reset profile editing state on session switch
  state.isEditingProfile = false;
  ui.editProfileBtn.innerHTML = `<i class="fas fa-pencil-alt"></i> Edit`;
  ui.editProfileBtn.classList.remove('save-state');

  // Pre-populate email inputs
  ui.emailToInput.value = data.customer.email || '';
  ui.emailSubjectInput.value = '';
  ui.emailBodyTextarea.value = '';



  // 1. Populate Customer details card
  ui.custName.textContent = data.customer.name;
  ui.custMobile.textContent = data.customer.mobile;
  ui.custAltPhone.textContent = data.customer.altPhone;
  ui.custEmail.textContent = data.customer.email;


  // 2. Populate Hardware Details
  ui.sysModel.textContent = data.hardware.model;
  ui.sysCpu.textContent = data.hardware.cpu;
  ui.sysRam.textContent = data.hardware.ram;
  ui.sysStorage.textContent = data.hardware.storage;
  ui.sysAge.textContent = data.hardware.age;

  // 3. Populate Entitlement Status card (Isolated styling)
  ui.warrantyBadge.innerHTML = `<i class="fas fa-times-circle"></i> ${data.warranty.badge}`;
  ui.warrantyHistory.textContent = data.warranty.history;

  // 4. Populate Case Management Card details
  ui.caseId.textContent = data.case.id;
  ui.caseCreated.textContent = data.case.created;
  ui.caseOrigin.textContent = data.case.origin;
  ui.caseStatus.textContent = data.case.status;

  // Clear case status badge modifications
  ui.caseStatus.className = 'slds-status-badge';
  ui.caseStatus.classList.add(data.case.status.toLowerCase());

  // Render Case activity log timeline
  renderTimeline(data.case.timeline);

  // 5. Render Conversation log transcript stream
  renderChatLog(data.chatTranscript);

  // 6. Handle input bar locks based on session status
  if (data.status === 'active') {
    ui.agentChatTextarea.disabled = false;
    ui.agentSendBtn.disabled = false;
    ui.agentChatTextarea.placeholder = "Type a message to customer... (Press Enter to send)";
  } else if (data.status === 'ended') {
    ui.agentChatTextarea.disabled = true;
    ui.agentSendBtn.disabled = true;
    ui.agentChatTextarea.placeholder = "This session has ended. Chat transcript is locked.";
  } else if (data.status === 'incoming') {
    ui.agentChatTextarea.disabled = true;
    ui.agentSendBtn.disabled = true;
    ui.agentChatTextarea.placeholder = "Accept this chat session to communicate.";
  } else if (data.status === 'missed') {
    ui.agentChatTextarea.disabled = true;
    ui.agentSendBtn.disabled = true;
    ui.agentChatTextarea.placeholder = "This session was missed. Closed by SLA timeout.";
  }
  
  updateAhtDisplay();
}

function renderTimeline(timelineArray) {
  ui.timelineLogList.innerHTML = '';

  timelineArray.forEach(item => {
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';

    // Alert flags
    if (item.type === 'system-alert') {
      timelineItem.classList.add('alert-alert');
    }

    timelineItem.innerHTML = `
      <div class="timeline-marker ${item.type}">
        <i class="${getTimelineIcon(item.type)}"></i>
      </div>
      <div class="timeline-item-details">
        <span class="timeline-time">${item.time}</span>
        <p class="timeline-text">${item.text}</p>
      </div>
    `;
    ui.timelineLogList.appendChild(timelineItem);
  });

  // Scroll timeline to bottom
  ui.timelineLogList.scrollTop = ui.timelineLogList.scrollHeight;
}

function getTimelineIcon(type) {
  if (type === 'system-alert') return 'fas fa-exclamation-triangle';
  if (type === 'system-ok') return 'fas fa-cog';
  if (type === 'note-added') return 'fas fa-sticky-note';
  return 'fas fa-circle';
}

function renderChatLog(chatArray) {
  ui.chatHistoryLog.innerHTML = '';

  // Filter agent messages and bot transcript divisions
  let selfServiceComplete = false;

  chatArray.forEach((msg, index) => {
    // Add divider showing self-service bot routing logic before transferring to agent
    if (!selfServiceComplete && msg.sender === 'agent') {
      selfServiceComplete = true;
      const divider = document.createElement('div');
      divider.className = 'bot-transcript-divider';
      divider.innerHTML = `<span class="divider-text">Customer self-service transfer</span>`;
      ui.chatHistoryLog.appendChild(divider);
    }

    const msgElement = document.createElement('div');
    msgElement.className = `console-message ${msg.sender === 'agent' ? 'agent' : 'customer'}`;

    // Label bot or customer correctly
    let senderLabel = "Customer";
    if (msg.sender === 'bot') senderLabel = "Dell Routing Bot";
    if (msg.sender === 'agent') senderLabel = "Arjun (You)";

    msgElement.innerHTML = `
      <span class="message-meta">${senderLabel}</span>
      <div class="message-content-bubble">
        ${msg.text}
      </div>
    `;
    ui.chatHistoryLog.appendChild(msgElement);
  });

  // Scroll chat history to bottom
  ui.chatHistoryLog.scrollTop = ui.chatHistoryLog.scrollHeight;
}

// ==========================================================================
// TIMERS & CLOCKS (AHT & SLA COUNTDOWNS)
// ==========================================================================

function startAhtTimer() {
  state.ahtTimerInterval = setInterval(() => {
    // Increment AHT seconds for all active running sessions
    Object.keys(sessionDatabase).forEach(tag => {
      const session = sessionDatabase[tag];
      if (session.ahtRunning) {
        session.ahtSeconds++;
      }
    });

    // Refresh AHT Display for active tab
    updateAhtDisplay();
  }, 1000);
}

function updateAhtDisplay() {
  const currentSession = sessionDatabase[state.activeSessionId];
  if (!currentSession) return;

  const totalSecs = currentSession.ahtSeconds;
  const minutes = Math.floor(totalSecs / 60);
  const seconds = totalSecs % 60;

  ui.ahtClock.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startSlaCountdown() {
  state.slaCountdownSeconds = 30;

  state.slaTimerInterval = setInterval(() => {
    state.slaCountdownSeconds--;

    // Render text
    ui.labelIncoming.innerHTML = `New: 4ABC123 <span class="countdown-timer">Accept within 00:${String(state.slaCountdownSeconds).padStart(2, '0')}s</span>`;
    ui.overlayTimer.textContent = `${state.slaCountdownSeconds}s`;

    // Edge case: countdown elapsed
    if (state.slaCountdownSeconds <= 0) {
      handleSlaTimeout();
    }
  }, 1000);
}

// SLA Timeout Failure trigger
function handleSlaTimeout() {
  clearInterval(state.slaTimerInterval);

  // Update state status
  sessionDatabase['4ABC123'].status = 'missed';
  state.isIncomingOpen = false;

  // Close Overlay if open
  ui.incomingAcceptOverlay.classList.remove('show');

  // Update sidebar: Fade/disable Incoming session tab
  ui.tabIncoming.classList.remove('incoming-alert-flashing');
  ui.tabIncoming.classList.add('ended');
  ui.tabIncoming.style.pointerEvents = 'none';
  ui.tabIncoming.style.opacity = '0.4';
  ui.labelIncoming.innerHTML = `Missed: 4ABC123 <span class="countdown-timer">(Timed Out)</span>`;

  // Update queue KPI count
  ui.queueVolume.textContent = `📥 1 chat waiting`;

  // Append RED system alert entry to incoming session's Case logs
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const timeFormatted = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

  sessionDatabase['4ABC123'].case.timeline.push({
    time: timeFormatted,
    type: 'system-alert',
    text: `[SYSTEM ALERT - ${timeFormatted}]: Chat request route timed out. Agent failed to accept session within 30-second SLA limit. Session rerouted to queue.`
  });

  // If agent currently loaded this missed tab, refresh panels
  if (state.activeSessionId === '4ABC123') {
    loadSessionData('4ABC123');
  }
}

// Open Incoming prompt dialog
function openIncomingOverlay() {
  if (sessionDatabase['4ABC123'].status !== 'incoming') {
    // If it's already active, just switch to it normally
    selectSession('4ABC123');
    return;
  }
  ui.incomingAcceptOverlay.classList.add('show');
}

// Accept Incoming Request
function acceptIncomingChat() {
  clearInterval(state.slaTimerInterval);

  // 1. Hide modal popup
  ui.incomingAcceptOverlay.classList.remove('show');

  // 2. Change tab status in Database
  sessionDatabase['4ABC123'].status = 'active';
  sessionDatabase['4ABC123'].ahtRunning = true;

  // 3. Update Left tab layout structure
  ui.tabIncoming.classList.remove('incoming-alert-flashing');
  ui.tabIncoming.style.animation = 'none';
  ui.tabIncoming.innerHTML = `
    <span class="status-dot active"></span>
    <span class="tab-label" id="tab-label-incoming">Tag: 4ABC123</span>
  `;

  // 4. Update queue KPIs
  ui.queueVolume.textContent = `📥 1 chat waiting`;

  // 5. Prepend note to timeline
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const timeFormatted = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

  sessionDatabase['4ABC123'].case.timeline.push({
    time: timeFormatted,
    type: 'note-added',
    text: 'Chat session accepted. Agent Arjun has joined the conversation.'
  });

  // 6. Append arjun agent automated greeting
  const greetingText = `Thank you for contacting Dell Technologies. My name is Arjun. I see you're reaching out about an issue with your system (Service Tag: 4ABC123). Let me review the details you provided, and I will help you resolve this right away. Meanwhile, please feel free to share any further details or specific error messages about the issue you are facing.`;

  sessionDatabase['4ABC123'].chatTranscript.push({
    sender: 'agent',
    text: greetingText
  });

  // 7. Load this session as active
  selectSession('4ABC123');
}

// ==========================================================================
// AGENT CHAT SEND ACTIONS & MANUAL NOTE INPUTS
// ==========================================================================

function submitAgentChatMessage() {
  const textInput = ui.agentChatTextarea.value.trim();
  if (!textInput) return;

  // Save message to active session chat transcript database
  sessionDatabase[state.activeSessionId].chatTranscript.push({
    sender: 'agent',
    text: textInput
  });

  // Clear input
  ui.agentChatTextarea.value = '';

  // Re-render chat log
  renderChatLog(sessionDatabase[state.activeSessionId].chatTranscript);
}

function submitAgentNote() {
  const noteContent = ui.notesTextarea.value.trim();
  if (!noteContent) return;

  // Generate current timestamp (formatted HH:MM AM/PM)
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const timeFormatted = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

  // Save note to Case timeline database for active session
  sessionDatabase[state.activeSessionId].case.timeline.push({
    time: timeFormatted,
    type: 'note-added',
    text: noteContent
  });

  // Clear textarea notes box
  ui.notesTextarea.value = '';

  // Re-render timeline log view
  renderTimeline(sessionDatabase[state.activeSessionId].case.timeline);
}

function toggleEditProfile() {
  const sessionId = state.activeSessionId;
  const data = sessionDatabase[sessionId];
  if (!data) return;

  if (!state.isEditingProfile) {
    // Switch to edit mode
    state.isEditingProfile = true;
    ui.editProfileBtn.innerHTML = `<i class="fas fa-save"></i> Save`;
    ui.editProfileBtn.classList.add('save-state');

    ui.custName.innerHTML = `<input type="text" class="slds-inline-input" id="edit-cust-name" value="${data.customer.name}">`;
    ui.custMobile.innerHTML = `<input type="text" class="slds-inline-input" id="edit-cust-mobile" value="${data.customer.mobile}">`;
    ui.custAltPhone.innerHTML = `<input type="text" class="slds-inline-input" id="edit-cust-altphone" value="${data.customer.altPhone}">`;
    ui.custEmail.innerHTML = `<input type="text" class="slds-inline-input" id="edit-cust-email" value="${data.customer.email}">`;
  } else {
    // Save changes
    const newName = document.getElementById('edit-cust-name').value.trim();
    const newMobile = document.getElementById('edit-cust-mobile').value.trim();
    const newAltPhone = document.getElementById('edit-cust-altphone').value.trim();
    const newEmail = document.getElementById('edit-cust-email').value.trim();

    const oldCust = data.customer;
    const changes = [];

    if (newName !== oldCust.name) changes.push(`Name: ${oldCust.name} -> ${newName}`);
    if (newMobile !== oldCust.mobile) changes.push(`Mobile Phone: ${oldCust.mobile} -> ${newMobile}`);
    if (newAltPhone !== oldCust.altPhone) changes.push(`Alternate Phone: ${oldCust.altPhone} -> ${newAltPhone}`);
    if (newEmail !== oldCust.email) changes.push(`Email Address: ${oldCust.email} -> ${newEmail}`);

    if (changes.length > 0) {
      // Apply updates to the database
      oldCust.name = newName;
      oldCust.mobile = newMobile;
      oldCust.altPhone = newAltPhone;
      oldCust.email = newEmail;

      // Generate current timestamp (formatted HH:MM AM/PM)
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const timeFormatted = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

      // Append detail change record to Case History Timeline
      const changeText = `Customer details updated: ${changes.join(', ')}.`;
      data.case.timeline.push({
        time: timeFormatted,
        type: 'system-ok',
        text: changeText
      });
    }

    state.isEditingProfile = false;
    ui.editProfileBtn.innerHTML = `<i class="fas fa-pencil-alt"></i> Edit`;
    ui.editProfileBtn.classList.remove('save-state');

    // Re-render session data to show static text labels and update the timeline log
    loadSessionData(sessionId);
  }
}

function sendMockEmail() {
  const sessionId = state.activeSessionId;
  const data = sessionDatabase[sessionId];
  if (!data) return;

  const to = ui.emailToInput.value.trim();
  const subject = ui.emailSubjectInput.value.trim();
  const body = ui.emailBodyTextarea.value.trim();

  if (!to || !subject || !body) {
    alert("Please fill in all email fields (To, Subject, and Body).");
    return;
  }

  // Generate current timestamp (formatted HH:MM AM/PM)
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const timeFormatted = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

  // Log email to Interactive Case History Timeline
  const emailLogText = `Email sent to ${to} by Agent Arjun. Subject: ${subject}. Context: ${body}.`;
  data.case.timeline.push({
    time: timeFormatted,
    type: 'note-added',
    text: emailLogText
  });

  // Clear Subject and Body fields
  ui.emailSubjectInput.value = '';
  ui.emailBodyTextarea.value = '';

  // Re-render timeline log view
  renderTimeline(data.case.timeline);
}


