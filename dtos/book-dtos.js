class IssuedBook {
  _id;
  name;
  genre;
  price;
  publisher;
  issuedBy;
  issuedDate;
  returnDate;

  constructor(user) {
    if (user.issuedBook) {
      // Check if issuedBook exists
      this._id = user.issuedBook._id; // Use issuedBook instead of IssuedBook
      this.name = user.issuedBook.name;
      this.genre = user.issuedBook.genre;
      this.price = user.issuedBook.price;
      this.publisher = user.issuedBook.publisher;
      this.issuedBy = user.name; // Adjust this if necessary
      this.issuedDate = user.issuedDate;
      this.returnDate = user.returnDate;
    } else {
      // Handle cases where there is no issuedBook
      this._id = null;
      this.name = null;
      this.genre = null;
      this.price = null;
      this.publisher = null;
      this.issuedBy = null;
      this.issuedDate = null;
      this.returnDate = null;
    }
  }
}

module.exports = IssuedBook;
