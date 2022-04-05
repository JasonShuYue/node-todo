const db = require("../db");

const fs = require("fs");

jest.mock("fs");

describe("db", () => {
  it("can read", async () => {
    const testData = [
      {
        title: "test",
        done: true,
      },
    ];

    fs.setReadFileMock("/xxx", null, JSON.stringify(testData));

    const list = await db.read("/xxx");

    expect(list).toStrictEqual(testData);
  });

  it("can write", async () => {
    let fakeFile = "";
    fs.setWriteFileMock("/yyy", (path, data, callback) => {
      fakeFile = data;
      callback(null);
    });

    const testData = [
      {
        title: "测试写文件",
        done: false,
      },
    ];

    await db.write(testData, "/yyy");

    expect(fakeFile).toBe(JSON.stringify(testData) + "\n");
  });
});
