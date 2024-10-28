const {get} = require('https')

get('https://www.google.com', (res)=>{
    res.on('data', (chunck)=>{
        console.log(`data chuck:${chunck}`)
    });
    res.on('end', ()=>{
        console.log('No more data');
    });
});
