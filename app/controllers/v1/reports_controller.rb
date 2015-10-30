# TODO: Updats this to reflect Reports

class V1::ReportsController < V1::BaseController
  def create
    report = Report.create(
        new_snow: params[:new_snow],
        quality: params[:quality],
        description: params[:description],
        avalanche: params[:avalanche],
        run_id: 1, # TODO: Hardcoding this for now.
        area_id: params[:areaID],
        user_id: current_user.id
    )

    r = report.as_json
    r[:run_name] = Run.find(report[:run_id]).name
    r[:username] = report.user.username

    render :json => {:report => r}
  end

  def destroy
    Report.find(params[:id]).delete
    render :json => 'true'
  end

  private

  def report_params
    params.permit(
        :new_snow, :quality, :areaID,
        :description, :avalanche
    )
  end
end