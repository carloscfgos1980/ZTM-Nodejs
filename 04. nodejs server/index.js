const http = require('http');

const PORT = 3000;
const server = http.createServer();

const friends = [
  {
    id: 0,
    name: 'Nikola Tesla',
  },
  {
    id: 1,
    name: 'Sir Isaac Newton',
  },
  {
    id: 2,
    name: 'Albert Einstein',
  }
];

server.on('request', (req, res)=>{
    const items = req.url.split('/');
    // /friends/2 => ['', 'friends', '2']

    if(req.method === 'POST' && items[1] === 'friends'){
        req.on('data', (data)=>{
            const friend = data.toString();
            console.log('request:', friend);
            friends.push(JSON.parse(friend));
        });
        req.pipe(res);
    } else if(req.method === 'GET' && items[1] === 'friends'){
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
        if(items.length === 3){
            const friendIndex = Number(items[2]) // this is the parameter which is index 3 in the array of the url (lin 23)
            res.end(JSON.stringify(friends[friendIndex])) //select object in the array that match the index
        }else{
            res.end(JSON.stringify(friends));
    }
    } else if(req.method === 'GET' && items[1] ===  'messages'){
        res.setHeader('Content-type', 'text/html')
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Issac</li>');
        res.write('<li>what the hell!</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        res.end()
    } else{
        res.statusCode = 404;
        res.end()
    }

});

server.listen(PORT, ()=>{
    console.log(`We are listening to port ${PORT}...`)
});