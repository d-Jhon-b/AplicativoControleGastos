import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('gastos.db');

export const initDatabase = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS gastos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL,
        categoria TEXT NOT NULL,
        valor REAL NOT NULL,
        data TEXT NOT NULL
      );
    `);
    console.log("Banco de dados inicializado.");
  } catch (error) {
    console.error("Erro ao inicializar o banco:", error);
  }
};

export const insertGasto = (descricao, categoria, valor, data) => {
  try {
    const result = db.runSync(
      'INSERT INTO gastos (descricao, categoria, valor, data) VALUES (?, ?, ?, ?);',
      [descricao, categoria, parseFloat(valor), data]
    );
    return result.changes > 0;
  } catch (error) {
    console.error("Erro ao inserir gasto:", error);
    return false;
  }
};

export const selectAllGastos = () => {
  try {
    return db.getAllSync('SELECT * FROM gastos ORDER BY id DESC;');
  } catch (error) {
    console.error("Erro ao buscar gastos:", error);
    return [];
  }
};