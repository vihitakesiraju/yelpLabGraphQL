const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
// let server = require('../server');
let should = chai.should();
let routeConstants = require("../config/routeConstants");

chai.use(chaiHttp);

describe("Restaurants Menu", () => {
  describe("/restaurant/menu", () => {
    it("GET all the restaurants", (done) => {
      chai
        .request(`${routeConstants.BACKEND_URL}`)
        .get(`/restaurant${routeConstants.GET_ALL_RESTAURANTS}`)
        .end((err, res) => {
          expect(200);
          done();
        });
    });
  });
});

describe("Events Create", () => {
  describe("/events/create", () => {
    it("GET all the events", (done) => {
      chai
        .request(`${routeConstants.BACKEND_URL}`)
        .get(`/events${routeConstants.GET_ALL_EVENTS}`)
        .end((err, res) => {
          expect(200);
          done();
        });
    });
  });
});

describe("login post", () => {
  describe("login/", () => {
    it("Give a an error on non existent user", (done) => {
      let body = {
        email_id: "The Lord of the Rings",
        password: "J.R.R. Tolkien",
      };
      chai
        .request(`${routeConstants.BACKEND_URL}`)
        .post("/login")
        .send(body)
        .end((err, res) => {
          expect(400);

          done();
        });
    });
  });
});

describe("Customer Signup", () => {
  describe("/Customer/signup", () => {
    it("Give a array of restaurants", (done) => {
      let body = {
        search_string: "pizza",
      };
      chai
        .request(`${routeConstants.BACKEND_URL}`)
        .get(`/restaurant${routeConstants.GET_RESTAURANT_SEARCH}`)
        .send(body)
        .end((err, res) => {
          expect(200);
          done();
        });
    });
  });
});

describe("Orders for Restaurant", () => {
  describe("restaurant/orders", () => {
    it("Give a array of reviews", (done) => {
      let body = {
        restaurant_id: 1,
      };
      chai
        .request(`${routeConstants.BACKEND_URL}`)
        .get(
          `/reviews${routeConstants.GET_REVIEWS_BY_RESTAURANT}/?restaurant_id=1`
        )
        .end((err, res) => {
          expect(200);
          done();
        });
    });
  });
});
