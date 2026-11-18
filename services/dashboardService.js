const AnalysisHistory = require("../models/AnalysisHistory");

const getDashboardStats = async (userId) => {

    const analyses = await AnalysisHistory.find({
        user: userId
    }).sort({ createdAt: -1 });

    const total = analyses.length;

    const safe = analyses.filter(a => a.fraudLevel === "Safe").length;

    const low = analyses.filter(a => a.fraudLevel === "Low").length;

    const medium = analyses.filter(a => a.fraudLevel === "Medium").length;

    const high = analyses.filter(a => a.fraudLevel === "High").length;

    const critical = analyses.filter(a => a.fraudLevel === "Critical").length;

    const avgRisk = total === 0
        ? 0
        : Math.round(
            analyses.reduce((sum, item) => sum + item.riskScore, 0) / total
        );

    const avgTrust = total === 0
    ? 0
    : Math.round(
        analyses.reduce((sum, item) => {

            return sum + (item.companyTrustAnalysis?.trustScore || 0);

        }, 0) / total
    );

    return {

        total,

        safe,

        low,

        medium,

        high,

        critical,

        avgRisk,

        avgTrust,

        recent: analyses.slice(0, 5)

    };

};

module.exports = {
    getDashboardStats
};