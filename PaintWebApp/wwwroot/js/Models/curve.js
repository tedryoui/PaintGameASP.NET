class Curve {  
    constructor(point) {
      this.offsets = new Point(0, 0);
      
      this.path = [];
      this.path.push(point);
      
      this.isDrawed = false;
      this.isFocused = false;
      this.isInterDone = false;

      this.onHoverUpMove = 20;
      
      this.id;
      this.ActionType = "Curve";
    }
    
    Display() {
      
      let curveColor = color(0);
      if(this.isFocused) {
        curveColor = color(100);
        curveColor.setAlpha(150);
      }

      strokeWeight(3);
      stroke(curveColor);
      noFill();

      beginShape();
      for(let elem of this.path)
        curveVertex(
          elem.x + this.offsets.x, 
          elem.y + this.offsets.y
        );
      endShape();

      if(this.IsHovering()) this.DisplayOutline();
    }
    
    DisplayOutline() {
      
      let curveColor = color(0);
      if(!this.isFocused) {
        curveColor = color(100);
        curveColor.setAlpha(150);
      }
      
      strokeWeight(2);
      stroke(curveColor);
      noFill();

      beginShape();
      for(let elem of this.path) {
        curveVertex(
          elem.x + this.offsets.x, 
          elem.y + this.offsets.y - this.onHoverUpMove 
        );
      }
      endShape();
    }
    
    IsHovering() {
      if(this.isDrawed) {
        for(let elem of this.path) {
          let dist = sqrt(pow(mouseY - elem.y - this.offsets.y, 2) + pow(mouseX - elem.x - this.offsets.x, 2));
          if(dist <= 20) {
            return true;
          }
        }
      }
      
      return false;
    }

    ContinuePath(point, isRealised) {
      this.path.push(point);

      if(isRealised) {
        this.isDrawed = true;
        this.isInterDone = true;
      }
    }

    Move(x1, y1, isRelised) {
      this.offsets.x += x1;
      this.offsets.y += y1;

      if(isRelised) {
        this.isInterDone = true;
      }
    }

  Prepare() {
    let obj = {
      Id: this.id,
      Path: JSON.stringify(this.path),
      Offsets: JSON.stringify(this.offsets),
      IsDrawed: this.isDrawed
    }
    return obj;
  }

  Convert(rawObject) {
    let path = JSON.parse(rawObject.path);
    let curve = new Curve(new Point(
        path[0].x,
        path[0].y));
    
    for(let i = 1; i < path.length; i++)
      curve.path.push(
          new Point(
              path[i].x, path[i].y
          )
      );

    curve.offsets = new Point(
        JSON.parse(rawObject.offsets).x,
        JSON.parse(rawObject.offsets).y
    );
    curve.isDrawed = rawObject.isDrawed;
    curve.id = rawObject.id;

    return curve;
  }
  }
