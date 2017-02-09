// This function will populate lessons from courses
function allocateLessons_() {
  Logger.log("Function allocateLessons has started"); 
  
  // Gets sheet: Courses
  var sheetCourses = SpreadsheetApp.getActive().getSheetByName("Courses");
  Logger.log("Sheet: " + sheetCourses.getName());
  
  var lastRow = sheetCourses.getLastRow(); 
  var range = sheetCourses.getRange(3,1,lastRow,29); 
  var values = range.getValues();   
  
  // Gets sheet: Lessons
  var sheetLesson = SpreadsheetApp.getActive().getSheetByName("Lessons");
  Logger.log("Sheet: " + sheetLesson.getName());
  
  var lastRowL = sheetLesson.getLastRow(); 
  Logger.log("LastRowL :" + lastRowL);
  var rangeL = sheetLesson.getRange(3,1,lastRow,16); 
  var valuesL = rangeL.getValues();    
  
  // Iterates through Courses
  for (var i = 0; i < values.length; i++) {     
    
    if (values[i][1].length > 0) {  
      
      // Obtaining information from Courses
      
      // Check if already allocated
      var checkAllocation = values[i][28];
      Logger.log("Allocation status: Row " + (i+1)); 
      
      if (checkAllocation!="Allocated") {
        
        var id = values[i][0];
        Logger.log("ID: " + id);      
         
        // School details
        var school = values[i][1];
        Logger.log("School: " + school);
        
        var level = values[i][2];
        Logger.log("Level: " + level);
        
        var icav = values[i][3];
        Logger.log("ICAV before? : " + icav);
        
        var leadOwner = values[i][4];
        Logger.log("Lead Owner: " + leadOwner);
        
        // Course details
        var course = values[i][5];
        Logger.log("Course: " + course);
        
        var startDate = values[i][6];
        Logger.log("Start date: " + startDate);
        
        var endDate = values[i][7];
        Logger.log("End date: " + endDate);
        
        var termBlock = values[i][8];
        Logger.log("Term block: " + termBlock);
        
        var dayOfWeek = values[i][9];
        Logger.log("Day of week: " + dayOfWeek);
        
        var location = values[i][10];
        Logger.log("Location: " + location);
        
        var startTime = values[i][11];
        Logger.log("Start time: " + startTime);
        
        var endTime = values[i][12];
        Logger.log("End time: " + endTime);
        
        var numRecur = values[i][13];
        Logger.log("Number of recurring session: " + numRecur);
        
        var weekIntervals = values[i][14];
        Logger.log("Number of weeks interval: " + weekIntervals);
        
        // Instructors
        var primaryInstructor = values[i][15];
        Logger.log("Primary Instructor: " + primaryInstructor);
        
        var secondaryInstructor = values[i][16];
        Logger.log("Secondary Instructor: " + secondaryInstructor);
        
        // Status
        var signIDA = values[i][17];
        Logger.log("Signed at IDA: " + signIDA);
        
        var equipmentCheck = values[i][18];
        Logger.log("Equipment check: " + equipmentCheck);
        
        var completed = values[i][19];
        Logger.log("Completed: " + completed);
        
        var invoiced = values[i][20];
        Logger.log("Invoiced: " + invoiced);
        
        // Primary contact
        Logger.log("-Primary contact-");
        
        var name1 = values[i][21];
        Logger.log("Name: " + name1);
        
        var email1 = values[i][22];
        Logger.log("Email: " + email1);
        
        var phone1 = values[i][23];
        Logger.log("Phone: " + phone1);
        
        // Seconday contact
        Logger.log("-Secondary contact-");
        
        var name2 = values[i][24];
        Logger.log("Name: " + name2);
        
        var email2 = values[i][25];
        Logger.log("Email: " + email2);
        
        var phone2 = values[i][26];
        Logger.log("Phone: " + phone2);  
        
        // Comments
        var comments = values[i][27];
        Logger.log("Comments: " + comments);        
        
        // Distributing information to Lessons
        Logger.log("Inside Lessons.....");
        
        // Check for latest last row
        var lastRowL = sheetLesson.getLastRow();
        Logger.log("Latest last row (before allocation): " + lastRowL);
        var index = lastRowL+1;
        Logger.log("Index: " + index); // print after the last row
        
        var sessionId = 1;
        
        var cid = sheetLesson.getRange("A" + index).setValue(id + " #" + sessionId);
        Logger.log("CID: " + cid);
        
        var schoolL = sheetLesson.getRange("B" + index).setValue(school);
        Logger.log("School: " + schoolL);
        
        // Function to retrieve acronym
        var retrieveAcronym = getAcronym_(school);
        var schoolAcronym = sheetLesson.getRange("C" + index).setValue(retrieveAcronym);
        Logger.log("School Acronym: " + schoolAcronym);
        
        var courseL = sheetLesson.getRange("D" + index).setValue(course);
        Logger.log("Course: " + courseL);
        
        var formatStartDate = Utilities.formatDate(new Date(startDate), "Singapore", "dd/MM/yyyy");
        var startDateL = sheetLesson.getRange("E" + index).setValue(formatStartDate);      
        Logger.log("Start Date: " + startDateL);
        
        var formatStartTime = Utilities.formatDate(new Date(startTime), "Singapore","HH:mm");
        var startTimeL = sheetLesson.getRange("F" + index).setValue(formatStartTime);         
        Logger.log("Start Time: " + startTimeL);
        
        var formatEndTime = Utilities.formatDate(new Date(endTime), "Singapore","HH:mm");
        var endTimeL = sheetLesson.getRange("G" + index).setValue(formatEndTime);        
        Logger.log("Format End Time: " + endTimeL);
        
        // Primary instructor
        var primaryInstructorL = sheetLesson.getRange("H" + index).setValue(primaryInstructor);  
        Logger.log("Primary Instructor: " + primaryInstructorL);
        
        // Secondary instructor
        var secondaryInstructorL = sheetLesson.getRange("I" + index).setValue(secondaryInstructor);  
        Logger.log("Secondary Instructor: " + secondaryInstructorL);
         
        var commentsL = sheetLesson.getRange("J" + index).setValue(comments);  
        Logger.log("Comments: " + commentsL);
        
        // Function to retrieve email address for all instructors
        var stringOfNames = primaryInstructor + ", " + secondaryInstructor;
        Logger.log("string of names: " + stringOfNames);
        
        var arrayOfNames = new Array();
        arrayOfNames = stringOfNames.split(",");
        
        var arrayOfEmails = new Array();
        for(a in arrayOfNames) {
          var retrieveEmail = getEmail_(arrayOfNames[a].trim());
          arrayOfEmails.push(retrieveEmail);
          Logger.log("Array of emails: " + arrayOfEmails);
        }
        
        var registerEmail = sheetLesson.getRange("M" + index).setValue(arrayOfEmails.toString());
        Logger.log("Email registered: " + registerEmail.toString());      
        
        var recurDate = startDate;
        
        // Taking care of recurring conditions & week intervals
        // Preconditions: number for recurring session > 0 and weekIntervals > 0 
        if(numRecur > 0) {
          for(var x = 0; x < numRecur-1; x++) {
            var newRecurDate = recurDate.getDate() + 7 * weekIntervals;
            recurDate.setDate(newRecurDate);
            var formatRecurDate = Utilities.formatDate(new Date(recurDate), "Singapore", "dd/MM/yyyy");         
            Logger.log("Recur date: " + recurDate);
            
            // Note: inserRowAfter will cause last row index to increase 
            var source_range = sheetLesson.getRange("A" + index + ":M" + index);
            index++;
            var target_range = sheetLesson.getRange("A" + index + ":M" + index);   
            source_range.copyTo(target_range);
            // Modify the date
            sheetLesson.getRange("E" + index).setValue(formatRecurDate);
            sheetLesson.getRange("E" + index).clearNote();
            // Modify session id
            sessionId++;
            sheetLesson.getRange("A" + index).setValue(id + " #" + sessionId);
          }
        }        

        var lastRowL = sheetLesson.getLastRow();
        Logger.log("Latest last row (after allocation): " + lastRowL);
        
        // Set allocation confirmation in Courses        
        var setAllocation = sheetCourses.getRange(i+3, 29).setValue("Allocated"); 
        Logger.log("i: " + i);
        Logger.log("End of transmission");
      } // if allocated
    } // if length
  } // end of for-loop
}// end of function 

