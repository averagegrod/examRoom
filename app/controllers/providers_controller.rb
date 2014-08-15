class ProvidersController < ApplicationController
	def new
	end

	def create
		@provider = Provider.new(provider_params)
		if @provider.save
			flash[:notice] = "Added Provider."
			redirect_to :back
		else
			flash[:error] = @provider.errors.full_messages[0]
			redirect_to :back
		end
	end


def destroy
	Provider.find(params[:id]).destroy
	flash[:success] = "Provider deleted."
	redirect_to :back
end

private
	def provider_params
		params.require(:provider).permit(:name)
	end
end