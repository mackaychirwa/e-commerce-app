import { login, registerUser } from '../../services/authentication/authenticationService.mjs';
import { addTokenToCookie, createToken, userToken } from '../../utils/index.js';

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ message: "Email and password are required" }); 
    }
    const user = await login(email, password);

    if (!user.success) {
      return res.status(401).json({ message: user.message }); 
    }
    const tokenUser = userToken(user.userData);
    const token = createToken({ payload: tokenUser });
    addTokenToCookie({ res, user: tokenUser });
    // Send the success response with the user data and token
    return res.status(200).json({
      success: true,
      message: user.message,
      userData: user.userData,
      token: token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const userRegistration = async (req, res) => {
  try {
    const { username, email, password, phoneNumber, address, city, country, role_id } = req.body;
    const user = await registerUser(username, email, password, phoneNumber, address, city, country, role_id);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
