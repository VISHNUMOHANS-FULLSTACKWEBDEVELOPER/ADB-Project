# ADB-Project
Server:
     Storing certain Book data
     User register
     Subscriber

This is a Book record management API Server/Backend for the library system or management of records or manuals or books.

Routes & Endpoints
/users
POST:Create a new user
GET:Get all user info here

/users/{id}
GET:Get a user by id
PUT:Update a user by id
DELETE:Delete a user by id

/users/subscription-details/{id}
GET:Get user subscription details

/books
POST:Create/add a new book
GET:Get all the books

/books/{id}
GET:Get a book by id
PUT:Update a book by id

/books/issued
GET:Get all issued books

/books/issued/withfine
GET:Get all issued books with their fine

Mongo DB
Its a non relational DB(Non sequential query language).Data is stored in json format.

MVC Archicture
Modal:Its exactly the structure of mongodb
View :andled by react its the frontend part
Controller:brain or logic,its the backend part

Schema
  id:String
  name:String
  age:Number
  gender:char||varchar
Model
  id:123
  name:abc
  age:12
  gender:'vm'
