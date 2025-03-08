// visualize well before you start writing - this will b tricky to get right first shot


// how I structure this class? 
    // let visualizer = document.qu
    // Class - everytime it's called 
    // Methods - probably will need to be pretty specific for each type of data
        // Clear visualizer.innerHTML
        // Create visualizer grid (find a way to create and structure the grid)
        // Structure page based on selected display - 9 total methods at least (or duplicate structures?)
        

        // POSSIBLE - Allow resize (or select between two view-modes to switch layouts)



// export class eventCard {
//     // I think that for eventCard, I should just set it up to be fed an eNum key (with subKeys: assignmentStatus, validationStatus,...etc)
    
//     constructor() { 
        
//         let listContainer = this.createVertList(70);
//         parent.appendChild(listContainer);
        
//         for (let key in object) {
//             const eventCard = document.createElement('div');
//             eventCard.classList.add('event-card');

//             // Define the keys you want to extract
//             const keysToExtract = {
//                 eventId: 'Event ID',
//                 substation: 'Substation',
//                 circuit: 'Circuit',
//                 subCause: 'SubCause',
//                 outageTime: 'Outage Time',
//                 enRouteTime: 'En Route Time',
//                 restoreTime: 'Restore Time',
//                 duration: 'Duration',
//                 ci: 'Customers Out',
//                 minutesOut: 'Minutes Out',
//                 caidi: 'caidi',
//                 eventCaidiEffect: 'Event CAIDI Effect',
//                 cause: 'Cause',
//                 failedEquipment: 'Failed Equipment',
//                 deviceCoordinate: 'Device Coordinate',
//                 phase: 'Phase',
//                 weather: 'Weather',
//                 faultLocation1: 'Fault Location 1',
//                 comments: 'Comments',
//                 mdo: 'Device Op Rolling 12 Month',
//                 currentPriorityFeeder: 'Current Priority Feeder',
//                 crews: 'Crews'
//             };

//             // Extract the values using the defined keys
//             const eventData = {};
//             for (let [varName, keyName] of Object.entries(keysToExtract)) {
//                 eventData[varName] = object[key].outageData[keyName] || '';
//             }

            
//             listContainer.appendChild(eventCard);

//             let eventNum = eventData.eventId;
//             let sub = eventData.substation;
//             let ckt = eventData.circuit;
//             console.log('testing: ', sub, eventNum, ckt)
//             let titleBlock = this.eventCardTitleBlock(eventCard, eventNum, sub, ckt);

//             this.addEventTags(object[key].assignmentStatus.condition, titleBlock);
//             this.eventCardOutageInfo(eventData, eventCard);
//             this.generateActionSection(object[key].assignmentStatus, eventCard);
//         }

//     }

//     createEvent






//     createVertList(height) {
//         let div = document.createElement('div');
//         div.classList.add('vertical-list');
//         div.style.height = `${height}%`;
//         return div;
//     }

//     eventCardTitleBlock(eventCard, eventNumber, sub, ckt) {
        
//         let titleBlock = document.createElement('div');
//         titleBlock.classList.add('title-block');
//         eventCard.appendChild(titleBlock);

//         let div1 = document.createElement('h1');
//         let div2 = document.createElement('h2');
//         let div3 = document.createElement('h2');

//         div1.classList.add('title', 'primary');
//         div2.classList.add('title');
//         div3.classList.add('title');
        
//         div1.textContent = eventNumber;
//         div2.textContent = sub;
//         div3.textContent = ckt;
        
//         titleBlock.appendChild(div1);
//         titleBlock.appendChild(div2);
//         titleBlock.appendChild(div3);

//         return titleBlock;
//     }

//     addEventTags(conditionsArray, parent) {
//         let tagsContainer = document.createElement('div');
//         parent.appendChild(tagsContainer);
//         tagsContainer.classList.add('tags-container');

//         for (let i=0; i < conditionsArray.length; i++) {
//             let tag = document.createElement('div');
//             tag.classList.add('condition-tag')
//             tag.textContent = conditionsArray[i];
//             tagsContainer.appendChild(tag);

