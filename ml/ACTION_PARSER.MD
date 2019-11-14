## Action Parser Documentation

`actionParser` that takes a command dictionary and calls on shell for action simulation.

`actionParser.test.py` is the sample test script to run the action simulator.

Using [CliClick](https://github.com/BlueM/cliclick)

#### How To Test

```bash
# to test run:
$ python3 actionParser.test.py
``` 

#### Parameter Definitions

| Parameter | Functionality | Default Value
| ---- | ---- | ---- |
|commandDictionary | Dictionary of command name and key combinations | - |
| allowContinuous | Allows for continuous input and doesn't check for last input. | False |
| waitTime | Wait time value for when allowContinuous is False. | 0.5 seconds |

#### Examples of commandDictionary:  

| commandName | command | type |
| ---- | ---- | ---- |
 "ActionName1" | <kbd>arrow-up</kbd> | single KEY |
 "ActionName2" | [ <kbd>ctrl</kbd>, <kbd>arrow-right</kbd> ] | 1 MODIFIER + 1 KEY |
 "ActionName3" | [ <kbd>cmd</kbd>, <kbd>shift</kbd>, <kbd>arrow-up</kbd>, <kbd>del</kbd> ]  | x MODIFIER + x KEY |