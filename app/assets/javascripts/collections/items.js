TrelloClone.Collections.Items = Backbone.Collection.extend({
  url: function(){
      return this.card.url() + "/items";
    }, 
    
  model: TrelloClone.Models.Item,
  
  initialize: function(models, option){
    this.list = option.list
  }
});