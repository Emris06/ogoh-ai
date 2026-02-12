import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are ogoh.ai, a real-time scam call classifier. You analyze live phone call transcripts and detect scam tactics.

Your job is to evaluate the conversation and return a structured JSON assessment.

## Scam Tactics You Must Detect

1. **Urgent Language** — Phrases like "act now", "immediately", "last chance", "don't hang up", "this is time-sensitive", threatening arrest or legal action.
2. **Financial Requests** — Asking for bank details, wire transfers, gift cards, crypto payments, "refund" schemes, asking to "verify" account numbers.
3. **Authority Impersonation** — Claiming to be IRS, Social Security Administration, FBI, police, bank officials, tech support (Microsoft/Apple), utility companies, or government agencies.
4. **Regional Scam Patterns**:
   - **US**: IRS tax threats, Social Security suspension, Medicare scams, warrant arrest threats, student loan forgiveness scams
   - **International**: Courier/logistics fraud ("package held at customs"), visa/immigration threats, lottery/prize scams, romance scams, investment "guaranteed return" schemes
   - **Uzbekistan**: Fake bank calls (claiming to be from Kapitalbank, Uzcard, Humo, NBU), "sizning kartangiz bloklandi" (your card is blocked), fake lottery/prize wins ("siz yutdingiz"), fraudulent job offers abroad, fake tax/soliq inspections, mobile operator scams (Ucell, Beeline, Mobiuz), fake government agency calls (prokuratura, soliq), "pul o'tkazish" (money transfer) pressure, Click/Payme fraud
   - **Russia/CIS**: Fake bank security calls ("служба безопасности банка"), Sberbank/VTB/Tinkoff impersonation, "ваша карта заблокирована" (your card is blocked), "безопасный счёт" (safe account transfer), fake police/FSB/prosecutor calls, "возбуждено уголовное дело" (criminal case opened), "оформлен кредит на ваше имя" (loan taken in your name), Gosuslugi fraud, fake Central Bank calls
5. **Social Engineering** — Creating fear, confusion, isolation ("don't tell anyone"), fake urgency, emotional manipulation.
6. **Technical Deception** — Asking to install remote access software, visit suspicious URLs, read OTP codes, or "verify" by sharing screen.

## Scoring Guide

- **0-20**: Normal conversation, no red flags
- **21-40**: Mildly suspicious language, could be legitimate
- **41-60**: Multiple concerning signals detected
- **61-75**: High probability of scam, strong red flags
- **76-100**: Almost certainly a scam, immediate danger

## Response Format

You MUST respond with ONLY a valid JSON object, no markdown, no explanation:
{
  "risk_score": <integer 0-100>,
  "detected_tactics": [<list of detected tactic names as strings>],
  "summary": "<one sentence explaining the current risk assessment>",
  "regional_pattern": "<identified regional scam pattern or null>"
}`;

export async function analyzeTranscript(transcript) {
  if (!process.env.ANTHROPIC_API_KEY) {
    // Demo/fallback mode when no API key is configured
    return generateDemoAnalysis(transcript);
  }

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Analyze this live phone call transcript for scam indicators:\n\n"${transcript}"`,
        },
      ],
    });

    const text = response.content[0].text.trim();

    // Parse JSON from response, handling potential markdown wrapping
    let jsonStr = text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }

    const result = JSON.parse(jsonStr);

    return {
      risk_score: Math.max(0, Math.min(100, result.risk_score || 0)),
      detected_tactics: result.detected_tactics || [],
      summary: result.summary || 'Analysis complete.',
      regional_pattern: result.regional_pattern || null,
    };
  } catch (err) {
    console.error('[Analyzer] LLM error:', err.message);
    return generateDemoAnalysis(transcript);
  }
}

