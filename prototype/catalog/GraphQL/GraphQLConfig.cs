using Microsoft.Extensions.DependencyInjection;
using HotChocolate;
using PaperFlow.Controllers;

namespace PaperFlow.GraphQL;

public class GraphQLConfig
{
  public static void ConfigureGraphQL(IServiceCollection services)
  {
    services
      .AddGraphQLServer()
      .AddQueryType<QueryType>()          // Refere-se a uma classe externa
      .AddMutationType<MutationType>();   // Refere-se a uma classe externa

    // Adiciona os resolvers e serviços necessários
    services.AddScoped<RequestResolver>();
    services.AddScoped<BatchResolver>();
    services.AddScoped<CatalogService>();
    services.AddScoped<EntityRefParser>();
    services.AddScoped<PayloadProcessor>();
    services.AddScoped<BatchProcessor>();
    services.AddScoped<Context>();
  }
}
