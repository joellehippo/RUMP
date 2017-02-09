var MAX_NUM_INSTR = 50;

// This function shows the html sidebar
function addInstr_() {  
  var les = SpreadsheetApp.getActive().getSheetByName("Lessons");
  var html = HtmlService.createTemplateFromFile('InstrList').evaluate();
  SpreadsheetApp.getUi()
  .showSidebar(html);
}
//=================================return an array with names=================================
var instr = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Instructors");  
var nameArray = [];//array that contains all the instructor names
for(var i=2;i<MAX_NUM_INSTR;i++){
  if(instr.getRange(i,2).getValue() != ""){
    nameArray.push(instr.getRange(i,2).getValue());
  }
}
Logger.log(nameArray);
//function test(){
  var checkInstr = [];
  checkInstr = SpreadsheetApp.getActiveRange().getValue().replace(" ","").split(",");
  
  Logger.log(checkInstr);
if(checkInstr.length>1){
  checkInstr.push(checkInstr.length);
  for(var j =0;j<checkInstr.length;j++){
    nameArray.push(checkInstr[j]);
  }
}
//}
var valid = function(){
  return nameArray;
}
//==============================================================================================
function fillCell(e){
  var s = [];
  for(var i in e){
    if(i.substr(0, 2) == 'ch') s.push(e[i]);
  }
  if(s.length) {
    var selectedRange = SpreadsheetApp.getActiveRange()
    selectedRange.setValue(s.join(', '));
    selectedRange.setNote('update');
  }
}
