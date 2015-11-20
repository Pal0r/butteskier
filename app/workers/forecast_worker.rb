include WeatherFetcher

class ForecastWorker < BaseWorker
  @queue = :forecast_job_queue
  def self.perform()
    WeatherFetcher.update_areas
    logger.info('weather updated')
  end
end
