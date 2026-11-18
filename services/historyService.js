const AnalysisHistory = require("../models/AnalysisHistory");

// Get all history
const getAllHistory = async (userId) => {
    return await AnalysisHistory.find({ user: userId })
        .sort({ createdAt: -1 });
};

// Get single analysis
const getHistoryById = async (id, userId) => {
    return await AnalysisHistory.findOne({
        _id: id,
        user: userId
    });
};

// Delete analysis
const deleteHistory = async (id, userId) => {
    return await AnalysisHistory.findOneAndDelete({
        _id: id,
        user: userId
    });
};

// Search history
const searchHistory = async (userId, keyword) => {

    return await AnalysisHistory.find({
        user: userId,

        $or: [
            { companyName: { $regex: keyword, $options: "i" } },
            { jobTitle: { $regex: keyword, $options: "i" } }
        ]

    }).sort({ createdAt: -1 });

};

// Filter history
const filterHistory = async (userId, fraudLevel) => {

    return await AnalysisHistory.find({
        user: userId,
        fraudLevel
    }).sort({ createdAt: -1 });

};

module.exports = {
    getAllHistory,
    getHistoryById,
    deleteHistory,
    searchHistory,
    filterHistory
};