const pool = require("../config/db"); 

const createDetails = async (profileId, contactNumber, email) => {
  const [result] = await pool.execute(
    'INSERT INTO details (profile_id, contact_number, email) VALUES (?, ?, ?)',
    [profileId, contactNumber, email]
  );
  return result.insertId;
};

const getDetailsByProfileId = async (profileId) => {
  const [rows] = await pool.execute(
    'SELECT * FROM details WHERE profile_id = ?',
    [profileId]
  );
  return rows[0];
};

module.exports = {
  createDetails,
  getDetailsByProfileId
};
