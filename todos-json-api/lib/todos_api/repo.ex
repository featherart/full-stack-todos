defmodule ToDosApi.Repo do
  use Ecto.Repo,
    otp_app: :todos_api,
    adapter: Ecto.Adapters.Postgres
end
