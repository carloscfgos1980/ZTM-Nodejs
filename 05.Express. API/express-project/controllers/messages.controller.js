const path = require('path')

function getMessages(req, res){
    res.render('messages', {
        title: "messages to my friend",
        friend: "Elan Musk",
    })
    // res.sendFile(path.join(__dirname, '..', 'public', 'images', 'holtenbroek.jpeg')); 
    // res.send('<ul><li>Hello to myself motherfucker</li></ul>')
}

function postMessage(req, res){
    console.log('updating messages...')
}

module.exports ={
    getMessages,
    postMessage,
}