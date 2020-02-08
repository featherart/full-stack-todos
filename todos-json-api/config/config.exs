# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :todos_api,
  namespace: ToDosApi,
  ecto_repos: [ToDosApi.Repo]

# Configures the endpoint
config :todos_api, ToDosApiWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "WydRUmrZAjH7+5/KgcFn9LQyCMNpp0RF24ltriX3NcwCdMK/rUMEbthUG9VIeDpm",
  render_errors: [view: ToDosApiWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: ToDosApi.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
