let font;

function preload() {
    font = loadFont('./Fonts/Roboto-Medium.ttf');

}

// Mouse Input (custom)
// isPressed and isRealised cant be extracted 
// muliple times, just one per click

let mouse = {
    isPressed: null,
    isRelised: null,
    isRelisedForExtruction: false,
    isPressedForExtruction: false,
    mouseXdelta: 0,
    mouseYdelta: 0,
    prevMouseX: null,
    prevMouseY: null,
    GetPressed: function() {
        if(this.isPressedForExtruction) {
            this.isPressedForExtruction = false;
            return true;
        } else return false;
    },
    GetRelised: function() {
        if(this.isRelisedForExtruction) {
            this.isRelisedForExtruction = false;
            return true;
        } else return false;
    },
    DefineMouseState: function() {
        this.prevMouseX = mouseX;
        this.prevMouseY = mouseY;
    },
    UpdateMouseState: function() {
        this.isPressed = this.GetPressed();
        this.isRelised = this.GetRelised();

        this.mouseXdelta = mouseX - this.prevMouseX;
        this.mouseYdelta = mouseY - this.prevMouseY;

        this.prevMouseX = mouseX;
        this.prevMouseY = mouseY;
    }
}

function mousePressed() {
    mouse.isPressedForExtruction = true;
}

function mouseReleased() {
    mouse.isRelisedForExtruction = true;
}

// Enums
const tools = {
    PAINT: "PAINT",
    TEXT: "TEXT",
    NOTE: "NOTE",
    DELETE: "DELETE"
}
const interType = {
    MOVE: "MOVE",
    DELETE: "DELETE",
    PAINT: "PAINT",
    TEXTING: "TEXTING",
    NOTING: "NOTING",
    ZOOMING: "ZOOMING",
    EDITING: "EDITING"
}

let buttons = {
    draw: null,
    text: null,
    note: null,
    delete: null
}

let br;

function setup() {
    frameRate(30);
    
    let canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('canvasContainer');
    canvas.class('h-100 bg-white rounded-top');
    canvas.style("width: 100% !important");
    br = +canvas.elt.style.width.slice(0, -2);

//              Default tool - PAINTING
    crrTool = tools.PAINT;

//              InputBox for typing
    textInput = createInput();
    textInput.parent('textInputContainer');
    textInput.class('form-control');
    textInput.hide();

//                Mouse setup
    mouse.DefineMouseState();

//                Setting font
    textFont(font);

//                  Buttons
    buttons.draw = select('#drawButton');
    buttons.draw.mouseClicked(() => {crrTool = tools.PAINT});
    buttons.text = select('#textButton');
    buttons.text.mouseClicked(() => {crrTool = tools.TEXT});
    buttons.note = select('#noteButton');
    buttons.note.mouseClicked(() => {crrTool = tools.NOTE});
    buttons.delete = select('#deleteButton');
    buttons.delete.mouseClicked(() => {crrTool = tools.DELETE});
}

// VARIABLES
let crrInteract = {
    object: null,
    type: null,
    startInteraction: function(
        object,
        interactionType) {
        this.object = object;
        this.type = interactionType;
    },
    endInteraction: function() {
        this.object.isInterDone = false;
        
        if(
            this.type === interType.MOVE ||
            this.type === interType.EDITING ||
            this.type === interType.ZOOMING) {
            $.ajax({
                url: "Home/Update" + this.object.ActionType,
                type: "POST",
                data: this.object.Prepare(),
                success(result) {
                }
            });
        }

        if(
            this.type == interType.PAINT ||
            this.type == interType.TEXTING ||
            this.type == interType.NOTING)
        {
             $.ajax({
                url: 'Home/Create' + this.object.ActionType,
                data: this.object.Prepare(),
                type: 'POST',
                success: function (result) {
                }
            });
        }
        
        
        this.object = null;
        this.type = null;
    },
    IsIteracting: function() { return (
        this.object != null &&
        this.type != null
    );
}
}
let crrTool;

// Instances

let curves = [];
let texts = [];
let notes = [];

// Main function

