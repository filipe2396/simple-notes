class Api::V1::NotesController < Api::BaseController
  before_action :set_note, only: %i[show destroy]

  def index
    notes = Note.all
    render_response(notes)
  end

  def create
    note = Note.create(note_params)
    render_response(note)
  end

  def show
    render_response(@note)
  end

  def destroy
    @note.destroy
    render_response(@note)
  end

  private

  def set_note
    @note = Note.find(params[:id])
  end

  def note_params
    params.require(:note).permit(:title, :description)
  end
end
