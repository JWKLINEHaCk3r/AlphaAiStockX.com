// Railway deployment auto-approval
module.exports = {
  hooks: {
    readPackage(pkg) {
      return pkg;
    }
  }
};
