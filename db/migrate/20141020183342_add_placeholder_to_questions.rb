class AddPlaceholderToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :PlaceHolder, :string
  end
end
