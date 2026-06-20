/* ==========================================================================
   Dell Technical Support Portal & Assistant - Interactive Application Logic
   ========================================================================== */

// 1. Centralized Application State
const appState = {
  chatOpen: false,
  currentState: 'closed', // 'closed', 'greeting', 'tag_captured', 'option_selected'
  serviceTag: '',
  selectedOption: '',
  typingDelayMs: 900 // Simulated natural response delay
};

// 2. DOM Elements Selection
const elements = {
  virtualChatBtn: document.getElementById('virtual-chat-btn'),
  closeChatBtn: document.getElementById('close-chat-btn'),
  chatPanel: document.getElementById('chatPanel'),
  chatLog: document.getElementById('chatLog'),
  chatInputContainer: document.getElementById('chatInputContainer')
};

// 3. Initialize Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  elements.virtualChatBtn.addEventListener('click', openChat);
  elements.closeChatBtn.addEventListener('click', closeChat);
  
  // Initialize bottom container placeholder
  updateInputContainerPlaceholder("Select an action above to start a session.");
});

// 4. Panel Toggle Functions
function openChat() {
  if (appState.chatOpen) return;
  
  appState.chatOpen = true;
  elements.chatPanel.classList.add('is-open');
  elements.chatPanel.setAttribute('aria-hidden', 'false');
  elements.virtualChatBtn.setAttribute('aria-expanded', 'true');
  
  // If we are opening chat for the first time, boot state machine to 'greeting'
  if (appState.currentState === 'closed') {
    transitionState('greeting');
  }
}

function closeChat() {
  if (!appState.chatOpen) return;
  
  appState.chatOpen = false;
  elements.chatPanel.classList.remove('is-open');
  elements.chatPanel.setAttribute('aria-hidden', 'true');
  elements.virtualChatBtn.setAttribute('aria-expanded', 'false');
}

// 5. State Machine Transition Manager
function transitionState(newState) {
  appState.currentState = newState;
  
  switch(newState) {
    case 'greeting':
      handleGreetingState();
      break;
      
    case 'tag_captured':
      handleTagCapturedState();
      break;
      
    case 'option_selected':
      handleOptionSelectedState();
      break;
  }
}

// 6. Typing Indicator Utility
function showTypingIndicator() {
  const indicator = document.createElement('div');
  indicator.className = 'typing-indicator';
  indicator.id = 'temp-typing-indicator';
  indicator.innerHTML = `
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
  `;
  elements.chatLog.appendChild(indicator);
  scrollToBottom();
}

function removeTypingIndicator() {
  const indicator = document.getElementById('temp-typing-indicator');
  if (indicator) {
    indicator.remove();
  }
}

// 7. Scroll helper
function scrollToBottom() {
  elements.chatLog.scrollTop = elements.chatLog.scrollHeight;
}

// 8. Message Builder Utility
function appendBotMessage(text, callback) {
  showTypingIndicator();
  
  setTimeout(() => {
    removeTypingIndicator();
    
    const container = document.createElement('div');
    container.className = 'chat-bubble-container bot';
    
    container.innerHTML = `
      <div class="bubble-avatar">
        <i class="fas fa-robot"></i>
      </div>
      <div class="chat-bubble">
        ${text}
      </div>
    `;
    
    elements.chatLog.appendChild(container);
    scrollToBottom();
    
    if (callback) callback();
  }, appState.typingDelayMs);
}

function appendUserMessage(text) {
  const container = document.createElement('div');
  container.className = 'chat-bubble-container user';
  
  container.innerHTML = `
    <div class="bubble-avatar">
      <i class="far fa-user"></i>
    </div>
    <div class="chat-bubble">
      ${text}
    </div>
  `;
  
  elements.chatLog.appendChild(container);
  scrollToBottom();
}

// 9. Input Container Footer Manager
function updateInputContainerPlaceholder(text) {
  elements.chatInputContainer.innerHTML = `
    <div class="chat-input-placeholder-text">
      ${text}
    </div>
  `;
}

// ==========================================================================
// STATE HANDLERS
// ==========================================================================

