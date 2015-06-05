class AngularTemplatesController < ApplicationController
  def index
  end

  #This action will only be called by Angular's ngResources
  #It will render the template without the layout (e.g. surrounding html/head/body tags, etc.)
  #The response will be taken by the client and Angular will render it.
  def template
    render :template => 'angular_templates/' + params[:path], :layout => false
  end
end
