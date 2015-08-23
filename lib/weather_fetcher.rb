require 'net/http'
require 'json'

# For use in cron job task. Creates weather observation
# objects for each area.
module WeatherFetcher

  def get_all_area_ids
    Area.all.pluck(:id)
  end

  def update_areas
    get_all_area_ids.each do |area_id|
      Observation.new(area_id)
    end
  end

  class Observation
    attr_accessor :area, :res

    def initialize(area_id)
      @area = Area.find(area_id)
      @res = get_area_weather
      if @res
        create_weather_observation
      end
    end

    def build_request_url
      lat = @area.lat
      long = @area.long
      api_key = Rails.application.secrets.darksky_api_key
      api_base = 'https://api.forecast.io/forecast/'

      @url = "#{api_base}#{api_key}/#{lat},#{long}"
    end

    def get_daily_api_calls
      WeatherObservation.where(
          'created_at >= ?', Time.zone.now.beginning_of_day
      ).count
    end

    def get_area_weather
      # Enforce daily API limit
      if get_daily_api_calls() < 750
        build_request_url
        uri = URI(@url)
        @res = JSON.parse(Net::HTTP.get(uri))
      else
        @res = false
      end
    end

    def create_weather_observation
      if @res
        WeatherObservation.create(area: @area, weather: @res)
      else
        puts 'Exceeded daily api limit'
      end
    end
  end
end