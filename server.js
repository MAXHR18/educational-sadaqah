const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// ✅ السماح لجميع الطلبات بدون تقييد
app.use(cors());

// الميدلويرات
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// حماية بعض الملفات
app.get(['/admin.html', '/server.js', '/package.json'], (req, res) => {
  const filePath = path.join(__dirname, req.path);
  return fs.existsSync(filePath)
    ? res.sendFile(filePath)
    : res.status(404).send('404 Not Found');
});

// حفظ البيانات
app.post('/api/save', (req, res) => saveJson('data.json', req, res));
app.post('/api/save2', (req, res) => saveJson('data2.json', req, res));

function saveJson(file, req, res) {
  try {
    fs.writeFileSync(file, JSON.stringify(req.body, null, 2), 'utf8');
    res.json({ success: true, message: `تم الحفظ في ${file}` });
  } catch (err) {
    res.status(500).json({ error: `فشل في حفظ ${file}` });
  }
}

// قراءة البيانات
app.get('/api/data', (req, res) => sendJson('data.json', res));
app.get('/api/2data', (req, res) => sendJson('data2.json', res));

function sendJson(file, res) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: `فشل في قراءة ${file}` });
  }
}

// منع الوصول المباشر للملفات الحساسة
app.get('/data.json', (_, res) => res.status(404).json({ error: 'not found' }));
app.get('/data2.json', (_, res) => res.status(404).json({ error: 'not found' }));

// تقديم الملفات الثابتة
app.use(express.static(__dirname));

// الصفحة الرئيسية
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// تشغيل الخادم
app.listen(port, () =>
  console.log(`✅ الخادم يعمل على http://localhost:${port}`)
);
