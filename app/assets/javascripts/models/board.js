TrelloClone.Models.Board = Backbone.Model.extend({
  urlRoot: "/api/boards",
  
  parse: function(jsonResp){
    if(jsonResp.lists){
      var resp = jsonResp
      this.lists().set(jsonResp.lists, {parse: true});

      $.each(this.lists().models, function(idx, list){
        list.cards().set(resp.lists[idx].cards, {parse: true});
      });
      delete jsonResp.lists;
    }
    return jsonResp;
  },
  
  lists: function(){
    this._lists = this._lists ||
      new TrelloClone.Collections.Lists([], {board: this});
    return this._lists;
  }
  
  
});