const expect = require("expect");
const { User } = require("./users");

describe("Users", () => {
  var users;
  beforeEach(() => {
    users = new User();
    users.users = [
      {
        id: 1,
        name: "John",
        room: "Nodejs"
      },
      {
        id: 2,
        name: "Smith",
        room: "React js"
      },
      {
        id: 3,
        name: "Ali",
        room: "Nodejs"
      }
    ];
  });
  it("should add new user", () => {
    var users = new User();
    var user = { id: 123, name: "John Smith", room: "Room A" };
    users.addUser(user.id, user.name, user.room);
    expect(users.users.length).toBe(1);
    expect(users.users).toEqual([user]);
  });
  it("should return names for Nodejs ", () => {
    var namesArray = users.getUserList("Nodejs");
    expect(namesArray).toEqual(["John", "Ali"]);
  });
  it("should return names for React js ", () => {
    var namesArray = users.getUserList("React js");
    expect(namesArray).toEqual(["Smith"]);
  });
  it("should remove a user", () => {
      var usersList = users.removeUser(1);
      expect(usersList.length).toBe(2);
  });
  it("should not remove a user", () => {
    var user = users.removeUser(99);
      expect(users.users.length).toBe(3);
  });
  it("should get a user", () => {
      var user = users.getUser(1);
      expect(user).toEqual(users.users[0])
      expect(user).toBeTruthy();
  });
  it("should not get a user", () => {
    var user = users.getUser(0);
    expect(user).toBeFalsy();
  });
});
