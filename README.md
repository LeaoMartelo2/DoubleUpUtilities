# DoubleUpUtilities

A 1.21 CTJS module for Murder Mystery Double Up mode


## View and change settings with /duu

### Configurating

- Change by either clicking the option on `/duu`
or using the manual override command 
`/duu set <setting> <true/false>`


## Feature List

<details open>
<summary>Features</summary>


### Fellow Murderer / Detective Exposer

- Gives you a clickable chat message to expose your fellow murderer / detective at the start of the game.
- Adds the commands `/expose_detective` and `/expose_murderer` to use it manually.
- Sends the message: `<username> is [Detective/Murderer], i saw chat` in chat when ran / clicked.


### Murderer / Detective status updates

- Gives a clickable chat message to remind other players the detective has died and the bow dropped.
- Gives a clickable chat message to let other players know how likely is for the guy who just died to be the murderer.

</details>

### Settings

- auto_expose: Automaticaly say `Fellow Murderer / Detective Exposer` messages instead of giving the clickable message.
- auto_announce: Automatically Say `Murderer / Detective status updates` messages instead of giving the clickable message.