//             if (conditionsArray[0] != 'Not Major') {
//                 tag.classList.add('major')
//             }
//         }
//     }

//     eventCardOutageInfo(eventData, parent) {
//         let outageInfoContainer = document.createElement('div');
//         outageInfoContainer.classList.add('event-card-container', 'outage-info-container');
        
//         let outageInfoTitle = document.createElement('div');
//         outageInfoTitle.textContent = 'OUTAGE INFO';
//         outageInfoTitle.classList.add('outage-info-title');
//         outageInfoContainer.appendChild(outageInfoTitle)

//         let ciDataCont = document.createElement('div');
//         let durationDataCont = document.createElement('div');
//         let mdoDataCont = document.createElement('div');
//         let causeDataCont = document.createElement('div');
//         let coordinatedDataCont = document.createElement('div');
//         let faultLocationDataCont = document.createElement('div');
//         let commentsDataCont = document.createElement('div');
//         let phaseDataCont = document.createElement('div');
//         let addressDataCont = document.createElement('div');

//         let ciIcon = document.createElement('img');
//         ciIcon.src = './icons/ci.png';
//         ciIcon.classList.add('event-card-icon');
//         let ciText = document.createElement('div');
//         ciText.textContent = eventData.ci;
//         ciDataCont.appendChild(ciIcon);
//         ciDataCont.appendChild(ciText);

//         let durationIcon = document.createElement('img');
//         durationIcon.src = './icons/duration.png';
//         durationIcon.classList.add('event-card-icon');
//         let durationText = document.createElement('div');
//         durationText.textContent = eventData.duration;
//         durationDataCont.appendChild(durationIcon);
//         durationDataCont.appendChild(durationText);

//         let mdoIcon = document.createElement('img');
//         mdoIcon.src = './icons/mdo.png';
//         mdoIcon.classList.add('event-card-icon');
//         let mdoText = document.createElement('div');
//         mdoText.textContent = eventData.mdo;
//         mdoDataCont.appendChild(mdoIcon);
//         mdoDataCont.appendChild(mdoText);

//         let causeIcon = document.createElement('img');
//         causeIcon.src = './icons/cause.png';
//         causeIcon.classList.add('event-card-icon');
//         let causeText = document.createElement('div');
//         causeText.textContent = eventData.cause;
//         causeDataCont.appendChild(causeIcon);
//         causeDataCont.appendChild(causeText);

//         let coordinatedIcon = document.createElement('img');
//         coordinatedIcon.src = './icons/coordinated-device.png';
//         coordinatedIcon.classList.add('event-card-icon');
//         let coordinatedText = document.createElement('div');
//         coordinatedText.textContent = eventData.deviceCoordinate;
//         coordinatedDataCont.appendChild(coordinatedIcon);
//         coordinatedDataCont.appendChild(coordinatedText);

//         let faultLocationIcon = document.createElement('img');
//         faultLocationIcon.src = './icons/fault-device.png';
//         faultLocationIcon.classList.add('event-card-icon');
//         let faultLocationText = document.createElement('div');
//         faultLocationText.textContent = eventData.failedEquipment;
//         faultLocationDataCont.appendChild(faultLocationIcon);
//         faultLocationDataCont.appendChild(faultLocationText);

//         let commentsIcon = document.createElement('img');
//         commentsIcon.src = './icons/comments.png';
//         commentsIcon.classList.add('event-card-icon');
//         let commentsText = document.createElement('div');
//         commentsText.textContent = eventData.comments;
//         commentsDataCont.appendChild(commentsIcon);
//         commentsDataCont.appendChild(commentsText);

//         let phaseIcon = document.createElement('img');
//         phaseIcon.src = './icons/phase.png';
//         phaseIcon.classList.add('event-card-icon');
//         let phaseText = document.createElement('div');
//         phaseText.textContent = eventData.phase;
//         phaseDataCont.appendChild(phaseIcon);
//         phaseDataCont.appendChild(phaseText);

//         let addressIcon = document.createElement('img');
//         addressIcon.src = './icons/address.png';
//         addressIcon.classList.add('event-card-icon');
//         let addressText = document.createTextNode('123 Main St, Washington, DC');
//         addressDataCont.appendChild(addressIcon);
//         addressDataCont.appendChild(addressText);

