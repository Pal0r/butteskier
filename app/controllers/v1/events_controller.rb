class V1::EventsController < V1::BaseController

  def create
    event = Event.create(event_params)
    event.user_id = current_user
    event.save
    event = event.as_json

    event['user'] = current_user

    render :json => {:event => event}
  end

  def show
    event = Event.find(params[:id])
    user = User.find(event.user_id)
    attendence = event.users.all
    event = event.as_json
    event['user'] = user
    event['attendence'] = attendence

    render :json => event
  end

  def index
    events = Event.all.order(created_at: :desc).as_json
    events.each do |event|
      event['user'] = User.find(event['user_id'])
    end

    render :json => events
  end

  def destroy
    Event.find(params[:id]).delete
  render :json => 'true'
  end

  private

  def event_params
    params.require(:event).permit(
        :title, :agenda, :area_id, :start, :user_id
    )
  end
end
