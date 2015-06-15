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

exec('git clone https://github.com/dac-os/frontend ../frontend');
exec('npm install --prefix ../frontend ../frontend');

exec('git clone https://github.com/dac-os/auth ../auth');
exec('npm install --prefix ../auth ../auth');

exec('git clone https://github.com/dac-os/courses ../courses');
exec('npm install --prefix ../courses ../courses');

exec('git clone https://github.com/dac-os/calendar ../calendar');
exec('npm install --prefix ../calendar ../calendar');

require('./migrate/courses.js');