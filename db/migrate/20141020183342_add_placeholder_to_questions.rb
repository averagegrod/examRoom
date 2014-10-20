class AddPlaceholderToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :placeHolder, :string
  end
end
