require 'net/http'
require 'json'

module WeatherFetcher
  def get_all_area_ids
    area_ids = Area.all.pluck(:id)
  end

  class Observation
    # This class variable needs to be less than 750
    # Stop updates if > 750
    @@api_request_count

    attr_accessor :area, :res

    def initialize(area_id)
      @area = Area.find(area_id)
      @res = get_area_weather
    end

    def build_request_url
      lat = @area.lat
      long = @area.long
      api_key = Rails.application.secrets.darksky_api_key
      api_base = 'https://api.forecast.io/forecast/'

      @url = "#{api_base}#{api_key}/#{lat},#{long}"
    end

    def get_area_weather
      build_request_url
      uri = URI(@url)
      @res = JSON.parse(Net::HTTP.get(uri))
    end

    def print_area_weather_data
      puts JSON.pretty_generate(JSON.parse(@res))
    end
  end



  # Res returns Time format
  # ex to convert:
  # t = res['daily']['data'][0]['temperatureMaxTime']
  # Time.at(t).to_datetime = 2015-07-19 15:00:00 -0700
end