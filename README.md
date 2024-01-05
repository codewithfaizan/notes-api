<h1>Spree Assessment</h1>

## Project Overview

A Secure and Scalable RESTful API that allows users to create, read, update, and delete Notes. The application also allow users to share their notes with other users and search for notes based on keywords.

<b>Note :</b> Tech Stacks used NodeJs, Express and MongoDB.
<i>Tags - </i>#node #express #monogdb

## Choice of Framework/ Database

I choose Express because of the JavaScript/Node.js Ecosystem I get. I am more familiar JavaScript and Node.js and hence using Express might be my natural choice.
And coming to Database, my choice of using MongoDB is because it is a NoSQL database that uses flexible, document-oriented model. It has Schema Felxibilty for creating dynamic schemas making it easier to handle changes in data structure over time as I have applied multiple changes to the Schema in current assignmemt. MongoDB uses a query language that is similar to JSON, it has made easy for me to work with and understand as I am dealing with JSON data throught the assignment.

## Installation

Clone the repository from GitHub repo <a href="https://github.com/codewithfaizan/notes-api">notes-api </a>. <b> Note : This Application requires a .env file containing mongodb srv string follow below </b>

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

## Features
### Authentication
- Token Based Authentication - JSON Web Tokens (JWT)
- User will receive a unique token upon successful login, This token is set to the headers of each request for authentication.

### Rate limiting and Request throttling
- express-rate-limit package is used to help handle high traffic and request throttling  involves allowing a certain number of requests per time unit and delaying excess requests.

### Search Functionality
- Enable users to search for notes based on keywords.

## API Endpoints 
<h4>Public</h4>

<ul> 
<li>POST /api/auth/signup: create a new user account.</li>
<li>POST /api/auth/login: log in to an existing user account and receive an access token.</li>
</ul>
<h4>Notes  Endpoints</h4>
<ul>
<li>GET /api/notes: get a list of all notes for the authenticated user.</li>
<li>GET /api/notes/:id: get a note by ID for the authenticated user.</li>
<li>POST /api/notes: create a new note for the authenticated user.</li>
<li>PUT /api/notes/:id: update an existing note by ID for the authenticated user.</li>
<li>DELETE /api/notes/:id: delete a note by ID for the authenticated user.</li>
<li>POST /api/notes/:id/share: share a note with another user for the authenticated user.</li>
<li>GET /api/search?q=:query: search for notes based on keywords for the authenticated user.</li>
</ul>

## Npm packages used and their usage
- "bcrypt": "^5.1.1" --to securely hash the password
- "compression": "^1.7.4" --to enables gzip compression for the HTTP responses sent by the server, to reduce the size of the data transferred over the network for faster response
- "cors": "^2.8.5" --to enable Cross-Origin Resource Sharing (CORS)
- "crypto-js": "^4.2.0" --to encrypted token for data integrity verification. Used for     Encryption and Decryption as it supports symmetric key encryption algorithms like AES
- "dotenv": "^16.3.1" --to load environment variables from a .env file 
- "express": "^4.18.2" --to create an express application
- "express-rate-limit": "^7.1.5" --to implement rate limiting for endpoints
- "express-validator": "^7.0.1" --to wrap the handler with middleware for body validations
- "jsonwebtoken": "^9.0.2" --to create and verify JSON Web Tokens (JWT)
- "mongoose": "^8.0.3" --to define schemas, models, and interact with MongoDB 
- "morgan": "^1.10.0" --to log HTTP requests and information about incoming requests,helps in debugging, monitoring, and analyzing the behavior of the application
- "nodemon": "^3.0.2" --it is a tool to automatically restart the application whenever there are any changes in the source code