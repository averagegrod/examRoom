class ExamroomController < ApplicationController

	def show
		@providers = Provider.all
		@mas = Ma.all
		@rooms = Examroom.all
	end

	def set_rooms
		@rooms = params[:rooms].to_i
		Examroom.delete_all
		for i in 1..@rooms do
			room = i
			examroom = Examroom.new(room:room, patientName:"", comments:"", provider:"", staff:"")
			examroom.save

		end
		render :nothing => true
	end

	def update_room
		room = params[:room].to_i
		examroom = Examroom.find_by room:room
		patientName = params[:patientName]
		staff = params[:staff]
		provider = params[:provider]
		comments = params[:comments]
		examroom.update(patientName:patientName, staff:staff, provider:provider, comments:comments)
		if examroom.save
			render :nothing => true, status: :ok			
		else

			render :nothing => true, status: :gone
			
		end
	end

end
