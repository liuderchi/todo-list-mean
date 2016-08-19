var fs = require('fs');

describe("Environment", () =>  {

  it('os is linux-based', () => {
    expect(process.platform).toBe('linux');
  });

  it('has locally installed node modules', () => {
    var node_module_dir_path = './node_modules';
    expect(fs.lstatSync(node_module_dir_path).isDirectory()).toBeTruthy();
  });

});
