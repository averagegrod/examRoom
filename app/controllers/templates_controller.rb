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
			redirect_to edit_template_path @template.id
		else
			render 'new'
		end
	end

	def settings
		@templates = Template.all
	end

	def edit
		@template = Template.find(params[:id])
		@questions = @template.questions
		@question = QuestionsController#new
	end

	def destroy
		Template.find(params[:id]).destroy
		flash[:notice] = "Template deleted."
		redirect_to templates_path
	end

	def skip_footer
		@skip_footer = true	
	end

	def template_params
		params.require(:template).permit(:name)
	end

end
