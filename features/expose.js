import { chat_msg } from "../shared/chat_utils"
import { settings, snd } from "./settings"


// functions

function build_text_component(name, murd_or_detc) {

    let expose_cmd;

    if (murd_or_detc === "murderer")  {expose_cmd = "/expose_murderer";  }

    if (murd_or_detc === "detective") {expose_cmd = "/expose_detective"; }

    expose_cmd += " " + name;

    let tmp_msg = "&lClick here to &4EXPOSE&r&l your fellow " + murd_or_detc;
    
    let msg = new TextComponent({
        text: tmp_msg,
        clickEvent: {
            action: "run_command",
            value: expose_cmd
        },
        hoverEvent: {
            action: "show_text",
            value: "Click here to EXPOSE them"
        }
    });

    return msg;
}

// expose commands

register("command", function(name) {
    if (name == undefined) {
        chat_msg("Name at /expose_murderer must not be empty or undefined.");
        return;
    }
    ChatLib.say("/ac " + name + " is Murderer, i saw chat");
}).setName("expose_murderer");

register("command", function(name) {
    if(name == undefined) {
        chat_msg("Name at /expose_detective must not be empty or undefined.");
        return;
    }
    ChatLib.say("/ac " + name + " is Detective, i saw chat");
}).setName("expose_detective");




// chat detection and clicable message

register("chat", (murderer, event) => {

    if(!settings.auto_expose) {
        let msg = build_text_component(murderer, "murderer");
        ChatLib.chat(msg);
    }

    if(settings.auto_expose) {
        chat_msg("auto_expose enabled, sending message");
        ChatLib.say("/ac " + murderer + " is Murderer, i saw chat");
        snd.play();
    }

}).setCriteria("Your fellow Murderer is: ${murderer}").setContains();


register("chat", (detective, event) => {

    if(!settings.auto_expose) {
        let msg = build_text_component(detective, "detective");
        ChatLib.chat(msg);
    }

    if(settings.auto_expose) {
        chat_msg("auto_expose enabled, sending message");
        ChatLib.say("/ac " + detective + " is Detective, i saw chat");
        snd.play();
    }

}).setCriteria("Your fellow Detective is: ${detective}").setContains();

