class CreateWeatherObservations < ActiveRecord::Migration
  def change
    create_table :weather_observations do |t|
      t.references :area, index: true
      t.jsonb :weather

      t.timestamps
    end
  end
end
