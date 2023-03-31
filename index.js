// Your code here
function createEmployeeRecord(array){
    let employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeRecord
}

function createEmployeeRecords(array){
    return array.map(newRecords => createEmployeeRecord(newRecords))
}

function createTimeInEvent(employeeRecord, dateStamp){
    let dateArray = dateStamp.split(" ")
    let dateObj = {
        type: "TimeIn",
        hour: parseInt(dateArray[1]),
        date: dateArray[0]
    }
    employeeRecord.timeInEvents.push(dateObj)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    let dateArray = dateStamp.split(" ")
    let dateObj = {
        type: "TimeOut",
        hour: parseInt(dateArray[1]),
        date: dateArray[0]
    }
    employeeRecord.timeOutEvents.push(dateObj)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp){
    let timeInEvent = employeeRecord.timeInEvents.find(e => e.date === dateStamp).hour
    let timeOutEvent = employeeRecord.timeOutEvents.find(e => e.date === dateStamp).hour
    let hoursWorked = (timeOutEvent - timeInEvent)/100
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, dateStamp){
    let hours = hoursWorkedOnDate(employeeRecord, dateStamp)
    let wage = employeeRecord.payPerHour
    return wage * hours
}

function allWagesFor(employeeRecord){
    let allWages = employeeRecord.timeInEvents.map((day) => {return wagesEarnedOnDate(employeeRecord, day.date)})
    return allWages.reduce((a, b) => a + b)
}

function calculatePayroll(employeeRecord){
    let Payroll = (employeeRecord.map((record) => {return allWagesFor(record)}))
    return Payroll.reduce((a, b) => a + b)
}
