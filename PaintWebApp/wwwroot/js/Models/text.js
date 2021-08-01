class TextObj {
    constructor(point) {
      this.position = point;
      this.bounds;
      this.offsets = new Point(0,0);
      
      this.textString = "";
      this.isDrawed = false;
      this.isFocused = false;

      this.onHoverUpMove = 20;
      this.textSize = 40;
      
      //Consts
        this.id = undefined;
        this.ActionType = "Text";
    }
    
    Display() {
      strokeWeight(0);
      
      let textColor = color(0);
      if (this.isFocused) {
        textColor = color(100);
        textColor.setAlpha(150);
      }
      fill(textColor);
      
      textSize(this.textSize);
      textAlign(LEFT);
      text(
          this.textString, this.position.x + this.offsets.x, 
          this.position.y + this.offsets.y);
    
      if(this.IsHovering()) this.DisplayOutline();
    }
    
    DisplayOutline() {
        let textColor = color(0);
        if (!this.isFocused) {
          textColor = color(100);
          textColor.setAlpha(150);
        }

        strokeWeight(0);
        fill(textColor);
  
        textFont(font);
        textSize(this.textSize);
        textAlign(LEFT);

        text(
          this.textString, this.position.x + this.offsets.x, 
          this.position.y + this.offsets.y - this.onHoverUpMove);
      }
    
    IsHovering() {
      if(this.isDrawed &&
         mouseX >= this.bounds.x + this.offsets.x && mouseX <= this.bounds.x + this.offsets.x + this.bounds.w &&
         mouseY >= this.bounds.y + this.offsets.y && mouseY <= this.bounds.y + this.offsets.y + this.bounds.h) {
        return true;
      }
      
      return false;
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
            Bounds: JSON.stringify(this.bounds),
            TextString: this.textString,
            IsDrawed: this.isDrawed
        }
        return obj;
    }
    
    Convert(rawObject) {
        let text = new TextObj(new Point(
            JSON.parse(rawObject.position).x,
            JSON.parse(rawObject.position).y));
        text.offsets = new Point(
            JSON.parse(rawObject.offsets).x,
            JSON.parse(rawObject.offsets).y
        );
        text.bounds = {
            x: JSON.parse(rawObject.bounds).x,
            y: JSON.parse(rawObject.bounds).y,
            w: JSON.parse(rawObject.bounds).w,
            h: JSON.parse(rawObject.bounds).h
        }
        text.isDrawed = rawObject.isDrawed;
        text.textString = rawObject.textString;
        text.id = rawObject.id;
        
        return text;
    }
  }