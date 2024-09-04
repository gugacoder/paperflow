using System.Collections.Generic;
using System.Threading.Tasks;
using PaperFlow.Shared;

namespace PaperFlow.GraphQL;

public class BatchProcessor
{
  private readonly PayloadProcessor _payloadProcessor;

  public BatchProcessor(PayloadProcessor payloadProcessor)
  {
    _payloadProcessor = payloadProcessor;
  }

  public async Task<List<Status>> ProcessBatch(List<EntityRef> entityRefs, List<PayloadInput> payloadInputs)
  {
    var statuses = new List<Status>();
    for (int i = 0; i < entityRefs.Count; i++)
    {
      var status = await _payloadProcessor.ProcessPayload(entityRefs[i], payloadInputs[i]);
      statuses.Add(status);
    }
    return statuses;
  }
}
