var fs = require('fs');
var os = require('os');
var data;
fs.readFile('/home/atila/Desktop/node-js-template/views/quest.csv', 'ascii', (err, data) => {
 	if (err) throw err;
	data = data.split(os.EOL);
	var num=[]
	var alf = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
	var cols = data[0].split(',');
	for (i=1;i<cols.length;i++){
		num.push(0);
	}
        for (i=1;i<data.length;i++){
		var rs=data[i].split(',')
		for (j=1;j<rs.length;j++){
			if (rs[j]=='1') num[j-1]++;
		}
	}
	var s=`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title> Questionario</title>
	<body>\n`
	for (i=0;i<num.length;i++){
		s+="		<pre>Questao "
		s+=alf[i]
		s+=": "
		s+=num[i].toString()
		s+='</pre>\n'
	}
	s+=`  	</body>
</html>\n`	
	fs.writeFile('a.html', s, function (err) {
                if (err) return console.log(err);
        });
});

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
