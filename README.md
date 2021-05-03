# Installation

Go to your desired directory, then run the following commands to get started:

`$ git clone https://github.com/seajensen/node-server.git`

`$ cd node-server`

`$ git submodule init`

`$ git submodule update`


After this is complete, open three more terminal windows in the node-server project root directory. You should have four total open in the root directory at this point.

###In the first terminal:

`$ cd graph_ql`

`$ cd docker`

`$ docker-compose -f stack.yml up`


###In the second terminal:

`$ cd graph_ql`

`$ npm install`

`$ npm run seed`

`$ npm run dev`


Inside of the graph_ql directory, create a new .env file. Thor, you should have the link in the comments of this submission. Paste it into the .env file and you should be good to go. 

###In the third terminal:

`$ cd api`

`$ npm install`

`$ npm start`


###In the final terminal:

`$ cd app`

`$ npm install`

`$ npm start`


And just like that, the app should be running, complete with Graph QL and Mongo database access. 
