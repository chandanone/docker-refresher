# DOCKER Inter container communication
## Mongodb, nodejs – container
1. Create a network – 
    - docker network create todo-net
2. Set .env - MONGO_URI=mongodb://mongo-con:27017/todo-app
3. docker run -d --name mongo-con --network todo-net -p 27018:27017 mongo
4. docker build -t api . – in node-proj folder
5. docker run --name api-app1 --network todo-net -p 3001:3001 -e MONGO_URI="mongodb://mongo-con:27017/todo-app" api
6. POST todo on http://localhost:3001
