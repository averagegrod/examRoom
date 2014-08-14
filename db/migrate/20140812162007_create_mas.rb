class CreateMas < ActiveRecord::Migration
  def change
    create_table :mas do |t|
      t.string :name

      t.timestamps
    end
  end
end
