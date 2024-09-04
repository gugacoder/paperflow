using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PaperFlow.Shared;

namespace PaperFlow.GraphQL
{
  public class CatalogService
  {
    private readonly EntityRefParser _entityRefParser;
    private readonly Dictionary<string, Entity> _registeredEntities;

    public CatalogService(EntityRefParser entityRefParser)
    {
      _entityRefParser = entityRefParser;
      _registeredEntities = new Dictionary<string, Entity>();
    }

    public async Task<Status> ExecuteAction(EntityRef entityRef, PayloadInput payloadInput)
    {
      var entity = _registeredEntities[entityRef.EntityName];
      // Implement logic to execute the action on the entity
      return new Status
      {
        Ok = true,
        Code = 200,
        Outcome = "Success",
        Message = "Action executed successfully"
      };
    }

    public void RegisterEntity(string name, Entity entity)
    {
      _registeredEntities[name] = entity;
    }

    public Entity GetEntity(string name)
    {
      return _registeredEntities[name];
    }
  }
}