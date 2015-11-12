class AddInstagramJsonToInstagramImage < ActiveRecord::Migration
  def change
    add_column :instagram_images, :instagram_json, :jsonb
  end
end
