const affirmations = [
  // --- CONFIDENCE (1-12) ---
  {
    id: 1,
    text: "I am enough exactly as I am.",
    category: "confidence",
    gradient: ["#1a0a3b", "#3d1478"]
  },
  {
    id: 2,
    text: "I am worthy of all the good things life has to offer.",
    category: "confidence",
    gradient: ["#20083e", "#451b8a"]
  },
  {
    id: 3,
    text: "I am strong, resilient, and capable of overcoming any obstacle.",
    category: "confidence",
    gradient: ["#1d0237", "#500b95"]
  },
  {
    id: 4,
    text: "I am confident in my unique talents and abilities.",
    category: "confidence",
    gradient: ["#2a0c4d", "#5c24b2"]
  },
  {
    id: 5,
    text: "I am proud of who I am becoming and my daily progress.",
    category: "confidence",
    gradient: ["#14052e", "#330f6c"]
  },
  {
    id: 6,
    text: "I am speaking my truth with confidence and absolute clarity.",
    category: "confidence",
    gradient: ["#260b45", "#4a148c"]
  },
  {
    id: 7,
    text: "I am the architect of my own life and author of my own story.",
    category: "confidence",
    gradient: ["#2e0854", "#5d10a8"]
  },
  {
    id: 8,
    text: "I am trusting myself fully to make the right choices for my path.",
    category: "confidence",
    gradient: ["#180430", "#390e74"]
  },
  {
    id: 9,
    text: "I am standing tall and proud in my personal power.",
    category: "confidence",
    gradient: ["#240643", "#4f1593"]
  },
  {
    id: 10,
    text: "I am letting go of self-doubt and embracing complete self-belief.",
    category: "confidence",
    gradient: ["#290a4e", "#5923ab"]
  },
  {
    id: 11,
    text: "I am powerful, courageous, and filled with infinite potential.",
    category: "confidence",
    gradient: ["#1c0733", "#3f117c"]
  },
  {
    id: 12,
    text: "I am beautiful, inside and out, and my presence makes a difference.",
    category: "confidence",
    gradient: ["#330a5c", "#621db5"]
  },

  // --- GRATITUDE (13-24) ---
  {
    id: 13,
    text: "I am deeply grateful for the abundance of love and joy in my life.",
    category: "gratitude",
    gradient: ["#0a2a2a", "#0d5c4a"]
  },
  {
    id: 14,
    text: "I am thankful for the lessons that have helped me learn and grow.",
    category: "gratitude",
    gradient: ["#082525", "#0a4c3e"]
  },
  {
    id: 15,
    text: "I am surrounded by beauty, kindness, and infinite support.",
    category: "gratitude",
    gradient: ["#0c3333", "#116b57"]
  },
  {
    id: 16,
    text: "I am appreciating the simple, quiet magic of the present moment.",
    category: "gratitude",
    gradient: ["#051f1f", "#084033"]
  },
  {
    id: 17,
    text: "I am blessed with supportive souls and standard warm connections.",
    category: "gratitude",
    gradient: ["#0d3a3a", "#147a62"]
  },
  {
    id: 18,
    text: "I am focusing on the positive and celebrating every small victory.",
    category: "gratitude",
    gradient: ["#0e4040", "#178c70"]
  },
  {
    id: 19,
    text: "I am counting my blessings and finding deep peace in contentment.",
    category: "gratitude",
    gradient: ["#072d2d", "#0c5746"]
  },
  {
    id: 20,
    text: "I am open to receiving all the magnificent gifts the universe holds.",
    category: "gratitude",
    gradient: ["#031b1b", "#05372d"]
  },
  {
    id: 21,
    text: "I am thankful for my unique journey and excited for my future.",
    category: "gratitude",
    gradient: ["#0b3535", "#106451"]
  },
  {
    id: 22,
    text: "I am choosing to see the good and find lessons in every situation.",
    category: "gratitude",
    gradient: ["#0c3c3c", "#12735d"]
  },
  {
    id: 23,
    text: "I am deeply appreciative of the abundant life I am creating.",
    category: "gratitude",
    gradient: ["#052222", "#08473a"]
  },
  {
    id: 24,
    text: "I am overflowing with gratitude for the beauty of this brand new day.",
    category: "gratitude",
    gradient: ["#0e4545", "#169275"]
  },

  // --- HEALTH (25-36) ---
  {
    id: 25,
    text: "I am treating my body with love, respect, and deep kindness.",
    category: "health",
    gradient: ["#0a2010", "#1a4a20"]
  },
  {
    id: 26,
    text: "I am full of vibrant energy, wellness, and pure life force.",
    category: "health",
    gradient: ["#081d0d", "#17431c"]
  },
  {
    id: 27,
    text: "I am nourishing my body with wholesome foods and positive thoughts.",
    category: "health",
    gradient: ["#0c2614", "#205628"]
  },
  {
    id: 28,
    text: "I am strong, healthy, and growing more vibrant with every breath.",
    category: "health",
    gradient: ["#051508", "#113514"]
  },
  {
    id: 29,
    text: "I am listening to my body's inner wisdom and resting when needed.",
    category: "health",
    gradient: ["#0e2b17", "#25612e"]
  },
  {
    id: 30,
    text: "I am grateful for my body's incredible, natural power to heal.",
    category: "health",
    gradient: ["#0f311b", "#2b6d35"]
  },
  {
    id: 31,
    text: "I am breathing in calming energy and releasing all physical tension.",
    category: "health",
    gradient: ["#071e0e", "#153e1a"]
  },
  {
    id: 32,
    text: "I am sleeping peacefully and waking up completely refreshed.",
    category: "health",
    gradient: ["#031106", "#0b2710"]
  },
  {
    id: 33,
    text: "I am perfectly in alignment across body, mind, and spirit.",
    category: "health",
    gradient: ["#0a2311", "#1e5024"]
  },
  {
    id: 34,
    text: "I am releasing daily stress and choosing vibrant, lasting wellness.",
    category: "health",
    gradient: ["#0b2813", "#225b29"]
  },
  {
    id: 35,
    text: "I am proud of how hard my body works to keep me safe and thriving.",
    category: "health",
    gradient: ["#041707", "#123a16"]
  },
  {
    id: 36,
    text: "I am glowing with radiant health, stamina, and positive energy.",
    category: "health",
    gradient: ["#0e2e17", "#276730"]
  },

  // --- LOVE (37-48) ---
  {
    id: 37,
    text: "I am worthy of receiving deep, caring, and unconditional love.",
    category: "love",
    gradient: ["#2a0a1a", "#5c1a35"]
  },
  {
    id: 38,
    text: "I am attracting healthy, loving, and deeply fulfilling relationships.",
    category: "love",
    gradient: ["#250817", "#50152d"]
  },
  {
    id: 39,
    text: "I am a beacon of compassion, gentle understanding, and pure love.",
    category: "love",
    gradient: ["#330c20", "#6a203f"]
  },
  {
    id: 40,
    text: "I am loving myself fully, completely, and without reservation.",
    category: "love",
    gradient: ["#1f0511", "#451025"]
  },
  {
    id: 41,
    text: "I am surrounding myself with people who uplift, honor, and value me.",
    category: "love",
    gradient: ["#3a0e26", "#77274b"]
  },
  {
    id: 42,
    text: "I am giving love freely and receiving it with wide open arms.",
    category: "love",
    gradient: ["#40102b", "#842d55"]
  },
  {
    id: 43,
    text: "I am worthy of absolute respect, kindness, and gentle self-care.",
    category: "love",
    gradient: ["#2d0a1b", "#5f1a38"]
  },
  {
    id: 44,
    text: "I am cultivating harmony, understanding, and peace in my connections.",
    category: "love",
    gradient: ["#190410", "#3a0e20"]
  },
  {
    id: 45,
    text: "I am seeing the beautiful, unique light in everyone I meet.",
    category: "love",
    gradient: ["#350b21", "#711d42"]
  },
  {
    id: 46,
    text: "I am healing my heart and letting genuine love flow in with ease.",
    category: "love",
    gradient: ["#380c23", "#752247"]
  },
  {
    id: 47,
    text: "I am radiating warmth, acceptance, and gentle loving-kindness.",
    category: "love",
    gradient: ["#1c0512", "#401226"]
  },
  {
    id: 48,
    text: "I am deeply cherished, safely protected, and profoundly loved.",
    category: "love",
    gradient: ["#3e0f2b", "#7e2b52"]
  },

  // --- SUCCESS (49-60) ---
  {
    id: 49,
    text: "I am capable of achieving anything I set my focused mind to.",
    category: "success",
    gradient: ["#1a1400", "#4a3800"]
  },
  {
    id: 50,
    text: "I am attracting prosperity, professional success, and abundance.",
    category: "success",
    gradient: ["#221a00", "#544000"]
  },
  {
    id: 51,
    text: "I am focused, highly driven, and committed to my long-term dreams.",
    category: "success",
    gradient: ["#2d2200", "#6a5100"]
  },
  {
    id: 52,
    text: "I am aligned with the energy of continuous growth and achievement.",
    category: "success",
    gradient: ["#141000", "#3a2c00"]
  },
  {
    id: 53,
    text: "I am turning every obstacle into a powerful stepping stone.",
    category: "success",
    gradient: ["#322700", "#765a00"]
  },
  {
    id: 54,
    text: "I am celebrating my achievements and preparing for greater heights.",
    category: "success",
    gradient: ["#3b2e00", "#876700"]
  },
  {
    id: 55,
    text: "I am a natural magnet for success, victory, and brilliant concepts.",
    category: "success",
    gradient: ["#1f1800", "#4e3b00"]
  },
  {
    id: 56,
    text: "I am making a meaningful, lasting impact on the world around me.",
    category: "success",
    gradient: ["#110d00", "#2f2400"]
  },
  {
    id: 57,
    text: "I am worthy of great professional heights and financial freedom.",
    category: "success",
    gradient: ["#281f00", "#5f4800"]
  },
  {
    id: 58,
    text: "I am stepping into my destiny and welcoming massive opportunities.",
    category: "success",
    gradient: ["#2b2100", "#664e00"]
  },
  {
    id: 59,
    text: "I am learning, growing, and refining my personal craft daily.",
    category: "success",
    gradient: ["#171200", "#3d2e00"]
  },
  {
    id: 60,
    text: "I am creating a life filled with prosperity, purpose, and impact.",
    category: "success",
    gradient: ["#372b00", "#7f6100"]
  },

  // --- CALM (61-72) ---
  {
    id: 61,
    text: "I am completely at peace with myself and the world around me.",
    category: "calm",
    gradient: ["#0a1020", "#1a2a4a"]
  },
  {
    id: 62,
    text: "I am releasing all temporary worries and letting go of control.",
    category: "calm",
    gradient: ["#070c1b", "#13203c"]
  },
  {
    id: 63,
    text: "I am calm, centered, and deeply grounded in the present moment.",
    category: "calm",
    gradient: ["#0c1426", "#20345b"]
  },
  {
    id: 64,
    text: "I am breathing deeply, slowing my pace, and finding true peace.",
    category: "calm",
    gradient: ["#040815", "#0d172e"]
  },
  {
    id: 65,
    text: "I am a calm, peaceful harbor in the midst of any life storm.",
    category: "calm",
    gradient: ["#0d182d", "#263e6a"]
  },
  {
    id: 66,
    text: "I am trusting the perfect timing and flow of the wider universe.",
    category: "calm",
    gradient: ["#0f1c34", "#2c4879"]
  },
  {
    id: 67,
    text: "I am choosing soothing peace over anxiety, and trust over fear.",
    category: "calm",
    gradient: ["#080e1e", "#162544"]
  },
  {
    id: 68,
    text: "I am quietening my mind and allowing my inner soul to speak.",
    category: "calm",
    gradient: ["#030510", "#0a1224"]
  },
  {
    id: 69,
    text: "I am enveloped in a soft, soothing aura of quiet tranquility.",
    category: "calm",
    gradient: ["#0b1223", "#1d2f53"]
  },
  {
    id: 70,
    text: "I am resting secure in the absolute knowledge that all is well.",
    category: "calm",
    gradient: ["#0c152a", "#223963"]
  },
  {
    id: 71,
    text: "I am gracefully letting go of all elements I cannot control.",
    category: "calm",
    gradient: ["#050917", "#111d35"]
  },
  {
    id: 72,
    text: "I am resting safely in the deep, quiet stillness of my own heart.",
    category: "calm",
    gradient: ["#0e1931", "#284373"]
  }
];

export default affirmations;
