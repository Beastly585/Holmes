// Pull Azure Data -- receives fully structured object
// Need to parse through the object structure to decide which working directory it hits

// On-click or every so often; pull YTD Dump from the last event stored-down

// Class to query and receive new data from Power BI
class PowerBiData {
    constructor() {
        // Initialize any properties or settings needed for Power BI
    }

    // Method to query Power BI for new data
    async queryNewData() {
        // Placeholder: Implement actual Power BI querying logic here
        console.log("Querying new data from Power BI...");
        let newData = [
            {
                'Event ID': "12345",
                'Substation': 'Substation A',
                'Outage Time': '2023-10-01T12:00:00Z',
                'Customers Out': 150,
                'Duration': 120,
                'Device Op Rolling 12 Month': 3,
                'Device Coordinate': 'DEV001',
                'Cause': 'Unscheduled'
            },
            // Add more sample data as needed
        ];
        return newData;
    }
}

// Class to query and receive stored data from Azure Cosmos DB
class AzureCosmos {
    constructor() {
        // Initialize any properties or settings needed for Azure Cosmos DB
    }

    // Method to query Azure Cosmos DB for stored data
    async queryStoredData() {
        // Placeholder: Implement actual Azure Cosmos DB query logic here
        console.log("Querying stored data from Azure Cosmos DB...");
        let storedData = {
            '12345': {
                outageData: {
                    'Event ID': "12345",
                    'Substation': 'Substation A',
                    'Outage Time': '2023-09-01T12:00:00Z',
                    'Customers Out': 100,
                    'Duration': 60,
                    'Device Op Rolling 12 Month': 2,
                    'Device Coordinate': 'DEV001',
                    'Cause': 'Unscheduled',
                    'PHI Cause': 'Unscheduled',
                    'Comments': 'Initial outage',
                    'Start Time': '2023-09-01T12:00:00Z',
                    'Feeder ID': 'Feeder001',
                    'Op. Device ID': 'Device001',
                    'Restore Time': '2023-09-01T13:00:00Z'
                }
            }
        };
        return storedData;
    }

    // Method to write changes to Azure Cosmos DB (no conflict handling for now)
    async writeData(data) {
        // Placeholder: Implement actual Azure Cosmos DB write logic here
        console.log("Writing data to Azure Cosmos DB:", data);
        // Simulate a successful write operation
        return true;
    }
}

// Class to process data, compare, and manage working objects
export class DataProcessor {
    constructor() {
        this.master = {}; // This will be used to populate the DOM elements and to read/write at user level
        this.newData = {};
        this.awaitingAssn = {};
        this.validating = {};
        this.takingAction = {};
        this.awaitingClose = {};
        this.awaitingArchive = {};
    }

    // Method to receive an array from a Power BI table and structure it into an object
    sortPowerBiDump(dataArray) {
        let newData = {};
        for (let item of dataArray) {
            let eNum = item['Event ID'];

            if (!newData[eNum]) {
                newData[eNum] = { outageData: {} };
            } else {
                // Index duplicate event numbers
                eNum = `${eNum}-0${Object.keys(newData).filter(key => key.startsWith(item['Event ID'])).length}`;
                newData[eNum] = { outageData: {} };
            }

            for (let key in item) {
                newData[eNum].outageData[key] = item[key];
            }
        }
        return newData;
    }

