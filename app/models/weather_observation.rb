class WeatherObservation < ActiveRecord::Base
  belongs_to :area
  serialize :weather, HashSerializer
end
