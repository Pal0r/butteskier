class V1::UploadsController < V1::BaseController
  def create

    image = S3Store.new(params[:file]).store
    # Update the user model
    user = User.find(current_user.id)
    user.profile_img = image.url
    user.save

    render :status => 200, :json => {'profile_img': image.url}
  end
end