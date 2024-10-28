function encrypt(data){
    return 'encrypted data';
}

function send(url, data){
    encryptedData = encrypt(data);
    console.log(`sending ${encryptedData} to ${url}`)
}

module.exports ={
    send,
}