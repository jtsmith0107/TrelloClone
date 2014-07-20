TrelloClone.Collections.Boards = Backbone.Collection.extend({
  url: "api/boards",
  
  model: TrelloClone.Models.Board,
  

  getOrFetch: function(id){
    // var showView = new TrelloClone.Views.showBoard({
    //   model: board
    // });
    // router._swapView(showView);
    var boards = this;
    var board;
    if(board = this.get(id)){
      board.fetch({async: false});
    } else{
      board = new TrelloClone.Models.Board({id: id});
      board.fetch({async: false});
      boards.add(board);
    }
    return board;
  },
  
  comparator: function(list){
    return list.get('ord');
  }
});

TrelloClone.Collections.boards = new TrelloClone.Collections.Boards();