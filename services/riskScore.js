const calculateRiskScore = (analysis) => {

    let totalScore = 0;

    //------------------------------------------------
    // Rule Based Modules
    //------------------------------------------------

    totalScore += analysis.salary.score;
    totalScore += analysis.email.score;
    totalScore += analysis.website.score;
    totalScore += analysis.keywords.score;
    totalScore += analysis.missingFields.score;
    totalScore += analysis.grammar.score;

    //------------------------------------------------
    // Recruiter Authenticity
    //------------------------------------------------

    if (analysis.recruiter) {

        // High authenticity reduces fraud risk

        totalScore += (100 - analysis.recruiter.score) / 2;

    }

    //------------------------------------------------
    // Maximum Possible Score
    //------------------------------------------------

    const MAX_SCORE = 210;

    let riskScore = Math.round((totalScore / MAX_SCORE) * 100);

    if (riskScore > 100) riskScore = 100;

    //------------------------------------------------
    // Fraud Level
    //------------------------------------------------

    let fraudLevel = "Safe";

    if (riskScore >= 80) {

        fraudLevel = "Critical";

    } else if (riskScore >= 60) {

        fraudLevel = "High";

    } else if (riskScore >= 40) {

        fraudLevel = "Medium";

    } else if (riskScore >= 20) {

        fraudLevel = "Low";

    }

    return {

        totalScore,

        riskScore,

        fraudLevel

    };

};

module.exports = calculateRiskScore;