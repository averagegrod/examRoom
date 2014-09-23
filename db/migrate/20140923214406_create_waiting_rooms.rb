class CreateWaitingRooms < ActiveRecord::Migration
  def change
    create_table :waiting_rooms do |t|
      t.text :comments

      t.timestamps
    end
  end
end
