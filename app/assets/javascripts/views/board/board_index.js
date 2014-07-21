TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST["boards/index"],
  
  initialize: function(){
    this.listenTo(this.collection, "add", this.render);
    $(document).ready(function () {
        $('.btn-group').sortable({
            axis: 'x',
            stop: function (event, ui) {
    	        var data = $(this).sortable('serialize');
                $('span').text(data);
                /*$.ajax({
                        data: oData,
                    type: 'POST',
                    url: '/your/url/here'
                });*/
    	}
        });
    });
    this._subviews = {}
    var formView = new TrelloClone.Views.newBoard({
      model: this.model
    })
    this.addSubview(".boards-new", formView);
  },
  
  // events: {
  //   "click .boardTile" : this.boardLink
  // },
  
  // boardLink: function(event){
  //   debugger
  //   var board = event.currentTarget
  //   TrelloClone.TrelloCloneRouter.navigate("/#/boards/" + board.escape("id"),true)
  // },
  
  
  render: function(){
    var content = this.template({boards: this.collection});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
  
});