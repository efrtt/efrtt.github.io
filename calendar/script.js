document.addEventListener("DOMContentLoaded", function () {
  const calendar = document.querySelector(".container");
  const monthElement = calendar.querySelector(".month");
  const datesElement = calendar.querySelector(".dates");

  // Get current date information
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth();
  let today = now.getDate(); // Get current day of the month

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  // Set current month name
  monthElement.textContent = monthNames[month] + " " + year;

  // Get the first day of the month and the last day of the month
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  // Determine the weekday of the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const firstWeekday = firstDayOfMonth.getDay();

  // Calculate how many days from the previous month should be shown
  const daysFromPrevMonth = firstWeekday === 0 ? 7 : firstWeekday; // Adjusted to start from 1st day of previous month

  // Calculate total number of cells needed in the grid
  const totalCells = 42; // 7 days * 6 rows

  // Calculate how many days from the next month should be shown at the end
  const daysFromNextMonth = totalCells - (daysInMonth + daysFromPrevMonth);

  // Function to get previous month's date
  function getPrevMonthDate(date) {
    return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
  }

  // Function to get next month's date
  function getNextMonthDate(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  // Generate the calendar grid
  let calendarHTML = "";

  // Fill previous month's days
  let prevMonthLastDay = new Date(year, month, 0).getDate(); // Last day of previous month
  for (let i = daysFromPrevMonth; i > 0; i--) {
    const prevDate = new Date(year, month - 1, prevMonthLastDay - i + 1);
    calendarHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
  }

  // Fill current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    if (i === today) {
      calendarHTML += `<div class="date current-day">${i}</div>`;
    } else {
      calendarHTML += `<div class="date">${i}</div>`;
    }
  }

  // Fill next month's days
  let nextMonthFirstDay = new Date(year, month + 1, 1); // First day of next month
  for (let i = 1; i <= daysFromNextMonth; i++) {
    const nextDate = new Date(year, month + 1, i);
    calendarHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
  }

  // Display calendar
  datesElement.innerHTML = calendarHTML;
});
