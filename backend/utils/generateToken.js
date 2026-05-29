import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "skillsphere_secret", {
    expiresIn: "7d"
  });
};

export default generateToken;
