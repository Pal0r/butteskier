class V1::AreasController < V1::BaseController

  def get_instagram_images(area)
    insta_params = {:count => 5, :distance => 500}
    grams = Array.new

    # Get 5 images within 500km of the area lat/long
    Instagram.media_search(area.lat, area.long, insta_params).each do |gram|
      grams.push(
          {
              'standard_resolution' => gram.images.standard_resolution.url,
              'thumb_nail' => gram.images.thumbnail.url
          }
      )
    end

    grams
  end

  def get_comments(area)
    comments = []

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
    grams = get_instagram_images(area)
    comments = get_comments(area)

    @area = {
        name: area.name, description: area.description,
        grams: grams, id: area.id, comments: comments,
        current_user_id: current_user.id
    }
  end

  def index
    areas = Area.all
    area_array = Array.new

    areas.each do |area|
      area_array.push({name: area.name, id: area.id, lat: area.lat, long: area.long})
    end
    @areas = area_array
  end
end
