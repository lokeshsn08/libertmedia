Rails.application.routes.draw do
  root 'homepage#index'
  get "/allusers", to: "homepage#get_users"
  post "/getselectedusers", to: "homepage#get_users_by_id"
    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
