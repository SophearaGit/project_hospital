// This wrapper tells JavaScript to wait until the HTML is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("closeBtn");
    const headPage = document.getElementById("head-page");

    if (headPage) {

        // 1. Open menu & hide the hamburger button (☰)
        if (menuBtn) {
            menuBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                headPage.classList.add("show");
                menuBtn.classList.add("hidden"); // <-- Hides the ☰ button
            });
        }

        // 2. Close menu & bring the hamburger button (☰) back
        if (closeBtn) {
            closeBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                headPage.classList.remove("show");
                if (menuBtn) menuBtn.classList.remove("hidden"); // <-- Shows the ☰ button back
            });
        }

        // 3. Bring ☰ back if a user closes the menu by clicking outside of it
        document.addEventListener("click", (event) => {
            if (!headPage.contains(event.target) && event.target !== menuBtn) {
                headPage.classList.remove("show");
                if (menuBtn) menuBtn.classList.remove("hidden"); // <-- Shows the ☰ button back
            }
        });
    }

    // Dark Mode

    const toggle = document.getElementById("theme-toggle");

    // 1. Check localStorage for a saved theme, default to 'light' if empty
    const saveTheme = localStorage.getItem("theme") || "light";

    // Helper function to handle the theme swapping
    function applyTheme(theme) {
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
            // Switch from regular moon outline to solid sun filled icon
            toggle.classList.remove("fa-regular", "fa-moon");
            toggle.classList.add("fa-solid", "fa-sun");
        } else {
            document.body.classList.remove("dark-mode");
            // Switch from solid sun back to regular moon outline
            toggle.classList.remove("fa-solid", "fa-sun");
            toggle.classList.add("fa-regular", "fa-moon");
        }
    }

    // 2. Apply the theme immediately when the page loads
    applyTheme(saveTheme);

    // 3. Listen for clicks to flip between light and dark
    toggle.addEventListener("click", () => {
        const isDark = document.body.classList.contains("dark-mode");

        // If it's currently dark, change to light. Otherwise, change to dark.
        const nextTheme = isDark ? "light" : "dark";

        // Save the choice to localStorage so it persists on reload
        localStorage.setItem("theme", nextTheme);

        // Update the website's appearance
        applyTheme(nextTheme);
    });


    // calender in contact
    const monthYearDisplay = document.getElementById("month-year-display");
    const daysContainer = document.getElementById("calendar-days-container");
    const prevBtn = document.getElementById("prev-month");
    const nextBtn = document.getElementById("next-month");

    // --- CRITICAL SAFETY BLOCK: Only build calendar if elements exist on this page ---
    if (monthYearDisplay && daysContainer && prevBtn && nextBtn) {

        // Initialize calendar configuration state
        let currentDate = new Date(2026, 5, 1); // June 2026
        let selectedDateStr = "2026-06-09";

        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // 2. THE CALENDAR RENDER ENGINE
        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            monthYearDisplay.textContent = `${months[month]} ${year}`;

            const firstDayIndex = new Date(year, month, 1).getDay();
            const totalDays = new Date(year, month + 1, 0).getDate();
            const prevTotalDays = new Date(year, month, 0).getDate();

            let daysHTML = "";

            // Previous Month Days Padding (Muted)
            for (let i = firstDayIndex; i > 0; i--) {
                daysHTML += `<span class="day-muted">${prevTotalDays - i + 1}</span>`;
            }

            // Active Target Month Days
            for (let day = 1; day <= totalDays; day++) {
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const isSelected = dateStr === selectedDateStr ? 'class="day-selected"' : '';
                daysHTML += `<span ${isSelected} data-date="${dateStr}">${day}</span>`;
            }

            // Next Month Days Padding (Muted)
            const totalGridCells = firstDayIndex + totalDays;
            const nextMonthPadding = totalGridCells % 7 === 0 ? 0 : 7 - (totalGridCells % 7);
            for (let j = 1; j <= nextMonthPadding; j++) {
                daysHTML += `<span class="day-muted">${j}</span>`;
            }

            daysContainer.innerHTML = daysHTML;

            // Day Selection Handler
            const activeDays = daysContainer.querySelectorAll("span:not(.day-muted)");
            activeDays.forEach(daySpan => {
                daySpan.addEventListener("click", (e) => {
                    const currentActive = daysContainer.querySelector(".day-selected");
                    if (currentActive) currentActive.classList.remove("day-selected");

                    e.target.classList.add("day-selected");
                    selectedDateStr = e.target.getAttribute("data-date");
                });
            });
        }

        // 3. NAVIGATION ARROW LISTENERS
        prevBtn.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });

        nextBtn.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });

        // 5. RUN INITIAL LAYOUT BUILD ONCE
        renderCalendar();
    }

    // 4. TIME SLOTS HIGHLIGHT MANAGER (Safely targets slots if any exist)
    const timeButtons = document.querySelectorAll(".time-btn");
    if (timeButtons.length > 0) {
        timeButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                timeButtons.forEach(btn => btn.classList.remove("active-slot"));
                e.target.classList.add("active-slot");
            });
        });
    }
});