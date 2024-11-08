const AccessService = require("../services/access.service");
const successResponse = require("../responses/success.response");
const errorResponse = require("../responses/error.response");

class AccessController {
  Login = async (req, res, next) => {
    try {
      const resultLogin = await AccessService.Login(req.body);

      return res
        .status(201)
        .json(
          successResponse(
            201,
            "Shop created successfully",
            resultLogin.metadata
          )
        );
    } catch (error) {
      return res.status(500).json(
        errorResponse(500, "Internal Server Error", {
          message: error.message,
        })
      );
    }
  };
  signUp = async (req, res, next) => {
    try {
      const result = await AccessService.signUp(req.body);
      return res
        .status(201)
        .json(
          successResponse(201, "Shop created successfully", result.metadata)
        );
    } catch (error) {
      return res.status(500).json(
        errorResponse(500, "Internal Server Error", {
          message: error.message,
        })
      );
    }
  };
}

module.exports = new AccessController();
