class Notes {
  constructor(point) {
    this.position = point;
    this.sizes = new Point(200, 200);
    this.offsets = new Point(0,0);

    this.isDrawed = false;
    this.isZooming = false;
    this.isFocused = false;

    this.textString = "";
    this.textSize = 20;
    this.textPadding = 20;
    
    this.id;
    this.ActionType = "Note";
  }

  Display() {
    strokeWeight(0);
    
    let textColor = color(255, 153, 51);
    fill(textColor);
    
    rect( this.position.x + this.offsets.x, this.position.y + this.offsets.y,
          this.sizes.x, this.sizes.y);

    fill(0);

    textSize(this.textSize);
    text(this.PreaparedText(), 
      this.position.x + this.offsets.x + this.textPadding,
      this.position.y + this.offsets.y + this.textPadding,
      this.sizes.x - this.textPadding * 2,
      this.sizes.y - this.textPadding * 2);
    
    if(this.IsHovering() || this.IsHoveringZoom())
      circle(
          this.position.x + this.offsets.x + this.sizes.x,
          this.position.y + this.offsets.y + this.sizes.y,
          16);
  }

  IsHovering() {
    let isHovering = false;
    if( this.isDrawed &&
        mouseX >= this.position.x + this.offsets.x && 
        mouseX <= this.position.x + this.offsets.x + this.sizes.x &&
        mouseY >= this.position.y + this.offsets.y && 
        mouseY <= this.position.y + this.offsets.y + this.sizes.y) {
      isHovering = true;
    }
    return isHovering;
  }

  IsHoveringZoom() {
    if(this.isDrawed) {
      let dist = sqrt(
pow(mouseX - (this.position.x + this.sizes.x + this.offsets.x), 2) + 
pow(mouseY - (this.position.y + this.sizes.y + this.offsets.y), 2));
if(dist <= 8) return true;
    }
    
    return false;
  }

  Zoom(x1, y1, isRelised) {
    this.sizes.x += x1;
    this.sizes.y += y1;

    if(this.sizes.x < 200) this.sizes.x = 200;
    if(this.sizes.y < 200) this.sizes.y = 200;

    if(isRelised) {
      this.isInterDone = true;
    }
  }

  InputText(textBox) {
    textBox.elt.focus();
      this.textString = textBox.value();

      if(keyIsPressed && keyCode == 13) {
        this.isInterDone = true;
        this.isDrawed = true;
        this.bounds = font.textBounds(this.textString, this.position.x, this.position.y, this.textSize);

        textBox.value("");
        textBox.elt.blur();
      }
  }

  PreaparedText() {
    let width = textWidth(this.textString);
    let accessableWidth = width / (this.sizes.x - 
      this.textPadding * 2);
    if(accessableWidth <= 1) return this.textString;
    
    let lettersPerWidth = this.textString.length / accessableWidth;
    
    let str = "";
    for(let i = 0; i < this.textString.length; i++) {
      if(i % Math.floor(lettersPerWidth) == 0) str += "\n";

      str += this.textString[i];
    }
    
    return str;
  }

  Move(x1, y1, isRelised) {
    this.offsets.x += x1;
    this.offsets.y += y1;

    if(isRelised) {
      this.isInterDone = true;
    }
  }
  
  Edit(textBox) {
    textBox.elt.focus();
    
    this.textString = textBox.value();

    if(keyIsPressed && keyCode == 13) {
      this.isInterDone = true;
      this.bounds = font.textBounds(this.textString, this.position.x, this.position.y, this.textSize);

      textBox.value("");
      textBox.elt.blur();
    }
  }
  Prepare() {
    let obj = {
      Id: this.id,
      Position: JSON.stringify(this.position),
      Offsets: JSON.stringify(this.offsets),
      Sizes: JSON.stringify(this.sizes),
      IsDrawed: this.isDrawed,
      TextString: this.textString
    }
    return obj;
  }

  Convert(rawObject) {
    let note = new Notes(new Point(
        JSON.parse(rawObject.position).x,
        JSON.parse(rawObject.position).y));
    note.offsets = new Point(
        JSON.parse(rawObject.offsets).x,
        JSON.parse(rawObject.offsets).y
    );
    note.sizes = {
      x: JSON.parse(rawObject.sizes).x,
      y: JSON.parse(rawObject.sizes).y
    }
    note.isDrawed = rawObject.isDrawed;
    note.textString = rawObject.textString;
    note.id = rawObject.id;

    return note;
  }
}