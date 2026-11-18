const analyzeSalary = require("./salaryAnalyzer");
const analyzeEmail = require("./emailAnalyzer");
const analyzeWebsite = require("./websiteAnalyzer");
const analyzeKeywords = require("./keywordAnalyzer");
const analyzeMissingFields = require("./missingFieldAnalyzer");
const analyzeGrammar = require("./grammarAnalyzer");
const calculateRiskScore = require("./riskScore");
const calculateCompanyTrustIndex = require("./companyTrustIndex");
const recruiterAuthenticity = require("./recruiterAuthenticity");

const fraudAnalyzer = (jobData) => {

    const salary = analyzeSalary(jobData.salaryRange);

    const email = analyzeEmail(jobData.recruiterEmail);

    const website = analyzeWebsite(jobData.companyWebsite);

    const keywords = analyzeKeywords(jobData.jobDescription);

    const missingFields = analyzeMissingFields(jobData);

    const grammar = analyzeGrammar(jobData.jobDescription);

const recruiter =
    recruiterAuthenticity(jobData);

const result = calculateRiskScore({
    salary,
    email,
    website,
    keywords,
    missingFields,
    grammar,
    recruiter
});

    const companyTrust =
    calculateCompanyTrustIndex(jobData);

    return {

salary,

email,

website,

keywords,

missingFields,

grammar,

recruiterAuthenticity: recruiter,

riskScore: result.riskScore,

fraudLevel: result.fraudLevel,

companyTrustIndex: companyTrust.trustScore,

companyTrustAnalysis: companyTrust

}

};

module.exports = fraudAnalyzer;