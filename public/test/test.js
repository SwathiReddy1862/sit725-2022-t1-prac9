var expect  = require("chai").expect;
var request = require("request");

  describe("Adding number and strings error", function() {
    var url = "http://localhost:3000/addTwoNumbers/a/5";
    it("should return status 200 as response", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it(" checks if api gives right result should be 400 and returns statusCode key in body ", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(400);
            done()
          });
    });
    it("null result is returned here", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.be.a('null');
            done()
          });
    });
  });

  describe("Add strings and speacial character", function() {
    var url = "http://localhost:3000/addTwoNumbers/a/*";
    it("should return status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });
    it(" checks if api gives right result should be 400 and returns statusCode key in body", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(400);
            done()
          });
    });
    it("null result is returned", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.be.a('null');
            done()
          });
    });
  });