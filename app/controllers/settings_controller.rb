class SettingsController < ApplicationController
	def show
		@providers = Provider.all
		@mas = Ma.all
		@provider = Provider.new
		@ma = Ma.new
		@rooms = Examroom.count
		@max_rooms = 20
	end

end
