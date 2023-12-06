import { getBookAndAuthor, getAllBooksAndAuthors, createBook, updateBook, deleteBook } from './booksAPI.js';

// async IIFE (Immediately Invoked Function Expression)
(async () => { // <-- this is our main thread
    const book = await getBookAndAuthor(1);
    console.log(book);
})();

// async IIFE (Immediately Invoked Function Expression)
(async () => { // <-- this is our main thread
    const books = await getAllBooksAndAuthors();
    console.log(books);
})();

const newBook = await createBook({
    title: 'The Great Gatsby',
    authorId: 5,
    publishedYear: 1925,
    genre: 'Tragedy',
    summary: 'A tragic love story set in the roaring twenties.',
    ISBN: '9780743273565'
});
console.log(newBook);

const updatedNewBook = await updateBook(newBook.id, {
    title: newBook.title,
    authorId: newBook.authorId,
    publishedYear: newBook.publishedYear,
    genre: newBook.genre,
    summary: 'A tragic love story set in the roaring twenties. The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession with the beautiful former debutante Daisy Buchanan.',
    ISBN: newBook.ISBN
});
console.log(updatedNewBook);

const deletedNewBook = await deleteBook(updatedNewBook.id);
console.log(`"${deletedNewBook.title}" has been deleted.`);

