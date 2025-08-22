const profileModel = require('../models/profileModel');
const detailsModel = require('../models/detailsModel');

const createUserProfile = async (req, res) => {
    try {
      const { user_id, name, city, bio, avatar_url, contact_number, email } = req.body;
  
      if (!user_id || !name || !contact_number || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // ✅ Just use the returned insertId directly
      const profileId = await profileModel.createProfile(user_id, name, city, bio ?? null, avatar_url ?? null);
  
      await detailsModel.createDetails(profileId, contact_number, email);
  
      res.status(201).json({ message: 'Profile created successfully', profileId });
    } catch (error) {
      console.error('Error creating profile:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  const getUserProfile = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      // Get profile by user_id
      const profile = await profileModel.getProfileByUserId(user_id);
  
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      // ✅ getDetailsByProfileId already returns a single object or null
      const details = await detailsModel.getDetailsByProfileId(profile.id);
  
      res.json({ profile, details });
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
  

module.exports = {
  createUserProfile,
  getUserProfile,
};
