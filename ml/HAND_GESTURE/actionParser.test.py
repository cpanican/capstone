from actionParser import actionParser, MODIFIERS, KEYS


commandDictionary = {
    # Cmd Name -- Key Value
    # See possible key values in cliclick docs.
    # cliclick -h
    "Left": "volume-up",
    "Right": ["ctrl", "arrow-left"]
}

parser = actionParser(commandDictionary)
parser.doCommand("Left")
parser.doCommand("Right")
