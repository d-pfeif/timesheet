require "test_helper"

class TimesheetsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    timesheets_data = [
      { name: "first", description: "This is a description" },
      { name: "second", description: "This is a description" },
      { name: "third", description: "This is a description" }
    ]
    
    Timesheet.create(timesheets_data)
    get timesheets_url
    assert_response :success
    response_body = JSON.parse(response.body)
    assert_equal Timesheet.all.count, response_body.count
  end

  test "should get show" do
    timesheet = Timesheet.create(name: "first", description: "This is a description")

    get timesheet_url(timesheet)
    assert_response :success
    response_body = JSON.parse(response.body)
    assert_equal timesheet.name, response_body["name"]
    assert_equal timesheet.description, response_body["description"]
  end
end
