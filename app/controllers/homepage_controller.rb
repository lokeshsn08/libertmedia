class HomepageController < ApplicationController
  protect_from_forgery with: :null_session
  def index
  end

  def get_users
    @users = EmployeeDetail.all
    render json: @users
  end

  def get_users_by_id
    
    @users = EmployeeDetail.where(id:params[:users])
    render json: @users
  end

end
