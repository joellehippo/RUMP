// This function finds insturctor's email
function getEmail_(name) {
  Logger.log("getEmail has started......");
  Logger.log("Find email for " + name);
  
  var sheetInstructors = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Instructors");
  Logger.log("Sheet selected: " + sheetInstructors.getName());
  
  var lastRowOfInstructors = sheetInstructors.getLastRow();
  var rangeOfInstructors = sheetInstructors.getRange(2, 2, lastRowOfInstructors);
  var namesInInstructors = rangeOfInstructors.getValues();
  
  for(var j = 0; j < lastRowOfInstructors; j++) {                
    var listOfInstructors = namesInInstructors[j][0];
    Logger.log("Instructors list: " + listOfInstructors);
    if(listOfInstructors == name) {
      Logger.log("We have a match!");
      var email = sheetInstructors.getRange(j+2, 4).getValue();
      Logger.log("Email retrieved: " + email);
      break;
    }
  }
  return email;
}
