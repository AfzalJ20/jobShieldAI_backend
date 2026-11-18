const analyzeEmail = (email = "") => {
    let score = 0;
    const reasons = [];

    if (!email || email.trim() === "") {
        score += 20;
        reasons.push("Recruiter email is missing.");
    } else {
        const lowerEmail = email.toLowerCase();

        // Free email providers
        const freeDomains = [
            "gmail.com",
            "yahoo.com",
            "hotmail.com",
            "outlook.com",
            "live.com",
            "proton.me",
            "icloud.com"
        ];

        const domain = lowerEmail.split("@")[1];

        if (!domain) {
            score += 30;
            reasons.push("Invalid email format.");
        } else {
            if (freeDomains.includes(domain)) {
                score += 20;
                reasons.push(
                    "Recruiter is using a free email service instead of an official company email."
                );
            }

            if (domain.includes("mail")) {
                score += 10;
                reasons.push("Suspicious email domain.");
            }

            if (lowerEmail.includes("hr123")) {
                score += 10;
                reasons.push("Random recruiter naming detected.");
            }
        }
    }

    return {
        score,
        reasons,
        status:
            score >= 40
                ? "High"
                : score >= 20
                ? "Medium"
                : "Low"
    };
};

module.exports = analyzeEmail;