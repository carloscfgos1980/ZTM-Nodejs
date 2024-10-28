//1st way to export:
// module.exports = {
//     request: require('./request'),
//     response: require('./response')
// };

 
// 2nd way to export
    // const request = require('./request');
    // const response = require('./response');

    // module.exports = {
    //     send: request.send,
    //     REQUEST_TIMEOUT: request.REQUEST_TIMEOUT,
    //     read: response.read
    // }


    //3 way, more fancy and clean. with ... we inherit all the properties from the modules without need to define like above
    module.exports = {
        ...require('./request'),
        ...require('./response')
    }

