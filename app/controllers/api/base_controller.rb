class Api::BaseController < ActionController::API
  private

  def render_response(resource)
    if resource.try(:errors)&.any?
      render json: { errors: resource.errors }, status: :unprocessable_entity
    else
      render json: resource, status: request.post? ? :created : :ok
    end
  end
end
