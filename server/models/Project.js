const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,  //This allows to establish relationship between two collections
    ref: 'Client',  //Reference to another collection
  },
});

module.exports = mongoose.model('Project', ProjectSchema);