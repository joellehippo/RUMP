function cName() {
  var checkInstr = [];
  checkInstr = SpreadsheetApp.getActiveRange().getValue().replace(" ","").split(",");//array that contain names that needs to be checked
  Logger.log(checkInstr);
   return checkInstr;
}
