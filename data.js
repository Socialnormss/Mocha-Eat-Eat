// ════════════════════════════════════════════════════════════════════
// data.js — ข้อมูลคงที่ทั้งหมด (constants)
// แก้ตรงนี้ที่เดียว = อัปเดตทั้งแอป
// ════════════════════════════════════════════════════════════════════

// ── มื้ออาหาร ── (2 มื้อ/วัน · มื้อละ อาหารเม็ด 25 ก. + เนื้อสัตว์ 10–15 ก.)
const MEALS = [
  { id:'morning', label:'มื้อเช้า', icon:'🌅' },
  { id:'evening', label:'มื้อเย็น', icon:'🌆' },
];

// ── สัดส่วนมาตรฐานต่อมื้อ (โชว์บนการ์ด) ──
const PORTION = { dry:25, meat:'10–15' };

// ── ผู้ให้อาหาร ──
const FEEDERS = [
  { code:'PP', name:'ปาป๊า'  },
  { code:'MM', name:'มาม๊า'  },
  { code:'JN', name:'เจ้นัท' },
  { code:'LL', name:'เฮียหลิว' },
  { code:'NT', name:'น้องธิป' },
  { code:'JK', name:'เจ้กุง' },
];

// ── ประเภทอาหาร ──
const FOOD_TYPES = [
  { id:'dry',          label:'อาหารเม็ดอย่างเดียว',                   meat:false, veg:false },
  { id:'dry+meat',     label:'อาหารเม็ดผสมเนื้อสัตว์',               meat:true,  veg:false },
  { id:'dry+meat+veg', label:'อาหารเม็ดผสมเนื้อสัตว์และผัก',         meat:true,  veg:true  },
  { id:'dry+wet',      label:'อาหารเม็ดผสมอาหารเปียก',               meat:false, veg:false },
  { id:'wet',          label:'อาหารเปียกอย่างเดียว',                  meat:false, veg:false },
];

const MEATS = ['🐷 หมู','🐔 ไก่','🐟 ปลา','🐊 จรเข้','🥚 ไข่ไก่'];
const VEGS  = ['🥬 ผักกาดขาว','🥕 แครอท','🥦 กะหล่ำปลี','🫛 หัวไช้เท้า','🥦 บรอคเคอลี่'];

// ── ช่วงเวลา ──
const PERIODS = [
  { id:'morning',  icon:'🌅', name:'ช่วงเช้า',    range:'5:00 – 12:00',  h:[5,12]  },
  { id:'noon',     icon:'☀️', name:'ช่วงกลางวัน', range:'12:00 – 17:00', h:[12,17] },
  { id:'evening',  icon:'🌆', name:'ช่วงค่ำ',      range:'17:00 – 24:00', h:[17,24] },
  { id:'midnight', icon:'🌙', name:'ช่วงเที่ยงคืน',range:'0:00 – 5:00',   h:[0,5]   },
];

// ── วัน/เดือน (ภาษาไทย) ──
const DAYS_S   = ['อา','จ','อ','พ','พฤ','ศ','ส'];
const DAYS_F   = ['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัส','ศุกร์','เสาร์'];
const MONTHS_S = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
const MONTHS_F = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
                  'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];

// ── ค่าโภชนาการ (kcal/100g · ทุกค่า = ปรุงสุกแล้ว) ──
const DRY_KCAL = 370; // อาหารเม็ด Small Breed Adult เฉลี่ย
const MEAT_DATA = {
  '🐔 ไก่':   { en:'Chicken (boiled)',  kcal:165 },
  '🐷 หมู':   { en:'Pork lean (boiled)',kcal:180 },
  '🐟 ปลา':   { en:'Fish (boiled)',     kcal:160 },
  '🐊 จรเข้': { en:'Crocodile (boiled)',kcal:120 },
  '🥚 ไข่ไก่':{ en:'Boiled egg',        kcal:155 },
};

