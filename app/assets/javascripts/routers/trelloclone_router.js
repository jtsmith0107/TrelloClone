TrelloClone.Routers.TrelloCloneRouter = Backbone.Router.extend({
  routes: {
    "" : "boardsIndex",
    "boards/new" : "boardNew",
    "boards/:id" : "boardShow"

  },
  
  boardsIndex: function(){
    var router = this;
    var success = function(){
      var indexView = new TrelloClone.Views.BoardsIndex({
        collection: TrelloClone.Collections.boards
      });

      router._swapView(indexView);
      // $('body').html(indexView.render().$el);
    }

    TrelloClone.Collections.boards.fetch({success: success});

  },
  
  boardNew: function(){
    var newView = new TrelloClone.Views.newBoard();
    this._swapView(newView);
  },
  
  boardShow: function(id){
    var board = TrelloClone.Collections.boards.getOrFetch(id);
    var showView = new TrelloClone.Views.showBoard({
      model: board
    });
    this._swapView(showView);
  },

  _swapView: function(newView){ 
    if(this.currentView) {
      this.currentView.remove();
    }
    $('#main').html(newView.render().$el);
    this.currentView = newView;
  }

});