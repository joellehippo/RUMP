// This function keeps track of edited information
function onEdit(e){
  // Set a comment on the edited cell to indicate when it is modified
  Logger.log("Edit detected");
  var range = e.range;
  var rowOfRange = range.getLastRow();
  Logger.log("Row: " + rowOfRange);
  var sheetLesson = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Lessons");
  var checkSync = sheetLesson.getRange("K" + rowOfRange).getValue();
  Logger.log("Check Sync: " + checkSync);
  
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetName();
  Logger.log("Active sheet: " + activeSheet);
  
  var column = range.getColumn();
  Logger.log("Column index edited: " + column);
  var flag = 0;
  
  if(column == 4 || column == 5 || column == 6 || column == 7 || column == 8 || column == 9 || column == 10) {
    flag = 1;
  }
  
  // Conditions to set update note
  if(checkSync == 'Synced' && activeSheet == 'Lessons' && flag) {
    range.setNote('update');
    Logger.log("Add note");
    
  }
}

// This function updates GCal when there are changes done to google sheets
// Preconditons: Lessons is allocated. Lessons has already been synced before.
function updateEvent_(calendar) {
  Logger.log("updateEvent function has started");
  
  var sheetLesson = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Lessons");
  var lastRow = sheetLesson.getLastRow(); 
  
  var cell = sheetLesson.getRange("A3");
  
  // Returns a new range (the next cell)
  for(var x = 0; x <= lastRow; x++) {
    for(var y = 0; y < 10; y ++){
      var newCell = cell.offset(x,y);
      if(newCell.getNote() == 'update') {
        Logger.log("x: " + x +" y: " + y);
        Logger.log("We have an update field!");
        
        var eventId = sheetLesson.getRange("L" + (x+3)).getValue();
        
        // When course is modified
        if (y == 3) {
          var course = newCell.getValue();  
          var school = newCell.offset(0, -1).getValue();
          var sessionId = newCell.offset(0, -3).getValue();
          var newTitle = school + " " + course + " " + sessionId;
          var title = calendar.getEventSeriesById(eventId).setTitle(newTitle);
          
          newCell.clearNote();
        }
        
        // When date / start time / end time is modified
        if(y == 4 || y == 5 || y == 6) {
          if( y ==4 ) {
            Logger.log("4 ran");
            var startDate = newCell.getValue();
            var startTime = newCell.offset(0, 1).getValue();
            var endTime = newCell.offset(0, 2).getValue();
          }
          if(y == 5) {
            Logger.log("5 ran");
            var startDate = newCell.offset(0, -1).getValue();
            var startTime = newCell.getValue();
            var endTime = newCell.offset(0, 1).getValue();
          } 
          
          if(y == 6){
            Logger.log("6 ran");
            var startDate = newCell.offset(0, -2).getValue();
            var startTime = newCell.offset(0, -1).getValue();
            var endTime = newCell.getValue();
          }
          
          var formatStartDate = Utilities.formatDate(new Date(startDate), "Singapore", "MMMM dd, yyyy");
          //Logger.log("Format Start Date: " + formatStartDate);          
         
          var formatStartTime = Utilities.formatDate(new Date(startTime), "Singapore","HH:mm:ss");
          //Logger.log("Start Time: " + formatStartTime);
          
          var startTimeString = formatStartDate + " " + formatStartTime;
          //Logger.log("Start Time String: " + startTimeString);
          
          var startTimeObj = new Date(startTimeString);
          Logger.log("Start Time Object: " + startTimeObj);
          
          var formatEndTime = Utilities.formatDate(new Date(endTime), "Singapore","HH:mm:ss");
          //Logger.log("Format End Time: " + formatEndTime);
          
          var endTimeString = formatStartDate + " " + formatEndTime;
          //Logger.log("End Time String: " + endTimeString);
          
          var endTimeObj = new Date(endTimeString);
          Logger.log("End Time Object: " + endTimeObj);
          
          var recurrence = CalendarApp.newRecurrence().addDailyRule().times(1);
          calendar.getEventSeriesById(eventId).setRecurrence(recurrence, startTimeObj, endTimeObj);
          newCell.clearNote();
        }
        
        // When instructors are modified
        // Primary instructor
        if (y == 7) {
          
          // Remove previous instructors' emails
          Logger.log("Removing instructors' emails");
          var oldEmailListString = newCell.offset(0, 5).getValue();
          
          // Converting string to array
          var emailArray = new Array();
          emailArray = oldEmailListString.split(",");        
          
          for(a in emailArray) {
            calendar.getEventSeriesById(eventId).removeGuest(emailArray[a].trim());
          }                        
          
          // Update new email
          Logger.log("Updating new email");
                    
          var stringOfPrimaryInstructors = newCell.getValue();
          var stringOfSecInstructors = newCell.offset(0,1).getValue();
          var stringOfNames = stringOfPrimaryInstructors + "," + stringOfSecInstructors;
          var nameArray = new Array();
          nameArray = stringOfNames.split(",");
          var newEmailArray = new Array();
          for (b in nameArray) {
            var newEmail = getEmail_(nameArray[b].trim());
            newEmailArray.push(newEmail);
          }
  
          newCell.offset(0, 5).setValue(newEmailArray.toString());
          
          for(e in newEmailArray) {
            calendar.getEventSeriesById(eventId).addGuest(newEmailArray[e]);
          }
          newCell.clearNote();
        }
        
        // Secondary instructor
        if (y == 8) {
          // Remove previous instructors' emails
          Logger.log("Removing instructors' emails");
          var oldEmailListString = newCell.offset(0, 4).getValue();
          Logger.log("oldEmailListString: " + oldEmailListString);
          
          // Converting string to array
          var emailArray = new Array();
          emailArray = oldEmailListString.split(", ");
          Logger.log("Email array: " + emailArray.toString());
          
          for(c in emailArray) {
            calendar.getEventSeriesById(eventId).removeGuest(emailArray[c].trim());
          }                        
          
          // Update new email
          Logger.log("Updating new email");
          
          var stringOfPrimaryInstructors = newCell.getValue();
          var stringOfSecInstructors = newCell.offset(0,-1).getValue();
          var stringOfNames = stringOfPrimaryInstructors + ", " + stringOfSecInstructors;         
          var nameArray = new Array();
          nameArray = stringOfNames.split(",");
          var newEmailArray = new Array();
          for (b in nameArray) {
            var newEmail = getEmail_(nameArray[b].trim());
            newEmailArray.push(newEmail);
          }
          
          newCell.offset(0, 4).setValue(newEmailArray.toString());
          for (d in newEmailArray) {
            calendar.getEventSeriesById(eventId).addGuest(newEmailArray[d]);
          }
          newCell.clearNote();
        
        }
        
        // When comments are modified
        if (y == 9) {
          var description = newCell.getValue();
          calendar.getEventSeriesById(eventId).setDescription(description);   
          newCell.clearNote();
        }
      }
    }
  }
}