// ── เป้าหมาย (lose/maintain/gain) — อ้างอิง NRC 2006, WSAVA ──
const GOAL_DATA = {
  lose:     { factor:1.0, meals:3, color:'var(--ok)', label:'ลดน้ำหนัก',
              tip:'Toy Poodle อ้วนง่าย — ให้ที่ RER × 1.0 (ประมาณ 80% ของปกติ) แบ่ง 3 มื้อ/วัน เพิ่มผักต้มสุกเป็นเครื่องเคียง (แครอท บร็อคโคลี) เพื่อความอิ่มโดยไม่เพิ่มพลังงาน ควรปรึกษาสัตวแพทย์ก่อนเริ่มโปรแกรมลดน้ำหนัก' },
  maintain: { factor:1.4, meals:3, color:'var(--tint)', label:'ปกติ',
              tip:'Toy Poodle ผู้ใหญ่ที่ตัดแต่งพันธุ์แล้ว (Neutered) ใช้ RER × 1.4 เหมาะสมกว่า × 1.6 เนื่องจากเป็นสุนัขในบ้าน กิจกรรมน้อย แนะนำ 2-3 มื้อ/วัน — การให้ 3 มื้อช่วยป้องกันภาวะน้ำตาลในเลือดต่ำ (Hypoglycemia) ซึ่งพบได้ในสุนัขพันธุ์เล็ก' },
  gain:     { factor:1.8, meals:3, color:'var(--warn)', label:'เพิ่มน้ำหนัก',
              tip:'สำหรับ Toy Poodle ที่น้ำหนักต่ำกว่าเกณฑ์หรืออยู่ในช่วงฟื้นตัว ใช้ RER × 1.8 แบ่ง 3 มื้อ/วัน เสริมเนื้อสัตว์ไม่ติดมัน (ไก่ต้ม ปลาแซลมอน) 20-25% ของแต่ละมื้อ ไม่แนะนำให้เกิน × 2.0 เพราะจะสะสมไขมันมากเกินไปในสุนัขพันธุ์เล็ก' },
};

// ── ข้อมูลโปรไฟล์เริ่มต้น ──
const INFO_DEFAULTS = { name:'มอคค่า', age:'1 ปี', weight:'', calories:'' };

// ── อาหารเม็ดแนะนำ ──
const FOOD_PRODUCTS = [
  { cat:'🏆 สูตรสำหรับพันธุ์', items:[
    { brand:'Royal Canin',     name:'Toy Poodle Adult',     kcal:340, note:'สูตรเฉพาะพันธุ์ ขนดี',          bg:'#c8102e', fg:'#fff', ico:'👑' },
    { brand:"Hill's Science",  name:'Small & Mini Adult',   kcal:358, note:'โปรตีนสูง ย่อยง่าย',           bg:'#005eb8', fg:'#fff', ico:'🏔' },
    { brand:'Purina Pro Plan', name:'Small & Toy Breed',    kcal:370, note:'เหมาะสุนัขกระตือรือร้น',       bg:'#e31837', fg:'#fff', ico:'🐾' },
  ]},
  { cat:'⚖️ สูตรควบคุมน้ำหนัก', items:[
    { brand:'Royal Canin', name:'Satiety Small',       kcal:285, note:'กากใยสูง อิ่มนาน',     bg:'#c8102e', fg:'#fff', ico:'👑' },
    { brand:"Hill's",     name:'Metabolic Small',     kcal:298, note:'เผาผลาญดีขึ้น',         bg:'#005eb8', fg:'#fff', ico:'🏔' },
    { brand:'Purina',     name:'Weight Management',   kcal:318, note:'ไขมันต่ำ โปรตีนสูง',    bg:'#e31837', fg:'#fff', ico:'🐾' },
  ]},
  { cat:'⭐ Premium / Grain-Free', items:[
    { brand:'Orijen',   name:'Small & Mini', kcal:465, note:'เนื้อสัตว์ 85% grain-free', bg:'#6b3a2a', fg:'#fff', ico:'🦅' },
    { brand:'Acana',    name:'Small Breed',  kcal:423, note:'ส่วนผสมจากธรรมชาติ',         bg:'#2d5a3d', fg:'#fff', ico:'🌿' },
    { brand:'Ziwi Peak',name:'Air-Dried',    kcal:388, note:'คุณภาพระดับ Vet',            bg:'#1a3a5c', fg:'#fff', ico:'🐟' },
  ]},
];

// ── Step labels (Feed modal) ──
const STEP_LABELS = ['เลือกผู้ให้อาหาร','เลือกประเภทอาหาร','เวลาที่ให้'];
