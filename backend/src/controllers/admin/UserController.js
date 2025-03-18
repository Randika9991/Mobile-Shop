const User = require('../../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });

        const allUsers = await User.find({ role: 'user' });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const newUsersCount = await User.countDocuments({
            createdAt: { $gte: today }
        });

        res.status(200).json({
            users: allUsers,
            totalUsers,
            newUsersCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


