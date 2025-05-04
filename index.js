
let incidents = [
    {
        id: '1',
        title: 'Chatbot promoting harmful content',
        description: 'AI chatbot was found to be providing instructions for self-harm when prompted with certain questions.',
        severity: 'critical',
        type: 'physical-harm',
        date: new Date('2023-05-15'),
        source: 'https://example.com/report1'
    },
    {
        id: '2',
        title: 'Facial recognition bias',
        description: 'System showed significantly higher error rates for women and people of color in identity verification.',
        severity: 'high',
        type: 'bias',
        date: new Date('2023-04-22'),
        source: 'https://example.com/report2'
    },
    {
        id: '3',
        title: 'Data leak in AI training set',
        description: 'Sensitive personal information was found to be included in a publicly released training dataset.',
        severity: 'high',
        type: 'privacy',
        date: new Date('2023-03-10')
    },
    {
        id: '4',
        title: 'Autocomplete suggesting offensive terms',
        description: 'Search engine autocomplete was found to suggest offensive and discriminatory terms for certain queries.',
        severity: 'medium',
        type: 'bias',
        date: new Date('2023-06-01'),
        source: 'https://example.com/report4'
    },
    {
        id: '5',
        title: 'Medical diagnosis system error',
        description: 'AI system for diagnosing rare conditions produced false negatives in 12% of test cases.',
        severity: 'critical',
        type: 'physical-harm',
        date: new Date('2023-05-28')
    },
    {
        id: '6',
        title: 'Deepfake used for fraud',
        description: 'AI-generated voice deepfake was used to impersonate a CEO and authorize fraudulent transfers.',
        severity: 'high',
        type: 'security',
        date: new Date('2023-02-14'),
        source: 'https://example.com/report6'
    },
    {
        id: '7',
        title: 'Recommendation system promoting misinformation',
        description: 'Video platform algorithm was found to disproportionately recommend conspiracy theory content.',
        severity: 'medium',
        type: 'misinformation',
        date: new Date('2023-01-30')
    }
];


const incidentsContainer = document.getElementById('incidents-container');
const totalIncidentsSpan = document.getElementById('total-incidents');
const filteredIncidentsSpan = document.getElementById('filtered-incidents');
const refreshBtn = document.getElementById('refresh-btn');
const reportBtn = document.getElementById('report-btn');
const applyFiltersBtn = document.getElementById('apply-filters');
const resetFiltersBtn = document.getElementById('reset-filters');
const severityFilter = document.getElementById('severity-filter');
const typeFilter = document.getElementById('type-filter');
const dateFilter = document.getElementById('date-filter');
const modal = document.getElementById('report-modal');
const closeBtn = document.querySelector('.close-btn');
const incidentForm = document.getElementById('incident-form');


let currentFilters = {
    severity: 'all',
    type: 'all',
    date: 'all'
};


function initDashboard() {
    renderIncidents(incidents);
    updateStats(incidents.length, incidents.length);
    setupEventListeners();
}


function renderIncidents(incidentsToRender) {
    incidentsContainer.innerHTML = '';

    if (incidentsToRender.length === 0) {
        incidentsContainer.innerHTML = '<div class="no-results">No incidents match your filters.</div>';
        return;
    }

    incidentsToRender.forEach(incident => {
        const incidentCard = document.createElement('div');
        incidentCard.className = `incident-card ${incident.severity}`;
        incidentCard.dataset.id = incident.id;

        const severityClass = `severity-${incident.severity}`;
        const typeLabel = getTypeLabel(incident.type);
        const formattedDate = formatDate(incident.date);

        incidentCard.innerHTML = `
            <div class="incident-header">
                <h3 class="incident-title">${incident.title}</h3>
                <div class="incident-meta">
                    <span class="incident-severity ${severityClass}">${incident.severity}</span>
                    <span class="incident-type">${typeLabel}</span>
                    <span class="incident-date">${formattedDate}</span>
                </div>
            </div>
            <p class="incident-description">${incident.description}</p>
            ${incident.source ? `<p class="incident-source">Source: <a href="${incident.source}" target="_blank">${incident.source}</a></p>` : ''}
            <div class="incident-actions">
                <button class="btn delete-btn" data-id="${incident.id}">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;

        incidentsContainer.appendChild(incidentCard);
    });

    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDeleteIncident);
    });
}


function handleDeleteIncident(event) {
    const incidentId = event.target.closest('.delete-btn').dataset.id;
    if (confirm('Are you sure you want to delete this incident?')) {
        incidents = incidents.filter(incident => incident.id !== incidentId);
        applyFilters();
    }
}

// Apply filters to incidents
function applyFilters() {
    let filtered = [...incidents];

    // Severity filter
    if (currentFilters.severity !== 'all') {
        filtered = filtered.filter(incident => incident.severity === currentFilters.severity);
    }

    // Type filter
    if (currentFilters.type !== 'all') {
        filtered = filtered.filter(incident => incident.type === currentFilters.type);
    }

    // Date filter
    if (currentFilters.date !== 'all') {
        const now = new Date();
        let cutoffDate = new Date();

        switch (currentFilters.date) {
            case 'week':
                cutoffDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                cutoffDate.setMonth(now.getMonth() - 1);
                break;
            case 'year':
                cutoffDate.setFullYear(now.getFullYear() - 1);
                break;
        }

        filtered = filtered.filter(incident => incident.date >= cutoffDate);
    }

    renderIncidents(filtered);
    updateStats(incidents.length, filtered.length);
}

// Update statistics display
function updateStats(total, filtered) {
    totalIncidentsSpan.textContent = total.toString();
    filteredIncidentsSpan.textContent = filtered === total ? '' : `(${filtered} filtered)`;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    applyFiltersBtn.addEventListener('click', () => {
        currentFilters = {
            severity: severityFilter.value,
            type: typeFilter.value,
            date: dateFilter.value
        };
        applyFilters();
    });

    resetFiltersBtn.addEventListener('click', () => {
        severityFilter.value = 'all';
        typeFilter.value = 'all';
        dateFilter.value = 'all';
        currentFilters = {
            severity: 'all',
            type: 'all',
            date: 'all'
        };
        applyFilters();
    });

    // Refresh button
    refreshBtn.addEventListener('click', () => {
        renderIncidents(incidents);
        updateStats(incidents.length, incidents.length);
    });

    // Report button and modal
    reportBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.getElementById('incident-date').valueAsDate = new Date();
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Form submission
    incidentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('incident-title').value;
        const description = document.getElementById('incident-description').value;
        const severity = document.getElementById('incident-severity').value;
        const type = document.getElementById('incident-type').value;
        const date = new Date(document.getElementById('incident-date').value);
        const source = document.getElementById('incident-source').value;

        const newIncident = {
            id: generateId(),
            title,
            description,
            severity,
            type,
            date,
            source: source || undefined
        };

        incidents.unshift(newIncident);
        renderIncidents(incidents);
        updateStats(incidents.length, incidents.length);
        modal.style.display = 'none';
        incidentForm.reset();
    });
}

// Helper functions
function getTypeLabel(type) {
    const labels = {
        'bias': 'Bias/Discrimination',
        'privacy': 'Privacy Violation',
        'security': 'Security Breach',
        'misinformation': 'Misinformation',
        'physical-harm': 'Physical Harm',
        'other': 'Other'
    };
    return labels[type];
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function generateId() {
    return Math.random().toString(36).substring(2, 9);
}

// Initialize the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);