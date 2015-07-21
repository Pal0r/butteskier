class CreateInstagramImages < ActiveRecord::Migration
  def change
    create_table :instagram_images do |t|
      t.string :url
      t.references :area, index: true
      t.string :standard_resolution_url
      t.string :thumb_nail_url

      t.timestamps
    end
  end
end
