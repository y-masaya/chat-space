Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:edit, :update, :index]
  resources :groups, only: [:index,:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
    resources :users, only: [:index]
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end
