using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PaperFlow.GraphQL;
using PaperFlow.Shared;

namespace PaperFlow.Controllers
{
  public class BatchResolver
  {
    private readonly CatalogService _catalogService;

    public BatchResolver(CatalogService catalogService)
    {
      _catalogService = catalogService;
    }

    public async Task<List<Status>> BatchRequest(List<EntityRef> entityRefs, List<PayloadInput> payloadInputs)
    {
      var statuses = new List<Status>();
      for (int i = 0; i < entityRefs.Count; i++)
      {
        var status = await _catalogService.ExecuteAction(entityRefs[i], payloadInputs[i]);
        statuses.Add(status);
      }
      return statuses;
    }
  }
}