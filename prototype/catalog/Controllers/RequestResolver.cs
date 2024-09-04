using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PaperFlow.GraphQL;
using PaperFlow.Shared;

namespace PaperFlow.Controllers;

public class RequestResolver
{
  private readonly CatalogService _catalogService;

  public RequestResolver(CatalogService catalogService)
  {
    _catalogService = catalogService;
  }

  public async Task<Status> Request(EntityRef entityRef, PayloadInput payloadInput)
  {
    var status = await _catalogService.ExecuteAction(entityRef, payloadInput);
    return status;
  }
}