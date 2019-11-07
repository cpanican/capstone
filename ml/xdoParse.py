import subprocess

class xdoParse:

    def __init__(self, commandDictionary):
        self.commandDictionary = commandDictionary
    
    def doCommand(self, commandName):
        print("=====================================================")
        print("Requested ", commandName, " bound to key ", self.commandDictionary[commandName])
        print("Will run \n$ cliclick kp:"+self.commandDictionary[commandName])
        subprocess.call(["cliclick kp:"+self.commandDictionary[commandName]], shell=True)
        print("=====================================================")