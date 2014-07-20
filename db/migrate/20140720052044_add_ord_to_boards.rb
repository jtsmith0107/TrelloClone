class AddOrdToBoards < ActiveRecord::Migration
  def change
    add_column(:boards, :ord, :integer)
  end
end
