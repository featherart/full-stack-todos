defmodule ToDosApiWeb.ItemView do
  use ToDosApiWeb, :view
  alias ToDosApiWeb.ItemView

  def render("index.json", %{items: items}) do
    %{data: render_many(items, ItemView, "item.json")}
  end

  def render("show.json", %{item: item}) do
    %{data: render_one(item, ItemView, "item.json")}
  end

  def render("item.json", %{item: item}) do
    %{id: item.id,
      description: item.description,
      priority: item.priority,
      is_complete: item.is_complete}
  end
end
