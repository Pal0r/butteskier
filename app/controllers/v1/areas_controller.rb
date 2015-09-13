class V1::AreasController < V1::BaseController
  # provides get_area_grams etc
  include FetcherUtils

  def get_comments(area)
    comments = []

    # Since we cannot use dot notation in our angular template,
    # we have to create a new hash and append the username to it.
    area.comments.eager_load(:user).each do |comment|
      c = comment.as_json
      c['username'] = comment.user.username
      comments.append(c)
    end

    comments
  end

  def get_reports(area)
    reports = []

    area.reports.eager_load(:user, :run).each do |report|
      r = report.as_json
      r[:username] = report.user.username
      r[:run_name] = report.run.name
      reports.append(r)
    end

    reports
  end

  def get_report_counts(area)
    # TODO: This needs to be refactored.
    counts = {}
    counts[:yesterday] = area.reports.where("created_at > ?", Time.now-1.days).count
    counts[:last_week] = area.reports.where("created_at > ?", Time.now-7.days).count
    counts[:last_month] = area.reports.where("created_at > ?", Time.now-30.days).count
    counts[:last_quarter] = area.reports.where("created_at > ?", Time.now-90.days).count
    counts[:last_year] = area.reports.where("created_at > ?", Time.now-360.days).count

    counts
  end

  def show
    area = Area.find(params[:id])
    grams = get_area_grams(area)
    comments = get_comments(area)
    weather = area.weather_observations.first.weather
    current_condition = weather[:daily][:summary]
    reports = get_reports(area)
    report_counts = get_report_counts(area)

    area_hash = area.as_json
    @area = area_hash.merge(
        {
            grams: grams,
            comments: comments,
            runs: area.runs,
            current_condition: current_condition,
            reports: reports,
            report_counts: report_counts
        }
    )
    render json: @area
  end

  def index
    areas = Area.all
    area_array = Array.new

    areas.each do |area|
      area_array.push({name: area.name, id: area.id, lat: area.lat, long: area.long})
    end
    @areas = area_array
    render json: @areas
  end
end
