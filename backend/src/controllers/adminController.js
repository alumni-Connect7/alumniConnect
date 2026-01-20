const { User } = require('../models/User');
const Event = require('../models/Event');
const JobPost = require('../models/JobPost');
const Profile = require('../models/Profile');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [studentCount, alumniCount, pendingAlumni, eventCounts, jobCounts, alumniCompanyGroups] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'alumni' }),
      User.countDocuments({ role: 'alumni', isApproved: false }),
      Event.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            upcoming: {
              $sum: {
                $cond: [{ $gte: ['$startDate', new Date()] }, 1, 0],
              },
            },
          },
        },
      ]),
      JobPost.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]),
      Profile.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },
        {
          $match: {
            company: { $exists: true, $ne: '' },
            'user.role': 'alumni',
            'user.isApproved': true,
          },
        },
        { $group: { _id: '$company', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
    ]);

    const eventsAggregated = eventCounts[0] || { total: 0, upcoming: 0 };
    const jobStatus = jobCounts.reduce(
      (acc, curr) => ({ ...acc, [curr._id || 'unknown']: curr.count }),
      { open: 0, closed: 0 }
    );

    res.json({
      success: true,
      stats: {
        students: studentCount,
        alumni: alumniCount,
        pendingAlumni,
        events: eventsAggregated,
        jobs: jobStatus,
        alumniByCompany: alumniCompanyGroups,
      },
    });
  } catch (error) {
    next(error);
  }
};
