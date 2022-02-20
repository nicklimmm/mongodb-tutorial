const protected = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "You have no access" });
};

const adminProtected = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) return next();
  res.status(403).json({ message: "Admins only" });
};

module.exports = { protected, adminProtected };
