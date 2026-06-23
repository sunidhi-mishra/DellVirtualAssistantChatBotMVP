# 💻 Dell Support Virtual Assistant & Service Console MVP

> 💡 **MVP Status Indicator**: This project is currently a **Minimum Viable Product (MVP) Prototype** designed to demonstrate key user flows, layout grids, and interactive state management. It is **not a final product** and is built on a lightweight vanilla web stack (HTML5/CSS3/JavaScript) for proof-of-concept and user evaluation.

---

## 🌟 Overview

This repository hosts a dual-mode MVP showing the support experience from both the customer and agent perspectives:

1. 🧑‍💻 **Customer-Facing Portal & Virtual Assistant**: A modern support portal allowing customers to submit Dell Service Tags, run automated validation checkups, view warranty statuses, track shipping updates, or trigger agent handoffs.
2. 🎧 **Agent Salesforce Service Console**: A responsive split-screen dashboard resembling the Salesforce Lightning console interface. It features real-time SLA count-down indicators, active handle time tracking, editable CRM customer details, inline emails, and full chat control.

---

## 🌐 Live Deployments

You can view and test the live interactive MVP sites hosted on Firebase here:

[![Launch Customer Portal](https://img.shields.io/badge/Customer%20Portal-Launch%20MVP-0076CE?style=for-the-badge&logo=dell&logoColor=white)](https://dellchatbotmvp.web.app/)
[![Launch Agent Console](https://img.shields.io/badge/Agent%20Console-Launch%20MVP-1b2a47?style=for-the-badge&logo=salesforce&logoColor=white)](https://dellchatbotmvp-agent.web.app/)
[![Launch User Journey Flowchart](https://img.shields.io/badge/User%20Journey%20Flowchart-Launch%20Portal-28a745?style=for-the-badge&logo=firebase&logoColor=white)](https://userjourneyflowchart.web.app/)

---

## 📸 Screenshots

### 1. 🌐 Customer Support Portal & Virtual Assistant
*Centrally located support options page with the slide-out AI assistant interface activated.*
![Customer Portal](/screenshots/customer_portal.png)

### 2. ⚡ Agent Salesforce Service Console
*Agent-focused view displaying the active conversation, customer specs, and diagnostic warranty flags.*
![Salesforce Console](/screenshots/salesforce_console.png)

### 3. 🚫 No Active Chat Placeholder State
*The placeholder screen loaded automatically when all active/ended session tabs are closed, complete with AHT clock resets.*
![No Active Chat State](/screenshots/no_active_chat.png)

---

## 🚀 Key Features

### 🧑‍💻 Customer-Facing Portal
* 🔍 **Regex Validation**: Standard validation regex ensuring Service Tags strictly follow the 7-character alphanumeric format.
* 📦 **Order Status Tool**: Live order tracking interface checking 10-digit IDs for instant dispatch status updates.
* 💊 **Interactive Option Pills**: Interactive decision pills to narrow down diagnostics or request immediate agent transfer.
* 🔄 **Session Resets**: Auto-resets chat history and states upon panel closure to support clean re-runs.

### 🎧 Agent Salesforce Service Console
* 🎛️ **Split Layout (1/3 vs 2/3)**: Left-hand chat logs and right-hand CRM details designed around standard Salesforce Lightning metrics.
* ⏰ **Interactive SLA Clocks**: Flashing warning animations and a 30s countdown timer on incoming route requests.
* 🚨 **SLA Timeout Notifications**: Auto-removed missed requests with slide-in warning toasts and Red System Log stamps in Case Activity Timelines.
* 📧 **Inline CRM & Emails**: Inline editable customer cards and mock email composers to log correspondence directly to Case history.
* ❌ **Graceful Tab Dismissals**: Muted ended tabs with click-to-close buttons that dynamically shift focus to active sessions or trigger the centered "No Active Chat" placeholder.

---

## 🗺️ Out Of Warranty (OOW) User Journey (India)

This section outlines the business logic, conversational flow, and routing rules for the Dell India Out of Warranty customer support experience.

### 📶 Support Service Levels (L1 – L5)
The support matrix divides queries into five handling tiers to optimize automated self-service vs. human resolution:

| Level | Name | Who Handles | Scope / Covers |
| :--- | :--- | :--- | :--- |
| **L1** | Automated Lookup | Bot Only | Warranty status lookup, order/dispatch tracking, and redirects to Dell.com software resources. |
| **L2** | Hardware Diagnosis | Bot-led → Agent closes | Interactive KB decision tree for top 5 hardware faults. Resolves or flags parts replacement before L4 handoff. |
| **L3** | Information Handoff | Human Agent | Handling parts pricing, stock availability, warranty eligibility/pricing, and end-of-life (EOL) queries. |
| **L4** | Agent Resolution | Human Agent | Verifying case history, logging justification, and generating quotes for part replacement (arrives from L2/L3). |
| **L5** | Escalation / SME | Agent & SME | High-risk/complex cases: SLA breach risk, contract disputes, account manager issues, PO/billing discrepancies, or part shortages. |

---

### ⚙️ Main Decision Spine & Routing Logic

1. **Entry & Greeting**: Customer initiates chat; the bot requests the **Service Tag** or **Express Service Code**.
2. **Service Tag Validation**:
   - **Valid**: Proceeds to background checks.
   - **Invalid**: Triggers a **Re-entry Loop** (Max 3 attempts). Attempt 2 adds helper instructions; Attempt 3 failure redirects to voice queues / Dell.com support and ends with a survey.
3. **Background Checks**: Silent checks run to retrieve warranty status and flag active case lookups.
4. **Operating Hours Check**: Checks if the current local time is within **Mon–Fri 9:00 AM – 6:00 PM IST**.
   - **Within Hours**: Main Menu is loaded with live agent handoff enabled.
   - **Out of Hours (OOH)**: Main Menu is loaded with Option 5 modified to `[Currently unavailable] Connect to Live Agent` and customer is prompted with support hours.

---

### 🔀 Conversational Support Branches

- **Branch A: Hardware & Performance [L2]**
  - Prompt: Select hardware issue (Damage/spillage, display, power, battery, or thermal).
  - Runs the bot-led rule-based decision tree. If resolved, displays the KB answer. If unresolved or parts replacement is identified, routes to **Block 8 (Agent Handoff)**.
- **Branch B: Software, OS & Drivers [L1]**
  - Delivers a machine-specific Product Support Page URL. Customer can choose to accept the link or click "Talk to Agent" (routes to Block 8).
- **Branch C: Check Warranty Status [L1]**
  - Displays the Service Tag status (Active/Expired) and expiration date pulled from the background check, then routes to the **Closing Loop**.
- **Branch D: Order & Dispatch Status [L1]**
  - Customer enters a 10-digit Tracking / Order ID. If found, shows transit status, ETA, and tracking link. If not found, runs a re-entry loop (Max 3 attempts) before redirecting to support.

---

### 🏁 Shared Handoff & Loop Closure

- **Block 8 — Agent Handoff**: Connects to the live agent queue if within working hours. If an agent request is made Out of Hours (OOH), a mid-session handoff message is shown, and the session ends.
- **Closing Loop (CL)**: Reached after successful L1/L2 resolutions. Asks the customer if they need anything else:
  - **Yes**: Loops back to the operating hours check and loads the Main Menu.
  - **No**: Thanks the customer, closes the session, and triggers the feedback survey.
- **Survey Trigger**: A feedback survey auto-triggers after every session end (both bot-resolved and agent-resolved).

---

## 🛠️ How to Run Locally

Since this prototype is built using a clean, native frontend stack, no installations are required:

1. 📥 **Clone or Download**: Clone or download the repository to your local workspace.
2. 🖥️ **Open Files**: Open `index.html` (Customer Portal) or `console.html` (Salesforce Service Console) directly in any modern web browser.
3. 🌐 **Serve Locally**: Alternatively, you can run a local server inside the root directory to preview live interactions (e.g. `npx http-server` or using VS Code's Live Server extension).
