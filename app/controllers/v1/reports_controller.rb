# TODO: Updats this to reflect Reports

class V1::ReportsController < V1::BaseController
  def create
    report = Report.create(
        new_snow: params[:new_snow],
        quality: params[:quality],
        description: params[:description],
        avalanche: params[:avalanche],
        run_id: params[:run_id],
        area_id: params[:areaID],
        user_id: current_user.id
    )

    r = report.as_json
    r[:run_name] = report.run.name
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
        :description, :avalanche, :run_id
    )
  end
end