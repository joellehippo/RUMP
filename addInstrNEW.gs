function addInstrNEW_() {
  var MAX_NUM_INSTR = 50;
  
  // This function shows the html sidebar
  
  var les = SpreadsheetApp.getActive().getSheetByName("Lessons");
  var html = HtmlService.createTemplateFromFile('InstrList').evaluate();
  SpreadsheetApp.getUi()
  .showSidebar(html);
  
}
