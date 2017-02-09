// Insert code description here
function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [];  
  menuEntries.push({name: "Allocate Lessons", functionName: "allocateLessons"},
                   {name: "Sync to Google Calendar", functionName: "pushToCalendar"},
                   {name: "Delete Selected Lesson", functionName: "deleteEvent"},
                   {name: "Update to Google Calendar", functionName: "updateEvent"},
                   {name: "Check Instructor's schedule", functionName: "allocLesson"},
                   {name: "Assign Instructors", functionName: "addInstr"},
                   {name: "Bump", functionName: "postponeDate"} 
                  ); 
  sheet.addMenu("RUMP", menuEntries);  
}

// This function allocates lessons based on Courses
function allocateLessons() {
 allocateLessons_(); 
}

// This function creates events from Lessons to GCal
function pushToCalendar() {
  pushToCalendar_(calSettings_());
}

// This function deletes events from Lessons and GCal
function deleteEvent() {
  deleteEvent_(calSettings_());
}

// This function allows GCal to be updated
function updateEvent() {
  updateEvent_(calSettings_());
}

//This function allocate lessons to sheet "Instructor Allocation"
function allocLesson(){
  selectWk_();
}

// This function postpones the date by a week
function postponeDate() {
  postponeDate_();
}

// This function add more sec instr
function addInstr(){
  addInstr_();
}
