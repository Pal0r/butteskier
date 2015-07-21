class WeatherController < ApplicationController
  def show
    weather = WeatherObservation.find(params[:id])
    render json: weather
  end

  def index
  end
end
