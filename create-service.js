const { exec } = require('child_process');
const name = process.argv[2];
if (name) {
  const process = exec('serverless create --template-url https://github.com/kyled7/serverless-typescript/tree/template --path services/' + name + ' --name ' + name)
  process.stdout.on('data', function(data) {
    console.log(data); 
  });
} else {
  console.error('Please enter service name')
}

