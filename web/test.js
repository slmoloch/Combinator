var mymodule = require('./graphics'),
    sys = require('sys');

var data = [
  [2,3,4,1],
  [1,1,2,1,3,1,1],
  [1,1,1,1,1,1,1,1,1,1]
];

var g = mymodule.PrepareGraphics(data);

for (var i = 0; i < g.length; i++) {
	sys.puts(JSON.stringify(g[i].graphPath));
};
