from xdoParse import xdoParse

commandDictionary = {
    # Cmd Name -- Key Value
    # See possible key values in cliclick docs.
    # cliclick -h 
    "VolumeDown" : "volume-down",
    "VolumeUp" : "volume-down"
}

parser = xdoParse(commandDictionary)
parser.doCommand("VolumeUp")