class ChangeColumnInEvents < ActiveRecord::Migration
  def change
  	rename_column :events, :name, :title
  	rename_column :events, :when, :start
  end
end