//         outageInfoContainer.appendChild(ciDataCont);
//         outageInfoContainer.appendChild(durationDataCont);
//         outageInfoContainer.appendChild(mdoDataCont);
//         outageInfoContainer.appendChild(causeDataCont);
//         outageInfoContainer.appendChild(coordinatedDataCont);
//         outageInfoContainer.appendChild(faultLocationDataCont);
//         outageInfoContainer.appendChild(commentsDataCont);
//         outageInfoContainer.appendChild(phaseDataCont);
//         outageInfoContainer.appendChild(addressDataCont);

//         parent.appendChild(outageInfoContainer)
//     }

//     generateActionSection(assignmentObject, parent) {

//         let actionContainer = document.createElement('div');
//         actionContainer.classList.add('event-card-container', 'actions-container');
//         parent.appendChild(actionContainer);

//         //Check if assigned here and use this to generate on all screens
//         //Use the main.js to check for assignment status and where to display which event-cards?
        
//         if (!assignmentObject.assigned) {
//             let assignmentContainer = document.createElement('div');
//             assignmentContainer.classList.add('ame-assignment-container');
//             actionContainer.appendChild(assignmentContainer);

//             // let assignmentTitle = document.createElement('div');
//             // assignmentTitle.textContent = 'Corrective Actions';
//             // assignmentContainer.appendChild(assignmentTitle);

//             let generateActionContainer = document.createElement('div');
//             generateActionContainer.classList.add('add-actions-container');
//             assignmentContainer.appendChild(generateActionContainer);

//             let generateActionInput = document.createElement('input');
//             generateActionInput.placeholder = 'add action'
//             generateActionInput.classList.add('action-input');
//             generateActionContainer.appendChild(generateActionInput);

//             let addButton = document.createElement('button');
//             addButton.textContent = 'Add';
//             generateActionContainer.appendChild(addButton);

//             let assignedActionContainer = document.createElement('div');
//             assignedActionContainer.classList.add('assigned-container');
//             assignmentContainer.appendChild(assignedActionContainer);

//             let assignedTitle = document.createElement('div');
//             assignedTitle.textContent = 'ASSIGNED:';
//             assignedActionContainer.appendChild(assignedTitle);

//             function addAction() {
//                 let inputValue = generateActionInput.value.trim();
//                 if (inputValue) {
//                     let actionDiv = document.createElement('div');
//                     actionDiv.textContent = inputValue;
//                     assignedActionContainer.appendChild(actionDiv);
//                     generateActionInput.value = '';
//                 } else {
//                     console.log('Input is empty');
//                 }
//             }

//             generateActionInput.addEventListener('keydown', (event) => {
//                 if (event.key === 'Enter') {
//                     addAction();
//                 }
//             });

//             addButton.addEventListener('click', addAction);

//         }
//     }

// }




export class visualizeTool {
    constructor(display) {
        this.display = document.getElementById(display);
    }

    clearVisualizer() {
        this.display.innerHTML = '';
    }

    displayByView(selectedNav, data1, data2) {

        const selectedView = `${selectedNav}-view`;

        this.display.className = '';
        this.display.classList.add('visualizer');
        this.display.classList.add(selectedView);
        
        switch (selectedNav) {
            case 'home':
                this.populateHomeView(data1);
                break;
            case 'ame':
                this.populateAMEView(data2);
                break;
            case 'ima':
                this.populateIMAView();
                break;
            case 'help':
                this.populateHelpView();
                break;
            default:
                console.error(`Unknown view: ${selectedView}`);
        }
    }

