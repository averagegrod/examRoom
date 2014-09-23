class ExamroomController < ApplicationController

	def show
		@providers = Provider.all
		@mas = Ma.all
		@rooms = Examroom.all
		@waitingRoom = WaitingRoom.first
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

	def update_all
		now = 10.minutes.ago
		updated_rooms = Examroom.where("updated_at >=?", now)
		dates = params[:rooms]
		render :json => updated_rooms, status: :ok
	end

	def update_waiting_room
		updated_comments = WaitingRoom.first.comments
		render :text => updated_comments, status: :ok
	end

	def edit_waiting_room
		room = WaitingRoom.first
		room.comments = params[:comments]
		room.save

	if room.save
			render :nothing => true, status: :ok			
		else

			render :nothing => true, status: :gone
			
		end 
	end
end
