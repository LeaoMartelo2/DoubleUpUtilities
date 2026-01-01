import { chat_msg } from "../shared/chat_utils"

const warn_bow_drop_text = new TextComponent({
    text: "&lClick here to warn other players the &b&lDetective&r&l died",
    clickEvent: {
        action: "run_command",
        value: "/warn_bow_drop"
    },
    hoverEvent: {
        action: "show_text",
        value: "Warns the ther playes about the status of the Detective and the bow"
    }
});

register("command", () => {
    ChatLib.say("/ac %detective% died and the bow dropped");
}).setName("warn_bow_drop");

register("chat", () => {
    ChatLib.chat(warn_bow_drop_text);
}).setCriteria("A Bow has been dropped!").setContains();

//////////////////////////////////////////////////

const murderer_died_warn_text = new TextComponent({
    text: "&lClick here to warn other players the &c&lMurderer&r&l died",
    clickEvent: {
        action: "run_command",
        value: "/warn_murderer_dead"
    },
    hoverEvent: {
        action: "show_text",
        value: "Warns the ther playes about the status of the Murderer"
    }
});

register("command", () => {
    ChatLib.say("/ac %detective% died and the bow dropped");
}).setName("warn_murderer_dead");

register("command",  function(name) {

    if(name == undefined) {
        chat_msg("Name at /murderer_died must not be empty or undefined.");
        return;
    }

    ChatLib.say("/ac" + name + " is Murderer, i saw chat");


});

register("chat", (murderer, event) => {ac

    ChatLib

}).setCriteria("One of the Murderers, ${murderer}, was killed.");

/*

One of the Murderers, Sipkyy, was killed.


*/
