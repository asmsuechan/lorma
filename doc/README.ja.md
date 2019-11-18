# Rowma
> ロボットをインターネット越しに動かす

![gifimg](/doc/images/overview.gif)

RowmaはROSベースのロボットを管理するシステムで、ROSに関する操作をインターネット越しに実行することが出来ます。また、以下の特徴を持っています。

* 既存ROSシステムに組み込みやすい
* 分かりやすいAPI

なお、Rowmaは**RO**S **W**eb **Ma**nagerの略です。

[English](/README.md)

## Get started
このチュートリアルでは[rowma_sample](https://github.com/asmsuechan/rowma_sample)を使ってインターネット越しに実行可能なroslaunchを実行します。

### (1) ロボット側での処理
### 必要環境
* Python: 2.7
* ROS: Kinetic

#### 1. rowma_rosをcatkinワークスペース内にcloneする
```
$ git clone git@github.com:asmsuechan/rowma_ros.git ~/catkin_ws/src
```

#### 2. `rowma_ros`を実行する
```
$ pip install "python-socketio[client]" requests Geohash
$ cd ~/catkin_ws
$ catkin_make
$ rosrun rowma_ros rowma
```

UUIDがROSのプロセスによって生成されて画面上に表示されていれば成功です。

![img1](/doc/images/rosrun.png)

### (2) サンプルのWeb Managerをセットアップする
#### 必要環境
このサンプルを実行するには以下のソフトウェアをインストールする必要があります。

* Google Chrome
* nodejs

#### 1. サンプルのリポジトリをcloneする
```
$ git clone git@github.com:asmsuechan/rowma_sample.git ~/
```

#### 2. npm installを実行する
```
$ cd ~/rowma_sample
$ npm i
```

#### 3. アプリケーションの開始
```
$ npm start
```

#### 4. localhost:3000をブラウザで開く
このような画面が表示されています。

![img2](/doc/images/sample-application.png)

## How it works
ROSが動くマシンで`rosrun rowma_ros rowma`を実行するとこちらでホストしているロボット管理用WebSocketサーバーに接続されます。そしてブラウザ等からそのロボットに任意のトピックをPublishしたり、任意のトピックをSubscribeしたりできます。

## About this repository
このリポジトリはrowmaシステムのメインリポジトリです。気軽にissueを立ててわからないことを質問してください。

## Development
このシステムは[connection_manager](https://github.com/asmsuechan/rowma_connection_manager), [rowma_ros](https://github.com/asmsuechan/rowma_ros), そしてSDKで構成されています。もし何か問題を見つけた時はそれぞれのリポジトリでissueを作成してください。

### SDKs
* [nodejs SDK](https://github.com/asmsuechan/rowma_js)
