TrelloClone.Views.ShowList = Backbone.View.extend({
  template: JST["lists/show"],
  
  events: {
    "click button.destroy-list" : "deleteList"
  },
  
  deleteList: function(event){
    event.preventDefault();
    this.model.destroy();
  },  
  
  render: function(){
    var content = this.template({
      list: this.model
    });
    this.$el.html(content);
    return this;
  }
});