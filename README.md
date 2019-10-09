# Rowma
> Run local robots over the Internet

* Easy to integrate
* Clear API
* Prepared cloud server

Rowma is a ROS based robots management system which allows robots run `roslaunch` through the Internet. Rowma stands for **RO**S **W**eb **Ma**nager.

[日本語](/doc/README.ja.md)

## Get started

### Environments
* ROS based Robots
* nodejs
* Web browser (Google Chrome is recommended)

### Versions on Robot
* Python: 2.7
* ROS: Kinetic

This tutorial uses [rowma_sample](https://github.com/asmsuechan/rowma_sample).

### (1) On your ROS based robot
#### 1. Clone this repository
```
$ git clone git@github.com:asmsuechan/rowma.git ~/
```

#### 2. Copy `rowma_ros` into your ros workspace

```
$ cp -rf ~/rowma/rowma_ros ~/catkin_ws/src
```

#### 3. Run `rowma_ros`
```
$ pip install "python-socketio[client]" requests Geohash
$ cd ~/catkin_ws
$ catkin_make
$ rosrun rowma_ros launch_runner.py
```

Then confirm the UUID provided by the ROS process.

![img1](/doc/images/rosrun.png)

### (2) On another computer
#### 1. Clone sample repository
```
$ git clone git@github.com:asmsuechan/rowma_sample.git ~/
```

#### 2. Run npm install
```
$ cd ~/rowma_sample
$ npm i
```

#### 3. Start the application
```
$ npm start
```

#### 4. Open localhost:3000
![img2](/doc/images/sample-application.png)

## Structure
The structure of this system is shown as below. I provide the connection manager at rowma.rourse.com and use it by default.
![img3](/doc/images/execute-command.png)

## Development
TODO
