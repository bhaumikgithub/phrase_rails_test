class PhrasesController < ApplicationController
  before_action :get_phrase, only: [:random_phrase]

  # GET /random_phrase
  def random_phrase
    if @phrase.present?
      render json: @phrase, status: 200
    else
      head 204
    end
  end

  private

  def get_phrase
    random_phrase = Phrase.order("RANDOM()")
    if params[:existing_phrase].present?
      @phrase = random_phrase.where.not(id: params[:existing_phrase]).first
    else
      @phrase = random_phrase.first
    end
  end
end
