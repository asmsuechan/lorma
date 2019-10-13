# Rowma
> Run local robots over the Internet

![gifimg](/doc/images/overview.gif)

RowmaはROSベースのロボットを管理するシステムで、`roslaunch`をインターネット越しに実行することが出来ます。また、以下の特徴を持っています。

* 既存ROSシステムに組み込みやすい
* 分かりやすいAPI
* クラウドサーバーの提供

なお、Rowmaは**RO**S **W**eb **Ma**nagerの略です。

[English](/README.md)

## Get started
このチュートリアルでは[rowma_sample](https://github.com/asmsuechan/rowma_sample)を使ってインターネット越しに実行可能なroslaunchを実行します。

### (1) ロボット側での処理
### 必要環境
* Python: 2.7
* ROS: Kinetic

#### 1. このリポジトリをcloneする
```
$ git clone git@github.com:asmsuechan/rowma.git ~/
```

#### 2. `rowma_ros`をcatkinワークスペースにコピーする

```
$ cp -rf ~/rowma/rowma_ros ~/catkin_ws/src
```

#### 3. `rowma_ros`を実行する
```
$ pip install "python-socketio[client]" requests Geohash
$ cd ~/catkin_ws
$ catkin_make
$ rosrun rowma_ros launch_runner.py
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

## 構成
このシステムの構成は以下の図のようになっています。コネクション管理サーバーはこちらで提供しており、デフォルトではこのサーバーに接続するようになっています。

![img3](/doc/images/execute-command.png)

## Development
TODO
