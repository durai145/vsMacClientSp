function hasKey(recKeys, recSchKeys) {
		var rtObj = null;
              
		recKeys.forEach(function(key) { 
	
			if(!recSchKeys.some(function (schKey) {
				return schKey == key;		
			}))
			rtObj = new Error("Unkown Key: " + key + " is not defined on Schema Keys " + JSON.stringify(recSchKeys));
			
		});
 
		return rtObj;
        
}

console.log(hasKey(["DURAI", "AGALYA"], ["DURAI","ABIJITH"]));
