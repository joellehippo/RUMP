function nameList() {
  var instr = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Instructors");  
  var nameArray = [];//array that contains all the instructor names
  for(var i=2;i<MAX_NUM_INSTR;i++){
    if(instr.getRange(i,2).getValue() != ""){
      nameArray.push(instr.getRange(i,2).getValue());
    }
  }
  Logger.log(nameArray);
  
  return nameArray;
}
