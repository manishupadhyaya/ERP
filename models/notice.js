const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  notice: {
    type: String,
  }
});

const Notice = mongoose.model('Notice', NoticeSchema);

module.exports = Notice;