    // Method to exclude all scheduled events, and bundle:
    // Exclude Scheduled
    // BUNDLE 1 - Dupe E#s with an index
    // Bundle 2 - Comments on two events are identical
    // Bundle 3 - Same sub && start-time -OR- same start-time && similar comments
    // Bundle 4 - Same feeder && same device
    newDataBundler(newData) {
        let bundledData = {};

        for (let eNum in newData) {
            let item = newData[eNum].outageData;
            let outageCause = item['PHI Cause'];

            if (outageCause === 'Scheduled') {
                continue; // Exclude scheduled events
            }

            let bundled = false;

            for (let processedENum in bundledData) {
                let processedItem = bundledData[processedENum].outageData;

                // Check for duplicate event numbers (Bundle 1)
                if (eNum.split('-')[0] === processedENum.split('-')[0]) {
                    processedItem.ancillaryEvents.push(item);
                    bundled = true;
                    break;
                }

                // Check if comments are identical (Bundle 2)
                if (item['Comments'] === processedItem['Comments']) {
                    processedItem.ancillaryEvents.push(item);
                    bundled = true;
                    break;
                }

                // Check if same sub && start-time OR same start-time && similar comments (Bundle 3)
                if ((item['Substation'] === processedItem['Substation'] && item['Start Time'] === processedItem['Start Time']) ||
                    (item['Start Time'] === processedItem['Start Time'] && this.areCommentsSimilar(item['Comments'], processedItem['Comments']))) {
                    processedItem.ancillaryEvents.push(item);
                    bundled = true;
                    break;
                }

                // Check if same feeder && same device (Bundle 4)
                if (item['Feeder ID'] === processedItem['Feeder ID'] && item['Op. Device ID'] === processedItem['Op. Device ID']) {
                    processedItem.ancillaryEvents.push(item);
                    bundled = true;
                    break;
                }
            }

            if (!bundled) {
                // Initialize bundle for this event if not already present
                bundledData[eNum] = {
                    outageData: {
                        ...item,
                        ancillaryEvents: []
                    }
                };
            }
        }

        return bundledData;
    }

    // Helper function to check if comments are similar (this can be customized as needed)
    areCommentsSimilar(comment1, comment2) {
        // Simple similarity check (can be replaced with more sophisticated logic)
        return comment1.includes(comment2) || comment2.includes(comment1);
    }

    // Receive raw object structured: object > eNum > outageData> (key: value)
    processPowerBiDump(object) {
        // Feed it an object with eventNumbers as keys and rawData in them;

        let assignmentStatusTemp = {
            major: false,
            hybrid: false,
            minor: true,
            condition: [],
            assignment: {
                reported: false,
                assigned: false,
                assignedActions: {} //Add automatic follow-up actions (fdr history)
            },
            completed: false,
        };

        let validationStatusTemp = {
            validated: false,
            newData: {},
            requestedValidations: {}
        };

        let catDeliverablesTemp = {
            ameSynopsis: {},
            outageInfo: {},
            feederInfo: {},
            ongoingWork: {},
            patrol: {},
            nextSteps: {}
        };

        for (let key in object) {
            object[key].assignmentStatus = JSON.parse(JSON.stringify(assignmentStatusTemp));
            object[key].validationStatus = JSON.parse(JSON.stringify(validationStatusTemp));
            object[key].catDeliverables = JSON.parse(JSON.stringify(catDeliverablesTemp));
        }

        // Spits out standardized object > eNum > (outageData, assStatus, validation, completion, version)
        return object;
    };

    findMajorOutages(object) {
        
        for(let eNum in object) {

            let item = object[eNum].outageData;
            let outageCause = item['PHI Cause'];
            let ci = item['CI'];
            let duration = item['Duration'];
            let cmi = item['CMI'];
            let operatedDevice = item['Op. Device ID'];

            //High CI
            if(ci>=500) {
                let condition = `CI: ${ci}`;
                object[eNum].assignmentStatus.condition.push(condition);

                if(!object[eNum].assignmentStatus.major) {
                    object[eNum].assignmentStatus.major = true;
                    object[eNum].assignmentStatus.minor = false;
                }
            }

            //Breaker
            if(operatedDevice && operatedDevice.substring(0, 4) === 'BRKR') {
                let condition = `Breaker Outage`;
                object[eNum].assignmentStatus.condition.push(condition);

                if(!object[eNum].assignmentStatus.major) {
                    object[eNum].assignmentStatus.major = true;
                    object[eNum].assignmentStatus.minor = false;
                }
            }

            //6000 CMI for Major Hybrid
            if(cmi >= 6000) {
                let condition = `CMI > 6000`;
                object[eNum].assignmentStatus.condition.push(condition);

                if(!object[eNum].assignmentStatus.major) {
                    object[eNum].assignmentStatus.major = true;
                    object[eNum].assignmentStatus.minor = false;
                }
            }

            //Hybrid - 4500CMI
            if(cmi >= 4500) {
                let condition = `CMI > 4500`;
                object[eNum].assignmentStatus.condition.push(condition);

                if(!object[eNum].assignmentStatus.major) {
                    object[eNum].assignmentStatus.hybrid = true;
                    object[eNum].assignmentStatus.minor = false;
                }
            }

            //Hybrid - Long Duration
            if(duration >= 500) {
                let condition = `Duration ${duration}`;
                object[eNum].assignmentStatus.condition.push(condition);

                if(!object[eNum].assignmentStatus.major) {
                    object[eNum].assignmentStatus.hybrid = true;
                    object[eNum].assignmentStatus.minor = false;
                }
            } 

            //Hybrid - Long Duration
            if(outageCause == 'Unknown') {
                let condition = `Unknown`;
                object[eNum].assignmentStatus.condition.push(condition);

                if(!object[eNum].assignmentStatus.major) {
                    object[eNum].assignmentStatus.hybrid = true;
                    object[eNum].assignmentStatus.minor = false;
                }
            } 


            // Major - MDO (how to get?)
        }

        return object;
    }

