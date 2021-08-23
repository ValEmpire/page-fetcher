const request = require('request');
const fs = require('fs-extra');

const [targetSite, localPath] = process.argv.slice(2);

if(!targetSite) return console.log('Target site needed');
if(!localPath) return console.log('localPath needed');

request(targetSite, function (error, response, body) {
  if(error){
    return console.log(error)
  }

  if(response && response.statusCode !== 200){
    return console.log('Fetching response is not successful')
  }

  console.log('body:', body); // Print the HTML for the Google homepage.

  fs.writeFile(localPath, body, function (err, data) {
    if (err) return console.log(err);
    console.log(`Downloaded and saved ${body.length} filesbytes to ${localPath}`);
  });
});