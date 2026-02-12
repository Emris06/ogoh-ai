import { useState, useCallback } from 'react';

// ── Trilingual Knowledge Base ──
// Each entry has keywords and answers for EN / UZ / RU

const KNOWLEDGE_BASE = [
  {
    keywords: {
      en: ['what is', 'what\'s', 'about', 'ogoh', 'project', 'platform'],
      uz: ['nima', 'haqida', 'platforma', 'loyiha', 'ogoh', 'bu nima'],
      ru: ['что такое', 'что это', 'о проекте', 'платформа', 'расскажи', 'огох'],
    },
    answer: {
      en: 'ogoh.ai is a real-time scam call detection platform. It listens to your phone calls (with your permission), transcribes the conversation live, and uses AI to analyze it for scam tactics — giving you an instant risk score and alerting you if something looks dangerous.',
      uz: 'ogoh.ai — bu real-time firibgarlik qo\'ng\'iroqlarini aniqlash platformasi. U sizning telefon qo\'ng\'iroqlaringizni (ruxsatingiz bilan) tinglaydi, suhbatni jonli ravishda transkriptsiya qiladi va AI yordamida firibgarlik taktikalarini tahlil qiladi — darhol xavf ballini ko\'rsatadi va xavfli holatda ogohlantiradi.',
      ru: 'ogoh.ai — это платформа для обнаружения мошеннических звонков в реальном времени. Она слушает ваши телефонные разговоры (с вашего разрешения), транскрибирует беседу в прямом эфире и с помощью ИИ анализирует её на мошеннические тактики — показывая мгновенную оценку риска и предупреждая об опасности.',
    },
  },
  {
    keywords: {
      en: ['how does it work', 'how it work', 'how work', 'explain', 'process'],
      uz: ['qanday ishlaydi', 'qanday', 'ishlash', 'tushuntir', 'jarayon'],
      ru: ['как работает', 'как это работает', 'объясни', 'принцип', 'процесс'],
    },
    answer: {
      en: 'Here\'s how it works:\n1. Click "Start Protected Call" and allow microphone access\n2. Your speech is transcribed in real-time\n3. The transcript is sent to our backend via WebSocket\n4. AI analyzes the text every few seconds for scam indicators\n5. You see a live risk score (0-100), detected tactics, and AI summary\n6. If risk exceeds 75, you get a "HANG UP NOW" alert with vibration',
      uz: 'Ishlash tartibi:\n1. "Start Protected Call" tugmasini bosing va mikrofonga ruxsat bering\n2. Nutqingiz real-time transkriptsiya qilinadi\n3. Matn WebSocket orqali serverga yuboriladi\n4. AI har 4 soniyada matnni firibgarlik belgilariga tekshiradi\n5. Siz jonli xavf ballini (0-100), aniqlangan taktikalarni va AI xulosasini ko\'rasiz\n6. Xavf balli 75 dan oshsa, "HOZIROQ TELEFONI QOYING" ogohlantirishi paydo bo\'ladi',
      ru: 'Как это работает:\n1. Нажмите "Start Protected Call" и разрешите доступ к микрофону\n2. Ваша речь транскрибируется в реальном времени\n3. Текст отправляется на сервер через WebSocket\n4. ИИ анализирует текст каждые 4 секунды на признаки мошенничества\n5. Вы видите оценку риска (0-100), обнаруженные тактики и резюме ИИ\n6. Если риск выше 75 — появляется предупреждение "ПОВЕСЬТЕ ТРУБКУ" с вибрацией',
    },
  },
  {
    keywords: {
      en: ['language', 'languages', 'support'],
      uz: ['til', 'tillar', 'qo\'llab'],
      ru: ['язык', 'языки', 'поддержк'],
    },
    answer: {
      en: 'ogoh.ai supports 10 languages for speech recognition including English, O\'zbek (Uzbek), and Russian — with advanced scam keyword detection for all three. The AI analysis (with API key) works in any language.',
      uz: 'ogoh.ai nutqni aniqlash uchun 10 tilni qo\'llab-quvvatlaydi, jumladan ingliz, o\'zbek va rus tillarini. Uchala tilda firibgarlik so\'zlarini aniqlash kengaytirilgan. API kalit bilan AI tahlili istalgan tilda ishlaydi.',
      ru: 'ogoh.ai поддерживает 10 языков для распознавания речи, включая английский, узбекский и русский — с продвинутым определением ключевых слов мошенничества на всех трёх языках. ИИ-анализ (с API ключом) работает на любом языке.',
    },
  },
  {
    keywords: {
      en: ['privacy', 'data', 'store', 'save', 'record', 'secure', 'security'],
      uz: ['maxfiylik', 'ma\'lumot', 'saqlash', 'yozib olish', 'xavfsiz'],
      ru: ['конфиденциальн', 'данные', 'хранит', 'сохранят', 'записыва', 'безопасн', 'приватн'],
    },
    answer: {
      en: 'Privacy is a core principle. No audio or transcript data is ever saved to a database. Everything is processed in-memory and automatically purged when the call ends. Zero data retention.',
      uz: 'Maxfiylik — asosiy tamoyilimiz. Hech qanday audio yoki transkript ma\'lumotlari bazaga saqlanmaydi. Hamma narsa xotirada qayta ishlanadi va qo\'ng\'iroq tugagach avtomatik o\'chiriladi. Nol ma\'lumot saqlash.',
      ru: 'Конфиденциальность — наш главный принцип. Никакие аудио или текстовые данные не сохраняются в базу данных. Всё обрабатывается в оперативной памяти и автоматически удаляется после завершения звонка. Нулевое хранение данных.',
    },
  },
  {
    keywords: {
      en: ['scam', 'detect', 'what scam', 'types', 'kind'],
      uz: ['firibgarlik', 'aniqlash', 'qanday firibgarlik', 'tur', 'xil'],
      ru: ['мошенничеств', 'обнаружива', 'какие мошенничеств', 'виды', 'типы'],
    },
    answer: {
      en: 'ogoh.ai detects 6 categories:\n• Urgent Language — pressure, threats\n• Financial Requests — bank details, gift cards\n• Authority Impersonation — fake IRS, police\n• Social Engineering — manipulation, isolation\n• Technical Deception — remote access, OTP theft\n• Regional Patterns — US, Uzbekistan, Russia/CIS scams',
      uz: 'ogoh.ai 6 toifani aniqlaydi:\n• Shoshilinch til — bosim, tahdidlar\n• Moliyaviy so\'rovlar — bank rekvizitlari, sovg\'a kartalari\n• Hokimiyatni soxtalash — soxta IRS, politsiya\n• Ijtimoiy muhandislik — manipulyatsiya, izolyatsiya\n• Texnik aldov — masofaviy kirish, OTP o\'g\'irlash\n• Mintaqaviy — AQSh, O\'zbekiston, Rossiya/MDH firibgarliklari',
      ru: 'ogoh.ai обнаруживает 6 категорий:\n• Срочный язык — давление, угрозы\n• Финансовые запросы — реквизиты, подарочные карты\n• Имперсонация авторитетов — поддельные полиция, ФСБ, банки\n• Социальная инженерия — манипуляции, изоляция\n• Техническое мошенничество — удалённый доступ, кража кодов\n• Региональные схемы — США, Узбекистан, Россия/СНГ',
    },
  },
  {
    keywords: {
      en: ['risk', 'score', 'gauge', 'number', 'meaning', 'level'],
      uz: ['xavf', 'ball', 'daraja', 'raqam', 'ma\'no'],
      ru: ['риск', 'балл', 'оценк', 'уровень', 'шкала', 'значени'],
    },
    answer: {
      en: 'Risk score ranges from 0 to 100:\n• 0-20: Safe\n• 21-40: Low Risk\n• 41-60: Moderate\n• 61-75: High Risk\n• 76-100: Critical — triggers "HANG UP NOW" alert',
      uz: 'Xavf balli 0 dan 100 gacha:\n• 0-20: Xavfsiz\n• 21-40: Past xavf\n• 41-60: O\'rtacha\n• 61-75: Yuqori xavf\n• 76-100: Jiddiy — "HOZIROQ TELEFONI QOYING" ogohlantirishi',
      ru: 'Оценка риска от 0 до 100:\n• 0-20: Безопасно\n• 21-40: Низкий риск\n• 41-60: Средний\n• 61-75: Высокий риск\n• 76-100: Критический — срабатывает предупреждение "ПОВЕСЬТЕ ТРУБКУ"',
    },
  },
  {
    keywords: {
      en: ['alert', 'warning', 'hang up', 'notification', 'vibrat'],
      uz: ['ogohlantirish', 'signal', 'telefon qo\'y', 'bildirishnoma', 'vibrat', 'tebranish'],
      ru: ['оповещени', 'предупрежден', 'повесь', 'уведомлен', 'вибрац', 'тревог'],
    },
    answer: {
      en: 'When risk exceeds 75, ogoh.ai triggers:\n• Full-screen red flashing overlay\n• "HANG UP NOW" warning\n• Device vibration\n• Explanation of detected danger\nDismiss by clicking "I UNDERSTAND".',
      uz: 'Xavf balli 75 dan oshganda ogoh.ai ishga tushiradi:\n• To\'liq ekranli qizil miltillovchi qoplama\n• "HOZIROQ TELEFONI QOYING" ogohlantirishi\n• Qurilma vibratsiyasi\n• Aniqlangan xavf tushuntirishi\n"TUSHUNDIM" tugmasini bosib yopish mumkin.',
      ru: 'Когда риск превышает 75, ogoh.ai активирует:\n• Полноэкранное красное мигающее предупреждение\n• Надпись "ПОВЕСЬТЕ ТРУБКУ"\n• Вибрацию устройства\n• Объяснение обнаруженной опасности\nЗакрыть можно кнопкой "Я ПОНИМАЮ".',
    },
  },
  {
    keywords: {
      en: ['api', 'key', 'anthropic', 'claude', 'ai', 'llm', 'model'],
      uz: ['api', 'kalit', 'anthropic', 'claude', 'model', 'sun\'iy intellekt'],
      ru: ['api', 'ключ', 'anthropic', 'claude', 'модель', 'искусственн'],
    },
    answer: {
      en: 'ogoh.ai uses Claude (Anthropic) for scam classification. With an API key in server/.env — intelligent AI analysis. Without it — built-in keyword-based demo mode, fully functional for testing.',
      uz: 'ogoh.ai firibgarlikni tasniflash uchun Claude (Anthropic) dan foydalanadi. server/.env da API kalit bilan — aqlli AI tahlili. Kalitsiz — o\'rnatilgan kalit so\'zlarga asoslangan demo rejimi, sinov uchun to\'liq ishlaydi.',
      ru: 'ogoh.ai использует Claude (Anthropic) для классификации мошенничества. С API ключом в server/.env — интеллектуальный ИИ-анализ. Без ключа — встроенный демо-режим на ключевых словах, полностью рабочий для тестирования.',
    },
  },
  {
    keywords: {
      en: ['setup', 'install', 'run', 'start', 'get started', 'how to use'],
      uz: ['o\'rnatish', 'ishga tushirish', 'boshlash', 'qanday ishlatish', 'sozlash'],
      ru: ['установ', 'запуск', 'запустить', 'начать', 'как использовать', 'настрой'],
    },
    answer: {
      en: 'To get started:\n1. Backend: cd server && node index.js\n2. Frontend: cd client && npx vite --host\n3. Open http://localhost:5173 in Chrome/Edge\n4. Select language, click "Start Protected Call", allow microphone\n\nOptional: Add Anthropic API key in server/.env',
      uz: 'Boshlash uchun:\n1. Backend: cd server && node index.js\n2. Frontend: cd client && npx vite --host\n3. Chrome/Edge da http://localhost:5173 oching\n4. Tilni tanlang, "Start Protected Call" bosing, mikrofonga ruxsat bering\n\nIxtiyoriy: server/.env ga Anthropic API kalitini qo\'shing',
      ru: 'Для начала:\n1. Бэкенд: cd server && node index.js\n2. Фронтенд: cd client && npx vite --host\n3. Откройте http://localhost:5173 в Chrome/Edge\n4. Выберите язык, нажмите "Start Protected Call", разрешите микрофон\n\nОпционально: добавьте API ключ Anthropic в server/.env',
    },
  },
  {
    keywords: {
      en: ['browser', 'chrome', 'firefox', 'edge', 'safari'],
      uz: ['brauzer', 'chrome', 'firefox', 'edge', 'safari'],
      ru: ['браузер', 'хром', 'chrome', 'firefox', 'edge', 'safari'],
    },
    answer: {
      en: 'ogoh.ai works best in Google Chrome or Microsoft Edge. These browsers fully support the Web Speech Recognition API. Firefox and Safari have limited or no support.',
      uz: 'ogoh.ai Google Chrome yoki Microsoft Edge da eng yaxshi ishlaydi. Bu brauzerlar Web Speech Recognition API ni to\'liq qo\'llab-quvvatlaydi. Firefox va Safari da cheklangan yoki umuman qo\'llab-quvvatlanmaydi.',
      ru: 'ogoh.ai лучше всего работает в Google Chrome или Microsoft Edge. Эти браузеры полностью поддерживают Web Speech Recognition API. Firefox и Safari имеют ограниченную поддержку или не поддерживают вовсе.',
    },
  },
  {
    keywords: {
      en: ['uzbek', 'uzbekistan', 'ozbekiston', 'uz scam'],
      uz: ['o\'zbek', 'o\'zbekiston', 'firibgarlik', 'mahalliy'],
      ru: ['узбек', 'узбекист'],
    },
    answer: {
      en: 'ogoh.ai detects Uzbekistan-specific scams:\n• Fake Kapitalbank/Uzcard/Humo calls\n• "Kartangiz bloklandi" schemes\n• Click/Payme fraud\n• Fake prokuratura/soliq calls\n• Ucell/Beeline/Mobiuz scams\n• Fraudulent job offers abroad',
      uz: 'ogoh.ai O\'zbekistonga xos firibgarliklarni aniqlaydi:\n• Soxta Kapitalbank/Uzcard/Humo qo\'ng\'iroqlari\n• "Kartangiz bloklandi" sxemalari\n• Click/Payme firibgarliklari\n• Soxta prokuratura/soliq qo\'ng\'iroqlari\n• Ucell/Beeline/Mobiuz firibgarliklari\n• Chet elda soxta ish takliflari',
      ru: 'ogoh.ai обнаруживает мошенничества, специфичные для Узбекистана:\n• Поддельные звонки от Kapitalbank/Uzcard/Humo\n• Схемы "Ваша карта заблокирована"\n• Мошенничество через Click/Payme\n• Поддельные звонки от прокуратуры/налоговой\n• Мошенничество от имени Ucell/Beeline/Mobiuz\n• Ложные предложения работы за рубежом',
    },
  },
  {
    keywords: {
      en: ['russian', 'russia', 'cis'],
      uz: ['rus', 'rossiya', 'mdh'],
      ru: ['русск', 'росси', 'снг', 'российск'],
    },
    answer: {
      en: 'ogoh.ai detects Russia/CIS-specific scams:\n• Fake Sberbank/VTB/Tinkoff security calls\n• "Card blocked" schemes\n• "Safe account" transfer fraud\n• Fake FSB/prosecutor/police calls\n• Gosuslugi impersonation\n• "Loan taken in your name" scams',
      uz: 'ogoh.ai Rossiya/MDH ga xos firibgarliklarni aniqlaydi:\n• Soxta Sberbank/VTB/Tinkoff xavfsizlik qo\'ng\'iroqlari\n• "Karta bloklangan" sxemalari\n• "Xavfsiz hisob" pul o\'tkazish firibgarligi\n• Soxta FSB/prokuratura/politsiya qo\'ng\'iroqlari\n• Gosuslugi firibgarligi\n• "Ismingizga kredit olingan" sxemalari',
      ru: 'ogoh.ai обнаруживает мошенничества, типичные для России/СНГ:\n• Поддельные звонки от "безопасности" Сбербанка/ВТБ/Тинькофф\n• Схемы "Ваша карта заблокирована"\n• Мошенничество с "безопасным счётом"\n• Поддельные звонки от ФСБ/прокуратуры/полиции\n• Мошенничество от имени Госуслуг\n• Схемы "На ваше имя оформлен кредит"',
    },
  },
  {
    keywords: {
      en: ['team', 'who', 'made', 'built', 'creator', 'developer', 'hackathon'],
      uz: ['jamoa', 'kim', 'yaratgan', 'ishlab chiqgan', 'hackathon'],
      ru: ['команд', 'кто', 'создал', 'разработал', 'хакатон'],
    },
    answer: {
      en: 'ogoh.ai was built as a hackathon project. The name "ogoh" means "aware" / "alert" in Uzbek — fitting for a scam awareness platform.',
      uz: 'ogoh.ai hackathon loyihasi sifatida yaratilgan. "Ogoh" so\'zi o\'zbek tilida "xabardor" / "hushyor" degan ma\'noni anglatadi — firibgarlikdan ogohlantiradigan platforma uchun juda mos.',
      ru: 'ogoh.ai создан как хакатон-проект. Название "ogoh" означает "бдительный" / "осведомлённый" на узбекском языке — идеально подходит для платформы предупреждения о мошенничестве.',
    },
  },
  {
    keywords: {
      en: ['free', 'cost', 'price', 'pay'],
      uz: ['bepul', 'narx', 'to\'lov', 'pul'],
      ru: ['бесплатн', 'стоимость', 'цена', 'платить', 'сколько стоит'],
    },
    answer: {
      en: 'ogoh.ai is free and open-source. The only potential cost is Anthropic API usage for AI analysis — but the demo mode (keyword detection) works completely free.',
      uz: 'ogoh.ai bepul va ochiq kodli. Yagona mumkin bo\'lgan xarajat — AI tahlili uchun Anthropic API. Lekin demo rejimi (kalit so\'zlar bo\'yicha aniqlash) to\'liq bepul ishlaydi.',
      ru: 'ogoh.ai бесплатный и с открытым кодом. Единственная возможная стоимость — использование API Anthropic для ИИ-анализа. Но демо-режим (определение по ключевым словам) работает полностью бесплатно.',
    },
  },
  {
    keywords: {
      en: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
      uz: ['salom', 'assalomu', 'hayrli'],
      ru: ['привет', 'здравствуй', 'добрый', 'салам'],
    },
    answer: {
      en: 'Hello! I\'m the ogoh.ai assistant. Ask me anything about our scam call detection platform — features, supported languages, how to get started, or what types of scams we detect!',
      uz: 'Salom! Men ogoh.ai yordamchisiman. Firibgarlik qo\'ng\'iroqlarini aniqlash platformamiz haqida istalgan narsa so\'rang — imkoniyatlar, qo\'llab-quvvatlanadigan tillar, qanday boshlash yoki qanday firibgarliklarni aniqlay olamiz!',
      ru: 'Привет! Я ассистент ogoh.ai. Спрашивайте что угодно о нашей платформе обнаружения мошеннических звонков — функции, поддерживаемые языки, как начать или какие виды мошенничества мы определяем!',
    },
  },
  {
    keywords: {
      en: ['thank', 'thanks', 'appreciate'],
      uz: ['rahmat', 'tashakkur', 'minnatdor'],
      ru: ['спасибо', 'благодар'],
    },
    answer: {
      en: 'You\'re welcome! Stay safe out there. If you have more questions about ogoh.ai, feel free to ask anytime.',
      uz: 'Arzimaydi! Ehtiyot bo\'ling. ogoh.ai haqida boshqa savollaringiz bo\'lsa, istalgan vaqtda so\'rang.',
      ru: 'Пожалуйста! Берегите себя. Если есть ещё вопросы об ogoh.ai — спрашивайте в любое время.',
    },
  },
];

