/*
* This method will clean up all the events in the sheet "Instructor Allocation"
*/
function cleanPage(){
  var instrAlloc = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Instructor Allocation"); 
  for(var col = 3;col<MAX_COL_INSTRALLOC;col++){
    for(var row = 1;row<MAX_ROW_INSTRALLOC;row++){
      instrAlloc.getRange(row,col).setValue("");
    }
  }
}
/*
* This method will identify the selected week and allocate lessons to the instructors 
* accordingly. 
*/
function selectWk_(){
  var les = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Lessons"); 
  var course = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Courses"); 
  var instrAlloc = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Instructor Allocation"); 
  cleanPage();
  placeAllInstr();//allocate instructors
  
  if(instrAlloc.getRange("A2").getValue() == "Last Week"){
    allocEvent(instrAlloc.getRange("B2").getValue());

  }
  else if(instrAlloc.getRange("A2").getValue() == "This Week"){
    allocEvent(instrAlloc.getRange("B2").getValue());

  }
  else if(instrAlloc.getRange("A2").getValue() == "Next Week"){
    allocEvent(instrAlloc.getRange("B2").getValue());

  } 
  
}
/*
* Constants 
*/
var MAX_NUM_INSTR = 50;
var INITIALISATION = 0;
var NUM_DAYS_IN_WEEK = 7;
var MAX_COL_INSTRALLOC = 20;
var MAX_ROW_INSTRALLOC = 24;


var PRI_INSTR_COL_COURSE = 16;
var SEC_INSTR_COL_COURSE = 17;


var START_DATE_COL_LESSON = 5;
var END_DATE_COL_LESSON = 7; 

var pri_INSTR_COL_LESSON = 11;
var SEC_INSTR_COL_LESSON = 13;

/*
* This method will allocate all the names to the sheet Instructor Allocation in one row
*/
function placeAllInstr(){
  var instrAlloc = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Instructor Allocation");  
  var course = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Courses");  
  
  var nameArray = [];//array that contains all the instructor names
  for(var i=3;i<MAX_NUM_INSTR;i++){//primary instr from course
    if(course.getRange(i,PRI_INSTR_COL_COURSE).getValue() != ""){
      nameArray.push(course.getRange(i,PRI_INSTR_COL_COURSE).getValue());
    }
  }
  
  for(var j=3;j<MAX_NUM_INSTR;j++){//sec instr from course
    if(course.getRange(j,SEC_INSTR_COL_COURSE).getValue() != ""){
      nameArray.push(course.getRange(j,SEC_INSTR_COL_COURSE).getValue());
    }
  }
  Logger.log(nameArray.length);
  for(var k=3;k<nameArray.length+3;k++){//allocate instructors to instrAlloc
    instrAlloc.getRange(1,k).setValue(nameArray[k-3]);
  }
}
/*
* This method return an array that contains all the instructor names
*/
function Name(){
  var instrAlloc = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Instructor Allocation");  
  var course = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Courses");  
  
  var nameArray = [];//array that contains all the instructor names
  for(var i=3;i<MAX_NUM_INSTR;i++){//primary instr from course
    if(course.getRange(i,PRI_INSTR_COL_COURSE).getValue() != ""){
      nameArray.push(course.getRange(i,PRI_INSTR_COL_COURSE).getValue());
    }
  }
  
  for(var j=3;j<MAX_NUM_INSTR;j++){//sec instr from course
    if(course.getRange(j,SEC_INSTR_COL_COURSE).getValue() != ""){
      nameArray.push(course.getRange(j,SEC_INSTR_COL_COURSE).getValue());
    }
  }
  return nameArray;

}

