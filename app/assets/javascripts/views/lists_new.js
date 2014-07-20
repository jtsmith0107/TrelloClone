TrelloClone.Views.ListsNew = Backbone.View.extend({
  template: JST["lists/form"],
  
  events: {
    "submit form" : "submit"
  },
  
  render: function(){
    var content = this.template({
      list: this.model
    });
    this.$el.html(content);
    
    return this;
  },
  
  submit: function(event){
    var view = this;
    event.preventDefault();
    
    var params = $(event.currentTarget).serializeJSON();
    var list = new TrelloClone.Models.List(params["list"]);
    list.save({}, {
      success: function() {
        view.model.lists().add(list);
        view.render();
      }
    });
  }
  
});