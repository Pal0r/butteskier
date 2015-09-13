class CreateRuns < ActiveRecord::Migration
  def change
    create_table :runs do |t|
      t.string :name
      t.text :description
      t.references :area, index: true

      t.timestamps null: false
    end
  end
end
