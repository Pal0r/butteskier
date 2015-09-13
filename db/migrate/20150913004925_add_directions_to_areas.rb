class AddDirectionsToAreas < ActiveRecord::Migration
  def change
    add_column :areas, :directions, :text
  end
end
