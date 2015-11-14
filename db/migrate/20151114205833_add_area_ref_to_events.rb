class AddAreaRefToEvents < ActiveRecord::Migration
  def change
    add_reference :events, :area, index: true, foreign_key: true
  end
end
