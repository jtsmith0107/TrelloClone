TrelloClone.Views.showBoard = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  initialize: function(){
    this.listenTo(this.model, "sync", this.render);   
    this.listenTo(this.model.lists(),"sync", this.render);
    
    //problematic if we would like to have initially sorted lists
    //SOLVED, used a wait: true in getOrFetch to ensure complete data before render
    this.listenTo(this.model.lists(), "add", this.addList);
    
    this.listenTo(this.model.lists(), "reset", this.render);
    this.listenTo(this.model.lists(), "remove", this.removeList);
    this._subviews = {};
    var formView = new TrelloClone.Views.ListsNew({model: this.model});
    this.addSubview(".lists-new",formView);

    //only populates the view if the lists has already been fetched, so the second request of this page
    this.model.lists().each(this.addList.bind(this));
  },  
  
  events: {
    "click button.confirm-delete" : "destroyBoard"
  },
  
  destroyBoard: function(event){
    event.preventDefault();
    //find modal and call hide, when complete then navigate
    var that = this;
    $('#delete-board-' + this.model.get("id")).on("hidden.bs.modal", function(){
      that.model.destroy();
     
      Backbone.history.navigate("/", { trigger: true });    
    })
    
   $('#delete-board-' + this.model.get("id")).modal('hide');
  },  
  
  // updateBreadcrumb: function(){
  //   // data for list elements in the breadcrumb ol need url and
  //   var links = TrelloClone.Collections.links;
  //   links.add(new TrelloClone.Models.Link({url: "/#/board"}));
  //   links.add(new TrelloClone.Models.Link({url: "/"}));
  //   var breadcrumbView = new TrelloClone.Views.Breadcrumb({
  //    links:
  //   });
  //   this.addSubview('.breadcrumb', breadcrumbView);
  // },
  
  addList: function(list){
    var listView = new TrelloClone.Views.ShowList({
      model: list
    });
    var colID = list.get("ord") % 3;
    
    this.addSubview("#col" + colID, listView);
    
  },
  
  removeList: function(list){
    //find list among the 3 columns
    var col1Lists = this.subviews('#col0');
    var col2Lists = this.subviews('#col1');
    var col3Lists = this.subviews('#col2');
    
    var subview = _.find(
      col1Lists.concat(col2Lists, col3Lists),
      function(subview){
      return subview.model === list
    });
    
    var colList;
    //detemine which column the list is in
    if($.inArray(subview, col1Lists) !== -1){
      colList = "#col0";
    }else if ($.inArray(subview, col2Lists) !== -1){
      colList = "#col1";
    }else if ($.inArray(subview, col3Lists) !== -1){
      colList = "#col2";
    } else{
      "wat"
    }
    //remove that list from column, composite method will not work, because it assumes a linear array of views. 
    subview.remove();
    var subviews = this.subviews(colList);
    subviews.splice(subviews.indexOf(subview), 1);
    // this.removeSubview(colList, subview);
  },
  
  render: function(){
    var content = this.template({
      board: this.model      
    });
    this.$el.html(content);
     
    $( ".portlet" )
      .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
      .find( ".portlet-header" )
        .addClass( "ui-widget-header ui-corner-all" )
        .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
        
    this.attachSubviews();
    // this.updateBreadcrumb();
    return this;
  }
});