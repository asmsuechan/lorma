# rowma
<p align="center">
  <img width="460" src="/doc/images/rowma_logo.png">
</p>

> Run local robots over the Internet

Demo video (jump to YouTube)

[![YouTube demo video](https://img.youtube.com/vi/cOwHWh60PCk/0.jpg)](https://youtu.be/cOwHWh60PCk)

Rowma is a ROS-based robots management system which allows robots operate through the Internet.

* Easy to integrate
* Clear API

In addition, Rowma stands for **Ro**bot **W**eb **Ma**nager.

[日本語](/doc/README.ja.md)

# Features
* Run `roslaunch` command over the Internet
* Run `rosrun` command over the Internet
* Kill a rosnode over the Internet
* Publish a message to a rostopic over the Internet
* Subscribe a rostopic over the Internet

# Get started
This tutorial uses [rowma-sample](https://github.com/asmsuechan/rowma-sample) to execute roslaunch over the Internet.

```sh
$ cd ~/catkin_ws/src
$ git clone https://github.com/asmsuechan/rowma_ros
$ cd rowma_ros
$ pip install -r requirements.txt
$ cd ../..
$ catkin_make
$ rosrun rowma_ros rowma
Your UUID is: 4366a075-539d-4a05-8f99-d7fe8d2a5bc0
```

Then access `http://18.176.1.219:3000`.

# About this repository
This repository is a main repository for rowma system, feel free to ask questions at a issue.

# Development
This system consists of [connection_manager](https://github.com/asmsuechan/rowma_connection_manager), [rowma_ros](https://github.com/asmsuechan/rowma_ros), and SDKs. Open issues/PRs in the each projects when you find some issues.

## SDKs
* [nodejs SDK](https://github.com/asmsuechan/rowma_js)

# TODO
* Write how to up own connection manager
