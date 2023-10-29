require 'test_helper'

class TimesheetsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @timesheet = Timesheet.create(name: "Sample Timesheet", description: "This is a sample timesheet")
  end

  # Test if the index action lists timesheets and returns a successful response.
  test "should get index" do
    get timesheets_url
    assert_response :success

    response_body = JSON.parse(response.body)

    # Verify that the response count matches the actual number of timesheets in the database.
    assert_equal Timesheet.count, response_body.count
  end

  # Test if the show action displays the details of a specific timesheet correctly.
  test "should get show" do
    get timesheet_url(@timesheet)
    assert_response :success

    response_body = JSON.parse(response.body)

    # Verify that the displayed timesheet attributes match the expected values.
    assert_equal @timesheet.name, response_body["name"]
    assert_equal @timesheet.description, response_body["description"]
  end

  # Test if the create action successfully creates a new timesheet.
  test "should create timesheet" do
    assert_difference('Timesheet.count') do
      post timesheets_url, params: { timesheet: { name: "New Timesheet", description: "This is a new timesheet" } }
    end

    assert_response :created
  end

  # Test if the update action correctly updates a timesheet's attributes.
  test "should update timesheet" do
    new_name = "Updated Timesheet"
    patch timesheet_url(@timesheet), params: { timesheet: { name: new_name } }
    assert_response :success

    @timesheet.reload

    # Verify that the timesheet's name has been updated as expected.
    assert_equal new_name, @timesheet.name
  end

  # Test if the destroy action deletes a timesheet and returns a no content response.
  test "should destroy timesheet" do
    assert_difference('Timesheet.count', -1) do
      delete timesheet_url(@timesheet)
    end

    assert_response :no_content
  end
end
