var fs =require('fs');
var stream = fs.createReadStream('./output.txt');
stream.on('readable', function(){
	var buf;
	while ((buf=stream.read()) !==null){
		console.log(buf);
	}

});
stream.once('end', function(){
	condole.log('������ ���������');
	
});


var writer=fs.createWriteStream('output.txt', {flags: 'w'});
writer.on('finish', function(){
	console.error('������ ���������.');
});
var i=0;
function write(){
	do{
		var ok=writer.write('����, #' + i + '!\n');
		if(!ok){
			writer.once('darin',write);
			break;
		}	
		i++;
	}while(i<10 && ok);
	
	if (i === 10) {
        writer.end('===== ����� =====\n');
    }

}
write();

var source = fs.createReadStream('input.txt');
var target = fs.createWriteStream('output.txt');
source.pipe(target);

var Transform = require('stream').Transform;

var uppercase = new Transform({decodeStrings: false});
uppercase._transform = function(chunk, encoding, done) {
  done(null, chunk.toUpperCase());
};

var source = fs.createReadStream('input.txt');
var target = fs.createWriteStream('output.txt');
source.pipe(uppercase).pipe(target);


