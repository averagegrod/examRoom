class MasController < ApplicationController
	def new
	end

	def create
		@ma = Ma.new(ma_params)
		if @ma.save
			flash[:notice] = "Added staff member."
			redirect_to :back
		else
			flash[:error] = @ma.errors.full_messages[0]
			redirect_to :back
		end
	end


def destroy
	Ma.find(params[:id]).destroy
	flash[:success] = "MA deleted."
	redirect_to :back
end

private
	def ma_params
		params.require(:ma).permit(:name)
	end
end