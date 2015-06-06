var boxsyn = window.boxsyn || {};

// Variables
boxsyn.boxes = [];
boxsyn.insertBoxType = "";

// Functions
boxsyn.init = function() {
  boxsyn.insert = false;

  boxsyn.plumb.init();

  boxsyn.wireEvents();
};

boxsyn.wireEvents = function() {
  $("#mainbox").click(boxsyn.mainboxClick);
};

boxsyn.startInsert = function() {
  $("#mainbox").addClass("insert");
  boxsyn.insert = true;
};

boxsyn.stopInsert = function() {
  $("#mainbox").removeClass("insert");
  boxsyn.insert = false;
};

// Event Handlers
boxsyn.mainboxClick = function(event) {
  if (boxsyn.insert) {
    console.log(event);
    boxsyn.addBox(event.offsetX, event.offsetY);
  }
};

// Document Functions
boxsyn.addBox = function(x, y) {

  var id = "box" + boxsyn.boxes.length;   // Generate unique IDs
  var style = "left: " + x + "px; top: " + y + "px;";
  var box = $('<div class="box" id="' + id + '" style="' + style + '">BOX</div>');
  $("#mainbox").append(box);

  boxsyn.boxes.push(box);

  // Wire up connection points
  boxsyn.plumb.addEndpoints(id, ["RightMiddle"], ["LeftMiddle"]);
  boxsyn.plumb.enableDragging();

  boxsyn.stopInsert();
};
