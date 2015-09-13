class Run < ActiveRecord::Base
  belongs_to :area
  has_many :reports
end
