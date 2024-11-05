import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { encryptPassword } from "../../utils/encrypt";
import httpStatus from "http-status";

const registerHandler = async (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password before saving
  const hashPassword = await encryptPassword(password);

  // Create the user
  const user = await userService.createUser({
    username,
    email,
    password: hashPassword,
  });

  // If user creation fails (e.g., due to duplicate email), handle accordingly
  if (!user) {
    // Check if user already exists with this email
    const existingUser = await userService.getOneUser({ email });
    if (existingUser) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Email is already in use.",
      });
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "User creation failed due to server error.",
    });
  }

  // Set the status code and return the created user object (excluding sensitive data)
  return res.status(httpStatus.CREATED).json({ user: { username: user.username, email: user.email } });
};

export const registerController = errorHandlerWrapper(registerHandler);
