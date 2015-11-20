include FetcherUtils

class InstagramWorker < BaseWorker
  @queue = :instagram_job_queue
  def self.perform()
    FetcherUtils.update_grams
    logger.info('Instagrams updated')
  end
end
