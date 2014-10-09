class TemplatesController < ApplicationController
	before_filter :skip_footer
	
	def index
		@templates = Template.all
	end

	def show
		@template = Template.find(params[:id])
		@questions = @template.questions
	end

	def new
		@template = Template.new
	end

	def create
		@template = Template.new(template_params)
		if @template.save
			redirect_to @template
		else
			render 'new'
		end
	end

	def skip_footer
		@skip_footer = true	
	end

	def template_params
		params.require(:template).permit(:name)
	end

end
