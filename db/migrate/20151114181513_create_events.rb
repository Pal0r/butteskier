class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :start
      t.text :agenda

      t.timestamps null: false
    end
  end
end
