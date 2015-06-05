class V1::BaseController < ApplicationController
  acts_as_token_authentication_handler_for User

  private

  def permission_denied
    render json: {error: 'unauthorized'}, status: :unauthorized
  end
end
