TrelloClone.Views.CardShow = Backbone.CompositeView.extend({
  template: JST["cards/show"],
    
  events: {
    "click button.destroy-card" : "deleteCard"
  },
  
  deleteCard: function(event){
    event.preventDefault();
    this.model.destroy();
  },  
  
  render: function(){
    var content = this.template({
      card: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});