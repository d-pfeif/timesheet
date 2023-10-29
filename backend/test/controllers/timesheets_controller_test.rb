require "test_helper"

class TimesheetsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    # Create sample timesheets data to populate the database.
    timesheets_data = [
      { name: "first", description: "This is a description" },
      { name: "second", description: "This is a description" },
      { name: "third", description: "This is a description" }
    ]
    Timesheet.create(timesheets_data)
    
    # Make a GET request to the index action.
    get timesheets_url
    
    # Check that the response is successful.
    assert_response :success
    
    # Parse the JSON response.
    response_body = JSON.parse(response.body)
    
    # Ensure that the number of timesheets in the response matches the number of created timesheets.
    assert_equal Timesheet.all.count, response_body.count
  end

  test "should get show" do
    timesheet = Timesheet.create(name: "first", description: "This is a description")

    # Make a GET request to the show action for the created timesheet.
    get timesheet_url(timesheet)
    
    # Check that the response is successful.
    assert_response :success
    
    # Parse the JSON response.
    response_body = JSON.parse(response.body)
    
    # Ensure that the name and description in the response match the attributes of the created timesheet.
    assert_equal timesheet.name, response_body["name"]
    assert_equal timesheet.description, response_body["description"]
  end
end
