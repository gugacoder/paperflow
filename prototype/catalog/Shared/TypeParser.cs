using System;

namespace PaperFlow.Shared;

public static class TypeParser
{
  public static object ParseValue(string type, string value)
  {
    switch (type)
    {
      case "int":
        return int.Parse(value);
      case "float":
        return float.Parse(value);
      case "bool":
        return bool.Parse(value);
      case "date":
        return DateTime.Parse(value);
      default:
        return value;
    }
  }
}
