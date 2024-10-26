const Colleges = require('../../models/Colleges');

module.exports.fetchCollege = async (req, res) => {
    try {
        const allColleges = await Colleges.find({ status: true });
        res.json(allColleges);
    } catch (err) {
        console.error('Error fetching colleges:', err);
        res.json({ message: 'Error fetching colleges' });
    }
};

module.exports.createCollege = async (req, res) => {
    const { name, location, description } = req.body;

    const client = req.user.id;
    try {
        const newCollege = new Colleges({
            name,
            location,
            description,
            owner: '66cb98fca9c088fc1180070e',
            client,
        });
        await newCollege.save();
        res.json({
            description:
                'College submitted successfully and is pending approval.',
        });
    } catch (error) {
        res.status(402).json({
            message: 'Unable to add College , something error occuredd',
        });
    }
};
