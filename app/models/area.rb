class Area < ActiveRecord::Base
  has_many :comments
  has_many :instagram_images
end
