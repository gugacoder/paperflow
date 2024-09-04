using HotChocolate;
using HotChocolate.Types;

namespace PaperFlow.GraphQL;

public class QueryType : ObjectType
{
  protected override void Configure(IObjectTypeDescriptor descriptor)
  {
    descriptor.Field("helloWorld")
        .Type<StringType>()
        .Resolve(context => "Hello, World!");

    // Adicione mais queries aqui
  }
}