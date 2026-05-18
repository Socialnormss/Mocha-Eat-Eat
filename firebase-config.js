const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyBLTB9rvtPOzWtBaB9BfpNmntC6TCDnFE4",
  authDomain:        "mocha-feeder.firebaseapp.com",
  projectId:         "mocha-feeder",
  storageBucket:     "mocha-feeder.firebasestorage.app",
  messagingSenderId: "587144144533",
  appId:             "1:587144144533:web:ac757a2ce148b048581d9c",
};

// ── Init ──────────────────────────────────────────────────────
try {
  firebase.initializeApp(FIREBASE_CONFIG);
  window.db = firebase.firestore();

  // offline cache — sync อัตโนมัติเมื่อกลับออนไลน์
  window.db.enablePersistence({ synchronizeTabs: true })
    .then(() => console.log('✅ Offline persistence enabled'))
    .catch(e => console.warn('Persistence:', e.code));

  console.log('🔥 Firebase connected:', FIREBASE_CONFIG.projectId);
} catch(e) {
  console.error('❌ Firebase init failed:', e);
  window.db = null;
}
