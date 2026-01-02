// @TODO: fix the auto triggering of the messages having to repeat the .say code, because it does not evaluate ctjs commands and does notlet you run it

import { chat_msg, chat_error } from "../shared/chat_utils"
import { settings, snd } from "./settings"

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

    if(!settings.auto_announce) {
       ChatLib.chat(warn_bow_drop_text);
    }

    if(settings.auto_announce) {
        ChatLib.say("/ac %detective% died and the bow dropped");
        snd.play();
    }


}).setCriteria("A Bow has been dropped!").setContains();

//////////////////////////////////////////////////


function build_murderer_death_tc(name) {

    var tmp_command = "/warn_murderer_dead " + name;

    const murderer_died_warn_text = new TextComponent({
        text: "&lClick here to warn other players the &c&lMurderer&r&l died",
        clickEvent: {
            action: "run_command",
            value: tmp_command
        },
        hoverEvent: {
            action: "show_text",
            value: "Warns the ther playes about the status of the Murderer"
        }
    });

    return murderer_died_warn_text;

}

register("command",  function(name) {

    if(name == undefined) {
        chat_error("Name at /warn_murderer_dead must not be empty or undefined.");
        return;
    }

    ChatLib.say("/ac " + name + " was the Murderer, i saw chat");


}).setName("warn_murderer_dead");

register("chat", (murderer, event) => {

    if(!settings.auto_announce) {
        var msg = build_murderer_death_tc(murderer);
        ChatLib.chat(msg);
    }

    if(settings.auto_announce) {
        ChatLib.say("/ac " + murderer + " was the Murderer, i saw chat");
        snd.play();
    }
        

}).setCriteria("One of the Murderers, ${murderer}, was killed.");

