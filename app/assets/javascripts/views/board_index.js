TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST["boards/index"],
  
  initialize: function(){
    this.listenTo(this.collection, "add", this.render);
    this._subviews = {}
    var formView = new TrelloClone.Views.newBoard({
      model: this.model
    })
    this.addSubview(".boards-new", formView);
  },
  
  
  render: function(){
    var content = this.template({boards: this.collection});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
  
});