json.array! @areas do |area|
  json.extract! area, :name, :id, :lat, :long
end