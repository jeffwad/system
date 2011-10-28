/*
  @name:        ui/layouts/proto

  @description: prototype for all layout ui objects
                
  @author:      Simon Jefford
  
*/
var object  = require("object"),
    ui      = require("/app/ui/proto"),
    $       = require("/lib/dom").$;

//  create our prototype ui entity based on the ui/proto object
exports.proto = object.create(ui.proto, {
  
  //  properties


  //  public

  //  private

  /*
    @description  render this objects template and sets the rootNode
    @param        {domNode} rootNode the root container node for the template
  */
  _render: function(rootNode) {

    var node;
    
    this.rootNode = document.createElement("div");
    this.rootNode.innerHTML = this.html;
    rootNode.appendChild(node);

  }


});