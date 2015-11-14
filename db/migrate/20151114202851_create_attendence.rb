class CreateAttendence < ActiveRecord::Migration
  def change
    create_table :attendences do |t|
      t.belongs_to :user, index: true
      t.belongs_to :event, index: true

      t.datetime :attendence_date
      t.timestamps null: false
    end
  end
end
