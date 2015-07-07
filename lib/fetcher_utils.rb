module FetcherUtils
  def fetch_instagrams(area)
    # Get 5 images within 500km of the area lat/long

    insta_params = {:count => 5, :distance => 500}
    grams = Array.new

    Instagram.media_search(area.lat, area.long, insta_params).each do |gram|
      grams.push(
          {
              'standard_resolution' => gram.images.standard_resolution.url,
              'thumb_nail' => gram.images.thumbnail.url,
              'instagram_id' => gram.id
          }
      )
    end

    grams
  end

  def update_area_grams(area, grams)
    area = Area.find(area.id)

    grams.each do |gram|
      # Add only unique instagrams to db
      if not InstagramImage.where(:instagram_id => gram['instagram_id'])
        InstagramImage.create(
            standard_resolution_url: gram['standard_resolution'],
            thumb_nail_url: gram['thumb_nail'],
            instagram_id: gram['instagram_id'],
            area: area
        )
      end
    end
  end

  def update_grams
    Area.all.each do |area|
      grams = fetch_instagrams(area)
      update_area_grams(area, grams)
    end
  end

  def get_area_grams(area)
    # util function for controller
    area.instagram_images.last(5)
  end
end