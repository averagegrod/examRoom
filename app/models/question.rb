class Question < ActiveRecord::Base
	belongs_to :template
	default_scope -> { order('created_at DESC') }
	validates :content, presence: true
	validates :template_id, presence: true
end
