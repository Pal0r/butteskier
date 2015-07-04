class V1::CommentsController < V1::BaseController
  def create
    comment = Comment.create(
        comment_body: params[:comment_body],
        comment_headline: params[:comment_headline],
        user_id: current_user.id,
        area_id: params[:areaID]
    )
    render :json => comment
  end
end