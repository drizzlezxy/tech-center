var path = require('path');
var chunks = [];
var filePath = {
    srcPath: path.join(__dirname, '../src'),
    tplPath: path.join(__dirname, '../src'),
    build: path.join(__dirname, '../build'),
    publicPath: '/build/'
};

var pages = [{
    name: 'HomePage/index',
    entry: 'HomePage/index.js',
    ftl: 'newPages/HomePage/index.html'
}, {
    name: 'Test/index',
    entry: 'Test/index.js',
    ftl: 'newPages/Test/index.html'
}];

var pagesToPath = function() {
    var _p = [];
    pages.forEach(function(_page) {
        var _obj = {
            name: _page.name,
            entry: 'page/' + _page.entry,
            ftl: _page.ftl,
            templates: path.join(filePath.tplPath, _page.ftl)
        };
        _p.push(_obj);
        chunks.push(_page.name);
    });
    return _p;
};

module.exports = {
    filePath: filePath,
    pages: pages,
    pagesToPath: pagesToPath,
    port: 8090,
    chunks: chunks
};