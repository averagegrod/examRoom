class AddProviderToExamroom < ActiveRecord::Migration
  def change
  	add_column :examrooms, :provider, :string
  	add_column :examrooms, :staff, :string
  end
end
