# Rowma
> Run local robots over the Internet

Demo video (jump to YouTube)

[![YouTube demo video](https://img.youtube.com/vi/qRJ_QeVnfb8/0.jpg)](https://www.youtube.com/watch?v=qRJ_QeVnfb8)

Rowma is a ROS-based robots management system which allows robots operate through the Internet.

* Easy to integrate
* Clear API

In addition, Rowma stands for **RO**S **W**eb **Ma**nager.

[日本語](/doc/README.ja.md)

## Features
* Run `roslaunch` command over the Internet
* Run `rosrun` command over the Internet
* Kill a rosnode over the Internet
* Publish a message to a rostopic over the Internet
* Subscribe a rostopic over the Internet

## Get started
This tutorial uses [rowma_sample](https://github.com/asmsuechan/rowma_sample) to execute roslaunch over the Internet.

### Environments
* Python: 2.7
* ROS: Kinetic

### (1) On your ROS based robot
#### 1. Clone rowma_ros to your catkin workspace
```
$ git clone git@github.com:asmsuechan/rowma_ros.git ~/catkin_ws/src
```

#### 2. Run `rowma_ros`
```
$ pip install "python-socketio[client]" requests Geohash
$ cd ~/catkin_ws
$ catkin_make
$ rosrun rowma_ros rowma
```

Then confirm the UUID provided by the ROS process.

![img1](/doc/images/rosrun.png)

### (2) Setup Sample Web Manager
#### Environments
* Google Chrome
* nodejs

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
You will see this page.

![img2](/doc/images/sample-application.png)

## Development
This system consists of [connection_manager](https://github.com/asmsuechan/rowma_connection_manager), [rowma_ros](https://github.com/asmsuechan/rowma_ros), and SDKs. Open issues/PRs in the each projects when you find some issues.

### SDKs
* [nodejs SDK](https://github.com/asmsuechan/rowma_js)
