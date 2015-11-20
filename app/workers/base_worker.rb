require 'logger'

# atm used for logging
class BaseWorker
  extend Resque::Plugins::Logger
  @log_name = "resque.log"
end
