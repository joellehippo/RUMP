// This function postpones the date by a week
function postponeDate_() {
  Logger.log("postponeDate function has started");
  
  // Gets information for selected area
  var sheetLessons = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Lessons");
  var activeSelection = sheetLessons.getActiveRange();
  var firstRow = activeSelection.getRow();
  Logger.log("First row: " + firstRow);
  var lastRow = activeSelection.getLastRow();
  Logger.log("Last row: " + lastRow); 

  // Increases date by 7 days
  for(var this_row = firstRow; this_row <= lastRow; this_row++) {
    if(sheetLessons.getRange("E" + this_row).getValue() != "") {
      var date = sheetLessons.getRange("E" + this_row).getValue();
      Logger.log("date: " + date);
      var newDate = date;
      
      var date_7_days_later = date.getDate() + 7;
      newDate.setDate(date_7_days_later);
      var formatNewDate = Utilities.formatDate(new Date(newDate), "Singapore", "dd/MM/yyyy"); 
      Logger.log("date_7_days_later: " + formatNewDate);
      
      var confirmDate = sheetLessons.getRange("E" + this_row).setValue(formatNewDate); 
      Logger.log("Confirmed date: " + confirmDate);
      
      // Add update note
      sheetLessons.getRange("E" + this_row).setNote('update');
    }
  }
}
