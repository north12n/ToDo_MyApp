// import express from 'express';
// import path from 'path';
// import fs from 'fs';

// const app = express();
// const PORT = 5000;

// // Route สำหรับส่งข้อมูลใน data.json
// app.get('/data', (req, res) => {
//   const filePath = path.join(__dirname, 'src', 'data', 'data.json');
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading data.json:', err);
//       res.status(500).json({ error: 'Failed to load data' });
//       return;
//     }
//     res.json(JSON.parse(data)); // ส่งข้อมูล JSON กลับไปที่ client
//   });
// });

// // เริ่มเซิร์ฟเวอร์
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
