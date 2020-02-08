defmodule ToDosApi.TodoItem.Item do
  use Ecto.Schema
  import Ecto.Changeset

  schema "items" do
    field :description, :string
    field :is_complete, :boolean, default: false
    field :priority, :integer

    timestamps()
  end

  @doc false
  def changeset(item, attrs) do
    item
    |> cast(attrs, [:description, :priority, :is_complete])
    |> validate_required([:description, :priority, :is_complete])
  end
end
