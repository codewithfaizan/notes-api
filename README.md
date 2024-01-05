<h1>Spree Assessment</h1>

## Project Overview

A Secure and Scalable RESTful API that allows users to create, read, update, and delete Notes. The application also allow users to share their notes with other users and search for notes based on keywords.

<b>Note :</b> Tech Stacks used NodeJs, Express and MongoDB.
<i>Tags - </i>#node #express #monogdb

## Choice of Framework/ Database

I choose Express because of the JavaScript/Node.js Ecosystem I get. I am more familiar JavaScript and Node.js and hence using Express might be my natural choice.
And coming to Database, my choice of using MongoDB is because it is a NoSQL database that uses flexible, document-oriented model. It has Schema Felxibilty for creating dynamic schemas making it easier to handle changes in data structure over time as I have applied multiple changes to the Schema in current assignmemt. MongoDB uses a query language that is similar to JSON, it has made easy for me to work with and understand as I am dealing with JSON data throught the assignment.

## Installation

Clone the repository from GitHub repo <a href="https://github.com/codewithfaizan/notes-api">notes-api </a>. <b> Note : This Application requires a .env file containing mongodb srv string </b>

```bash
git clone git@github.com:oode45/notes-app.git
cd notes-app
```
Install the dependencies
```bash
npm install
```
Create a .env file
```bash
touch .env
```
Copy paste the script inside the .env file and Add the mongoDB srv string

```bash
// .env
PORT = 3000
MONGODB_SRV=
JWT_SECRET_KEY= 63d821b8f8fcda47e2f44786088ff351ebf6d6ea4fa736ae72f2945fb24e326d
CRYPTO_SECRET_KEY= 489b17790b678e31385718d5ec2b4f09f4809ec07ffb865d22e9ec8cb24aa1f8
```
<p>code for generating secret-key - </p>

```bash
node
require('crypto').randomBytes(32).toString('hex')
``` 
## Development
```bash
echo "!!! let's begin !!!"
```
Start the server
```bash
npm start
```

## Npm packages used
- "bcrypt": "^5.1.1",
- "compression": "^1.7.4",
- "config": "^3.3.9",
- "cors": "^2.8.5",
- "crypto-js": "^4.2.0",
- "dotenv": "^16.3.1",
- "express": "^4.18.2",
- "express-rate-limit": "^7.1.5",
- "express-validator": "^7.0.1",
- "jsonwebtoken": "^9.0.2",
- "mongoose": "^8.0.3",
- "morgan": "^1.10.0",
- "nodemon": "^3.0.2"


- Angular Material ver ^12.2.12
- json-server ver ^^0.17.0 for database, db-json @ http://localhost:3000/
- npm install -g json-serverto install json Server
- https://www.npmjs.com/package/json-server for json server reference
- json-server --watch db.json to run database server
- SCSS
## Useful Links

https://www.npmjs.com/

### Link for Dummy Data

https://jsonformatter.org/629cf5
