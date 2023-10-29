class LineItemsController < ApplicationController
  before_action :set_line_item, only: [:show, :update, :destroy]

  def index
    line_items = LineItem.where(timesheet_id: params[:timesheet_id]).order(date: :asc)
    render json: line_items
  end

  def create
    line_item = LineItem.new(line_item_params)

    if line_item.save
      render json: line_item, status: :created
    else
      render json: { errors: line_item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @line_item.update(line_item_params)
      render json: @line_item
    else
      render json: { errors: @line_item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @line_item.destroy
    head :no_content
  end

  private

  def set_line_item
    @line_item = LineItem.find_by(id: params[:id])
  end

  def line_item_params
    params.require(:line_item).permit(:description, :date, :minutes, :timesheet_id)
  end
end
