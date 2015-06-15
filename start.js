require('shelljs/global');

var statik;
statik = require('statik');

require('../auth/index');
require('../courses/index');
require('../calendar/index');

exec('npm run build --prefix ../frontend');

statik({'port' : 8000, 'root' : '../frontend/build'});
