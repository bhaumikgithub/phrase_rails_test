Rails.application.routes.draw do
  root "phrases#index"
  get :random_phrase, controller: :phrases
end
