class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :comment_body
      t.text :comment_headline
      t.references :user, index: true
      t.references :area, index: true

      t.timestamps
    end
  end
end
