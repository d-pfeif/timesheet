class TimesheetsController < ApplicationController
  def index
    timesheets = Timesheet.all
    render json: timesheets
  end

  def show
    timesheet = Timesheet.find_by(id: params[:id])
    render json: timesheet
  end
end
