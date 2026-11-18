const analyzeGrammar = (description = "") => {

    let score = 0;

    const reasons = [];

    if (!description || description.trim() === "") {

        return {
            score: 20,
            status: "High",
            reasons: ["Job description is missing."]
        };

    }

    // ALL CAPS Detection
    const uppercaseWords = description.match(/\b[A-Z]{4,}\b/g);

    if (uppercaseWords && uppercaseWords.length >= 5) {

        score += 10;

        reasons.push("Too many uppercase words detected.");

    }

    // Excessive Exclamation Marks
    const exclamationMarks = (description.match(/!/g) || []).length;

    if (exclamationMarks >= 5) {

        score += 10;

        reasons.push("Too many exclamation marks.");

    }

    // Repeated Question Marks
    const questionMarks = (description.match(/\?/g) || []).length;

    if (questionMarks >= 5) {

        score += 5;

        reasons.push("Too many question marks.");

    }

    // Repeated Dots
    const repeatedDots = (description.match(/\.{3,}/g) || []).length;

    if (repeatedDots > 0) {

        score += 5;

        reasons.push("Repeated punctuation detected.");

    }

    // Very Short Description
    if (description.length < 50) {

        score += 15;

        reasons.push("Job description is too short.");

    }

    // Excessive Currency Symbols
    const currencySymbols = (description.match(/[₹$€]/g) || []).length;

    if (currencySymbols > 10) {

        score += 10;

        reasons.push("Too many salary mentions.");

    }

    return {

        score,

        status:
            score >= 30
                ? "High"
                : score >= 15
                ? "Medium"
                : "Low",

        reasons

    };

};

module.exports = analyzeGrammar;