defmodule ToDosApiWeb.ItemController do
  use ToDosApiWeb, :controller

  alias ToDosApi.TodoItem
  alias ToDosApi.TodoItem.Item

  action_fallback ToDosApiWeb.FallbackController

  def index(conn, _params) do
    items = TodoItem.list_items()
    render(conn, "index.json", items: items)
  end

  def create(conn, %{"item" => item_params}) do
    with {:ok, %Item{} = item} <- TodoItem.create_item(item_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.item_path(conn, :show, item))
      |> render("show.json", item: item)
    end
  end

  def show(conn, %{"id" => id}) do
    item = TodoItem.get_item!(id)
    render(conn, "show.json", item: item)
  end

  def update(conn, %{"id" => id, "item" => item_params}) do
    item = TodoItem.get_item!(id)

    with {:ok, %Item{} = item} <- TodoItem.update_item(item, item_params) do
      render(conn, "show.json", item: item)
    end
  end

  def delete(conn, %{"id" => id}) do
    item = TodoItem.get_item!(id)

    with {:ok, %Item{}} <- TodoItem.delete_item(item) do
      send_resp(conn, :no_content, "")
    end
  end
end
