const {
    isMainThread, 
    workerData,
    Worker
} = require('worker_threads');

if(isMainThread){
    console.log(`Main Thread Process ID: ${process.pid}`);
    new Worker(__filename, {
        workerData: [7,4,3,2]
    });
    new Worker(__filename, {
        workerData: [2,1,3,8]
    });
} else{
    console.log(`Worker Process ID: ${process.pid}`);
    console.log(`${workerData} sorted is ${workerData.sort()}`);
}