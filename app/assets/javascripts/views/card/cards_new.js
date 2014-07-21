TrelloClone.Views.CardsNew = Backbone.View.extend({
  template: JST["cards/form"],
  
  events: {
    "submit form" : "submit"
  },
  
  render: function(){
    var content = this.template({
      card: this.model
    });
    this.$el.html(content);  
    return this;
  },
  
  submit: function(event){
    var view = this;
    event.preventDefault();    
    var params = $(event.currentTarget).serializeJSON();
    var card = new TrelloClone.Models.Card(params["card"]);
    card.save({}, {
      success: function() {
        view.model.cards().add(card);
        view.render();
      }
    });
  }
    
  
});