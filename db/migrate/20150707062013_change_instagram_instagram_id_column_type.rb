class ChangeInstagramInstagramIdColumnType < ActiveRecord::Migration
  def change
    change_column :instagram_images, :instagram_id, :string
  end
end
