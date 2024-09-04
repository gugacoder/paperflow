using System;
using System.Collections.Generic;
using System.Linq;

namespace PaperFlow.GraphQL;

public class EntityRefParser
{
  public EntityRef ParseEntityRef(string entityRefString)
  {
    // Implement logic to parse the entityRefString and return an EntityRef object
    return new EntityRef
    {
      EntityName = "Users",
      EntityId = "1"
    };
  }
}

public class EntityRef
{
  public string EntityName { get; set; }
  public string EntityId { get; set; }
}
