# Hand Gesture Recognition Using Background Elimination and Convolution Neural Network

## About the Project

This is a simple application of Convolution Neural Networks combined with background elimination to detect different hand gestures. A background elimination algorithm extracts hand images through a webcam and uses it to train/predict the type of gesture that is.

## Requirements

- Python 3
- Tensorflow (1.14.0)
- TfLearn (0.3.2)
- Opencv Python (4.1.1.26)
- Numpy (1.15.0)
- Pillow (PIL) (6.2.0)
- Imutils (0.5.3)

## Installation

`requirements.txt` specifies the required packages needed to run this project.
To install these packages, you must have **pip** installed on your machine.

```bash
pip install -r requirements.txt
```

## File Description

`PalmTracker.py`: Run this file to generate custom datasets. Go into the file and change the name of the directory and make other appropriate changes.

`ResizeImages.py`: Run this file after PalmTracker.py in order to resize the images so that it can be fed into the Convolution Neural Network designed using tensorflow. The network accepts 89 x 100 dimensional image.

`ModelTrainer.ipynb`: This is the model trainer file. Run this file if you want to retrain the model using your custom dataset. We recommend installing [jupyter](https://jupyter.org/install) with pip3.

`ContinuousGesturePredictor.py`: Running this file opens up your webcam and takes continuous frames of your hand and then predicts the class of your hand gesture in realtime.

## Some key architectural insights into the project

### Background Elimination Algorithm

We used opencv for taking a running average of the background for 30 frames and then we used that running average to detect the hand that has to be introduced after the background has been properly recognized.

We found a very useful [article](https://gogul09.github.io/software/hand-gesture-recognition-p1) on foreground mask by [Gogul09](https://github.com/Gogul09) and we pretty much used his code for background elimination with a few changes in order to suit our use-case.

### The Deep Convolution Neural Network

The network contains **7** hidden convolution layers with **Relu** as the activation function and **1** Fully connected layer.

The network is trained across **50** iterations with a batch size of **64**.

We observed that 50 iterations trains the model well and there is no increase in validation accuracy if additional iterations were to be added.

The model achieves an accuracy of **96.6%** on the validation dataset.

The ratio of training set to validation set is **1000 : 100**.

## How to train the model

To train your model, open `ModelTrainer.ipynb` in jupyter notebook to train your model. If you don't have jupyter notebook installed, you can convert .ipynb to .py file by running this command in your terminal `ipython nbconvert --to python ModelTrainer.ipynb`. Now you can just run `python3 ModelTrainer.py`.

## How to run the RealTime prediction

Run `python3 ContinuousGesturePredictor.py` and you will see a window named **Video Feed** appear on screen. Wait for a while until a window named **Thresholded** appears.

Then press **"s"** on your keyboard in order to start the real-time prediction.

Bring your hand in the **Green Box** drawn inside **Video Feed** window in order to see the predictions.

## References

https://github.com/SparshaSaha/Hand-Gesture-Recognition-Using-Background-Elllimination-and-Convolution-Neural-Network
