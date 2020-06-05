const Event = require("../models/event.model");
module.exports = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find({});
      return res.json(events);
    } catch (err) {
      return res.status(400).json({ err });
    }
  },

  createEvent: async (req, res) => {
    console.log(req.body);
    const { name, description, date, social_media_link } = req.body;
    console.log(name, description, date, social_media_link);
    //REALIZAR VALIDAÇAO DOS INPUTS
    try {
      const event = await Event.create({
        name,
        description,
        date,
        social_media_link,
      });
      return res.status(201).json({ event });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ err });
    }
  },
  deleteEvent: async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Event.remove({ _id: id });
      return res.json(deleted);
    } catch (err) {
      return res.status(400).json({ err });
    }
  },
  updateEventStatus: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedEvent = await Event.updateOne(
        { _id: id },
        { waiting_approval: false }
      );
      return res.json(updatedEvent);
    } catch (err) {
      return res.status(400).json({ err });
    }
  },
};
