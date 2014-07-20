TrelloClone.Views.showBoard = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  initialize: function(){
    this.listenTo(this.model, "sync", this.render);   
    this.listenTo(this.model.lists(),"sync remove", this.render);
    this.listenTo(this.model.lists(), "add", this.addList);
    this._subviews = {};
    // include for forms to build lists
    var formView = new TrelloClone.Views.ListsNew({model: this.model});
    this.addSubview(".lists-new",formView);
    this.model.lists().each(this.addList.bind(this));
  },  
  
  events: {
    "click button.destroy" : "destroyBoard"
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
    this.addSubview('.lists', listView);
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