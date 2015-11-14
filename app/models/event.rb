class Event < ActiveRecord::Base
  has_many :users, through: :attendences
  has_many :attendences
end
