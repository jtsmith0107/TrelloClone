TrelloClone.Collections.Cards = Backbone.Collection.extend({
  url: function(){
      return this.list.url() + "/cards";
    }, 
   
  initialize: function(models, option){
    this.list = option.list
  },
    
  model: TrelloClone.Models.Card,
  
  comparator: function(card){
    return card.get("ord");
  }
  
});