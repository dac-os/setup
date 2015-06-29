require('shelljs/global');
 
var nconf;

nconf = require('nconf');

if (!which('git')) {
  echo('Sorry, this script requires git');
  exit(1);
}
 
if (!which('node')) {
  echo('Sorry, this script requires nodejs');
  exit(1);
}

if (!which('mongo')) {
  echo('Sorry, this script requires mongodb');
  exit(1);
}

if (ls('../frontend').length === 0) exec('git clone https://github.com/dac-os/frontend ../frontend');
if (ls('../frontend/node_modules').length === 0) exec('npm install --prefix ../frontend ../frontend');

if (ls('../auth').length === 0) exec('git clone https://github.com/dac-os/auth ../auth');
if (ls('../auth/node_modules').length === 0)exec('npm install --prefix ../auth ../auth');

if (ls('../courses').length === 0) exec('git clone https://github.com/dac-os/courses ../courses');
if (ls('../courses/node_modules').length === 0)exec('npm install --prefix ../courses ../courses');

if (ls('../calendar').length === 0) exec('git clone https://github.com/dac-os/calendar ../calendar');
if (ls('../calendar/node_modules').length === 0)exec('npm install --prefix ../calendar ../calendar');

require('./migrate/auth.js');
require('./migrate/courses.js');