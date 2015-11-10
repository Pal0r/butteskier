class V1::EventsController < V1::BaseController
  def create
    @event = Event.create(event_params)

    render :json => {:event => @event}
  end

  def show
    render :json => Event.find(params[:id])
  end

  def index
    render :json => Event.all
  end

  def destroy
    
  end

  private

  def event_params
    params.require(:event).permit(
        :title, :agenda, :area_id, :start
    )
  end
end