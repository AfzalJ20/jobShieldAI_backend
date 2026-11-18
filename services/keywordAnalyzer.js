const suspiciousKeywords = require("../utils/suspiciousKeywords");

const analyzeKeywords = (description = "") => {

    let score = 0;

    const foundKeywords = [];

    const reasons = [];

    const text = description.toLowerCase();

    suspiciousKeywords.forEach(keyword => {

        if (text.includes(keyword.toLowerCase())) {

            score += 5;

            foundKeywords.push(keyword);

            reasons.push(`Suspicious keyword detected: "${keyword}"`);

        }

    });

    if (score > 40) {

        score = 40;

    }

    return {

        score,

        foundKeywords,

        reasons,

        status:

            score >= 25

                ? "High"

                : score >= 10

                ? "Medium"

                : "Low"

    };

};

module.exports = analyzeKeywords;