# Anomaly Detection WEB Application
A WEB application that provides a friendly interface to detect anomalies in csv files.</br>
This website allows the user to upload two .csv files and detect anomalies in different parameters of a flight.</br>
The server was written in JavaScript(Node.js) and the client was written mainly in TypeScript and a bit of HTML and CSS.

## Prerequisites
* Node.js
* Angular
* [Download](https://phoenixnap.com/kb/install-node-js-npm-on-windows) NPM

## Getting Started
1. Install the prerequisites
2. Clone the project: ```git clone https://github.com/Lkrule/Web-App.git```
3. Install all the dependencies using one command in the project directory: ```npm install```
4. Open CMD/BASH in the directory of the project and run ```nodemon model.js``` to run the server (on port 8080)
5. Open CMD/BASH in the directory of the project and run ```npm start``` to run the website (on port 4200)
6. Upload ```trainFile.csv``` and ```testFile.csv``` to the website
7. Choose an anomaly detection algorithm
8. Press ```Upload``` and then select a graph

### Using The Server
#### HTTP POST REQUEST Usage
<img src = "https://user-images.githubusercontent.com/58342591/120107586-3b44f080-c16a-11eb-8501-b52af86f4d72.jpg">
As we can see above, the server gets a HTTP <b>POST</b> REQUEST and returns the anomalies found.

#### WEB App Usage
<img src = "https://user-images.githubusercontent.com/58342591/120107463-c671b680-c169-11eb-9d32-042047e2b496.jpg">
As we can see above, the server returns a <b>JSON</b> format answer.</br>

## Using The Website
The way to use the website goes through several main steps:
* First, drag your train and test .csv files and drop them into their places <b>(pay attention to each box name)</b></br>
in case you dragged the wrong file, click on the little cube inside the file box (where the file appears after you drag it, under the "Files" label), and then confirm the deletion of the file. Afterwards, you will be able to drag and drop a new file</br>
* Choose the algorithm you want to run and click the *Upload* button
* Click the *Select Graph* drop set of all of the labels that appear in your chosen test file
* Choose the label you want to display and click on the *Display Graph* button
* The anomalies graph will now be displayed with several colors: light-blue presents the chosen label, dark-blue presents the most correlative label to the first label, and light-green presents the anomalies between the two graphs
* The y-Axis presents the values of each label and the x-Axis presents the timestep
* At the bottom of the page, the color of each graph is presented next to his name
  (you can press on each one of the names to hide the appropriate graph and press again to display it back)
* Going over the graph using your cursor presents at each point the values of the current point
* In order to display another graph, just choose his name in the drop set (*Select Graph*) and it will be updated automatically

## Features

<img src = "https://user-images.githubusercontent.com/58342591/120105725-e356bb80-c162-11eb-89a0-402c20e21781.jpg"></br>
* File Drag And Drop: The website supports dragging and dropping the .csv files 
* File Deletion: The website supports deleting a file and uploading a new one (by ticking the little box above the file's name)
* Algorithm Selection: The website supports selecting an anomaly detection algorithm (Hybrid/Regular)
* Visual Display: The website supports a graphical display of the anomalies detected by the server 
<img src = "https://user-images.githubusercontent.com/58342591/120114187-a3093480-c186-11eb-8a49-7e20920e6e8d.jpg">

## Project Structure
<p align="center">
<img src = "https://user-images.githubusercontent.com/58342591/120107993-e0ac9400-c16b-11eb-81b6-c0367177ba3e.jpg">
</p>

## [Explanation Video](https://www.youtube.com/watch?v=KzkUP05Zyzk)
