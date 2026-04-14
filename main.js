Hooks.once("ready", () => {
    const prefix = "foundryvtt-simple-calendar-reborn.";

    const settings = {
        "open-on-load": "true",
        "open-compact": "true",
        "remember-position": "true",
        "remember-compact-position": "true",
        "persistent-open": "true"
    };

    let needsReload = false;

    for (const [key, value] of Object.entries(settings)) {
        const fullKey = prefix + key;
        const current = localStorage.getItem(fullKey);

        if (current !== value) {
            localStorage.setItem(fullKey, value);
            needsReload = true;
        }
    }

    const applyCompactFix = () => {
        const app = Object.values(ui.windows).find(w =>
        w.constructor.name.toLowerCase().includes("calendar")
        );

        if (app) {
            // 🔥 Force compact mode AFTER init
            if (app.switchMode && typeof app.switchMode === "function") {
                app.switchMode("compact");
            }

            app.options.compactView = true;
            app.render(true);
        }
    };

    if (needsReload) {
        setTimeout(() => location.reload(), 1000);
        return;
    }

    // Wait for calendar to exist, then enforce compact mode
    Hooks.once("renderSimpleCalendarApp", () => {
        setTimeout(applyCompactFix, 200);
    });

    console.log("Simple Calendar boot logic applied");
});
