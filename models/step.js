const pool = require('../database');

const addSteps = async (reciepeId, steps) => {
  const queries = steps.map(({ title, description }) =>
    pool.query(
      'INSERT INTO steps (reciepe_id, title, description, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW())',
      [reciepeId, title, description]
    )
  );
  await Promise.all(queries);
};

module.exports = {
  addSteps,
};
