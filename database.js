const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = process.env.DB_PATH || './cashvip.db';

let db;

const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Error opening database:', err);
        reject(err);
      } else {
        console.log('Connected to SQLite database');
        createTables().then(resolve).catch(reject);
      }
    });
  });
};

const createTables = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          role TEXT CHECK(role IN ('admin', 'employee')) DEFAULT 'employee',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Apps table
      db.run(`
        CREATE TABLE IF NOT EXISTS apps (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          basic_rate REAL DEFAULT 0,
          client_rate REAL DEFAULT 0,
          accounting_rate REAL DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Offers table
      db.run(`
        CREATE TABLE IF NOT EXISTS offers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          type TEXT CHECK(type IN ('zero_interest', 'triple_zero', 'balance_boost', 'custom')),
          is_active BOOLEAN DEFAULT 0,
          boost_percent REAL DEFAULT 0,
          interest_rate REAL DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Transactions table
      db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          client_name TEXT NOT NULL,
          client_phone TEXT NOT NULL,
          app_id INTEGER NOT NULL,
          amount REAL NOT NULL,
          net_received REAL NOT NULL,
          deducted_amount REAL NOT NULL,
          total_discount_rate REAL NOT NULL,
          interest_rate REAL DEFAULT 0,
          duration_months INTEGER DEFAULT 24,
          monthly_installment REAL NOT NULL,
          total_interest REAL DEFAULT 0,
          total_amount REAL NOT NULL,
          offer_id INTEGER,
          notes TEXT,
          status TEXT DEFAULT 'completed',
          created_by INTEGER NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (app_id) REFERENCES apps(id),
          FOREIGN KEY (offer_id) REFERENCES offers(id),
          FOREIGN KEY (created_by) REFERENCES users(id)
        )
      `, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
};

const seedInitialData = () => {
  return new Promise((resolve, reject) => {
    const appsData = [
      { name: 'مايلو', basic_rate: 0, client_rate: 0, accounting_rate: 0 },
      { name: 'حالا كارت', basic_rate: -5, client_rate: -10, accounting_rate: -5 },
      { name: 'حالا ابليكيشن', basic_rate: -12, client_rate: -15, accounting_rate: -3 },
      { name: 'فاليو كارت', basic_rate: -5, client_rate: -10, accounting_rate: -5 },
      { name: 'فاليو ابليكيشن', basic_rate: -12, client_rate: -15, accounting_rate: -3 },
      { name: 'سهولة', basic_rate: -12, client_rate: -16, accounting_rate: -4 },
      { name: 'موجو', basic_rate: -12, client_rate: -16, accounting_rate: -4 },
      { name: 'كونتكت', basic_rate: -12, client_rate: -16, accounting_rate: -4 },
      { name: 'فرصة', basic_rate: -12, client_rate: -16, accounting_rate: -4 },
      { name: 'أمان', basic_rate: -12, client_rate: -16, accounting_rate: -4 },
      { name: 'بلنك', basic_rate: -32, client_rate: 0, accounting_rate: 32 },
      { name: 'ترو', basic_rate: -12, client_rate: -16, accounting_rate: -4 },
      { name: 'كارت تكة', basic_rate: -5, client_rate: -8.5, accounting_rate: -4 },
      { name: 'كارت فوري', basic_rate: -4, client_rate: -8.5, accounting_rate: -5 },
      { name: 'كارت لاكي', basic_rate: -4, client_rate: -8.5, accounting_rate: -5 },
      { name: 'كارت بريميوم', basic_rate: -15, client_rate: -20, accounting_rate: -5 },
      { name: 'كارت فيزا_مشتريات', basic_rate: -4, client_rate: -8.5, accounting_rate: -5 },
      { name: 'كليفر', basic_rate: -12, client_rate: -17, accounting_rate: -5 },
      { name: 'سفن', basic_rate: -12, client_rate: -17, accounting_rate: -5 },
      { name: 'بي_تك', basic_rate: -10, client_rate: -15, accounting_rate: -3 }
    ];

    const offersData = [
      { name: 'بدون فوائد', type: 'zero_interest', is_active: 0, interest_rate: 0 },
      { name: 'عرض تريبل زيرو', type: 'triple_zero', is_active: 0, interest_rate: 0 },
      { name: 'زيادة رصيد', type: 'balance_boost', is_active: 0, boost_percent: 10 },
      { name: 'عرض مخصص', type: 'custom', is_active: 0 }
    ];

    // Check if data already exists
    db.get('SELECT COUNT(*) as count FROM apps', (err, row) => {
      if (err) {
        reject(err);
      } else if (row.count === 0) {
        // Insert apps
        const insertApp = db.prepare('INSERT INTO apps (name, basic_rate, client_rate, accounting_rate) VALUES (?, ?, ?, ?)');
        appsData.forEach(app => {
          insertApp.run(app.name, app.basic_rate, app.client_rate, app.accounting_rate);
        });
        insertApp.finalize();

        // Insert offers
        const insertOffer = db.prepare('INSERT INTO offers (name, type, is_active, boost_percent, interest_rate) VALUES (?, ?, ?, ?, ?)');
        offersData.forEach(offer => {
          insertOffer.run(offer.name, offer.type, offer.is_active, offer.boost_percent || 0, offer.interest_rate || 0);
        });
        insertOffer.finalize(() => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
};

const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const all = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
};

const close = () => {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

module.exports = {
  initializeDatabase,
  seedInitialData,
  run,
  get,
  all,
  close,
  getDb: () => db
};
