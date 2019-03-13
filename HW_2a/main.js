var http = require('http')


async function timeStamp () {    
    
    await new Promise(function(resolve, reject){
        console.log(new Date().getTime())
        let interval=process.argv[2]||500; 
        let period=process.argv[3]||0;
        let myTimer = setInterval(() => console.log(new Date().getTime()), interval);
        // timer stop
        setTimeout(() => { 
            clearInterval(myTimer); 
            console.log('timer is closed ' + new Date().getTime()); 
            resolve()
        }, period);
    })    
}

var server = http.createServer(timeStamp())
server.listen(7000)