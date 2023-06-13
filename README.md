# Bus-ticket-server

## Version

- node v16.14.0
- yarn v1.22.19

## How to start project:

### Install packages npm:

- yarn

### Run services/packages, please run all of them(3)

- Note: The project has 4 three packages that representations for 4 services:
  - trip: run on localhost:8081
  - booking: run on localhost:8082
  - coach-restful(please ignore coach package if you see and concern): run on localhost:8083
  - trip-routes: run on localhost:8085
- Run them(please run follow sequence to having good sample data):

  - trip:
    - > yarn start:trip
  - booking:
    - > yarn start:booking
  - coach-restful:
    - > yarn start:coach
  - trip-routes:
    - > yarn start:route

- Bonus: In each env file of each packages, you can replace each connection string to each your db(each db completely separate).

### After do above that, you should pray and enjoy to them, good luck.

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
