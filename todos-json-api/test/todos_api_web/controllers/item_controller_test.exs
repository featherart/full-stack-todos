defmodule ToDosApiWeb.ItemControllerTest do
  use ToDosApiWeb.ConnCase

  alias ToDosApi.TodoItem
  alias ToDosApi.TodoItem.Item

  @create_attrs %{
    description: "some description",
    is_complete: true,
    priority: 42
  }
  @update_attrs %{
    description: "some updated description",
    is_complete: false,
    priority: 43
  }
  @invalid_attrs %{description: nil, is_complete: nil, priority: nil}

  def fixture(:item) do
    {:ok, item} = TodoItem.create_item(@create_attrs)
    item
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all items", %{conn: conn} do
      conn = get(conn, Routes.item_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create item" do
    test "renders item when data is valid", %{conn: conn} do
      conn = post(conn, Routes.item_path(conn, :create), item: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.item_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some description",
               "is_complete" => true,
               "priority" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.item_path(conn, :create), item: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update item" do
    setup [:create_item]

    test "renders item when data is valid", %{conn: conn, item: %Item{id: id} = item} do
      conn = put(conn, Routes.item_path(conn, :update, item), item: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.item_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some updated description",
               "is_complete" => false,
               "priority" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, item: item} do
      conn = put(conn, Routes.item_path(conn, :update, item), item: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete item" do
    setup [:create_item]

    test "deletes chosen item", %{conn: conn, item: item} do
      conn = delete(conn, Routes.item_path(conn, :delete, item))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.item_path(conn, :show, item))
      end
    end
  end

  defp create_item(_) do
    item = fixture(:item)
    {:ok, item: item}
  end
end
