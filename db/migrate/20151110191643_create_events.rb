class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.datetime :when
      t.text :agenda

      t.timestamps null: false
    end
  end
end
