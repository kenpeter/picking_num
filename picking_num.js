
function getNextItem(db, key) {
  for (var i = 0; i < db.length; i++) {
    if (db[i].key === key) {
      return db[i + 1];
    }
  }

	return undefined;
}

function getCurrItem(db, key) {
  for (var i = 0; i < db.length; i++) {
    if (db[i].key === key) {
      return db[i];
    }
  }

	return undefined;
}

function updateCurrItem(db, key, value) {
	for (var i = 0; i < db.length; i++) {
    if (db[i].key === key) {
    	db[i].value = value;  
    } 
  }

	return undefined;
}

function buildGroup(objArr) {
	//console.log(objArr);

	for(var i=0; i<objArr.length; i++) {
		var obj = objArr[i];
		var key = obj.key;
		var nextObj = getNextItem(objArr, key);			

		console.log(obj);
		console.log(nextObj);
		console.log('--');
	}
}

function pickingNumbers(a) {
	var arr = a;
  var len = arr.length;
  arr.sort(function(a, b){
  	return a-b;
  });
   
	var objArr = []; 
  for(var i=0; i<len; i++) {
		var key = arr[i];
		var currItem = getCurrItem(objArr, key);

		if(currItem === undefined) {
			var obj = {
        key: key,
        value: 1
      };
      objArr.push(obj);
		} else {
			var newValue = currItem.value += 1;
      updateCurrItem(objArr, key, newValue);
		}
  }

	//
	buildGroup(objArr);

}

var a = [ 4, 6, 5, 3, 3, 1 ];
//var a = [1, 3, 3];
var out = pickingNumbers(a);
