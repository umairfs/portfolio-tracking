// PFE = portfolio error msg
// PFS = portfolio success msg
module.exports = {
    PFE001: {
        code: "PFE001",
        status: 400,
        message: "Portfolio ID missing",
    },
    PFE002: {
        code: "PFE002",
        status: 400,
        message: "Customer ID missing",
    },
    PFE003: {
        code: "PFE003",
        status: 400,
        message: "Portfolio name is required",
    },
    PFE004: {
        code: "PFE004",
        status: 400,
        message: "Stock details missing",
    },
    PFE005: {
        code: "PFE005",
        status: 400,
        message: "Stock name required",
    },
    PFE006: {
        code: "PFE006",
        status: 400,
        message: "Stock quantity required",
    },
    PFE007: {
        code: "PFE007",
        status: 400,
        message: "Stock price required",
    },
    PFE008: {
        code: "PFE008",
        status: 400,
        message: "Stock trade type required",
    },
    PFE009: {
        code: "PFE009",
        status: 400,
        message: "Stock trade date required",
    },
    PFE010: {
        code: "PFE010",
        status: 400,
        message: "Please enter BUY or SELL in trade type",
    },
    PFE011: {
        code: "PFE011",
        status: 400,
        message: "Stock not found please enter valid stock",
    },
    PFE012: {
        code: "PFE012",
        status: 400,
        message: "Trade ID is required",
    },
    PFE013: {
        code: "PFE013",
        status: 400,
        message: "No portfolio found",
    },
    PFS001: {
        code: "PFS001",
        success: true,
        status: 200,
        message: "Portfolio added successfully",
    },
    PFS002: {
        code: "PFS002",
        success: true,
        status: 200,
        message: "Trade added successfully",
    },
    PFS003: {
        code: "PFS003",
        success: true,
        status: 200,
        message: "Trade updated successfully",
    },
 };
