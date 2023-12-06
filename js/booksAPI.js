export const getBookAndAuthor = async (id) => { // <-- notice the export keyword
    try {
        // Get the book data
        const bookUrl = `http://localhost:3000/books/${id}`;
        const bookResponse = await fetch(bookUrl);
        const book = await bookResponse.json();
        // Get the author data
        const authorUrl = `http://localhost:3000/authors/${book.authorId}`;
        const authorResponse = await fetch(authorUrl);
        const author = await authorResponse.json();
        // Add the author to the book object
        book.author = author;
        // Return the book object
        return book;
    } catch (error) {
        console.error(error);
    }
}

export const getAllBooksAndAuthors = async () => {
    try {
        // Get all the books
        const booksUrl = 'http://localhost:3000/books';
        const booksResponse = await fetch(booksUrl);
        const books = await booksResponse.json();
        // Get all the authors
        const authorsUrl = 'http://localhost:3000/authors';
        const authorsResponse = await fetch(authorsUrl);
        const authors = await authorsResponse.json();
        // Add the author to each book object
        books.forEach(book => {
            const author = authors.find(author => author.id === book.authorId);
            book.author = author;
        });
        // Return the books array
        return books;
    } catch (error) {
        console.error(error);
    }
}

export const updateBook = async (id, book) => {
    try {
        const url = `http://localhost:3000/books/${id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        };
        const response = await fetch(url, options);
        const updatedBook = await response.json();
        return updatedBook;
    } catch (error) {
        console.error(error);
    }
}

export const deleteBook = async (id) => {
    try {
        const url = `http://localhost:3000/books/${id}`;
        const options = {
            method: 'DELETE'
        };
        const response = await fetch(url, options);
        const deletedBook = await response.json();
        return deletedBook;
    } catch (error) {
        console.error(error);
    }
}