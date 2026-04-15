Hooks.once("init", () => {
    const prefix = "foundryvtt-simple-calendar-reborn.";

    // Ensure storage is correct early/
    // Declare variables to be set to true
    const settings = {
        "open-on-load": "true",
        "open-compact": "true",
        "remember-position": "true",
        "remember-compact-position": "true",
        "persistent-open": "true"
    };

    //Set the variables
    for (const [key, value] of Object.entries(settings)) {
        localStorage.setItem(prefix + key, value);
    }

    // Enable the change BEFORE UI exists
    const original = window.SimpleCalendar?.app?.prototype?.render;

    Hooks.on("renderSimpleCalendarApp", (app, html, data) => {
        // Force compact mode BEFORE anything is drawn
        if (app.switchMode) {
            app.switchMode("compact");
        }

        app.options.compactView = true;
    });

    // Export a log message.
    console.log("Simple Calendar pre-render patch installed");
});
