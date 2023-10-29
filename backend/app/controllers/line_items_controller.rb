class LineItemsController < ApplicationController
  def index
    line_items = LineItem.where(timesheet_id: params[:timesheet_id]).order(date: :asc)

    render json: line_items
  end
end
