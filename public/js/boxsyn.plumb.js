// Boxsyn jsPlumb functions
var boxsyn = window.boxsyn || {};
boxsyn.plumb = boxsyn.plumb || {};

// Variables
boxsyn.plumb.instance = {};

// Functions
boxsyn.plumb.init = function() {

  this.initConstants();

  this.instance = jsPlumb.getInstance({
    Container: "mainbox",
    ConnectionOverlays: [
      [ "PlainArrow", { location: 1, width: 8, length: 8 } ]
    ]
  });

  this.instance.registerConnectionType("basic", boxsyn.plumb.basicType);

  var that = this;
  this.instance.batch(function () {

    // Enable dragging
    that.enableDragging();

    // Event handlers
    that.instance.bind("click", function (conn, originalEvent) {
     // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
       //   instance.detach(conn);
      //conn.toggleType("basic");
    });

    that.instance.bind("connectionDrag", function (connection) {
        //console.log("connection " + connection.id
        //+ " is being dragged. suspendedElement is ",
        //connection.suspendedElement, " of type ",
        //connection.suspendedElementType);
    });

    that.instance.bind("connectionDragStop", function (connection) {
        //console.log("connection " + connection.id + " was dragged");
    });

    that.instance.bind("connectionMoved", function (params) {
        //console.log("connection " + params.connection.id + " was moved");
    });

  });
};

boxsyn.plumb.initConstants = function() {

  // Constants
  this.connectorPaintStyle = {
    lineWidth: 2,
    strokeStyle: "#98b7b4",
    joinstyle: "round",
    outlineColor: "white",
    outlineWidth: 2
  };

  // .. and this is the hover style.
  this.connectorHoverStyle = {
    lineWidth: 2,
    strokeStyle: "#000000",
    outlineWidth: 2,
    outlineColor: "white"
  };

  this.endpointHoverStyle = {
    fillStyle: "#FF0000",
    strokeStyle: "#000000"
  };

  // the definition of source endpoints (the small blue ones)
  this.sourceEndpoint = {
    endpoint: "Dot",
    paintStyle: {
        strokeStyle: "#666666",
        fillStyle: "transparent",
        radius: 4,
        lineWidth: 2
    },
    isSource: true,
    connector: [
      "Flowchart", {
        stub: [40, 60],
        gap: 10,
        cornerRadius: 5,
        alwaysRespectStubs: true }
      ],
    connectorStyle: this.connectorPaintStyle,
    hoverPaintStyle: this.endpointHoverStyle,
    connectorHoverStyle: this.connectorHoverStyle,
    dragOptions: {}
  };

  // the definition of target endpoints (will appear when the user drags a connection)
  this.targetEndpoint = {
    endpoint: "Dot",
    paintStyle: { fillStyle: "#666666", radius: 5 },
    hoverPaintStyle: boxsyn.plumb.endpointHoverStyle,
    maxConnections: -1,
    dropOptions: { hoverClass: "hover", activeClass: "active" },
    isTarget: true
  };

  this.basicType = {
    connector: "Bezier",
    paintStyle: { strokeStyle: "red", lineWidth: 2 },
    hoverPaintStyle: { strokeStyle: "blue" },
    overlays: []
  };
};

boxsyn.plumb.addEndpoints = function (toId, sourceAnchors, targetAnchors) {

    for (var i = 0; i < sourceAnchors.length; i++) {
        var sourceUUID = toId + sourceAnchors[i];
        boxsyn.plumb.instance.addEndpoint(toId, this.sourceEndpoint, {
            anchor: sourceAnchors[i], uuid: sourceUUID
        });
    }

    for (var j = 0; j < targetAnchors.length; j++) {
        var targetUUID = toId + targetAnchors[j];
        boxsyn.plumb.instance.addEndpoint(toId, this.targetEndpoint,
          { anchor: targetAnchors[j], uuid: targetUUID });
    }
};

boxsyn.plumb.enableDragging = function() {
  this.instance.draggable(jsPlumb.getSelector("#mainbox .box"), { grid: [20, 20] });
};