// State 2: Greeting & Service Tag Input
function handleGreetingState() {
  updateInputContainerPlaceholder("Awaiting Service Tag input in chat.");
  
  const greetingText = "Hello! Thank you for contacting Dell Technical Support. I am your Dell Virtual Assistant. To get started, please enter your Service Tag or Express Service Code.";
  
  appendBotMessage(greetingText, () => {
    // Append the interactive Form Card inside the chat list
    const formCard = document.createElement('div');
    formCard.className = 'tag-input-form-card';
    formCard.id = 'service-tag-form-card';
    
    formCard.innerHTML = `
      <div class="form-group-row">
        <input type="text" class="tag-text-input" id="tag-input-field" placeholder="e.g., 4ABC123" maxlength="20" aria-label="Enter Service Tag">
        <button type="button" class="tag-submit-btn" id="tag-submit-btn" aria-label="Submit Service Tag">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
      <div class="validation-error-msg" id="validation-error-msg">
        <i class="fas fa-exclamation-circle"></i> Please enter a valid 7-character alphanumeric Service Tag (e.g., 4ABC123).
      </div>
    `;
    
    elements.chatLog.appendChild(formCard);
    scrollToBottom();
    
    // Bind Events to Form Card
    const inputField = document.getElementById('tag-input-field');
    const submitBtn = document.getElementById('tag-submit-btn');
    const errorMsg = document.getElementById('validation-error-msg');
    
    inputField.focus();
    
    // Handle Enter Keypress
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        processServiceTag(inputField, submitBtn, errorMsg);
      }
    });
    
    // Handle Button Click
    submitBtn.addEventListener('click', () => {
      processServiceTag(inputField, submitBtn, errorMsg);
    });
  });
}

// Service Tag Processing & Validation
function processServiceTag(input, submitBtn, error) {
  const value = input.value.trim().toUpperCase();
  
  // Dell Service Tag validation (7 Alphanumeric characters)
  const serviceTagRegex = /^[A-Z0-9]{7}$/;
  
  if (!serviceTagRegex.test(value)) {
    error.style.display = 'flex';
    input.classList.add('error-active');
    input.focus();
    scrollToBottom();
    return;
  }
  
  // Tag is valid! Lock current input card UI
  error.style.display = 'none';
  input.disabled = true;
  submitBtn.disabled = true;
  
  // Save tag in app state
  appState.serviceTag = value;
  
  // Append user bubble representing the selection
  appendUserMessage(`Service Tag: ${value}`);
  
  // Remove form card block from screen after small delay to keep log neat, or leave disabled
  // Per problem statement: "The text input field and submit button disappear or become disabled to freeze the answer"
  // Let's fade out the form card container
  const formCard = document.getElementById('service-tag-form-card');
  if (formCard) {
    formCard.style.opacity = '0.5';
    formCard.style.pointerEvents = 'none';
  }
  
  // Transition state
  transitionState('tag_captured');
}

// State 3: Service Tag Captured -> Render Menu Option Pills
function handleTagCapturedState() {
  updateInputContainerPlaceholder("Please choose a topic from the menu above.");
  
  const optionsText = "Thank you. To help me guide you to the right solution, please select an option from the menu below:";
  
  appendBotMessage(optionsText, () => {
    const pillsContainer = document.createElement('div');
    pillsContainer.className = 'options-pills-container';
    pillsContainer.id = 'pills-container';
    
    const options = [
      { id: 'hardware', text: '💻 Hardware & Performance Issues' },
      { id: 'software', text: '💿 Software, OS, & Drivers' },
      { id: 'warranty', text: '📋 Check Warranty Status' },
      { id: 'order', text: '📦 Order & Dispatch Status' },
      { id: 'live-agent', text: '🧑‍💻 Connect to Live Agent' }
    ];
    
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pill-button';
      btn.dataset.optionId = opt.id;
      btn.innerHTML = opt.text;
      
      btn.addEventListener('click', () => {
        selectOption(opt.id, opt.text);
      });
      
      pillsContainer.appendChild(btn);
    });
    
    elements.chatLog.appendChild(pillsContainer);
    scrollToBottom();
  });
}

