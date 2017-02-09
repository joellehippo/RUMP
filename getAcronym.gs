// This function find the school's acronym
function getAcronym_(school) {
  Logger.log("getAcronym has started");
  
  var sheetFX = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("FX");
  Logger.log("Sheet selected: " + sheetFX.getName());
  
  var lastRowOfFX = sheetFX.getLastRow();
  var rangeOfFX = sheetFX.getRange(2, 2, lastRowOfFX);
  var namesInFX = rangeOfFX.getValues();
  
  for(var j = 0; j < lastRowOfFX; j++) {                
    var listOfSchools = namesInFX[j][0];
    Logger.log("School list: " + listOfSchools);
    if(listOfSchools == school) {
      Logger.log("We have a match!");
      var acronym = sheetFX.getRange(j+2, 3).getValue();
      Logger.log("Acronym retrieved: " + acronym);
      break;
    }
  }
  return acronym;
}
