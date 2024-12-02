const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Ticket title/subject
    description: { type: String, required: true }, // Detailed description
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true }, // Employee who created the ticket
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" }, // Employee assigned to handle the ticket
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // Selected category
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true }, // Selected sub-category
    priority: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Low" }, // Priority levels
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed", "Reopened", "Escalated"],
      default: "Open",
    }, // Ticket status
    assigneeHistory: [
      {
        assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        assignedAt: { type: Date, default: Date.now },
      },
    ], // Record of all assignees
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Commenter
        comment: { type: String }, // Comment text
        createdAt: { type: Date, default: Date.now },
      },
    ], // Comments and discussions
    attachments: [{ type: String }], // File paths for uploaded files
    feedback: {
      rating: { type: Number, min: 1, max: 5 }, // Feedback rating
      comment: { type: String }, // Feedback comment
    }, // Feedback from ticket creator after resolution
    reopenCount: { type: Number, default: 0 }, // Number of times the ticket was reopened
    maxReopenCount: { type: Number, default: 2 }, // Maximum number of reopens allowed
    slaResponseDeadline: { type: Date }, // SLA for initial response
    slaResolutionDeadline: { type: Date }, // SLA for final resolution
    escalationLevel: { type: Number, default: 0 }, // Escalation level
    auditLogs: [
      {
        action: { type: String }, // Example: "Created", "Updated", "Assigned", "Escalated"
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User who performed the action
        timestamp: { type: Date, default: Date.now }, // Time of action
        details: { type: String }, // Additional details (optional)
      },
    ], // Audit logs for tracking changes
    resolvedAt: { type: Date }, // Date when the ticket was resolved
    createdAt: { type: Date, default: Date.now }, // Date when the ticket was created
    updatedAt: { type: Date, default: Date.now }, // Last updated timestamp
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);
