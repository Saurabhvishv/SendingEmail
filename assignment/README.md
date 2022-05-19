First install  npm i modules

then open etheral email,

if you craete new one then write user and password in 
// articleController

run the terminal  nodemon index.js

Admin Create = localhost:3000/registerAdmin
{
    "name": "Saurabh Vishwakarma",
    "email": "admin@gmail.com",
    "password": "saurabh@123"
}


Admin Login = http://localhost:4000/loginAdmin
{
    "email": "admin@gmail.com",
    "password": "saurabh@123"
}

Create Website = localhost:4000/website
{
    "WebsiteName": "node js.com"
}

Create Article = localhost:4000/article
{
    "Title": "Body-Parser",
    "Description": "to new version",
    "WebsiteId": "626ebfbd6a3ea04c4f168f5c"
    
}

Subscribe Email = localhost:4000/subscribeEmail
{
    "email": "More@testemail.test",
    "WebsiteId": "626ebfbd6a3ea04c4f168f5c"
}

//install nodemailer 
//use Ethereal.email for test



