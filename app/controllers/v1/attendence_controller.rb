class V1::AttendenceController < V1::BaseController
  def create
    event = Event.find(params[:id])
    event.users << current_user
    render :json => current_user
  end
  
  def destroy
    Event.find(params[:id]).users.delete(current_user)
    render :json => 'true'
  end
end
