// Stockage des ROMs dans le navigateur de l'appareil (IndexedDB).
// Aucune limite de taille côté Supabase : seules les sauvegardes partent en ligne.
const DB_NAME = 'lazemu', STORE = 'roms';

function openDb() {
  return new Promise((res, rej) => {
    const q = indexedDB.open(DB_NAME, 1);
    q.onupgradeneeded = () => q.result.createObjectStore(STORE);
    q.onsuccess = () => res(q.result);
    q.onerror = () => rej(q.error);
  });
}
function run(mode, fn) {
  return openDb().then(db => new Promise((res, rej) => {
    const tx = db.transaction(STORE, mode);
    const out = fn(tx.objectStore(STORE));
    tx.oncomplete = () => res(out && out.result);
    tx.onerror = () => rej(tx.error);
    tx.onabort = () => rej(tx.error || new Error('Stockage refusé (espace plein ?)'));
  }));
}
// Les ROMs sont rangées par compte : clé = "<uid>/<nom du fichier>"
export const saveRom = (uid, name, blob) => run('readwrite', s => s.put(blob, `${uid}/${name}`));
export const getRom = (uid, name) => run('readonly', s => s.get(`${uid}/${name}`));
export const deleteRom = (uid, name) => run('readwrite', s => s.delete(`${uid}/${name}`));
export const listRoms = uid => run('readonly', s => s.getAllKeys())
  .then(keys => (keys || []).filter(k => k.startsWith(uid + '/')).map(k => k.slice(uid.length + 1)));

// Demande au navigateur de ne pas effacer les ROMs quand l'appareil manque de place
export const askPersist = () => navigator.storage && navigator.storage.persist ? navigator.storage.persist() : Promise.resolve(false);
