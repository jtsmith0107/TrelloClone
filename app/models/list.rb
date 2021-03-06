# == Schema Information
#
# Table name: lists
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  board_id   :integer          not null
#  ord        :integer          default(0), not null
#  created_at :datetime
#  updated_at :datetime
#

class List < ActiveRecord::Base
  validates :title, :board, :ord, presence: true
  validates :ord, uniqueness: true

  belongs_to :board
  has_many :cards, dependent: :destroy

  # TODO: class method for updating orders?
end
