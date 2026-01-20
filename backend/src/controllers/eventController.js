const Event = require('../models/Event');

exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, startDate, endDate, location, tags, audience } = req.body;

    if (!title || !description || !startDate || !location) {
      const err = new Error('title, description, startDate, and location are required');
      err.status = 400;
      return next(err);
    }

    const event = await Event.create({
      title,
      description,
      startDate,
      endDate,
      location,
      tags,
      audience,
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

exports.listEvents = async (req, res, next) => {
  try {
    const { upcoming } = req.query;
    const filter = { isPublished: true };
    if (upcoming === 'true') {
      filter.startDate = { $gte: new Date() };
    }

    const events = await Event.find(filter)
      .populate('createdBy', 'name role email')
      .sort({ startDate: 1 });

    res.json({ success: true, count: events.length, events });
  } catch (error) {
    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      const err = new Error('Event not found');
      err.status = 404;
      return next(err);
    }

    const allowedFields = ['title', 'description', 'startDate', 'endDate', 'location', 'tags', 'audience', 'isPublished'];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        event[field] = req.body[field];
      }
    });

    await event.save();
    res.json({ success: true, event });
  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      const err = new Error('Event not found');
      err.status = 404;
      return next(err);
    }

    await event.deleteOne();
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
