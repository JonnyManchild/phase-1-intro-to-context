function createEmployeeRecord(employeeArray) {
    let employeeRecord = {
        firstName: `${employeeArray[0]}`,
        familyName: `${employeeArray[1]}`,
        title: `${employeeArray[2]}`,
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeRecord
};

function createEmployeeRecords(employeeArrays) {
    let employeesArray = [];
    for (let employee of employeeArrays) {
        let newEmployee = createEmployeeRecord(employee);
        employeesArray.push(newEmployee);
    };
    return employeesArray
};

function createTimeInEvent(employeeObject, timeStamp) {
    let timeStampArray = timeStamp.split(" ");
    let timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(timeStampArray[1]),
        date: timeStampArray[0]
    }
    employeeObject.timeInEvents.push(timeInEvent);
    return employeeObject;
};

function createTimeOutEvent(employeeObject, timeStamp) {
    let timeStampArray = timeStamp.split(" ");
    let timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(timeStampArray[1]),
        date: timeStampArray[0]
    }
    employeeObject.timeOutEvents.push(timeOutEvent);
    return employeeObject;
};

function hoursWorkedOnDate(employeeObject, punchDate) {
    let timeInArray = employeeObject.timeInEvents;
    let timeOutArray = employeeObject.timeOutEvents;
    let timeIn = 0;
    let timeOut = 0;
    for (let event of timeInArray) {
        if (event.date === punchDate) {
            timeIn = event.hour;
            break;
        };
    };
    for (let event of timeOutArray) {
        if (event.date === punchDate) {
            timeOut = event.hour;
            break;
        };
    };
    return Number(String(timeOut - timeIn).slice(0, -2));
};

function wagesEarnedOnDate(employeeObject, punchDate) {
    let hoursWorked = (hoursWorkedOnDate(employeeObject, punchDate));
    return hoursWorked * employeeObject.payPerHour;
};

function allWagesFor(employeeObject) {
    let timeInArray = employeeObject.timeInEvents;
    let wagesArray = [];
    for (let day of timeInArray) {
        let punchDate = day.date
        wagesArray.push(wagesEarnedOnDate(employeeObject, punchDate))
    };
    let totalWages = wagesArray.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);
    return totalWages
};

function calculatePayroll(allEmployees) {
    let totalPay = 0
    for (let employee of allEmployees) {
        totalPay = totalPay + allWagesFor(employee);
    };
    return totalPay;
};