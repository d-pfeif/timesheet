class Timesheet < ApplicationRecord
  has_many :line_items
end
