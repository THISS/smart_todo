// const server = require("../../server");

module.exports = (assert) => {
  describe("router", () => {
    describe("route", () => {
      it("should have 'yes' equal \"yes\"", () => {
        assert.equal("yes","yes", "it doesn't work");
      });
    });
  });
};

