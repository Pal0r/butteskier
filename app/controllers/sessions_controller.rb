class SessionsController < Devise::SessionsController
  protect_from_forgery
  respond_to :json
  
  def create
    self.resource = warden.authenticate!(auth_options)
    sign_in(resource_name, resource)
    resource.reset_authentication_token!  
    render json: {email: current_user.email, auth_token: resource.authentication_token}
  end

  def destroy
    self.resource = warden.authenticate!(auth_options)
    if current_user
     current_user.update authentication_token: nil
     signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
     render :json => {}.to_json, :status => :ok
    else
      render :json => {}.to_json, :status => :unprocessable_entity
    end
  end
end
