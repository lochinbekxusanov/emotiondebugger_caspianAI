
const RULES = [
  {
    id: "BURNOUT",
    keywords: ["charchadim", "charchoq", "toliqdim", "holdan toydim", "tired", "exhausted", "burnout", "burned out", "no energy", "kuch yoq"],
    errorType: "BurnoutException",
    severity: "HIGH",
    trace: [
      "at SleepQuality.check() — insufficient rest detected",
      "at FocusModule.render() — attention span degraded",
      "at Patience.handle() — irritability threshold exceeded"
    ],
    fixes: [
      "7-8 soat uzluksiz uyqu rejimini tiklang",
      "Kuniga 20 daqiqa ekrandan uzoqda dam oling",
      "Bugungi vazifalar ro'yxatini 50% ga qisqartiring"
    ]
  },
  {
    id: "ANXIETY",
    keywords: ["qoryapman", "qoryman", "tashvish", "xavotir", "anxious", "worried", "nervous", "panic", "yurak urishi", "qorqyapman"],
    errorType: "AnxietyOverflowError",
    severity: "HIGH",
    trace: [
      "at ThoughtLoop.run() — infinite worst-case scenario loop detected",
      "at NervousSystem.spike() — cortisol level above baseline",
      "at PresentMoment.access() — permission denied, stuck in future state"
    ],
    fixes: [
      "4-7-8 nafas olish texnikasini sinab ko'ring",
      "Xavotirni qog'ozga yozib, real ehtimolini baholang",
      "5 daqiqa faqat hozirgi lahzaga e'tibor qarating (grounding)"
    ]
  },
  {
    id: "ANGER",
    keywords: ["asabim", "jahlim", "achchiqlanaman", "g'azab", "angry", "furious", "irritated", "asabiylash"],
    errorType: "RageStackOverflow",
    severity: "MEDIUM",
    trace: [
      "at TriggerListener.onEvent() — unhandled frustration event",
      "at ToleranceBuffer.push() — buffer capacity exceeded",
      "at CalmState.restore() — rollback failed"
    ],
    fixes: [
      "Javob berishdan oldin 10 gacha sanang",
      "Jismoniy faollik bilan energiyani chiqaring (yugurish, yurish)",
      "Vaziyatdan 15 daqiqaga chetlashib, keyin qayting"
    ]
  },
  {
    id: "SADNESS",
    keywords: ["xafa", "gamgin", "yigilagim", "sad", "depressed", "down", "yolgiz", "umidsiz", "yomon holatdaman"],
    errorType: "LowMoodSignal",
    severity: "MEDIUM",
    trace: [
      "at MotivationEngine.init() — startup failed, low fuel",
      "at SocialConnection.ping() — no response, isolation detected",
      "at Hope.render() — component returned null"
    ],
    fixes: [
      "Ishonchli inson bilan 10 daqiqa suhbatlashing",
      "Kichik, bajarish oson bir vazifani belgilang",
      "Agar bu holat davom etsa, mutaxassisga murojaat qiling"
    ]
  },
  {
    id: "OVERWHELM",
    keywords: ["kop ish", "vaqt yetmayapti", "overwhelmed", "too much", "koplab vazifa", "ulgurmayapman", "bosim"],
    errorType: "TaskQueueOverflow",
    severity: "HIGH",
    trace: [
      "at PriorityQueue.push() — capacity exceeded, tasks unprocessed",
      "at TimeManager.allocate() — insufficient resources",
      "at DecisionMaker.select() — too many candidates, deadlock"
    ],
    fixes: [
      "Vazifalarni Eisenhower matritsasi bo'yicha saralang",
      "Faqat bugungi 3 ta eng muhim ishni belgilang",
      "Kerak bo'lsa, birovdan yordam so'rashdan tortinmang"
    ]
  }
];

const DEFAULT_RULE = {
  id: "STABLE",
  errorType: "NoCriticalErrorFound",
  severity: "LOW",
  trace: [
    "at EmotionalState.scan() — no critical exceptions detected",
    "at Baseline.compare() — within normal range"
  ],
  fixes: [
    "Hozirgi holatingizni davom ettiring",
    "Kunlik his-tuyg'ularingizni kuzatib boring",
    "O'zingizga vaqti-vaqti bilan tanaffus bering"
  ]
};

function normalize(text) {
  return text.toLowerCase();
}

function analyzeText(rawText) {
  const text = normalize(rawText || "");
  let matched = null;
  let matchCount = 0;

  for (const rule of RULES) {
    const count = rule.keywords.filter((k) => text.includes(k)).length;
    if (count > matchCount) {
      matchCount = count;
      matched = rule;
    }
  }

  const rule = matched || DEFAULT_RULE;

  return {
    input: rawText,
    status: matched ? "ERROR" : "OK",
    errorType: rule.errorType,
    severity: rule.severity,
    stackTrace: rule.trace,
    fixes: rule.fixes,
    timestamp: new Date().toISOString()
  };
}

module.exports = { analyzeText };
