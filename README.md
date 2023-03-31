### Bus-ticket-server

# Version

- node v16.14.0
- yarn v1.22.19

# Getting Started

- yarn
- cd packages/admin
- yarn start

# How to install new package

- npm install -g lerna
- with install packages on multiple repo:
  lerna add express
- with only one repo:
  cd package/admin
  yarn add express

# How to start kafka

https://kafka.apache.org/quickstart

- Download kafka from this link
- cd kafka_2.13-3.4.0 (your version)
- Start the ZooKeeper service
  $ bin/zookeeper-server-start.sh config/zookeeper.properties
- Start the Kafka broker service
  $ bin/kafka-server-start.sh config/server.properties
