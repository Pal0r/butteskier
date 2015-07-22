class V1::AreasController < V1::BaseController
  # provides get_area_grams etc
  include FetcherUtils

  def get_comments(area)
    comments = []

    # Since we cannot use dot notation in our angular template,
    # we have to create a new hash and append the username to it.
    area.comments.each do |comment|
      c = {}
      c['created_at'] = comment.created_at
      c['comment_body'] = comment.comment_body
      c['comment_headline'] = comment.comment_headline
      c['username'] = comment.user.username
      c['user_id'] = comment.user_id
      c['id'] = comment.id
      comments.append(c)
    end

    comments
  end

  def show
    area = Area.find(params[:id])
    grams = get_area_grams(area)
    comments = get_comments(area)
    weather = area.weather_observations.first.weather
    current_condition = weather[:daily][:summary]

    @area = {
        name: area.name, description: area.description,
        lat: area.lat, long: area.long,
        grams: grams, id: area.id, comments: comments,
        current_user_id: current_user.id,
        current_condition: current_condition
    }
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
