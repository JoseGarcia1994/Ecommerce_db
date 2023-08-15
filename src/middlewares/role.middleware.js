// Take roles that are received as arguements
// Compare with user rol

const hasRole = (...roles) => {
    // rest operator 
    // All the parameters that are not define will be group in a array 
    // ['admin', 'user', 'student']
    return (req, res, next) => {
      const { role } = req.user;
      if(!roles.includes(role)) {
        next({
          status: 401,
          errorName: "Role Required",
          error: "User does not have authorization"
        })
      }
      next();
    }
  }
  
  module.exports = hasRole;