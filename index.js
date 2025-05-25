const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 📚 실제 존재하는 도서 6권
let books = [
  { id: 1, title: "어린 왕자", author: "앙투안 드 생텍쥐페리" },
  { id: 2, title: "1984", author: "조지 오웰" },
  { id: 3, title: "죄와 벌", author: "도스토옙스키" },
  { id: 4, title: "위대한 개츠비", author: "F. 스콧 피츠제럴드" },
  { id: 5, title: "데미안", author: "헤르만 헤세" },
  { id: 6, title: "노르웨이의 숲", author: "무라카미 하루키" }
];

// 👉 도서 전체 목록 조회
app.get("/books", (req, res) => {
  res.json(books);
});

// 👉 도서 추가
app.post("/books", (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);
  res.status(201).json(newBook);
});

// 🔍 도서 검색 (제목, 저자 쿼리 파라미터)
app.get("/search", (req, res) => {
  const { title, author } = req.query;
  const result = books.filter(book => {
    const matchTitle = title ? book.title.includes(title) : true;
    const matchAuthor = author ? book.author.includes(author) : true;
    return matchTitle && matchAuthor;
  });
  res.json(result);
});

// 🌐 기본 페이지
app.get("/", (req, res) => {
  res.send("📚 이승우의 도서 관리 API (12주차 과제)");
});

app.listen(port, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${port}`);
});
