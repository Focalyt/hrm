const mongoose = require('mongoose');

const AccessControlSchema = new mongoose.Schema({

    access_control: {
        role: { type: String },
        permissions: {
            can_edit_profile: { type: Boolean },
            can_approve_leaves: { type: Boolean },
            can_view_salary: { type: Boolean },
            can_view_documents: { type: Boolean },
        },
    }
})

const AccessControl = mongoose.model('AccessControl', AccessControlSchema);
module.exports = AccessControl;