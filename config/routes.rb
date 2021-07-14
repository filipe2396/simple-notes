Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'react#index'

  namespace :api do
    namespace :v1 do
      resources :notes, except: %i[new edit update]
    end
  end
end
