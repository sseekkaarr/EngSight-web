const express = require('express');
const sequelize = require('../config/database');
const VideoProgress = require('../models/VideoProgress');

const router = express.Router();

// Endpoint to record video progress
router.post('/progress', async (req, res) => {
    const { userId, sectionName, videoId } = req.body;

    if (!userId || !sectionName || !videoId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Check if the video progress already exists
        const existingProgress = await VideoProgress.findOne({
            where: { userId, sectionName, videoId },
        });

        if (existingProgress) {
            return res.status(200).json({ message: 'Video already marked as watched' });
        }

        // Create a new progress entry
        await VideoProgress.create({
            userId,
            sectionName,
            videoId,
            watched: true,
        });

        res.status(201).json({ message: 'Video progress recorded successfully' });
    } catch (error) {
        console.error('Error recording video progress:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Endpoint to get video progress by user
router.get('/progress/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const progress = await VideoProgress.findAll({
            attributes: [
                'sectionName',
                [sequelize.fn('COUNT', sequelize.col('videoId')), 'totalVideos'],
                [sequelize.fn('SUM', sequelize.col('watched')), 'watchedVideos'],
                [
                    sequelize.literal(
                        '(SUM(watched) / COUNT(videoId)) * 100'
                    ),
                    'progress',
                ],
            ],
            where: { userId },
            group: ['sectionName'],
        });

        res.status(200).json({ progress });
    } catch (error) {
        console.error('Error fetching video progress:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;