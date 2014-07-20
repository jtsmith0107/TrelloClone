TrelloClone.Views.Breadcrumb = Backbone.View.extend({
  template: JST["breadcrumb"],
  
  render: function(){
    var content = this.template({
      links: this.links
    });
    this.$el.html(content);
    return this;
  }
});