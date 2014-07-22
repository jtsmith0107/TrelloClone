class AddOrdPresenceAndUniqueness < ActiveRecord::Migration
  def change
    change_column(:boards, :ord, :integer, null: false)
    change_column(:lists, :ord, :integer, null:false)
    change_column(:cards, :ord, :integer, null:false)
    add_index(:lists, :ord, unique: true)
    add_index(:boards, :ord, unique: true)
    add_index(:cards, :ord, unique: true)
  end
end
