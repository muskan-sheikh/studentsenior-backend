const { Branch, Course } = require('../../models/CourseBranch');

const branchController = {
    async index(req, res) {
        const branches = await Branch.find()
            .populate('course')
            .sort({ createdAt: -1 });
        res.render('branchCourse/branches/index', { branches });
    },
    async new(req, res) {
        const courses = await Course.find();
        res.render('branchCourse/branches/new', { courses });
    },
    async create(req, res) {
        await Branch.create(req.body);
        res.redirect('/branches');
    },
    async edit(req, res) {
        const branch = await Branch.findById(req.params.id);
        const courses = await Course.find();
        res.render('branchCourse/branches/edit', { branch, courses });
    },
    async update(req, res) {
        await Branch.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/branches');
    },
    async delete(req, res) {
        await Branch.findByIdAndDelete(req.params.id);
        res.redirect('/branches');
    },
};

module.exports = branchController;