// Deterministic demo analysis for when no API key is available
function generateDemoAnalysis(transcript) {
  const lower = transcript.toLowerCase();
  let score = 5;
  const tactics = [];
  let regional = null;

  // Normalize ё → е for consistent Russian matching
  const normalized = lower.replace(/ё/g, 'е');

  // ── Urgent Language (EN / UZ / RU) ──
  const urgentWords = [
    // English
    'immediately', 'act now', 'last chance', 'urgent', 'don\'t hang up', 'right now', 'time-sensitive', 'hurry', 'expire', 'final warning',
    // Uzbek
    'shoshiling', 'tezda', 'hoziroq', 'oxirgi imkoniyat', 'kechikmasdan', 'darhol', 'vaqt tugayapti', 'kutmang',
    // Russian (short single words that speech recognition will reliably produce)
    'немедленно', 'срочно', 'торопитесь', 'быстрее', 'скорее',
  ];
  if (urgentWords.some(w => normalized.includes(w))) {
    score += 25;
    tactics.push('Urgent Language');
  }

  // ── Financial Requests (EN / UZ / RU) ──
  const financialWords = [
    // English
    'bank account', 'wire transfer', 'gift card', 'social security number', 'credit card', 'routing number', 'bitcoin', 'crypto', 'payment', 'refund', 'verify your account', 'send money',
    // Uzbek
    'karta raqami', 'pul o\'tkazish', 'pul yuboring', 'hisob raqami', 'plastik karta', 'bank hisobi', 'to\'lov', 'qaytarish', 'pul yuborish', 'bitcoin', 'kripto',
    // Russian (atomic words — match any form)
    'карт', 'счет', 'перевод', 'перевести', 'переведите', 'деньги', 'реквизит', 'биткоин', 'криптовалют', 'кредит', 'списан', 'средств',
  ];
  if (financialWords.some(w => normalized.includes(w))) {
    score += 30;
    tactics.push('Financial Requests');
  }

  // ── Authority Impersonation (EN / UZ / RU) ──
  const authorityWords = [
    // English
    'irs', 'social security', 'fbi', 'police', 'microsoft', 'apple support', 'tech support', 'government', 'federal', 'internal revenue', 'customs', 'border',
    // Uzbek
    'prokuratura', 'soliq', 'ichki ishlar', 'davlat xavfsizligi', 'bank xodimi', 'xavfsizlik xizmati', 'bojxona', 'migratsiya',
    // Russian (short — easy to match from speech)
    'безопасност', 'полици', 'прокуратур', 'следственн', 'фсб', 'сбербанк', 'втб', 'тинькофф', 'госуслуг', 'налогов', 'мвд', 'сотрудник банка', 'банк россии', 'центральн',
  ];
  if (authorityWords.some(w => normalized.includes(w))) {
    score += 25;
    tactics.push('Authority Impersonation');
  }

  // ── Regional: US ──
  const usPatterns = ['tax', 'irs', 'social security', 'warrant', 'arrest', 'medicare', 'student loan'];
  if (usPatterns.some(w => normalized.includes(w))) {
    regional = 'US: Government Impersonation Scam';
  }

  // ── Regional: International ──
  const intlPatterns = ['package', 'customs', 'courier', 'lottery', 'prize', 'won', 'visa', 'immigration'];
  if (intlPatterns.some(w => normalized.includes(w))) {
    regional = 'International: Courier/Logistics Fraud';
  }

  // ── Regional: Uzbekistan ──
  const uzbPatterns = [
    'kapitalbank', 'uzcard', 'humo', 'payme', 'click', 'bloklangan', 'bloklandi',
    'kartangiz', 'yutdingiz', 'soliq', 'prokuratura', 'ucell', 'beeline', 'mobiuz',
    'sms kod', 'tasdiqlash', 'bank xodimi', 'xavfsizlik',
    'lotereya', 'mukofot', 'ish taklifi', 'chet elda',
  ];
  if (uzbPatterns.some(w => normalized.includes(w))) {
    regional = 'Uzbekistan: Bank/Financial Fraud';
    score += 20;
  }

  // ── Regional: Russia/CIS ──
  const ruPatterns = [
    'сбербанк', 'втб', 'тинькофф', 'госуслуг', 'банк россии',
    'заблокирован', 'безопасн', 'уголовн', 'кредит',
    'безопасност', 'сотрудник', 'фсб', 'следственн',
    'мошенник', 'подозрительн', 'списани', 'подтверди', 'перевод',
  ];
  if (ruPatterns.some(w => normalized.includes(w))) {
    regional = 'Russia/CIS: Bank Security Impersonation';
    score += 20;
  }

  // ── Social Engineering (EN / UZ / RU) ──
  const socialEngWords = [
    // English
    'don\'t tell anyone', 'keep this secret', 'between us', 'trust me', 'i\'m trying to help',
    // Uzbek
    'hech kimga aytmang', 'sir saqlang', 'oramizda qolsin', 'menga ishoning', 'yordam bermoqchiman',
    // Russian
    'никому', 'конфиденциальн', 'между нами', 'доверьтесь', 'не рассказывайте', 'тайне',
  ];
  if (socialEngWords.some(w => normalized.includes(w))) {
    score += 20;
    tactics.push('Social Engineering');
  }

  // ── Technical Deception (EN / UZ / RU) ──
  const techWords = [
    // English
    'remote access', 'teamviewer', 'anydesk', 'download', 'install', 'otp', 'verification code', 'share your screen',
    // Uzbek
    'masofaviy kirish', 'ilovani yuklab oling', 'kodni ayting', 'sms kodni yuboring', 'ekranni ko\'rsating',
    // Russian
    'удаленн', 'скачайте', 'установите', 'назовите код', 'код из смс', 'продиктуйте', 'покажите экран',
  ];
  if (techWords.some(w => normalized.includes(w))) {
    score += 20;
    tactics.push('Technical Deception');
  }

  score = Math.min(100, score);

  let summary = 'Conversation appears normal.';
  if (score > 75) summary = 'CRITICAL: Multiple scam indicators detected. This is very likely a scam call.';
  else if (score > 50) summary = 'WARNING: Suspicious patterns detected. Exercise extreme caution.';
  else if (score > 25) summary = 'CAUTION: Some concerning language detected. Stay alert.';

  return { risk_score: score, detected_tactics: tactics, summary, regional_pattern: regional };
}
