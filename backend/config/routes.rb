Rails.application.routes.draw do
  resources :timesheets, only: [:index, :show]
end
