defmodule ToDosApi.TodoItemTest do
  use ToDosApi.DataCase

  alias ToDosApi.TodoItem

  describe "items" do
    alias ToDosApi.TodoItem.Item

    @valid_attrs %{description: "some description", is_complete: true, priority: 42}
    @update_attrs %{description: "some updated description", is_complete: false, priority: 43}
    @invalid_attrs %{description: nil, is_complete: nil, priority: nil}

    def item_fixture(attrs \\ %{}) do
      {:ok, item} =
        attrs
        |> Enum.into(@valid_attrs)
        |> TodoItem.create_item()

      item
    end

    test "list_items/0 returns all items" do
      item = item_fixture()
      assert TodoItem.list_items() == [item]
    end

    test "get_item!/1 returns the item with given id" do
      item = item_fixture()
      assert TodoItem.get_item!(item.id) == item
    end

    test "create_item/1 with valid data creates a item" do
      assert {:ok, %Item{} = item} = TodoItem.create_item(@valid_attrs)
      assert item.description == "some description"
      assert item.is_complete == true
      assert item.priority == 42
    end

    test "create_item/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = TodoItem.create_item(@invalid_attrs)
    end

    test "update_item/2 with valid data updates the item" do
      item = item_fixture()
      assert {:ok, %Item{} = item} = TodoItem.update_item(item, @update_attrs)
      assert item.description == "some updated description"
      assert item.is_complete == false
      assert item.priority == 43
    end

    test "update_item/2 with invalid data returns error changeset" do
      item = item_fixture()
      assert {:error, %Ecto.Changeset{}} = TodoItem.update_item(item, @invalid_attrs)
      assert item == TodoItem.get_item!(item.id)
    end

    test "delete_item/1 deletes the item" do
      item = item_fixture()
      assert {:ok, %Item{}} = TodoItem.delete_item(item)
      assert_raise Ecto.NoResultsError, fn -> TodoItem.get_item!(item.id) end
    end

    test "change_item/1 returns a item changeset" do
      item = item_fixture()
      assert %Ecto.Changeset{} = TodoItem.change_item(item)
    end
  end
end
