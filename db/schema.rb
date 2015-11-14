# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151114205833) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "areas", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "instagram_id"
    t.string   "lat"
    t.string   "long"
    t.text     "directions"
  end

  create_table "attendences", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "event_id"
    t.datetime "attendence_date"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "attendences", ["event_id"], name: "index_attendences_on_event_id", using: :btree
  add_index "attendences", ["user_id"], name: "index_attendences_on_user_id", using: :btree

  create_table "comments", force: :cascade do |t|
    t.string   "comment_body"
    t.text     "comment_headline"
    t.integer  "user_id"
    t.integer  "area_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["area_id"], name: "index_comments_on_area_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "events", force: :cascade do |t|
    t.string   "title"
    t.datetime "start"
    t.text     "agenda"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
    t.integer  "area_id"
  end

  add_index "events", ["area_id"], name: "index_events_on_area_id", using: :btree
  add_index "events", ["user_id"], name: "index_events_on_user_id", using: :btree

  create_table "instagram_images", force: :cascade do |t|
    t.string   "url"
    t.integer  "area_id"
    t.string   "standard_resolution_url"
    t.string   "thumb_nail_url"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "instagram_id"
    t.jsonb    "instagram_json"
  end

  add_index "instagram_images", ["area_id"], name: "index_instagram_images_on_area_id", using: :btree
  add_index "instagram_images", ["instagram_id"], name: "index_instagram_images_on_instagram_id", unique: true, using: :btree

  create_table "reports", force: :cascade do |t|
    t.integer  "new_snow"
    t.string   "quality"
    t.text     "description"
    t.integer  "user_id"
    t.integer  "area_id"
    t.boolean  "avalanche"
    t.integer  "run_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "reports", ["area_id"], name: "index_reports_on_area_id", using: :btree
  add_index "reports", ["run_id"], name: "index_reports_on_run_id", using: :btree
  add_index "reports", ["user_id"], name: "index_reports_on_user_id", using: :btree

  create_table "runs", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.integer  "area_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "runs", ["area_id"], name: "index_runs_on_area_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "authentication_token"
    t.string   "username"
    t.string   "profile_img"
  end

  add_index "users", ["authentication_token"], name: "index_users_on_authentication_token", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "weather_observations", force: :cascade do |t|
    t.integer  "area_id"
    t.jsonb    "weather"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "weather_observations", ["area_id"], name: "index_weather_observations_on_area_id", using: :btree

  add_foreign_key "events", "areas"
  add_foreign_key "events", "users"
  add_foreign_key "reports", "areas"
  add_foreign_key "reports", "runs"
  add_foreign_key "reports", "users"
end
