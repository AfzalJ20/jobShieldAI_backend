const fraudAnalyzer = require("../services/fraudAnalyzer");
const AnalysisHistory = require("../models/AnalysisHistory");

const analyzeJob = async (req, res) => {
    try {

        const jobData = req.body;

        const result = fraudAnalyzer(jobData);

        w
        const history = await AnalysisHistory.create({
            user: req.user._id,
            inputMethod: jobData.inputMethod || "Structured Form",

            jobTitle: jobData.jobTitle,
            companyName: jobData.companyName,
            salaryRange: jobData.salaryRange,
            location: jobData.location,
            recruiterEmail: jobData.recruiterEmail,
            companyWebsite: jobData.companyWebsite,
            jobDescription: jobData.jobDescription,

           analysis: {

    salary: result.salary,

    email: result.email,

    website: result.website,

    keywords: result.keywords,

    missingFields: result.missingFields,

    grammar: result.grammar,

    recruiterAuthenticity:
        result.recruiterAuthenticity

},

            riskScore: result.riskScore,
            fraudLevel: result.fraudLevel,
            companyTrustIndex: result.companyTrustIndex,
            companyTrustAnalysis: result.companyTrustAnalysis,
            explanation:
                `This job posting has a ${result.fraudLevel} fraud risk.`,

            recommendations: [
                "Verify company website",
                "Check recruiter email",
                "Avoid paying registration fees",
                "Confirm company through LinkedIn"
            ]
        });

        res.status(200).json({
            success: true,
            message: "Job analyzed successfully",
            data: history
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    analyzeJob
};