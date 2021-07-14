module ApiHelpers
  def json_body
    body = JSON.parse(response.body)
    body.is_a?(Hash) ? body.with_indifferent_access : body.map(&:with_indifferent_access)
  end
end

RSpec.configure do |config|
  config.include ApiHelpers, type: :request
end
