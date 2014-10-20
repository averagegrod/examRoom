class QuestionsController < ApplicationController

	def create
		@template = Template.find(params[:template_id])
		if @question = @template.questions.create(question_params)
			flash[:notice] = "Template updated."
			redirect_to edit_template_path(params[:template_id])
		else
			flash[:error] = "Question not created."
			redirect_to edit_template_path(params[:template_id])
		end
	end

	def destroy
		Question.find(params[:id]).destroy
		flash[:notice] = "Question deleted."
		redirect_to edit_template_path(params[:template_id])
	end

	def question_params
		params.require(:question).permit(:content, :placeHolder)
	end
end
