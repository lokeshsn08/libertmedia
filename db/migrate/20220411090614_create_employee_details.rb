class CreateEmployeeDetails < ActiveRecord::Migration[6.1]
  def change
    create_table :employee_details do |t|
      t.string :title
      t.text :discription
      t.text :company

      t.timestamps
    end
  end
end
