# == Schema Information
#
# Table name: cards
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  list_id     :integer          not null
#  description :text
#  ord         :integer          default(0), not null
#  created_at  :datetime
#  updated_at  :datetime
#

class Card < ActiveRecord::Base
  validates :title, :list_id, :ord, presence: true
  validates :ord, uniqueness: true
  belongs_to :list
  has_many :items, dependent: :destroy
  has_many :card_assignments, dependent: :destroy
end
