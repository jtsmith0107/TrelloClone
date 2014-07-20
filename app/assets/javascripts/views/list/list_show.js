TrelloClone.Views.ShowList = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  
  initialize: function(){
    this.listenTo(this.model.cards(), "add", this.addCard);
    
    this.listenTo(this.model.cards(), "reset", this.render);
    this.listenTo(this.model.cards(), "remove", this.removeCard);
    this._subviews = {};
    var formView = new TrelloClone.Views.CardsNew({model: this.model});
    this.addSubview(".cards-new",formView);
    //only populates the view if the lists has already been fetched, so the second request of this page
    this.model.cards().each(this.addCard.bind(this));
  },
  
  addCard: function(card){
    var cardView = new TrelloClone.Views.CardShow({
      model: card
    });
    this.addSubview(".cards", cardView);
  },
  
  removeCard: function(card){
    var subview = _.find(
      this.subviews(".cards"),
      function(subview){
      return subview.model === card
    });
    
    this.removeSubview(".cards", subview);
  },

  events: {
    "click button.destroy-list" : "deleteList"
  },
  
  deleteList: function(event){
    event.preventDefault();
    this.model.destroy();
  },  
  
  render: function(){
    var content = this.template({
      list: this.model
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});