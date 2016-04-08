
  var renderer = new PIXI.WebGLRenderer(window.innerWidth,window.innerHeight, {backgroundColor: 0xFFFFFF});
  var stage = new PIXI.Container();
  document.body.appendChild(renderer.view);

  var timeline = new Timeline(new Date("October 13, 2014 00:00:00"), new Date("November 13, 2014 00:00:00"), 100)
  timeline.addEvent("Colin Is Cool!!", "colinwillson.com", "October 18, 2014 11:13:00");

  timeline.addEvent("Robots!!", "colinwillson.com", "October 19, 2014 14:13:00");
  animate();

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);

  }

  function Timeline(startDate, endDate, pixelsPerDay){
    this.timelineContainer = new PIXI.Container();
    stage.addChild(this.timelineContainer);
    this.date = new Date();
    this.events = [],
    this.startDate = startDate;
    this.endDate = endDate;
    this.today = startDate;
    this.pixelsPerDay = pixelsPerDay
    this.secondsPerPix= 86400/pixelsPerDay;
    this.timeOffset = 0;
    console.log("Creating Timeline!");


    // Line
    this.graphics = new PIXI.Graphics();

    this.graphics.lineStyle(1, 0x000000);
    this.graphics.moveTo(0,window.innerHeight/2);
    this.graphics.lineTo(window.innerWidth, window.innerHeight/2);

    this.addEvent = function(title, url, date) {
      this.events.push(new this.Event(this, title, url, date));
      console.log("adding");
    }

    for(var i = 0; i < window.innerWidth/pixelsPerDay; i++) {
      this.graphics.moveTo(i*pixelsPerDay,window.innerHeight/2);
      this.graphics.lineTo(i*pixelsPerDay,window.innerHeight/2 - 20);
    }

    console.log("events");
    console.log(this.events);

    for(i in this.events) {
      this.events[i].display();
      console.log("for");
    }

    this.timelineContainer.addChild(this.graphics);

    // Event prototype
    this.Event = function(parent, title, url, date) {
      this.title = new PIXI.Text(title);
      this.url = url;
      this.date = new Date(date);
      // Calculate X position based on dates
      console.log(this.date.getTime());
      this.x = ((this.date - parent.startDate.getTime())/86400000) * pixelsPerDay;
      console.log("x: " + this.x);

      this.graphics = new PIXI.Graphics();
      this.graphics.lineStyle(1, 0x000000);
      this.graphics.moveTo(this.x,window.innerHeight/2);
      this.graphics.lineTo(this.x, window.innerHeight/2-100);

      parent.timelineContainer.addChild(this.graphics);
      this.title.x = this.x;
      this.title.y = window.innerHeight/2 - 100;

      parent.timelineContainer.addChild(this.title);
    }


  }
