class TemplatesController < ApplicationController
	before_filter :skip_footer
	
	def show
	end

	def ankleFollowUp
	end

	def skip_footer
		@skip_footer = true	
	end

end
