var Fs = require("fs");		//ATTENTION: Ne pas mettre les 
const path = require('path');

var ListFiles = function(pDossier, pExtension, callback) {
  
  
  var array = [];
  var index = 0;
  
  Fs.readdir(pDossier, function(pErr, pList) 
  {
	  for (var i=0; i<pList.length; i++) 
	  {
		  var lExtWanted = '.' + pExtension;
		  var lResultFiles = path.extname(pList[i]);
		  
		  if(lResultFiles == lExtWanted)
		  { 
		    array[index] = pList[i];
		    index++;		    
		  }
	  }	  
	  callback(array);
  });
};

exports.ListFiles = ListFiles;


/*OU module.exports = function(dirPath, extname, callback){...
if(callback)
{
  return callback(err,data)
}

} */ 