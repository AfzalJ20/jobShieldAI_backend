const analyzeWebsite = (website = "") => {
    let score = 0;
    const reasons = [];
    let trustScore = 100;

    if (!website || website.trim() === "") {
        score += 30;
        trustScore -= 30;
        reasons.push("Company website is missing.");
    } else {

        const lowerWebsite = website.toLowerCase();

        // HTTPS Check
        if (!lowerWebsite.startsWith("https://")) {
            score += 15;
            trustScore -= 15;
            reasons.push("Website is not secured with HTTPS.");
        }

        // Suspicious domains
        const suspiciousDomains = [
            ".xyz",
            ".tk",
            ".ml",
            ".ga",
            ".cf"
        ];

        suspiciousDomains.forEach(domain => {
            if (lowerWebsite.includes(domain)) {
                score += 20;
                trustScore -= 20;
                reasons.push(`Suspicious domain detected (${domain})`);
            }
        });

        // Short URLs
        if (
            lowerWebsite.includes("bit.ly") ||
            lowerWebsite.includes("tinyurl") ||
            lowerWebsite.includes("shorturl")
        ) {
            score += 25;
            trustScore -= 25;
            reasons.push("Shortened URL detected.");
        }

        // Invalid URL
        const urlRegex = /^https?:\/\/.+\..+/;

        if (!urlRegex.test(lowerWebsite)) {
            score += 20;
            trustScore -= 20;
            reasons.push("Invalid website format.");
        }
    }

    if (trustScore < 0) trustScore = 0;

    return {
        score,
        trustScore,
        reasons,
        status:
            score >= 40
                ? "High"
                : score >= 20
                ? "Medium"
                : "Low"
    };
};

module.exports = analyzeWebsite;