    // Method to receive Azure object and decide in which working objects to send the key
    populateWorkingDirectories(master) {
        for (let key in master) {
            let event = master[key];
            let assignmentStatus = event.assignmentStatus.assignment;
            let reportedStatus = assignmentStatus.reported;
            let assignedStatus = assignmentStatus.assigned;
            let completeStatus = event.assignmentStatus.completed;
            let validatedStatus = event.validationStatus.validated;

            // Check if reported
            if (!reportedStatus && !assignedStatus) {
                if (!this.newData[key]) {
                    this.newData[key] = event;
                }
            } else if (!assignedStatus) {
                if (!this.awaitingAssn[key]) {
                    this.awaitingAssn[key] = event;
                }
            } else if (reportedStatus && assignedStatus && !completeStatus) {
                if (!this.takingAction[key]) {
                    this.takingAction[key] = {
                        outageData: event.outageData,
                        assignmentStatus: event.assignmentStatus,
                        catDeliverables: event.catDeliverables
                    };
                }
            }

            // Check if not validated
            if (!validatedStatus) {
                if (!this.validating[key]) {
                    this.validating[key] = {
                        outageData: event.outageData,
                        validationStatus: event.validationStatus,
                        newData: {}
                    };
                }
            }

            // Check if awaiting closure
            if ((!validatedStatus && completeStatus) || (validatedStatus && !completeStatus)) {
                if (!this.awaitingClose[key]) {
                    this.awaitingClose[key] = event;
                }
            } else if (validatedStatus && completeStatus) {
                if (!this.awaitingArchive[key]) {
                    this.awaitingArchive[key] = event;
                }
            }
        }

        console.log(this)
    }



    // Define "mover" functions to move data between working directories
    // Functions will be used as callbacks for buttons generated in visualizer.js

    moverFunction(eNum, startDirectory, endDirectory) {
        if (this[startDirectory][eNum]) {

            this[endDirectory][eNum] = this[startDirectory][eNum];
            delete this[startDirectory][eNum];
        }
    }
    // Idea is: start of each mover function, check conflicts btwn working dir/master; master/azure
    // if no conflicts, move in working dirs; update master(temp) > compare temp master w/ Azure (for other changes) > if no conflicts (other than changes made by usrer) > write to azure and perm master.
    // Method to try and write changed data to Azure
    async writeChangesToAzure(azureInstance, data) {
        let success = await azureInstance.writeData(data);
        if (success) {
            console.log("Data successfully written to Azure Cosmos DB.");
        } else {
            console.log("Failed to write data to Azure Cosmos DB.");
        }
    }

    // Method to compare new data with stored data and merge non-duplicate data
    mergeData(newData, storedData) {
        for (let key in newData) {
            if (!storedData[key]) {
                this.master[key] = newData[key];
            } else {
                console.log(`Duplicate event found: ${key}`);
                // Implement logic to handle duplicates if needed
            }
        }
        console.log("Merged data:", this.master);
    }
}
