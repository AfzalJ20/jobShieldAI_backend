const analyzeMissingFields = (jobData = {}) => {

    let score = 0;

    const reasons = [];

    const missingFields = [];

    const requiredFields = [
        { key: "jobTitle", label: "Job Title" },
        { key: "companyName", label: "Company Name" },
        { key: "salaryRange", label: "Salary Range" },
        { key: "location", label: "Location" },
        { key: "recruiterEmail", label: "Recruiter Email" },
        { key: "companyWebsite", label: "Company Website" },
        { key: "jobDescription", label: "Job Description" }
    ];

    requiredFields.forEach(field => {

        if (
            !jobData[field.key] ||
            jobData[field.key].toString().trim() === ""
        ) {

            score += 5;

            missingFields.push(field.label);

            reasons.push(`${field.label} is missing.`);
        }

    });

    if (score > 35) score = 35;

    return {

        score,

        missingFields,

        reasons,

        status:

            score >= 25
                ? "High"
                : score >= 10
                ? "Medium"
                : "Low"

    };

};

module.exports = analyzeMissingFields;