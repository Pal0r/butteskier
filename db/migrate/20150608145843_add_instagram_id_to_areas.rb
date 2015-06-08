class AddInstagramIdToAreas < ActiveRecord::Migration
  def change
    add_column :areas, :instagram_id, :integer
  end
end
