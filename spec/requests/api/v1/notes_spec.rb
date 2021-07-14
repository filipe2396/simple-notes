require 'rails_helper'

RSpec.describe 'Api::V1::Notes', type: :request do
  let(:note) { create(:note) }

  describe 'GET /api/v1/notes' do
    let(:notes) { create_pair(:note) }

    before { notes }

    it 'return all notes' do
      get api_v1_notes_path

      expect(response).to have_http_status(:ok)
      expect(json_body).to match_array [hash_including(id: notes[0].id), hash_including(id: notes[1].id)]
    end
  end

  describe 'POST /api/v1/notes' do
    context 'with valid params' do
      let(:attributes) { { title: 'title', description: 'description' } }

      it 'return the note' do
        expect do
          post api_v1_notes_path, params: { note: attributes }
        end.to change(Note, :count).from(0).to(1)

        expect(response).to have_http_status(:created)
        expect(json_body).to match hash_including(attributes)
      end
    end

    context 'with invalid params' do
      it 'return all errors' do
        post api_v1_notes_path, params: { note: { title: 'title' } }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_body[:errors][:description]).not_to be_nil
      end
    end
  end

  describe 'GET /api/v1/notes/:id' do
    before { note }

    it 'return the note' do
      get api_v1_note_path(note)

      expect(response).to have_http_status(:ok)
      expect(json_body).to match hash_including(id: note.id)
    end
  end

  describe 'DELETE /api/v1/notes/:id' do
    before { note }

    it 'destroy the note' do
      expect do
        delete api_v1_note_path(note)
      end.to change(Note, :count).from(1).to(0)

      expect(response).to have_http_status(:ok)
    end
  end
end
