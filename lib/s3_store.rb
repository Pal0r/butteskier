# Following code pulled from:
# http://blog.revathskumar.com/2014/12/rails-save-file-to-s3-bucket.html
# Your one liners were slightly more elegant than mine. Thank you.

class S3Store
  BUCKET = ENV['S3_BUCKET']

  def initialize file
    @file = file
    @s3 = AWS::S3.new
    # Commenting env var out for now
    # @bucket = @s3.buckets['BUCKET']
    @bucket = @s3.buckets['butteskier-user-profile-images']
  end

  def store
    @obj = @bucket.objects[filename].write(@file.tempfile, acl: :public_read)
    self
  end

  def url
    @obj.public_url.to_s
  end

  private

  def filename
    @filename ||= @file.original_filename.gsub(/[^a-zA-Z0-9_\.]/, '_')
  end
end