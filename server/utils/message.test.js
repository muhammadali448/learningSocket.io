const expect = require("expect");
const { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate the correct message object", () => {
    var from = "John";
    var text = "Hello Everyone";
    var message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});

describe("generateLocationMessage", () => {
  it("should generate the correct current location", () => {
    var from = "Admin.N";
    var latitude = 20;
    var longitude = 20;
    var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    var message = generateLocationMessage(from, latitude, longitude);
    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, url });
  });
});
