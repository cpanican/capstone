# organize imports
import cv2
import imutils
import numpy as np
import re
import os

# global variables
bg = None


def run_avg(image, aWeight):
    global bg
    # initialize the background
    if bg is None:
        bg = image.copy().astype("float")
        return

    # compute weighted average, accumulate it and update the background
    cv2.accumulateWeighted(image, bg, aWeight)


def segment(image, threshold=25):
    global bg
    # find the absolute difference between background and current frame
    diff = cv2.absdiff(bg.astype("uint8"), image)

    # threshold the diff image so that we get the foreground
    thresholded = cv2.threshold(diff,
                                threshold,
                                255,
                                cv2.THRESH_BINARY)[1]

    # get the contours in the thresholded image
    (cnts, heirarchy) = cv2.findContours(thresholded.copy(),
                                         cv2.RETR_EXTERNAL,
                                         cv2.CHAIN_APPROX_SIMPLE)

    # return None, if no contours detected
    if len(cnts) == 0:
        return
    else:
        # based on contour area, get the maximum contour which is the hand
        segmented = max(cnts, key=cv2.contourArea)
        return (thresholded, segmented)


# get the reference to the webcam
camera = cv2.VideoCapture(0)


def main():
    # initialize weight for running average
    aWeight = 0.5

    # region of interest (ROI) coordinates
    top, right, bottom, left = 10, 350, 225, 590

    # initialize num of frames
    num_frames = 0
    image_num = 0
    image_num_limit = 0

    start_recording_image = False
    start_recording_test = False

    # Print start message
    print("\x1b[0;33;40m"+ "This file will generate custom datasets.\nInstructions:\n" +
          "1. Enter gesture name. This will create 2 folders in /Dataset/ directory\n" +
          "2. After loading, press 'i' to generate training data, 't' to generate test data.\n" +
          "3. Press 'q' to quit the program" + '\x1b[0m')

    # Get the user input
    while(True):
        gesture = input("Input gesture name: ")
        if re.match("^[A-Za-z0-9_-]*$", gesture):
            break
        else:
            print("Input only accepts [a-z], [0-9], '-' and '_'")
            continue

    # Create Images and Test folder in /dataset/, skip creating an existing directory
    try:
        os.makedirs("Dataset/" + gesture + "Images")
        os.makedirs("Dataset/" + gesture + "Test")
    except FileExistsError:
        # directory already exists
        print("Directory Already Exists")
        pass

    # keep looping, until interrupted
    while(True):
        # get the current frame
        (grabbed, frame) = camera.read()
        if (grabbed == True):

            # resize the frame
            frame = imutils.resize(frame, width=700)

            # flip the frame so that it is not the mirror view
            frame = cv2.flip(frame, 1)

            # clone the frame
            clone = frame.copy()

            # get the height and width of the frame
            (height, width) = frame.shape[:2]

            # get the ROI
            roi = frame[top:bottom, right:left]

            # convert the roi to grayscale and blur it
            gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
            gray = cv2.GaussianBlur(gray, (7, 7), 0)

            # to get the background, keep looking till a threshold is reached
            # so that our running average model gets calibrated
            if num_frames < 30:
                run_avg(gray, aWeight)
                print("Calibrating background image... " + str(num_frames+1) + "/30")

            else:
                # segment the hand region
                hand = segment(gray)

                # check whether hand region is segmented
                if hand is not None:
                    # if yes, unpack the thresholded image and
                    # segmented region
                    (thresholded, segmented) = hand

                    # draw the segmented region and display the frame
                    cv2.drawContours(
                        clone, [segmented + (right, top)], -1, (0, 0, 255))
                    
                    # Set image destination if 'I' is pressed
                    if start_recording_image:
                        img = cv2.resize(thresholded, (100, 89))
                        img_filename = "Dataset/{}Images/{}_{}.png".format(gesture, gesture, str(image_num))
                        cv2.imwrite(img_filename, img)
                        print("Image Captured {}/1000".format(str(image_num+1)))
                        image_num += 1
                    
                    # Set test destination if 'T' is pressed
                    elif start_recording_test:
                        img = cv2.resize(thresholded, (100, 89))
                        img_filename = "Dataset/{}Test/{}_{}.png".format(gesture, gesture, str(image_num))
                        cv2.imwrite(img_filename, img)
                        print("Image Captured {}/100".format(str(image_num+1)))
                        image_num += 1
                    
                    cv2.imshow("Thesholded", thresholded)

            # draw the segmented hand
            cv2.rectangle(clone, (left, top), (right, bottom), (0, 255, 0), 2)

            # increment the number of frames
            num_frames += 1

            # display the frame with segmented hand
            cv2.imshow("Video Feed", clone)

            # observe the keypress by the user
            keypress = cv2.waitKey(1) & 0xFF

            # if the user pressed "q", then stop looping
            if keypress == ord("q") or image_num > image_num_limit:
                break

            if keypress == ord("i"):
                start_recording_image = True
                image_num_limit = 1000
                
            if keypress == ord("t"):
                start_recording_test = True
                image_num_limit = 99

        else:
            print("[Warning!] Error input, Please check that your camera is connected.")
            break


main()

# free up memory
camera.release()
cv2.destroyAllWindows()
