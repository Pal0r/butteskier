require 'resque/tasks'
require 'resque_scheduler/tasks'
require 'resque_scheduler/server'
# send errors which occur in background jobs to redis and airbrake
require 'resque/failure/multiple'
require 'resque/failure/redis'
require 'resque/failure/airbrake'

Resque::Failure::Multiple.classes = [Resque::Failure::Redis, Resque::Failure::Airbrake]
Resque::Failure.backend = Resque::Failure::Multiple

task "resque:setup" => :environment

namespace :resque do
  task :setup do
    require 'resque'
  end

  task :setup_schedule => :setup do
    require 'resque-scheduler'

    # If you want to be able to dynamically change the schedule,
    # uncomment this line.  A dynamic schedule can be updated via the
    # Resque::Scheduler.set_schedule (and remove_schedule) methods.

    # When dynamic is set to true, the scheduler process looks for
    # schedule changes and applies them on the fly.
    Resque::Scheduler.dynamic = true
    Resque.schedule = YAML.load_file(Rails.root.join('config', 'resque_schedule.yml'))
  end

  task :scheduler => :setup_schedule
end
