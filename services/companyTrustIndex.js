const calculateCompanyTrustIndex = (jobData) => {

    let score = 100;

    const reasons = [];

    // Company Name
    if (!jobData.companyName || jobData.companyName.trim() === "") {
        score -= 10;
        reasons.push("Company name missing");
    }

    // Website
    if (!jobData.companyWebsite) {
        score -= 15;
        reasons.push("Company website missing");
    } else {

        const website = jobData.companyWebsite.toLowerCase();

        if (!website.startsWith("https://")) {
            score -= 15;
            reasons.push("Website is not HTTPS");
        }

        const suspiciousDomains = [
            ".xyz",
            ".tk",
            ".ml",
            ".ga",
            ".cf"
        ];

        suspiciousDomains.forEach(domain => {

            if (website.includes(domain)) {

                score -= 15;

                reasons.push(
                    `Suspicious domain ${domain}`
                );

            }

        });

    }

    // Email
    if (!jobData.recruiterEmail) {

        score -= 15;

        reasons.push("Recruiter email missing");

    } else {

        const email = jobData.recruiterEmail.toLowerCase();

        if (
            email.includes("@gmail.com") ||
            email.includes("@yahoo.com") ||
            email.includes("@hotmail.com") ||
            email.includes("@outlook.com")
        ) {

            score -= 15;

            reasons.push("Free email provider used");

        }

    }

    // Email Domain Match
    if (
        jobData.companyWebsite &&
        jobData.recruiterEmail
    ) {

        try {

            const websiteDomain = new URL(jobData.companyWebsite)
                .hostname
                .replace("www.", "");

            const emailDomain =
                jobData.recruiterEmail.split("@")[1];

            if (
                websiteDomain &&
                emailDomain &&
                websiteDomain !== emailDomain
            ) {

                score -= 20;

                reasons.push(
                    "Recruiter email domain does not match company website"
                );

            }

        } catch (err) {
            // Ignore invalid URL parsing
        }

    }

    if (score < 0) score = 0;

    return {

        trustScore: score,

        reasons,

        status:
            score >= 80
                ? "Trusted"
                : score >= 60
                ? "Moderate"
                : score >= 40
                ? "Low Trust"
                : "Suspicious"

    };

};

module.exports = calculateCompanyTrustIndex;