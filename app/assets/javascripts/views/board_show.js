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
    "click button.destroy-board" : "destroyBoard"
  },
  
  destroyBoard: function(event){
    event.preventDefault();
    this.model.destroy();
    Backbone.history.navigate("/", { trigger: true }); 
    
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
    this.addSubview(".lists", listView);
    
  },
  
  removeList: function(list){
    var subview = _.find(
      this.subviews(".lists"),
      function(subview){
      return subview.model === list
    });
    
    this.removeSubview(".lists", subview);
  },
  
  render: function(){
    var content = this.template({
      board: this.model      
    });
    this.$el.html(content);
    this.attachSubviews();
    // this.updateBreadcrumb();
    return this;
  }
});