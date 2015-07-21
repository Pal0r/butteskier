class AddUniqueContstraintToInstagramImages < ActiveRecord::Migration
  def change
    add_column :instagram_images, :instagram_id, :integer
    add_index :instagram_images, :instagram_id, :unique => true
  end
end
