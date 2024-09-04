using System.Collections.Generic;

namespace PaperFlow.Shared;

public class Status
{
  public bool Ok { get; set; }
  public int Code { get; set; }
  public string Outcome { get; set; }
  public string Message { get; set; }
  public List<string> Details { get; set; }
}
