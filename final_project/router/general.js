const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const { username, password } = req.body;
  
    if (username === undefined || password === undefined || username.length === 0 || password.length === 0)
      return res.status(405).json({ message: "Please input a username and a password." });
  
    for (let i = 0; i < users.length; i++)
      if (username === users[i].username)
        return res.status(405).json({ message: "Username already exists!" });
  
    users.push({
      username: username,
      password: password
    });
  
    return res.status(200).json({message: `User '${username}' successfully created! Now you can log in.`});
  });
  

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify({books}, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    var filtered_book;
    let i = 1;
    while(books[i]){
        if (books[i]["author"]===author) {
            filtered_book = books[i];
            break;
        }
        i++;
    }
   res.send(filtered_book)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    var filtered_book;
      let i = 1;
      while(books[i]){
          if (books[i]["title"]===title) {
              filtered_book = books[i];
              break;
          }
          i++;
      }
     res.send(filtered_book)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]["reviews"])
});

module.exports.general = public_users;
