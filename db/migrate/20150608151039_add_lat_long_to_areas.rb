class AddLatLongToAreas < ActiveRecord::Migration
  def change
    add_column :areas, :lat, :string
    add_column :areas, :long, :string
  end
end
