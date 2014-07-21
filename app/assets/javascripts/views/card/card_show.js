TrelloClone.Views.CardShow = Backbone.CompositeView.extend({
  template: JST["cards/show"],
  
  initialize: function()  {
    this.$el.hover(this.addButton, this.removeButton)
  },
    
  events: {
    "click button.destroy-card" : "deleteCard"
  },
  
  addButton: function(event){
    var content = JST["cards/button_delete"]();

    $(event.currentTarget).find(".panel-body").append(content);
  },
  
  removeButton: function(event){
    $(event.currentTarget).find(".destroy-card").remove()
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