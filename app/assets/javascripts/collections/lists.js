TrelloClone.Collections.Lists = Backbone.Collection.extend({
  model: TrelloClone.Models.List,
  
  url: function(){
    return this.board.url() + "/lists";
  }, 
  
  initialize: function(models, option){
    this.board = option.board;
  }
  
});