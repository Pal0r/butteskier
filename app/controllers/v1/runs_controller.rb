class V1::RunsController < V1::BaseController
  def show
    render :json => Area.find(params[:id]).runs.all
  end

  def create
    run = Run.create(
        name: params[:name],
        description: params[:description],
        area_id: params[:area_id]
    )
    render :json => {:run => run}
  end

  def destroy
    Run.find(params[:id]).delete
    render :json => 'true'
  end

  private

  def run_params
    params.permit(:name, :description, :area_id)
  end
end