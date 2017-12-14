var Sync = require('sync');
 
function asyncFunction(a, b, callback) {
    process.nextTick(function(){
        callback(null, a + b);
    })
}
 
// Run in a fiber 
Sync(function(){
    
    // Function.prototype.sync() interface is same as Function.prototype.call() - first argument is 'this' context 
    var result = asyncFunction.sync(null, 2, 3);
    console.log(result); // 5 
 
})
