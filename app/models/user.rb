class User < ActiveRecord::Base
  acts_as_token_authenticatable
  has_many :reports
  has_many :comments
  has_many :events, through: :attendences, dependent: :destroy
  has_many :attendences

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