    populateHomeView(newData) {

        // Home Dash - Intro Box
        const introBox = this.createGridObject(6);
        let mainTitleTxt = 'The Home of Pepco Reliability';
        
        let introMainTitle = this.mainTitle(mainTitleTxt);
        
        let introParagraphTxt1 = 'Welcome to the AME and IMA Home of Pepco Reliability.'
        let introParagraphTxt2 = 'We are the inquisitive eye that sees beyond the outage. Our mission is to preserve and correct data, ensuring accuracy and reliability.'
        let introParagraphTxt3 = 'Following through with outage investigations, corrective actions, and stakeholder engagement.'

        let introParagraph1 = this.createParagraph(introParagraphTxt1);
        let introParagraph2 = this.createParagraph(introParagraphTxt2);
        let introParagraph3 = this.createParagraph(introParagraphTxt3);
        
        introBox.appendChild(introMainTitle);
        introBox.appendChild(introParagraph1);
        introBox.appendChild(introParagraph2);
        introBox.appendChild(introParagraph3);

    
    }

    populateAMEView(object) {
        // AME Dash - Intro Box
        const introBox = this.createGridObject(6);
        let mainTitleTxt = 'AME Home';
        
        let introMainTitle = this.mainTitle(mainTitleTxt);
        
        let introParagraphTxt1 = 'Welcome! Use the filters below to review outage data.'

        let introParagraph1 = this.createParagraph(introParagraphTxt1);
        
        introBox.appendChild(introMainTitle);
        introBox.appendChild(introParagraph1);

        // Now, add a verticalList w/ some eventCards generated in it

        let dataDisplayer = this.vertList('AME-dataview');
        introBox.appendChild(dataDisplayer);

        for (let key in object) {
            let thing = object[key];
            let eventCard = this.eventCard(thing);
            dataDisplayer.appendChild(eventCard);
        }

    }



    // Builders

    createGridObject(width, height, startColumn = null, startRow = null) {
        const gridObject = document.createElement('div');
        gridObject.classList.add('grid-object');

        gridObject.style.gridColumnEnd = `span ${width}`;
        gridObject.style.gridRowEnd = `span ${height}`;

        if (startColumn !== null) {
            gridObject.style.gridColumnStart = startColumn;
        }
        if (startRow !== null) {
            gridObject.style.gridRowStart = startRow;
        }
        this.display.appendChild(gridObject);
        return gridObject;
    }

    vertCont(width) {
        let container = document.createElement('div');
        container.classList.add('vert-container');

        if(width) {
            container.style.maxWidth = `${width}%`;
        }
        if (classes.length > 0) {
            container.classList.add(...classes);
        }
    
        return container;
    }

    hztCont(width, ...classes) {
        let container = document.createElement('div');
        container.classList.add('hzt-container');
    
        if (width) {
            container.style.maxWidth = `${width}%`;
        }
    
        if (classes.length > 0) {
            container.classList.add(...classes);
        }
    
        return container;
    }

    vertList(...classes) {
        const listContainer = document.createElement('div');
        listContainer.classList.add('vertical-list');

        if (classes.length > 0) {
            listContainer.classList.add(...classes);
        }
    

        return listContainer;
    }

    mainTitle(string, ...classes) {
        return this.createElementWithText('h1', string, 'main-title', ...classes);
    }

    createSecTitle(string, ...classes) {
        return this.createElementWithText('h2', string, 'secondary-title', ...classes);
    }

    createParagraph(string, ...classes) {
        return this.createElementWithText('p', string, 'paragraph', ...classes)
    }

    createElementWithText(tag, text, ...classes) {
        const element = document.createElement(tag);
        element.textContent = text;
        element.classList.add(...classes);
        return element;
    }


    actionButton(text, callbackFunction) {
        const button = document.createElement('button');
        button.classList.add('action-button', `${text}-button`);
        button.innerHTML = `${text}`;

        button.addEventListener('click', callbackFunction);

        return button;
    }

    eventCard(eNum) {
        let eventCard = this.hztCont(100, 'event-card');

        return eventCard;
        
    }

    altEventCard(object) {

    }


    fileUploadButton(inputId, callbackFunction) {
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('file-upload-container');
        
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.id = inputId;
        fileInput.style.display = 'none';
        
        const uploadButton = document.createElement('button');
        uploadButton.classList.add('file-upload-button');
        uploadButton.innerHTML = 'Upload File';
        
        uploadButton.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', callbackFunction);

        inputContainer.appendChild(fileInput);
        inputContainer.appendChild(uploadButton);

        return inputContainer;
    }

}


