Rails.application.routes.draw do
  get 'line_items/index'
  resources :timesheets, only: [:index, :show]
  resources :line_items, only: [:index]
end
