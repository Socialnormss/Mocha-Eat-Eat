const CACHE = 'dog-feeder-v16-chars';
const ASSETS = [
  './index.html', './style.css', './mocha-cozy.css', './mocha-fun.css',
  './data.js', './app.js', './manifest.json', './icon.png', './firebase-config.js',
  './img/mocha-avatar.png', './img/mocha-peek.png', './img/mocha-sit.png', './img/mocha-trot.png',
  './img/time-morning.png', './img/time-noon.png', './img/time-evening.png', './img/time-night.png',
  './img/food-bowl.png', './img/food-chicken.png', './img/food-fish.png', './img/food-carrot.png',
  './img/food-beef.png', './img/food-broccoli.png', './img/food-apple.png', './img/food-rice.png',
  './img/food-egg.png', './img/food-kibble.png', './img/food-leaf.png', './img/food-paw.png',
  './img/food-fire.png',
  './img/danger-chocolate.png', './img/danger-grape.png', './img/danger-xylitol.png',
  './img/danger-caffeine.png', './img/danger-wine.png', './img/danger-onion.png',
  './img/danger-avocado.png', './img/danger-macadamia.png', './img/danger-milk.png',
  './img/elements/el-ricebowl.png', './img/elements/el-sandwich.png', './img/elements/el-orange.png',
  './img/elements/el-mug.png', './img/elements/el-flame.png', './img/elements/el-spoon.png',
  './img/elements/el-tomato.png', './img/elements/el-bottle.png', './img/elements/el-gum.png',
  './img/elements/el-ricecooker.png', './img/elements/el-cake.png', './img/elements/el-acorn.png',
  './img/elements/el-dango.png', './img/elements/el-teapot.png', './img/elements/el-orange2.png',
  './img/elements/el-tv.png', './img/elements/el-jam.png', './img/elements/el-yogurt.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // ลบ cache เก่าทั้งหมด
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  // Firebase CDN และ external scripts → ไม่ cache, โหลดจากเน็ตเสมอ
  if (e.request.url.includes('gstatic.com') || e.request.url.includes('googleapis.com')) {
    e.respondWith(fetch(e.request));
    return;
  }

  // ไฟล์ app (.html, .js, .json) → network-first (ได้ไฟล์ใหม่เสมอ, fallback cache เมื่อออฟไลน์)
  if (e.request.url.match(/\.(html|js|json)$/)) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // รูปและไฟล์อื่น → cache-first
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
