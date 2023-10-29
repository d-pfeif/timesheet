Rails.application.routes.draw do
  get 'line_items/index'
  resources :timesheets
  resources :line_items, only: [:create, :index, :update, :destroy]
end
