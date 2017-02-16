//This function pushes new events to calendar
function pushToCalendar_(calendar) {
  Logger.log("Function pushToCal has started"); 
  
  //spreadsheet variables
  var sheetLesson = SpreadsheetApp.getActive().getSheetByName("Lessons");
  Logger.log("Sheet: " + sheetLesson.getName());
  
  var lastRow = sheetLesson.getLastRow(); 
  var range = sheetLesson.getRange(3,1,lastRow,16); 
  var values = range.getValues();   
    
  // Iterates throught each column then moves on to the next row
  for (var i = 0; i < values.length; i++) {     
        
    if (values[i][1].length > 0) {                                
      var gCalCheck = values[i][10];
      Logger.log("gCalCheck: " + gCalCheck);
      
      // Checks if it was synced before
      if(gCalCheck != "Synced") {
        
        var CID = values[i][0];
        Logger.log("CID: " + CID);
        
        var school = values[i][1];
        Logger.log("School: " + school);
        
        var schoolAcronym = values[i][2];
        Logger.log("School Acronym: " + schoolAcronym);
        
        var course = values[i][3];
        Logger.log("Course: " + course);
        
        var startDate = values[i][4];
        var formatStartDate = Utilities.formatDate(new Date(startDate), "Singapore", "MMMM dd, yyyy");
        Logger.log("Start Date: " + formatStartDate);
        
        var startTime = values[i][5];
        var formatStartTime = Utilities.formatDate(new Date(startTime), "Singapore","HH:mm:ss");
        Logger.log("Start Time: " + formatStartTime);
        
        var startTimeString = formatStartDate + " " + formatStartTime;
        Logger.log("Start Time String: " + startTimeString);
        
        var startTimeObj = new Date(startTimeString);
        Logger.log("Start Time Object: " + startTimeObj);
        
        var endTime = values[i][6];
        var formatEndTime = Utilities.formatDate(new Date(endTime), "Singapore","HH:mm:ss");
        Logger.log("Format End Time: " + formatEndTime);       
        
        var endTimeString = formatStartDate + " " + formatEndTime;
        Logger.log("End Time String: " + endTimeString);
        var endTimeObj = new Date(endTimeString);
        Logger.log("End Time Object: " + endTimeObj);
        
        var primaryInstructor = values[i][7];
        Logger.log("Primary Instructor: " + primaryInstructor);
        
        var secondaryInstructor = values[i][8];
        Logger.log("Secondary Instructor: " + secondaryInstructor);        
        
        var comments = values[i][9];
        Logger.log("Comments: " + comments);
        
        var emailList = values[i][12];
        Logger.log("Email list: " + emailList);
        
        var title = schoolAcronym + " " + course + " " + CID;
        Logger.log("Title: " + title);
        
        var location = school;
        Logger.log("Location: " + location);
        
        var eventId = calendar.createEvent(title, startTimeObj, endTimeObj, {description: comments, location:location, guests: emailList}).getId();
        Logger.log("Event successfully created with endTimeObj!");
        Logger.log("Event id: " + eventId);
        sheetLesson.getRange("L" + (i+3)).setValue(eventId);     
        
        var gCalCheckRange = sheetLesson.getRange(i+3, 11).setValue("Synced");          
      }
    }
  }
  
}



