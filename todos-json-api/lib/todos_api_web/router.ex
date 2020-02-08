defmodule ToDosApiWeb.Router do
  use ToDosApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", ToDosApiWeb do
    pipe_through :api
    resources "/items", ItemController, except: [:new, :edit]
  end
end
