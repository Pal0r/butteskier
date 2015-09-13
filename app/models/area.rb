class Area < ActiveRecord::Base
  has_many :comments
  has_many :instagram_images
  has_many :weather_observations
  has_many :runs
end
