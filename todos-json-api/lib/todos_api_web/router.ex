defmodule ToDosApiWeb.Router do
  use ToDosApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug CORSPlug, origin: ["http://localhost:3000", "http://127.0.0.1:3000"]
  end

  scope "/api", ToDosApiWeb do
    pipe_through :api
    resources "/items", ItemController, except: [:new, :edit]
    options   "/items", ItemController, :options
    options   "/items/:id", ItemController, :options
  end
end
