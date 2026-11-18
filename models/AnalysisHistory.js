const mongoose = require("mongoose");

const analysisHistorySchema = new mongoose.Schema(
{
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },

    inputMethod: {
    type: String,
    enum: ["Quick Paste", "Structured Form"],
    required: true,
    },

    jobTitle: String,
    companyName: String,
    salaryRange: String,
    location: String,
    recruiterEmail: String,
    companyWebsite: String,
    jobDescription: String,

    analysis: {

    salary: {
        type: Object,
        default: {}
    },

    email: {
        type: Object,
        default: {}
    },

    website: {
        type: Object,
        default: {}
    },

    keywords: {
        type: Object,
        default: {}
    },

    missingFields: {
        type: Object,
        default: {}
    },

    grammar: {
        type: Object,
        default: {}
    },

    recruiterAuthenticity: {
        type: Object,
        default: {}
    },

    ai: {
        type: Object,
        default: {}
    }

},

    riskScore: Number,

    fraudLevel: {
    type: String,
    enum: ["Safe", "Low", "Medium", "High", "Critical"],
    },

    companyTrustAnalysis: {
    type: Object,
    default: {}
},

    explanation: String,

    recommendations: [String],
},
{
    timestamps: true,
}
);

module.exports = mongoose.model(
"AnalysisHistory",
analysisHistorySchema
);