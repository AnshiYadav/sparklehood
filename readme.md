# AI Safety Incident Dashboard

![Dashboard Screenshot](./screenshot.png) *(Note: Add a screenshot later)*

A web-based dashboard for tracking and managing AI safety incidents with filtering, reporting, and incident management capabilities.

## Features

- **Incident Tracking**: View all reported AI safety incidents in a clean card-based layout
- **Severity Classification**: Color-coded incidents by severity (Low, Medium, High, Critical)
- **Advanced Filtering**: Filter incidents by:
  - Severity level
  - Incident type (Bias, Privacy, Security, etc.)
  - Time period (Last week, month, year)
- **Incident Reporting**: Add new incidents through a modal form
- **Incident Management**: Delete existing incidents with confirmation
- **Real-time Stats**: Track total and filtered incident counts

## Technologies Used

- **Frontend**:
  - HTML5, CSS3, JavaScript (ES6+)
  - Responsive design with Flexbox
  - Font Awesome icons
  - Google Fonts (Roboto)

## Installation

### Option 1: Simple Local Run
1. Clone or download this repository
2. Open `index.html` in any modern browser

### Option 2: With Live Server (Recommended)
1. Install [VS Code](https://code.visualstudio.com/)
2. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
3. Right-click `index.html` and select "Open with Live Server"

### Option 3: Using Node.js HTTP Server
1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Run in terminal:
   ```bash
   npx http-server