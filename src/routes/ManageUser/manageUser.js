
const express = require('express');
const router = express.Router();
const db = require('../../db/db');
router.delete('/deleteuser/:userId',async(req, res)=>{
    const userId = req.params.userId;
    try{
        // First, check if the user exists
        const[user] = await db.execute('SELECT * FROM ecommerceshop.users WHERE id = ?',[userId]);
        if(user.length === 0){
            return res.status(404).json({ error: 'User not found' });
        }
        // Delete the user start
        const [deleteResult] = await db.execute('DELETE FROM ecommerceshop.users WHERE id = ?',[userId])
        if(deleteResult.affectedRows === 0){
            return res.status(404).json({ error: 'User deletion failed' });
        }
        res.status(200).json({ message: 'User deleted successfully', status: 1 });
    }catch (error) {
        console.error('❌ Error deleting user:', error);
        res.status(500).json({ error: 'Error deleting user' });
    }
})

module.exports = router;