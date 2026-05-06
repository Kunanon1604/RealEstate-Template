/**
 * Admin Panel Scripts
 * HomeScape Real Estate Template
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle Mobile
    const openSidebar = document.getElementById('open-sidebar');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    function toggleSidebar() {
        if (sidebar) sidebar.classList.toggle('-translate-x-full');
        if (sidebarOverlay) sidebarOverlay.classList.toggle('hidden');
    }

    if (openSidebar) openSidebar.addEventListener('click', toggleSidebar);
    if (closeSidebar) closeSidebar.addEventListener('click', toggleSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', toggleSidebar);

    // ── Shared Config ──
    if (typeof Chart === 'undefined') return;

    const fontFamily = "'Inter', sans-serif";
    const tooltipConfig = {
        backgroundColor: 'rgba(17, 24, 39, 0.92)',
        titleFont: { family: fontFamily, size: 13, weight: '600' },
        bodyFont: { family: fontFamily, size: 12 },
        padding: 12,
        cornerRadius: 10,
        boxPadding: 4,
        usePointStyle: true,
    };
    const legendConfig = {
        display: true,
        position: 'top',
        labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            boxWidth: 6,
            padding: 16,
            font: { family: fontFamily, size: 11 }
        }
    };
    const gridColor = 'rgba(243,244,246,1)';

    // ── 1. Main Traffic & Lead Chart ──
    const mainEl = document.getElementById('mainChart');
    if (mainEl) {
        const ctx = mainEl.getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, 0, 350);
        grad.addColorStop(0, 'rgba(99,102,241,0.18)');
        grad.addColorStop(1, 'rgba(99,102,241,0)');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Website Views',
                        data: [12000, 19000, 15000, 22000, 30000, 45000],
                        borderColor: '#6366f1',
                        backgroundColor: grad,
                        borderWidth: 3,
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#6366f1',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Inquiries',
                        data: [300, 450, 400, 600, 800, 1200],
                        borderColor: '#22c55e',
                        borderWidth: 3,
                        borderDash: [6, 4],
                        pointBackgroundColor: '#fff',
                        pointBorderColor: '#22c55e',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        fill: false,
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: { legend: legendConfig, tooltip: tooltipConfig },
                scales: {
                    x: { grid: { display: false }, ticks: { font: { family: fontFamily, size: 11 } } },
                    y: { position: 'left', grid: { color: gridColor, drawBorder: false }, ticks: { font: { family: fontFamily, size: 11 } } },
                    y1: { position: 'right', display: false }
                }
            }
        });
    }

    // ── 2. Revenue Bar Chart ──
    const revEl = document.getElementById('revenueChart');
    if (revEl) {
        const ctx = revEl.getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, 0, 200);
        grad.addColorStop(0, '#22c55e');
        grad.addColorStop(1, '#86efac');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue ($k)',
                    data: [185, 210, 195, 240, 265, 284],
                    backgroundColor: grad,
                    borderRadius: 8,
                    borderSkipped: false,
                    barPercentage: 0.6,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: tooltipConfig
                },
                scales: {
                    x: { grid: { display: false }, ticks: { font: { family: fontFamily, size: 10 } } },
                    y: { display: false }
                }
            }
        });
    }

    // ── 3. Property Types Doughnut ──
    const ptEl = document.getElementById('propertyTypeChart');
    if (ptEl) {
        new Chart(ptEl.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Residential', 'Commercial', 'Land', 'Industrial'],
                datasets: [{
                    data: [540, 320, 210, 178],
                    backgroundColor: ['#6366f1', '#22c55e', '#f59e0b', '#ec4899'],
                    borderWidth: 0,
                    hoverOffset: 8,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '68%',
                plugins: {
                    legend: { display: false },
                    tooltip: tooltipConfig
                }
            }
        });
    }

    // ── 4. Lead Sources Polar Area ──
    const lsEl = document.getElementById('leadSourceChart');
    if (lsEl) {
        new Chart(lsEl.getContext('2d'), {
            type: 'polarArea',
            data: {
                labels: ['Website', 'Referral', 'Social Media', 'Ads'],
                datasets: [{
                    data: [420, 280, 190, 135],
                    backgroundColor: [
                        'rgba(99,102,241,0.7)',
                        'rgba(34,197,94,0.7)',
                        'rgba(245,158,11,0.7)',
                        'rgba(59,130,246,0.7)'
                    ],
                    borderWidth: 0,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: tooltipConfig
                },
                scales: {
                    r: {
                        grid: { color: 'rgba(243,244,246,0.8)' },
                        ticks: { display: false },
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // ── 5. Conversion Funnel (Horizontal Bar) ──
    const fnEl = document.getElementById('funnelChart');
    if (fnEl) {
        new Chart(fnEl.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Visitors', 'Leads', 'Qualified', 'Viewings', 'Offers', 'Closed'],
                datasets: [{
                    data: [45200, 3240, 1820, 920, 420, 68],
                    backgroundColor: [
                        'rgba(99,102,241,0.8)',
                        'rgba(99,102,241,0.65)',
                        'rgba(99,102,241,0.5)',
                        'rgba(99,102,241,0.4)',
                        'rgba(99,102,241,0.3)',
                        'rgba(34,197,94,0.8)'
                    ],
                    borderRadius: 6,
                    borderSkipped: false,
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: tooltipConfig
                },
                scales: {
                    x: { display: false },
                    y: {
                        grid: { display: false },
                        ticks: { font: { family: fontFamily, size: 10 } }
                    }
                }
            }
        });
    }

    // ── 6. Geographic Distribution ──
    const geoEl = document.getElementById('geoChart');
    if (geoEl) {
        new Chart(geoEl.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Downtown', 'Suburbs', 'Beachfront', 'Hillside', 'Industrial Zone', 'Lakefront'],
                datasets: [{
                    label: 'Properties',
                    data: [320, 280, 195, 160, 145, 148],
                    backgroundColor: [
                        '#6366f1', '#8b5cf6', '#a78bfa',
                        '#c4b5fd', '#ddd6fe', '#ede9fe'
                    ],
                    borderRadius: 6,
                    borderSkipped: false,
                    barPercentage: 0.7,
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: tooltipConfig
                },
                scales: {
                    x: { grid: { color: gridColor, drawBorder: false }, ticks: { font: { family: fontFamily, size: 10 } } },
                    y: { grid: { display: false }, ticks: { font: { family: fontFamily, size: 11 } } }
                }
            }
        });
    }

    // ── 7. Weekly Performance (Stacked Bar) ──
    const wkEl = document.getElementById('weeklyChart');
    if (wkEl) {
        new Chart(wkEl.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Views',
                        data: [1200, 1900, 1700, 2100, 2400, 1800, 900],
                        backgroundColor: 'rgba(99,102,241,0.75)',
                        borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 6, bottomRight: 6 },
                        borderSkipped: false,
                    },
                    {
                        label: 'Inquiries',
                        data: [45, 62, 55, 78, 92, 68, 32],
                        backgroundColor: 'rgba(34,197,94,0.75)',
                        borderRadius: 0,
                        borderSkipped: false,
                    },
                    {
                        label: 'Closings',
                        data: [2, 3, 1, 4, 5, 3, 0],
                        backgroundColor: 'rgba(245,158,11,0.75)',
                        borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 },
                        borderSkipped: false,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: legendConfig, tooltip: tooltipConfig },
                scales: {
                    x: { stacked: true, grid: { display: false }, ticks: { font: { family: fontFamily, size: 11 } } },
                    y: { stacked: true, grid: { color: gridColor, drawBorder: false }, ticks: { font: { family: fontFamily, size: 11 } } }
                }
            }
        });
    }

    // ── 8. Agent Performance (Radar) ──
    const agEl = document.getElementById('agentChart');
    if (agEl) {
        new Chart(agEl.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Listings', 'Viewings', 'Offers', 'Closings', 'Revenue', 'Satisfaction'],
                datasets: [
                    {
                        label: 'John S.',
                        data: [85, 92, 78, 88, 90, 95],
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99,102,241,0.15)',
                        borderWidth: 2,
                        pointBackgroundColor: '#6366f1',
                        pointRadius: 3,
                    },
                    {
                        label: 'Maria L.',
                        data: [78, 85, 90, 72, 82, 88],
                        borderColor: '#22c55e',
                        backgroundColor: 'rgba(34,197,94,0.15)',
                        borderWidth: 2,
                        pointBackgroundColor: '#22c55e',
                        pointRadius: 3,
                    },
                    {
                        label: 'Alex K.',
                        data: [92, 70, 65, 80, 75, 82],
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245,158,11,0.15)',
                        borderWidth: 2,
                        pointBackgroundColor: '#f59e0b',
                        pointRadius: 3,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: legendConfig, tooltip: tooltipConfig },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(243,244,246,0.8)' },
                        grid: { color: 'rgba(243,244,246,0.8)' },
                        pointLabels: { font: { family: fontFamily, size: 11 } },
                        ticks: { display: false },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
});
