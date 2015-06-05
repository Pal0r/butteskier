class V1::AreasController < V1::BaseController
  def index
    @areas = Area.all
  end
end