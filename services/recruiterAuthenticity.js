const recruiterAuthenticity = (jobData) => {

    let score = 100;

    let reasons = [];

    let status = "Verified";

    const email = (jobData.recruiterEmail || "").toLowerCase();
    const website = (jobData.companyWebsite || "").toLowerCase();

    // Free email providers
    const freeProviders = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
        "rediffmail.com"
    ];

    const emailDomain = email.split("@")[1] || "";

    if (freeProviders.includes(emailDomain)) {
        score -= 40;
        reasons.push("Recruiter is using a free email provider.");
    }

    // Email domain should match website domain
    if (website) {

        let websiteDomain = website
            .replace("https://", "")
            .replace("http://", "")
            .replace("www.", "")
            .split("/")[0];

        if (
            emailDomain &&
            websiteDomain &&
            !emailDomain.includes(websiteDomain)
        ) {
            score -= 25;
            reasons.push("Email domain does not match company website.");
        }
    }

    if (score >= 80) {

        status = "Verified";

    } else if (score >= 60) {

        status = "Likely Genuine";

    } else if (score >= 40) {

        status = "Suspicious";

    } else {

        status = "Highly Suspicious";

    }

    return {

        score,

        status,

        reasons

    };

};

module.exports = recruiterAuthenticity;