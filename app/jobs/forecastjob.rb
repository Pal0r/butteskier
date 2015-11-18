include WeatherFetcher

module ForecastJob
  @queue = :forecast_job_queue
  def self.perform()
    WeatherFetcher.update_areas
    puts('weather updated')
  end
end
