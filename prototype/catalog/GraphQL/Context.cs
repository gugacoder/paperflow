using Microsoft.AspNetCore.Http;

namespace PaperFlow.GraphQL;

public class Context
{
  public HttpContext HttpContext { get; }

  public Context(HttpContext httpContext)
  {
    HttpContext = httpContext;
  }
}
