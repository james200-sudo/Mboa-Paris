
module.exports = (req, res, next) => {
    // Exemple simple : on vérifie un rôle dans le token
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Admin access required' });
    }
  };
  
  