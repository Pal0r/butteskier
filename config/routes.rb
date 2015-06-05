Rails.application.routes.draw do
  api_version(:module => "butteskier", :path => {:value => "skiapp"}) do
  end
  #need this to work for API-only backend
  devise_for :users, :controllers => {:registrations => "registrations", :sessions => "sessions"}

  api_version(:module => "V1", :path => {:value => "v1"}, :defaults => {:format => "json"}) do
    # devise_scope :user do
    #   resource :session, :only => [:create, :destroy]
    #   resource :registration, :only => [:create]
    # end
    
    resources :locations, :areas
  end
  
  root "angular_templates#index"
  get '*path' => 'angular_templates#index'
end
