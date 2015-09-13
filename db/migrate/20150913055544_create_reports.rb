class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
      t.integer :new_snow
      t.string :quality
      t.text :description
      t.references :user, index: true, foreign_key: true
      t.references :area, index: true, foreign_key: true
      t.boolean :avalanche
      t.references :run, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