// ── Language Detection ──

function detectLanguage(text) {
  const hasCyrillic = /[а-яёА-ЯЁ]/.test(text);
  // Uzbek-specific characters and common words
  const hasUzbek = /[o'O'][''`]|sh|ch|ng/i.test(text) ||
    /(salom|nima|qanday|haqida|kerak|uchun|bilan|tillar|ishlaydi|firibgar)/i.test(text);

  if (hasCyrillic) return 'ru';
  if (hasUzbek) return 'uz';
  return 'en';
}

const DEFAULT_ANSWERS = {
  en: 'I\'m not sure about that, but I can help with questions about ogoh.ai — how it works, supported languages, scam types, privacy, setup, and more. Try "How does it work?" or "What scams can it detect?"',
  uz: 'Bu haqda aniq javob bera olmayman, lekin ogoh.ai haqida yordam bera olaman — qanday ishlaydi, qo\'llab-quvvatlanadigan tillar, firibgarlik turlari, maxfiylik, sozlash va boshqalar. "Qanday ishlaydi?" yoki "Qanday firibgarliklarni aniqlaydi?" deb so\'rab ko\'ring.',
  ru: 'Не уверен насчёт этого, но могу помочь с вопросами об ogoh.ai — как работает, поддерживаемые языки, типы мошенничества, конфиденциальность, настройка и другое. Попробуйте спросить "Как это работает?" или "Какие мошенничества определяет?"',
};

function findBestMatch(input) {
  const lower = input.toLowerCase();
  const lang = detectLanguage(input);
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let matchCount = 0;
    // Search keywords in all languages (user might mix)
    for (const kwLang of Object.values(entry.keywords)) {
      for (const keyword of kwLang) {
        if (lower.includes(keyword)) {
          matchCount++;
        }
      }
    }
    if (matchCount > bestScore) {
      bestScore = matchCount;
      bestMatch = entry;
    }
  }

  if (bestScore > 0 && bestMatch) {
    return bestMatch.answer[lang] || bestMatch.answer.en;
  }
  return DEFAULT_ANSWERS[lang] || DEFAULT_ANSWERS.en;
}

export function useChatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Hi! I\'m the ogoh.ai assistant.\nSalom! Men ogoh.ai yordamchisiman.\nПривет! Я ассистент ogoh.ai.\n\nAsk me anything / Istalgan narsa so\'rang / Спрашивайте!',
    },
  ]);

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text }]);

    setTimeout(() => {
      const reply = findBestMatch(text);
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    }, 400);
  }, []);

  return { messages, sendMessage };
}
