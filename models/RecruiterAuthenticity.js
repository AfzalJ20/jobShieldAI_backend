const freeEmailProviders = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
    "proton.me",
    "protonmail.com"
];

const disposableDomains = [
    "mailinator.com",
    "10minutemail.com",
    "tempmail.com",
    "guerrillamail.com",
    "trashmail.com"
];

const recruiterAuthenticity = (jobData) => {

    let score = 100;

    const reasons = [];

    const recruiterEmail =
        (jobData.recruiterEmail || "").toLowerCase();

    const companyWebsite =
        (jobData.companyWebsite || "").toLowerCase();

    const companyName =
        (jobData.companyName || "").toLowerCase();

    //-------------------------------------------------
    // Extract Email Domain
    //-------------------------------------------------

    let emailDomain = "";

    if (recruiterEmail.includes("@")) {
        emailDomain = recruiterEmail.split("@")[1];
    }

    //-------------------------------------------------
    // Extract Website Domain
    //-------------------------------------------------

    let websiteDomain = companyWebsite
        .replace("https://", "")
        .replace("http://", "")
        .replace("www.", "")
        .split("/")[0];

    //-------------------------------------------------
    // Free Email Check
    //-------------------------------------------------

    if (freeEmailProviders.includes(emailDomain)) {

        score -= 30;

        reasons.push(
            "Recruiter is using a free email provider."
        );

    } else {

        reasons.push(
            "Official company email detected."
        );

    }

    //-------------------------------------------------
    // Disposable Email
    //-------------------------------------------------

    if (disposableDomains.includes(emailDomain)) {

        score -= 30;

        reasons.push(
            "Disposable email detected."
        );

    }

    //-------------------------------------------------
    // Email matches website
    //-------------------------------------------------

    if (
        emailDomain &&
        websiteDomain &&
        emailDomain === websiteDomain
    ) {

        score += 10;

        reasons.push(
            "Email matches company website."
        );

    } else {

        score -= 15;

        reasons.push(
            "Email domain does not match website."
        );

    }

    //-------------------------------------------------
    // Company name check
    //-------------------------------------------------

    if (
        companyName &&
        recruiterEmail.includes(
            companyName.replace(/\s+/g, "")
        )
    ) {

        score += 10;

        reasons.push(
            "Company name detected in email."
        );

    }

    //-------------------------------------------------

    if (score > 100) score = 100;

    if (score < 0) score = 0;

    //-------------------------------------------------

    let status = "Verified";

    if (score < 80)
        status = "Needs Verification";

    if (score < 50)
        status = "Suspicious";

    return {

        score,

        status,

        reasons

    };

};

module.exports = recruiterAuthenticity;