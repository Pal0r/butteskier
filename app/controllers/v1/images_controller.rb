class V1::ImagesController < V1::BaseController
  def create
  end

  def show
  end

  def index
    areas = []
    Area.all.each do |area|
      areas.push({
      'name': area.name,
      'images': InstagramImage.where(area_id: area.id)\
      .order(created_at: :desc)
      })
    end
    render :json => areas
  end
end
