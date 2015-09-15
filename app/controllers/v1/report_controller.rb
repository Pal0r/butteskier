# TODO: Updats this to reflect Reports

class V1::ReportsController < V1::BaseController
  def create
    comment = Comment.create(
        comment_body: params[:comment_body],
        comment_headline: params[:comment_headline],
        user_id: current_user.id,
        area_id: params[:areaID]
    )
    username = comment.user.username

    render :json => {:comment => comment, :username => username}
  end

  def destroy
    Comment.find(params[:id]).delete
    render :json => 'true'
  end

  private

  def comment_params
    params.permit(:comment_body, :comment_headline, :areaID)
  end
end