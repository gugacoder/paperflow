using HotChocolate;
using HotChocolate.Types;

namespace PaperFlow.GraphQL;

public class MutationType : ObjectType
{
  protected override void Configure(IObjectTypeDescriptor descriptor)
  {
    descriptor.Field("createAction")
        .Type<StringType>()
        .Resolve(context => "Mutation executed!");  
        
    // Adicione mais mutations aqui
  }
}