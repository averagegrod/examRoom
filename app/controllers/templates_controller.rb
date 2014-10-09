class TemplatesController < ApplicationController
	before_filter :skip_footer
	
	def index
		@templates = Template.all
	end

	def show
		@template = Template.find(params[:id])
	end

	def skip_footer
		@skip_footer = true	
	end

end
