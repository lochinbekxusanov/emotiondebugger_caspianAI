# 🐛 Emotion Debugger

## Muammo
Ko'pchilik odamlar, ayniqsa yosh mutaxassislar va talabalar, o'z hissiy holatini (stress, charchoq, xavotir) o'z vaqtida anglay olmaydi va sababini tushunmaydi. Bu esa vaqt o'tishi bilan mental sog'liqqa salbiy ta'sir qiladi.

## Yechim
**Emotion Debugger** — dasturchilar kod xatosini debug qilgani kabi, foydalanuvchiga o'z hissiy holatini "debug qilish" imkonini beruvchi veb-ilova. Foydalanuvchi hozirgi kayfiyatini oddiy matn shaklida yozadi, tizim uni tahlil qilib, "error type", "stack trace" va amaliy "fix" (tavsiya) shaklida natija chiqaradi.

## Xususiyatlar
- ✅ Matn asosida hissiy holatni tahlil qilish
- ✅ Kompilyator uslubidagi animatsion natija (stack trace)
- ✅ Har bir "xato" uchun amaliy tavsiyalar
- ✅ To'liq responsive dizayn (mobil/desktop)
- ✅ Frontend + Backend integratsiyasi

## Texnologiyalar
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Tahlil:** Kalit so'zlarga asoslangan qoida-tizimi (rule-based NLP)

## Loyiha strukturasi
```
emotion-debugger/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend/
│   ├── server.js
│   ├── analyzer.js
│   └── package.json
├── README.md
└── .gitignore
```

## O'rnatish va ishga tushirish

```bash
git clone <repo-link>
cd emotion-debugger/backend
npm install
npm start
```

Server ishga tushgach, brauzerda oching:
```
http://localhost:5000
```

Frontend backend orqali avtomatik serve qilinadi (alohida server kerak emas).

## Ishlash tartibi
1. Foydalanuvchi hozirgi holatini matn shaklida yozadi
2. "Run Debugger" tugmasi bosiladi
3. Backend matnni tahlil qilib, mos "xato turi"ni aniqlaydi
4. Natija terminal uslubida animatsiya bilan chiqariladi: xato turi → stack trace → tavsiyalar

## Kelajakdagi rivojlanish
- Real AI/LLM API (Claude, GPT) bilan integratsiya orqali chuqurroq tahlil
- Foydalanuvchi tarixi va progress grafiklari
- Ko'p tilli qo'llab-quvvatlash

## Jamoa
Hack Devengers 1.0 — [jamoa a'zolarini shu yerga yozing]