// Selection of Menu Options
function selectOption(optionId, optionText) {
  // Lock menu pills
  const pills = document.querySelectorAll('.pill-button');
  pills.forEach(p => {
    p.disabled = true;
    if (p.dataset.optionId === optionId) {
      p.classList.add('selected');
    } else {
      p.style.opacity = '0.4';
    }
  });
  
  appState.selectedOption = optionId;
  
  // Add user bubble selection
  appendUserMessage(optionText);
  
  // Transition state
  transitionState('option_selected');
}

// State 4: Option Selected Handoffs
function handleOptionSelectedState() {
  let responseMsg = "";
  
  switch(appState.selectedOption) {
    case 'hardware':
      responseMsg = "Initiating a hardware diagnostic scan on your device. Please install Dell SupportAssist if prompted to complete local hardware analytics.";
      break;
      
    case 'software':
      responseMsg = "Redirecting your request to Software & Drivers repository. You can search latest packages directly by visiting the official Downloads page.";
      break;
      
    case 'warranty':
      responseMsg = `Checking status for Service Tag <strong>${appState.serviceTag}</strong>. <br><br><i class="fas fa-times-circle" style="color: #d93838;"></i> <strong>Warranty Status: Expired</strong><br>Last Active Warranty: Premium Support Plus<br>Device Model: Inspiron 15`;
      break;
      
    case 'order':
      responseMsg = "Please enter your 10-digit Tracking ID or Order ID.";
      break;
      
    case 'live-agent':
      responseMsg = "Transferring you to a human agent. Please hold. A Dell technical expert will join you in approximately 2 minutes.";
      break;
      
    default:
      responseMsg = "Thank you for selecting. Our team has been notified.";
  }
  
  if (appState.selectedOption === 'order') {
    appendBotMessage(responseMsg, () => {
      const trackingCard = document.createElement('div');
      trackingCard.className = 'tag-input-form-card';
      trackingCard.id = 'tracking-input-form-card';
      
      trackingCard.innerHTML = `
        <div class="form-group-row">
          <input type="text" class="tag-text-input" id="tracking-input-field" placeholder="e.g., 1234567890" maxlength="20" aria-label="Enter Tracking ID">
          <button type="button" class="tag-submit-btn" id="tracking-submit-btn" aria-label="Submit Tracking ID">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
        <div class="validation-error-msg" id="tracking-validation-error-msg">
          <i class="fas fa-exclamation-circle"></i> Please enter a valid 10-digit numeric Tracking ID or Order ID.
        </div>
      `;
      
      elements.chatLog.appendChild(trackingCard);
      scrollToBottom();
      
      const trInput = document.getElementById('tracking-input-field');
      const trSubmit = document.getElementById('tracking-submit-btn');
      const trError = document.getElementById('tracking-validation-error-msg');
      
      trInput.focus();
      
      const processTracking = () => {
        const val = trInput.value.trim();
        const trackingRegex = /^[0-9]{10}$/;
        
        if (!trackingRegex.test(val)) {
          trError.style.display = 'flex';
          trInput.focus();
          scrollToBottom();
          return;
        }
        
        trError.style.display = 'none';
        trInput.disabled = true;
        trSubmit.disabled = true;
        
        appendUserMessage(`Tracking ID: ${val}`);
        
        trackingCard.style.opacity = '0.5';
        trackingCard.style.pointerEvents = 'none';
        
        appendBotMessage(`Fetching dispatch updates for Tracking ID ${val}. Status: In Transit. Estimated delivery date: 2 business days.`);
      };
      
      trInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          processTracking();
        }
      });
      
      trSubmit.addEventListener('click', () => {
        processTracking();
      });
    });
  } else {
    appendBotMessage(responseMsg);
  }
}

// Reset Session for Clean Restart
function resetSession() {
  appState.currentState = 'closed';
  appState.serviceTag = '';
  appState.selectedOption = '';
  
  // Clear chat log contents
  elements.chatLog.innerHTML = '';
  
  // Transition back to greeting
  transitionState('greeting');
}
