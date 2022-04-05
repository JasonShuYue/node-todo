const fs = jest.createMockFromModule("fs"); // 在jest模块中创建一个叫「fs」的模块
const _fs = jest.requireActual("fs"); // 引入真正的「fs模块」

Object.assign(fs, _fs); // 将「_fs模块」的能力赋予给假的「fs模块」

let readFileMocks = {};

// 「fs模块」中添加setMock
fs.setReadFileMock = (path, err, data) => {
  readFileMocks[path] = [err, data];
};

// fs.readFile("/xxx", fn);
// 此处相当于拦截了原有的「_fs.readFile」，在调用时，命中mock则返回mock数据
fs.readFile = (path, options, callback) => {
  if (callback === undefined) callback = options;
  if (path in readFileMocks) {
    callback(...readFileMocks[path]);
  } else {
    _fs.readFile(path, options, callback);
  }
};

let writeFileMocks = {};

// 将传入的fn函数记录在「writeFileMocks」中
fs.setWriteFileMock = (path, fn) => {
  writeFileMocks[path] = fn;
};

// 复写「fs模块」的writeFile方法，优先调用writeFileMocks中的方法
fs.writeFile = (file, data, options, callback) => {
  if (callback === undefined) callback = options;
  if (file in writeFileMocks) {
    writeFileMocks[file](file, data, options, callback);
  } else {
    fs.writeFile(file, data, options, callback);
  }
};

module.exports = fs;
