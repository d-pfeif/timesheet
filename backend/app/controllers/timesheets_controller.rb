class TimesheetsController < ApplicationController
  before_action :set_timesheet, only: [:show, :update, :destroy]

  def create
    timesheet = Timesheet.new(timesheet_params)

    if timesheet.save
      render json: timesheet, status: :created
    else
      render json: { errors: timesheet.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    render json: @timesheet
  end
  
  def index
    timesheets = Timesheet.all.order(created_at: :asc)
    render json: timesheets
  end

  def update
    if @timesheet.update(timesheet_params)
      render json: @timesheet
    else
      render json: { errors: @timesheet.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @timesheet.destroy
    head :no_content
  end

  private

  def set_timesheet
    @timesheet = Timesheet.find(params[:id])
  end

  def timesheet_params
    params.require(:timesheet).permit(:name, :description)
  end
end
