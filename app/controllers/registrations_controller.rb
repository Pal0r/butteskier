class RegistrationsController < Devise::RegistrationsController
  def create
    @user = User.new(user_params)
    if @user.save
      render :status => 200, :json => {:data => @user}
    else
      render :status => 409, :json => {:messages => @user.errors.full_messages}
    end
  end

  def destroy
    user_id = current_user.id
    Comment.where(user: user_id).destroy_all
    Report.where(user: user_id).destroy_all
    User.find(user_id).delete

    render :status => 200, json => {:data => params}
  end

  def update
    @user = User.find(params[:id])
    @user.update_columns(params.permit(:username))
    render :json => {:data => @user}
  end
  
  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :username)
  end
end
