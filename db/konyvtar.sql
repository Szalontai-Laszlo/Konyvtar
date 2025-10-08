-- Könyvtár adatbázis létrehozása

CREATE TABLE authors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    author_id INT,
    category_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE borrows (
    id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    borrower_name VARCHAR(100),
    borrow_date DATE,
    FOREIGN KEY (book_id) REFERENCES books(id)
);

-- Adatok feltöltése

INSERT INTO authors (name) VALUES ('Jókai Mór'), ('Agatha Christie'), ('George Orwell');
INSERT INTO categories (name) VALUES ('Regény'), ('Krimi'), ('Sci-fi');
INSERT INTO books (title, author_id, category_id) VALUES
    ('Az arany ember', 1, 1),
    ('Tíz kicsi néger', 2, 2),
    ('1984', 3, 3);
INSERT INTO borrows (book_id, borrower_name, borrow_date) VALUES
    (1, 'Kiss Péter', '2025-10-01'),
    (2, 'Nagy Anna', '2025-10-03');