function draw() {
    //Receive data from server
    GetObjects();
    /*console.log(crrInteract.type);*/
    background(255);
    mouse.UpdateMouseState();

    DrawObjects();

    // Disabling inteactivity if mouse over canvas
    if(mouseX < 0 || mouseX > br ||
        mouseY < 0) return;

    // If we interacting => provide interact
    // Else we provide interact conditions
    if(crrInteract.IsIteracting()) {
        //Check for interaction ends
        if(crrInteract.object.isInterDone) {
            crrInteract.endInteraction();
            textInput.hide();
        }

        //Provide interaction
        switch(crrInteract.type) {

            case (interType.ZOOMING):
                crrInteract.object.Zoom(
                    mouse.mouseXdelta,
                    mouse.mouseYdelta,
                    mouse.isRelised
                );
                break; // ends when mlb is relised
            case (interType.EDITING):
                crrInteract.object.Edit(
                    textInput
                );
                break;
            case (interType.MOVE):
                crrInteract.object.Move(
                    mouse.mouseXdelta,
                    mouse.mouseYdelta,
                    mouse.isRelised);// ends when mlb is relised
                break;
            case (interType.PAINT):
                crrInteract.object.ContinuePath(new Point(
                    mouseX, mouseY
                ), mouse.isRelised); // ends when mlb is relised
                break;
            case (interType.TEXTING):
                crrInteract.object.InputText(
                    textInput); //Ends when, enter button hits
                break;
            case (interType.NOTING):
                crrInteract.object.InputText(
                    textInput); //Ends when, enter button hits
                break;
        }
    } else { // Interaction inits
        //Try DELETE,
        if (TryDelete()) return;
        //Try ZOOM,
        if (TryZoom()) return;
        //Try EDIT,
        if (TryEdit()) return;
        //Try MOVE,
        if (TryMove()) return;
        //Try NOTE, or DRAW, or TYPE
        if (TryBasicThings()) return;
    }
}

function DrawObjects() {
    curves.forEach(elem => elem.Display());
    texts.forEach(elem => elem.Display());
    notes.forEach(elem => elem.Display());
    if(crrInteract.IsIteracting()) crrInteract.object.Display();
}

function TryDelete() {
    if(crrTool == tools.DELETE &&
        mouse.isRelised) {

        let obj = IsHoveringAnyObject();
        if(obj != null) {
            $.ajax({
                url: "Home/Delete" + obj.ActionType,
                type: "POST",
                data: obj.Prepare(),
                success(result) {
                }
            })

            return true;
        }
    }
    return false;
}

function TryZoom() {
    if(crrTool != tools.DELETE &&
        mouse.isPressed) {
        for(let elem of notes) {
            if(elem.IsHoveringZoom()) {
                crrInteract.startInteraction(elem, interType.ZOOMING);
                return true;
            }
        }
    }
    return false;
}

function TryEdit() {

    if(crrTool == tools.TEXT &&
        mouse.isPressed) {
        for(let arr of [texts, notes]) {
            for(let elem of arr) {
                if(elem.IsHovering()) {
                    textInput.show();
                    textInput.value(elem.textString);
                    crrInteract.startInteraction(elem, interType.EDITING);
                    return true;
                }
            }
        }
    }
    return false;
}

function TryMove() {
    if(crrTool != tools.DELETE &&
        mouse.isPressed) {
        for(let arr of [curves, texts, notes]) {
            for(let elem of arr) {
                console.log(elem);
                if(elem.IsHovering()) {
                    
                    crrInteract.startInteraction(elem, interType.MOVE);
                    return true;
                }
            }
        }
        return false;
    }
}

function TryBasicThings() {
    if(mouse.isPressed) {
        if (crrTool == tools.PAINT) InitializeInstance(
            new Curve(new Point(mouseX, mouseY)),
            interType.PAINT
        );
        else if (crrTool == tools.TEXT) {
            textInput.show();
            InitializeInstance(
                new TextObj(new Point(mouseX, mouseY)),
                interType.TEXTING
            );
        }
        else if (crrTool == tools.NOTE) {
            textInput.show();
            InitializeInstance(
                new Notes(new Point(mouseX, mouseY)),
                interType.NOTING
            );
        }
    }
}

function InitializeInstance(elem, _interType) {
    crrInteract.startInteraction(elem, _interType);
}

function IsHoveringAnyObject() {
    for(let arr of [curves, texts, notes]) {
        let isBreak = false;
        for(let elem of arr) {
            if(elem.IsHovering()) return elem;
        }
    }

    return null;
}

function GetObjects() {
    $.ajax({
        url: 'Home/GetTexts',
        type: 'GET',
        success: function (_texts) {
            texts = [];
            for(let rawObject of _texts)
                texts.push(TextObj.prototype.Convert(rawObject));
        }
    });
    $.ajax({
        url: 'Home/GetCurves',
        type: 'GET',
        success: function (_curves) {
            curves = [];
            for(let rawObject of _curves)
                curves.push(Curve.prototype.Convert(rawObject));
        }
    });
    $.ajax({
        url: 'Home/GetNotes',
        type: 'GET',
        success: function (_notes) {
            notes = [];
            for(let rawObject of _notes)
                notes.push(Notes.prototype.Convert(rawObject));
        }
    });
}