import subprocess
import time

MODIFIERS = {
    "ALT": "alt",
    "COMMAND": "cmd",
    "CONTROL": "ctrl",
    "FUNCTION": "fn",
    "SHIFT": "shift"
}

KEYS = {
    "ARROW": {
        "UP": "arrow-up",
        "DOWN": "arrow-down",
        "LEFT": "arrow-left",
        "RIGHT": "arrow-right"
    },
    "BRIGHTNESS": {
        "DOWN": "brightness-down",
        "UP": "brightness-up"
    },
    "DELETE": "delete",
    "END": "end",
    "ENTER": "enter",
    "ESC": "esc",
    "F1": "f1",
    "F2": "f2",
    "F3": "f3",
    "F4": "f4",
    "F5": "f5",
    "F6": "f6",
    "F7": "f7",
    "F8": "f8",
    "F9": "f9",
    "F10": "f10",
    "F11": "f11",
    "F12": "f12",
    "F13": "f13",
    "F14": "f14",
    "F15": "f15",
    "F16": "f16",
    "FWD": {
        "DELETE": "fwd-delete"
    },
    "HOME": "home",
    "KEYS": {
        "LIGHT": {
        "DOWN": "keys-light-down",
        "TOGGLE": "keys-light-toggle",
        "UP": "keys-light-up"
        }
    },
    "MUTE": "mute",
    "NUM": {
        "0": "num-0",
        "1": "num-1",
        "2": "num-2",
        "3": "num-3",
        "4": "num-4",
        "5": "num-5",
        "6": "num-6",
        "7": "num-7",
        "8": "num-8",
        "9": "num-9",
        "CLEAR": "num-clear",
        "DIVIDE": "num-divide",
        "ENTER": "num-enter",
        "EQUALS": "num-equals",
        "MINUS": "num-minus",
        "MULTIPLY": "num-multiply",
        "PLUS": "num-plus"
    },
    "PAGE": {
        "DOWN": "page-down",
        "UP": "page-up"
    },
    "PLAY": {
        "NEXT": "play-next",
        "PAUSE": "play-pause",
        "PREVIOUS": "play-previous"
    },
    "RETURN": "return",
    "SPACE": "space",
    "TAB": "tab",
    "VOLUME": {
        "DOWN": "volume-down",
        "UP": "volume-up"
    }
}


class actionParser:

    def __init__(self, commandDictionary, allowContinuous = False, waitTime = 0.5):
        """
        @param commandDictionary - Dictionary of command name and key combinations

        @param allowContinuous   - Allows for continuous input and doesn't check for last input. Defaults to False.

        @param waitTime          - Wait time value for when allowContinuous is False. 

        ___________________________________________________________________________________________________________

        Examples of commandDictionary

            "ActionName1" : "arrow-up",                             - single KEY

            "ActionName2" : [ "ctrl", "arrow-right" ],              - 1 MODIFIER + 1 KEY

            "ActionName3" : [ "cmd", "shift", "arrow-up", "del" ]   - x MODIFIER + x KEY

        """
        self.commandDictionary = commandDictionary
        self.lastCommand = None
        self.allowContinuous = allowContinuous
        self.waitTime = waitTime
    
    def doCommand(self, commandName):
        if self.allowContinuous == True:
            self.__actionTrigger(commandName)
        else:
            if self.lastCommand == commandName:
                time.sleep(self.waitTime)
            self.__actionTrigger(commandName)
            
                

    def __actionTrigger(self, commandName):
        self.lastCommand = commandName
        command = self.commandDictionary[commandName]
        if (isinstance(command, str)):
            subprocess.call(["cliclick kp:"+command], shell=True)
        elif (isinstance(command, list)):
            kd_args = []
            kp_args = []
            for i in range(0,len(command)):
                if (command[i] == "alt" or command[i] == "shift" or command[i] == "fn" or command[i] == "cmd" or command[i] == "ctrl"):
                    kd_args.append(command[i])
                else:
                    kp_args.append(command[i])
            commandString = "cliclick "
            if (len(kd_args) > 0):
                commandString += 'kd:' + ','.join(kd_args)
            if (len(kp_args) > 0):
                commandString += ' kp:' + ','.join(kp_args)
            if (commandString != "cliclick "):
                subprocess.call([commandString], shell=True)
