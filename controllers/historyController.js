const historyService = require("../services/historyService");

// Get all history
const getHistory = async (req, res) => {

    try {

        const history = await historyService.getAllHistory(req.user._id);

        res.json({
            success: true,
            count: history.length,
            data: history
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get single history
const getHistoryById = async (req, res) => {

    try {

        const history = await historyService.getHistoryById(
            req.params.id,
            req.user._id
        );

        if (!history) {
            return res.status(404).json({
                success: false,
                message: "Analysis not found"
            });
        }

        res.json({
            success: true,
            data: history
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete history
const deleteHistory = async (req, res) => {

    try {

        const deleted = await historyService.deleteHistory(
            req.params.id,
            req.user._id
        );

        if (!deleted) {

            return res.status(404).json({
                success: false,
                message: "Analysis not found"
            });

        }

        res.json({
            success: true,
            message: "Analysis deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Search history
const searchHistory = async (req, res) => {

    try {

        const result = await historyService.searchHistory(
            req.user._id,
            req.query.keyword
        );

        res.json({
            success: true,
            count: result.length,
            data: result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Filter history
const filterHistory = async (req, res) => {

    try {

        const result = await historyService.filterHistory(
            req.user._id,
            req.query.level
        );

        res.json({
            success: true,
            count: result.length,
            data: result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getHistory,
    getHistoryById,
    deleteHistory,
    searchHistory,
    filterHistory
};