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
    return this;
  }
});