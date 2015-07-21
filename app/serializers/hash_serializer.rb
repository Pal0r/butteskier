class HashSerializer
  # This allows us to access our weather ob objs via symbol
  def self.dump(hash)
    hash.to_json
  end

  def self.load(hash)
    (hash || {}).with_indifferent_access
  end
end