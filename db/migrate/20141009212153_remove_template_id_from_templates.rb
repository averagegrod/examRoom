class RemoveTemplateIdFromTemplates < ActiveRecord::Migration
  def change
    remove_column :templates, :template_id, :integer
  end
end
