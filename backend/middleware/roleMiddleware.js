export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized. Please login first.",
      });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission for this action.",
      });
    }
    next();
  };
};

export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authorized. Please login first.",
      });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission for this action.",
      });
    }
    next();
  };
};

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not authorized. Please login first.",
    });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only.",
    });
  }
  next();
};