const adminOrOwner = (req, res, next) => {
  const isAdminOrOwner = req.user.role === 'admin' || req.user.role === 'owner';
  if (!isAdminOrOwner)
    return res
      .status(403)
      .send('Forbidden. You are not authorized to perform this operation.');

  next();
};

module.exports = adminOrOwner;
