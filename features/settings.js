import { chat_msg, chat_error } from "../shared/chat_utils"


export const snd = new Sound({source: "anvil_land.ogg", priority: true, loop: false, stream: false}).setVolume(1.0).setPitch(2);

// java classes 
const Files = Java.type("java.nio.file.Files");
const Paths = Java.type("java.nio.file.Paths");
const StandardOpenOption = Java.type("java.nio.file.StandardOpenOption");
const Gson = Java.type("com.google.gson.Gson");
const GsonBuilder = Java.type("com.google.gson.GsonBuilder");

const MODULE_NAME = "DoubleUpUtilities";
const SETTINGS_FILE = `config/ChatTriggers/modules/${MODULE_NAME}/settings.json`;

const gson = new GsonBuilder().setPrettyPrinting().create();

const default_settings = {
    auto_expose: false,
    auto_announce: false
};

function load_settings() {
    const path = Paths.get(SETTINGS_FILE);
    if (Files.exists(path)) {
        try {
            const content = Files.readString(path);
            const java_map = gson.fromJson(content, HashMap.class);
            const js_obj = {};
            const iterator = java_map.entrySet().iterator();
            while (iterator.hasNext()) {
                const entry = iterator.next();
                const key = entry.getKey();
                if (key in default_settings) {
                    js_obj[key] = entry.getValue();
                }
                }

            return Object.assign({ ...default_settings }, js_obj);
        } catch (e) {
            chat_error("Error reading settings.json, using defaults.");
        }
    }
    save_settings(default_settings);
    return { ...default_settings };
}

// Save current settings
function save_settings(settings) {
    try {
        const json = gson.toJson(settings);
        const path = Paths.get(SETTINGS_FILE);
        Files.createDirectories(path.getParent());
        Files.writeString(path, json, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
    } catch (e) {
        chat_error("&c[DUU] Failed to save settings.json: " + e);
    }
}

// global settings object
export let settings = load_settings();

// /duu command 
register("command", (...args) => {
    if (args.length === 1) {
        ChatLib.chat("&6========= DoubleUpUtilities Settings =========");

        // generate clickable toggle for every setting
        for (const key in settings) {
            const current_value = settings[key];
            const status_text = current_value ? "&aEnabled" : "&cDisabled";
            const toggle_value = current_value ? "false" : "true";
            const toggle_command = `/duu set ${key} ${toggle_value}`;

            const component = new TextComponent({
                text: `&e${key} &7= ${status_text} &7[Click to ${current_value ? "disable" : "enable"}]`,
                clickEvent: {
                    action: "run_command",
                    value: toggle_command
                },
                hoverEvent: {
                    action: "show_text",
                    value: `&7Click to ${current_value ? "disable" : "enable"} ${key}`
                }
            });

            component.chat();
        }

        ChatLib.chat("&7");
        ChatLib.chat("&aManual override: &f/duu set <key> <true/false>");
        return;
    }
     

    // set subcmd
    if (args[0] === "set" && args.length === 3) {
        const key = args[1];
        const value_str = args[2].toLowerCase();

        if (!(key in settings)) {
            ChatLib.chat(`&c[DUU] Unknown setting: &e${key}`);
            return;
        }

        if (value_str !== "true" && value_str !== "false") {
            ChatLib.chat(`&c[DUU] Value must be true or false`);
            return;
        }

        const new_value = (value_str === "true");

        if (settings[key] === new_value) {
            ChatLib.chat(`&e${key} &7is already &b${new_value}`);
            return;
        }

        settings[key] = new_value;
        save_settings(settings);
        ChatLib.chat(`&a[DUU] ${key} -> &b${new_value}`);
        ChatLib.chat("&aSettings saved!");
        return;
    }

    chat_error("Invalid command. Use /duu to view clickable settings.");

}).setName("duu");
