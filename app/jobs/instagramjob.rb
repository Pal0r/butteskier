include FetcherUtils

module InstagramJob
  @queue = :instagram_job_queue
  def self.perform()
    FetcherUtils.update_grams
  end
end
