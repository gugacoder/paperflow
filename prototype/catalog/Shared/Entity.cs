using System.Collections.Generic;

namespace PaperFlow.Shared;

public class Entity
{
  public string Name { get; set; }
  public string Description { get; set; }
  public List<Field> Fields { get; set; }
}

public class Field
{
  public string Name { get; set; }
  public string Type { get; set; }
  public bool Required { get; set; }
}
