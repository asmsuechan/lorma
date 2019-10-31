## 概要
RowmaはROSのトピックを**誰でも遠隔地から簡単に**送受信する事ができるようになるシステムです。
[github.com/asmsuechan/rowma](https://github.com/asmsuechan/rowma)

## デモ
スマートフォンから/joyにメッセージをpublishして四輪ロボットを操作するデモです。

<iframe width="560" height="315" src="https://www.youtube.com/embed/qRJ_QeVnfb8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<details><summary>実験環境</summary><div>

以下は実験を行ったシステムのソフトウェア環境です。

|名前|内容|
|:-:|:-:|
|OS|Ubuntu 16.04|
|Python|2.7.15|
|ROS|ROS kinetic|

以下は実験を行ったシステムのハードウェア環境です。

|名前|内容|
|:-:|:-:|
|Laptop|ASUSU ZenBook UX305|
|CPU|Intel(R) Core(TM) i5-6200U CPU @ 2.30GHz|
|RAM|8GB|
|Network|400Mbps程度のWi-Fi|
|Robot|i-cart mini|

</div></details>

## 出来る事
以下の事がインターネット越しにできます。

* roslaunch/rosrunによる任意のROSノードの実行
* 任意のROSノードの停止
* 任意のトピックのPublish/Subscribe

## 使用方法
ロボット管理用のROSノードを動かす事でそのロボットにトピックをPublish/Subscribeします。

まず、ROSが動いているPC上で以下のコマンドを実行します。

```
$ git clone https://github.com/asmsuechan/rowma.git
$ cd rowma
$ cp -rf rowma_ros ~/catkin_ws/src
$ cd ~/catkin_ws
$ catkin_make
$ rosrun rowma_ros rowma
```

なお、デフォルトでは提供されているサーバーに繋ぎに行きます。

次に、サンプル管理画面の `http://ec2-18-176-1-219.ap-northeast-1.compute.amazonaws.com:3000/` にアクセスします。この画面上で上のデモ動画と同じ操作をすれば任意のノードが実行できます。

## なぜ作ったのか
今までの遠隔操作ツールは

* 研究環境に大きく依存して再利用ができない
* セットアップが容易でなく、時間がかかる

ものであり、実装者が思いつくままにシステムを構築していました。

そこで、より**簡単に誰でも使えるシステム**が必要だと感じたのでこのシステムを作りました。

## 使用技術
TODO
