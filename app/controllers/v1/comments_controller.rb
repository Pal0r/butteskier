class V1::CommentsController < V1::BaseController
  def create
    comment = Comment.create(
        comment_body: params[:comment_body],
        comment_headline: params[:comment_headline],
        user_id: current_user.id,
        area_id: params[:areaID]
    )
    comment_hash = comment.as_json
    comment_hash[:username] = comment.user.username
    comment_hash[:user_img] = comment.user.profile_img

    render :json => {:comment => comment_hash}
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