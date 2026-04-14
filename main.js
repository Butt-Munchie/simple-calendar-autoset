Hooks.once("ready", () => {
    const prefix = "foundryvtt-simple-calendar-reborn.";

    // Establish what values to be updated as an array.
    const settings = {
        "open-on-load": "true",
        "open-compact": "true",
        "remember-position": "true",
        "remember-compact-position": "true",
        "persistent-open": "true"
    };

    // Pre-set that needsReload is false.
    let needsReload = false;

    // Apply settings
    for (const [key, value] of Object.entries(settings)) {
        const fullKey = prefix + key;
        const current = localStorage.getItem(fullKey);

        // If values were not already set, set needsReload to true.
        if (current !== value) {
            localStorage.setItem(fullKey, value);
            needsReload = true;
        }
    }

    // Apply compact mode.
    const applyCompactFix = () => {
        const app = Object.values(ui.windows).find(w =>
        w.constructor.name.toLowerCase().includes("calendar")
        );

        if (app) {
            // Force compact mode AFTER init
            if (app.switchMode && typeof app.switchMode === "function") {
                app.switchMode("compact");
            }

            app.options.compactView = true;
            app.render(true);
        }
    };

    // Reload if settings were changed. Skip if they were already applied.
    if (needsReload) {
        setTimeout(() => location.reload(), 1000);
        return;
    }

    // Wait for calendar to exist, then enforce compact mode.
    // It won't apply correctly without this, because the calendar needs to
    // be fully loaded before applying the setting. Once it loads, compact
    // can be applied and it will take effect.
    Hooks.once("renderSimpleCalendarApp", () => {
        setTimeout(applyCompactFix, 200);
    });

    // Provide an output to the console that settings have been applied.
    console.log("Simple Calendar boot logic applied");
});
