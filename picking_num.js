
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

function buildArrNum(twoDArr) {
	var numArr = [];
	for(var i=0; i<twoDArr.length; i++) {
		var oneDArr = twoDArr[i];
		var finalValue = 0;
		for(var k=0; k<oneDArr.length; k++) {
			var item = oneDArr[k];
			finalValue += item.value;
		}

		numArr.push(finalValue);
	}

	return numArr;
}

function buildGroup(objArr) {
	var twoDArr = [];

	for(var i=0; i<objArr.length; i++) {
		var obj = objArr[i];
		var origObj = obj;
		var nextObj;
		var oneDArr = [];

		// We always have next obj
		while( (nextObj = getNextItem(objArr, obj.key)) !== undefined )  {
			var diff = Math.abs(origObj.key - nextObj.key);

			if(diff <= 1) {
        // push into arr
        oneDArr.push(nextObj);
				// Then continue to while loop
				obj = nextObj;
      } else {
        // Break this while loop, move to next element in array
				break;
      }
		}

		// Append origObj to head of oneDArr
		oneDArr.unshift(origObj);

		//
		twoDArr.push(oneDArr);	
	}

	var outArr = buildArrNum(twoDArr);
	outArr.sort(function(a, b){
		return b-a;
	});	

	return outArr[0];
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
	return buildGroup(objArr);

}

var a = [1, 2, 2, 3, 1, 2];
//var a = [ 4, 6, 5, 3, 3, 1, 1, 1, 1, 1, 1];
//var a = [ 4, 6, 5, 3, 3, 1 ];
//var a = [1, 3, 3];
var out = pickingNumbers(a);
console.log(out);
