class V1::ImagesController < V1::BaseController
  def create
  end

  def show
  end

  def index
    render :json => InstagramImage.all
  end
end