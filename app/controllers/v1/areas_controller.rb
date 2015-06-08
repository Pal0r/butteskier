class V1::AreasController < V1::BaseController
  def index
    area = Area.find(1)
    grams = Array.new
    insta_params = {:count => 5, :distance => 5000}

    # Get 5 images within 5000km of the area lat/long
    Instagram.media_search(area.lat, area.long, insta_params).each do |gram|
      grams.insert(0, gram.images.standard_resolution.url)
    end

    @area = {name: area.name, description: area.description, grams: grams}
  end
end