/*
* This method will display details about the selected lesson. 
*/
function displayObj(eventObj){
  var formatEventArray = [];
  formatEventArray.push("SCHOOL:" + " " + eventObj.school);
  formatEventArray.push("SCHOOL ACRONYM:" + " " + eventObj.schoolAcro);
  formatEventArray.push("COURSE:" + " " + eventObj.crs);
  formatEventArray.push("TIME:" + " " + eventObj.time);
  return formatEventArray.join("\n");
}
/*
* This method will display the details under the correct date
*/
function allocEvent(wkDate){
  var les = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Lessons"); 
  var instrAlloc = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Instructor Allocation");
  var eArray = eventArray(les);
  var row = 0;
  var col = 0;
  var firstDay = wkDate;
  var wkDayPt = wkDate;
  
  for(var j=0;j<eArray.length;j++){
    Logger.log(firstDay);
    row = getRow(eArray[j].d,firstDay);
    col = getCol(eArray[j].priI);//pri
    if(row>0 && col>0){
      instrAlloc.getRange(row,col).setValue(displayObj(eArray[j]) + "\n" + "PRIMARY INSTRUCTOR");
    }
    
  }
  for(var k=0;k<eArray.length;k++){
    row = getRow(eArray[k].d,firstDay);
    col = getCol(eArray[k].secI);//sec
    if(row>0 && col>0){
      instrAlloc.getRange(row,col).setValue(displayObj(eArray[k])+ "\n" + "SECONDARY INSTRUCTOR");
    }
    
  }
  
}

/*
* This method will return the row index in sheet "Instructor Allocation"
* for inserting the events.
*
* @param dayStr: Week days  
* @return a number that represents the correct row in the sheet "Instructor Allocation"
*/
function getRow(dayStr, wkDate){
  var newWkDate = new Date(wkDate);
  var newDayStr = new Date(dayStr);
  var lastDate = new Date(addDaysFromDate(wkDate,6));
  Logger.log(newWkDate.valueOf());
  Logger.log(newDayStr.valueOf());
  if(newWkDate.valueOf()<= newDayStr.valueOf() && newDayStr.valueOf()<= lastDate.valueOf()){
    Logger.log("inside date range");
    switch(newDayStr.toString().substr(0,3)){
      case "Mon":
        return 2;
      case "Tue":
        return 5;
      case "Wed":
        return 8;
      case "Thu":
        return 11;
      case "Fri":
        return 14;
      case "Sat":
        return 17;
      case "Sun":
        return 20;
      default:
        return 2;
    }
  }
  else{
    Logger.log("outside date range")
  }
}
/*
* This method will return the correct column for that particular name
*/
function getCol(instrName){
  var nameArray = [];
  nameArray = Name();
  for(var i=0;i<nameArray.length;i++){
    if(nameArray[i] == instrName){
      return i+3;
    }
  }
}

/*
* This method will extract all information for one event
*/
function event(rowInd){
  var array = [];
  var les = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Lessons"); 
  
  var sch = les.getRange(rowInd, 2);
  var schAcro = les.getRange(rowInd, 3);
  var course = les.getRange(rowInd, 4);
  var startTime = les.getRange(rowInd, 6);
  var endTime = les.getRange(rowInd, 7);
  var priInstr = les.getRange(rowInd, 8);
  var secInstr = les.getRange(rowInd, 9);
  var date = les.getRange(rowInd, 5);
  
  var eventObj = {
    school: sch.getValue().toString()+ "\n",
    schoolAcro:schAcro.getValue().toString()+ "\n",
    crs:course.getValue().toString()+ "\n",
    time:formatT(startTime.getValue().toString())+" - "+formatT(endTime.getValue().toString())+ "\n",
    priI:priInstr.getValue().toString(),
    secI:secInstr.getValue().toString(),
    d:date.getValue(),
  }
  return eventObj;
}
/*
* This method will return an array that contains all the events
*/
function eventArray(les){
  les = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Lessons"); 
  var eArray = [];
  for(var i=3;i<50;i++){//include all events
    if(les.getRange(i,1).getValue().toString() !=""){
      eArray.push(event(i));
      continue;
    }
  }
  return eArray;
}

/*
* This method will format time to 'HH:mm:ss'
*
* @param les: t
* @return formated time
*/
function formatT(t){
  var time = new Date(t);
  return Utilities.formatDate(time, 'Singapore', 'HH:mm:ss');
}

/*
* This method will format date to 'MMMM dd, yyyy'
*
* @param les: d
* @return formated date
*/
function formatD(d){
  var date = new Date(d);
  return Utilities.formatDate(date, 'Singapore', 'MMMM dd, yyyy');
}

/*
* This method will return the next day.
*
* @param les: date: The selected date
*             d_num: number of day to add and date = start date
* @return formated date
*/
function addDaysFromDate(date,d_num){
  var finalDate = new Date(date.getTime()+d_num*(24*3600*1000));
  return finalDate;
}

