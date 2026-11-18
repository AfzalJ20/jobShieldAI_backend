const rules = require("../utils/salaryRules");

const analyzeSalary = (salary = "") => {

    let score = 0;

    const reasons = [];

    const text = salary.toLowerCase();

    if (!salary || salary.trim() === "") {

        score += 10;

        reasons.push("Salary information is missing.");

    }

    if (text.includes("daily")) {

        score += 20;

        reasons.push("Daily salary offers can be suspicious.");

    }

    if (text.includes("easy money")) {

        score += 25;

        reasons.push("Contains 'easy money' claim.");

    }

    const numbers = salary.match(/\d+/g);

    if (numbers) {

        const amount = parseInt(numbers.join(""));

        if (amount > rules.EXTREME_SALARY_THRESHOLD) {

            score += 40;

            reasons.push("Salary exceeds realistic expectations.");

        }

        else if (amount > rules.HIGH_SALARY_THRESHOLD) {

            score += 20;

            reasons.push("Very high salary.");

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

module.exports = analyzeSalary;