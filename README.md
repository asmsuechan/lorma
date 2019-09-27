# Lorma
> Run local robots over the Internet

* Easy to integrate
* Clear API
* Prepared cloud server

Lorma is a ROS based robots management system which allows robots run `roslaunch` through the Internet. Lorma stands for **Lo**cal **R**obot **Ma**nager.

## Get started

### Environments
* ROS based Robots
* nodejs
* Web browser (Google Chrome is recommended)

This tutorial uses [lorma_sample](https://github.com/asmsuechan/lorma_sample).

### (1) On your ROS based robot
#### 1. Clone this repository
```
$ git clone git@github.com:asmsuechan/lorma.git ~/
```

#### 2. Copy `lorma_ros` into your ros workspace

```
$ cp -rf ~/lorma/lorma_ros ~/catkin_ws/src
```

#### 3. Run `lorma_ros`
```
$ cd ~/catkin_ws
$ rosrun lorma_ros launch_runner.py
```

Then confirm the UUID provided by the ROS process.

![img1](/images/rosrun.png)

### (2) On another computer
#### 1. Clone sample repository
```
$ git clone git@github.com:asmsuechan/lorma_sample.git ~/
```

#### 2. Run npm install
```
$ cd ~/lorma_sample
$ npm i
```

#### 3. Start the application
```
$ npm start
```

#### 4. Open localhost:3000
![img2](/images/sample-application.png)

## Structure
The structure of this system is shown as below. I provide the connection manager at lorma.rourse.com and use it by default.
![img3](/images/execute-command.png)

## Development
TODO
