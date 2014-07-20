TrelloClone.Collections.Cards = Backbone.Collection.extend({
  url: function(){
      return this.list.url() + "/cards";
    }, 
    
  model: TrelloClone.Models.Card,
  
  comparator: function(card){
    return card.get("ord");
  }
});