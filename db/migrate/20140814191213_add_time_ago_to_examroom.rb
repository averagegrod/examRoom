class AddTimeAgoToExamroom < ActiveRecord::Migration
  def change
  	add_column :examrooms, :time_ago, :string
  end
end
