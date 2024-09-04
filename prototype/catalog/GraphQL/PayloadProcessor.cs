using System.Threading.Tasks;
using PaperFlow.Shared;

namespace PaperFlow.GraphQL;

public class PayloadProcessor
{
  private readonly CatalogService _catalogService;

  public PayloadProcessor(CatalogService catalogService)
  {
    _catalogService = catalogService;
  }

  public async Task<Status> ProcessPayload(EntityRef entityRef, PayloadInput payloadInput)
  {
    // Implement logic to process the payload and execute the appropriate action on the entity
    return await _catalogService.ExecuteAction(entityRef, payloadInput);
  }
}

public class PayloadInput
{
  public string Form { get; set; }
  public object Data { get; set; }
}
