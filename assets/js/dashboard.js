// Set minimum date for date input
const minDateStr = new Date().toISOString().split("T")[0];
const dateInputs = document.querySelectorAll("input[type='date']");
dateInputs.forEach(input => {
    input.setAttribute("min", minDateStr);
});

// Search Functionality
const taskSearchInput = document.getElementById('taskSearchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');

if (taskSearchInput) {
    taskSearchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        clearSearchBtn.style.display = searchTerm ? 'block' : 'none';
        searchTasks(searchTerm);
    });
}

if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', function() {
        taskSearchInput.value = '';
        clearSearchBtn.style.display = 'none';
        searchTasks('');
    });
}

function searchTasks(searchTerm) {
    const taskItems = document.querySelectorAll('.task-item');
    let visibleCount = 0;

    taskItems.forEach(task => {
        const taskTitle = task.querySelector('.task-title')?.textContent.toLowerCase() || '';
        const taskDescription = task.querySelector('.task-description')?.textContent.toLowerCase() || '';
        
        if (taskTitle.includes(searchTerm) || taskDescription.includes(searchTerm)) {
            task.style.display = 'flex';
            task.style.animation = 'slideIn 0.3s ease';
            visibleCount++;
        } else {
            task.style.display = 'none';
        }
    });

    // Show "no results" message if needed
    const todayTab = document.getElementById('today-tab');
    const completedTab = document.getElementById('completed-tab');
    
    if (searchTerm) {
    }
}

// Filter and Sort Functionality
const filterDeadlineSelect = document.getElementById('filterDeadline');
const sortBySelect = document.getElementById('sortBy');

if (filterDeadlineSelect) {
    filterDeadlineSelect.addEventListener('change', function() {
        applyFiltersAndSort();
    });
}

if (sortBySelect) {
    sortBySelect.addEventListener('change', function() {
        applyFiltersAndSort();
    });
}

function applyFiltersAndSort() {
    const activeTab = document.querySelector('.tab-content.active');
    const taskItems = activeTab.querySelectorAll('.task-item');
    const filterValue = filterDeadlineSelect.value;
    const sortValue = sortBySelect.value;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Create array of tasks with visible items
    let visibleTasks = Array.from(taskItems).filter(task => {
        return task.style.display !== 'none';
    });

    // Apply deadline filter
    visibleTasks = visibleTasks.filter(task => {
        const dateElement = task.querySelector('.task-date');
        if (!dateElement) return true;

        const taskDateStr = dateElement.textContent.trim();
        const taskDate = new Date(taskDateStr);
        taskDate.setHours(0, 0, 0, 0);

        switch(filterValue) {
            case 'today':
                return taskDate.getTime() === today.getTime();
            case 'week':
                const weekEnd = new Date(today);
                weekEnd.setDate(weekEnd.getDate() + 7);
                return taskDate >= today && taskDate <= weekEnd;
            case 'month':
                const monthEnd = new Date(today);
                monthEnd.setMonth(monthEnd.getMonth() + 1);
                return taskDate >= today && taskDate <= monthEnd;
            case 'overdue':
                return taskDate < today;
            case 'all':
            default:
                return true;
        }
    });

    // Apply sorting
    visibleTasks.sort((taskA, taskB) => {
        switch(sortValue) {
            case 'deadline': {
                const dateA = new Date(taskA.querySelector('.task-date').textContent);
                const dateB = new Date(taskB.querySelector('.task-date').textContent);
                return dateA - dateB;
            }
            case 'created':
                // Keep original order (database order)
                return 0;
            case 'title': {
                const titleA = taskA.querySelector('.task-title').textContent.toLowerCase();
                const titleB = taskB.querySelector('.task-title').textContent.toLowerCase();
                return titleA.localeCompare(titleB);
            }
            default:
                return 0;
        }
    });

    // Reorder tasks in DOM
    const container = activeTab.querySelector('.tasks-container');
    visibleTasks.forEach(task => {
        container.appendChild(task);
    });
}

// Task Tabs Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        this.classList.add('active');
        document.getElementById(tabName + '-tab').classList.add('active');
        
        // Reset filters when switching tabs
        if (filterDeadlineSelect) filterDeadlineSelect.value = 'all';
        if (sortBySelect) sortBySelect.value = 'deadline';
    });
});

// Filter tasks by category
const projectItems = document.querySelectorAll('.project-item');
projectItems.forEach(item => {
    item.addEventListener('click', function() {
        projectItems.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        filterTasksByCategory(category);
    });
});

function filterTasksByCategory(category) {
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(task => {
        const taskCategory = task.querySelector('.task-category').textContent.trim();
        if (category === 'all' || taskCategory === category) {
            task.style.display = 'flex';
            task.style.animation = 'slideIn 0.3s ease';
        } else {
            task.style.display = 'none';
        }
    });
}

// Dark mode support
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}

// Calendar functionality
let currentDate = new Date();

function generateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update month display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const monthDisplay = document.getElementById('currentMonth');
    if (monthDisplay) {
        monthDisplay.textContent = `${monthNames[month]} ${year}`;
    }
    
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;
    
    calendarGrid.innerHTML = '';
    
    // Add day headers (Mo, Tu, We, etc)
    const dayHeaders = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day-header';
        header.textContent = day;
        calendarGrid.appendChild(header);
    });
    
    // Get first day of month - convert to Monday-based (0 = Monday, 6 = Sunday)
    let firstDay = new Date(year, month, 1).getDay();
    // JavaScript getDay(): 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    // We want: 0 = Monday, 1 = Tuesday, ..., 6 = Sunday
    firstDay = firstDay === 0 ? 6 : firstDay - 1;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
        
        // Highlight today
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayCell.classList.add('today');
        }
        
        calendarGrid.appendChild(dayCell);
    }
    
    // Add days from next month to fill grid
    const cellsInGrid = calendarGrid.querySelectorAll('.calendar-day, .calendar-day.empty').length;
    const totalCells = cellsInGrid - 7; // Subtract header row (7 columns)
    const cellsInLastRow = totalCells % 7;
    const remainingCells = cellsInLastRow === 0 ? 0 : 7 - cellsInLastRow;
    
    for (let day = 1; day <= remainingCells; day++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        emptyCell.textContent = day;
        calendarGrid.appendChild(emptyCell);
    }
}

// Calendar navigation
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar();
    });
}

if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar();
    });
}

// Initialize calendar on page load
document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
});



