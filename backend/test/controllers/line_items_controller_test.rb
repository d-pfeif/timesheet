require "test_helper"

class LineItemsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @timesheet = Timesheet.create(name: "Sample Timesheet", description: "This is a sample timesheet")
  end

  test "should get index" do
    # Create some line items associated with the @timesheet
    line_item_data = [
      { timesheet: @timesheet, date: 1.day.ago.strftime("%Y-%m-%d"), minutes: 10 },
      { timesheet: @timesheet, date: 2.days.ago.strftime("%Y-%m-%d"), minutes: 20 },
      { timesheet: @timesheet, date: 3.days.ago.strftime("%Y-%m-%d"), minutes: 30 }
    ]
    LineItem.create(line_item_data)

    # Make a GET request to the index action with pagination parameters
    get line_items_url, params: { timesheet_id: @timesheet.id }

    # Check the response status
    assert_response :success

    # Parse the JSON response
    response_json = JSON.parse(response.body)

    # Verify that the response contains the line items associated with the timesheet
    assert_equal 3, response_json.length

    # Verify they are in decending order
    assert_equal line_item_data[2][:date], response_json[0]["date"]
    assert_equal line_item_data[1][:date], response_json[1]["date"]
    assert_equal line_item_data[0][:date], response_json[2]["date"]
  end
end
