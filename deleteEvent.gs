// This function will delete event from google sheets as well as gCal
function deleteEvent_(calendar) {
  Logger.log("deleteEvent has started");
  
  // Gets information from selected cell
  var sheetLessons = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Lessons");
  var cell = sheetLessons.getActiveCell();
  var row = cell.getLastRow();
  Logger.log("row: " + row);  
  
  // Deletes from GCal
  var eventId = sheetLessons.getRange("L" + row).getValue();
  calendar.getEventSeriesById(eventId).deleteEventSeries();
  
  // Deletes from Lessons
  sheetLessons.deleteRow(row);
  
}
