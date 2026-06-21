# Dell Support Virtual Assistant & Service Console MVP

> [!NOTE]  
> **MVP Status Indicator**: This project is currently a **Minimum Viable Product (MVP) Prototype** designed to demonstrate key user flows, layout grids, and interactive state management. It is **not a final product** and is built on a lightweight vanilla web stack (HTML5/CSS3/JavaScript) for proof-of-concept and user evaluation.

---

## 🌟 Overview

This repository hosts a dual-mode MVP showing the support experience from both the customer and agent perspectives:

1. **Customer-Facing Portal & Virtual Assistant**: A modern support portal allowing customers to submit Dell Service Tags, run automated validation checkups, view warranty statuses, track shipping updates, or trigger agent handoffs.
2. **Agent Salesforce Service Console**: A responsive split-screen dashboard resembling the Salesforce Lightning console interface. It features real-time SLA count-down indicators, active handle time tracking, editable CRM customer details, inline emails, and full chat control.

---

## 📸 Screenshots

### 1. Customer Support Portal & Virtual Assistant
*Centrally located support options page with the slide-out AI assistant interface activated.*
![Customer Portal](/screenshots/customer_portal.png)

### 2. Agent Salesforce Service Console
*Agent-focused view displaying the active conversation, customer specs, and diagnostic warranty flags.*
![Salesforce Console](/screenshots/salesforce_console.png)

### 3. No Active Chat Placeholder State
*The placeholder screen loaded automatically when all active/ended session tabs are closed, complete with AHT clock resets.*
![No Active Chat State](/screenshots/no_active_chat.png)

---

## 🚀 Key Features

### 🧑‍💻 Customer-Facing Portal
* **Regex Validation**: Standard validation regex ensuring Service Tags strictly follow the 7-character alphanumeric format.
* **Order Status Tool**: Live order tracking interface checking 10-digit IDs for instant dispatch status updates.
* **Interactive Option Pills**: Interactive decision pills to narrow down diagnostics or request immediate agent transfer.
* **Session Resets**: Auto-resets chat history and states upon panel closure to support clean re-runs.

### 🎧 Agent Salesforce Service Console
* **Split Layout (1/3 vs 2/3)**: Left-hand chat logs and right-hand CRM details designed around standard Salesforce Lightning metrics.
* **Interactive SLA Clocks**: Flashing warning animations and a 30s countdown timer on incoming route requests.
* **SLA Timeout Notifications**: Auto-removed missed requests with slide-in warning toasts and Red System Log stamps in Case Activity Timelines.
* **Inline CRM & Emails**: Inline editable customer cards and mock email composers to log correspondence directly to Case history.
* **Graceful Tab Dismissals**: Muted ended tabs with click-to-close buttons that dynamically shift focus to active sessions or trigger the centered "No Active Chat" placeholder.

---

## 🛠️ How to Run Locally

Since this prototype is built using a clean, native frontend stack, no installations are required:

1. Clone or download the repository to your local workspace.
2. Open `index.html` (Customer Portal) or `console.html` (Salesforce Service Console) directly in any modern web browser.
3. Alternatively, you can run a local server inside the root directory to preview live interactions (e.g. `npx http-server` or using VS Code's Live Server extension).
