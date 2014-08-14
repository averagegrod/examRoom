class CreateExamrooms < ActiveRecord::Migration
  def change
    create_table :examrooms do |t|
      t.integer :room
      t.string :patientName
      t.string :comments

      t.timestamps
    end
  end
end
