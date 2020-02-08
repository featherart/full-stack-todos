defmodule ToDosApi.Repo.Migrations.CreateItems do
  use Ecto.Migration

  def change do
    create table(:items) do
      add :description, :string
      add :priority, :integer
      add :is_complete, :boolean, default: false, null: false

      timestamps()
    end

  end
end
