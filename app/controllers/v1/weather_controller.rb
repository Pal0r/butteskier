class V1::WeatherController < V1::BaseController
  def show
    area = Area.find(params[:id])
    weather = area.weather_observations.first.weather
    render json: weather
  end

  def index
  end
end
