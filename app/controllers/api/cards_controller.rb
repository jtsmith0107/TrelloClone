module Api
  class CardsController < ApiController
    before_action :require_board_member!

    def create
      max = current_list.cards.max_by do |card|
        card.ord
      end        

      @card = current_list.cards.new(card_params)
            
      if max.nil?
        @card.ord = 1
      else
        @card.ord = max.ord + 1 
      end
      
      if @card.save
        render json: @card
      else
        render json: @card.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @card = Card.find(params[:id])
      @card.try(:destroy)
      render json: {}      
    end

    private

    def current_list
      if params[:id]
        @card = Card.find(params[:id])
        @list = @card.list
      elsif params[:card]
        @list = List.find(params[:card][:list_id])
      end
    end

    def current_board
      current_list.board
    end

    def card_params
      params.require(:card).permit(:title, :list_id, :description)
    end
  end
end
