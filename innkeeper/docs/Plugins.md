# Plugins

### Como Funciona:

1. **Carregamento Dinâmico de Controllers**:
   - Quando você carrega um assembly que contém controladores ASP.NET Core usando `AssemblyLoadContext`, você pode registrá-los manualmente no pipeline de middleware do ASP.NET Core.

2. **Descarregamento Dinâmico de Controllers**:
   - Para desregistrar os controladores, você precisará remover manualmente as rotas associadas a esses controladores e descarregar o contexto do assembly. O ASP.NET Core não tem suporte nativo para "desregistrar" controladores, então isso precisa ser gerenciado explicitamente.

### Exemplo de Implementação:

#### 1. **Carregando e Registrando Controllers Dinamicamente**:

```csharp
public class PluginLoadContext : AssemblyLoadContext
{
    private AssemblyDependencyResolver _resolver;

    public PluginLoadContext(string pluginPath)
    {
        _resolver = new AssemblyDependencyResolver(pluginPath);
    }

    protected override Assembly Load(AssemblyName assemblyName)
    {
        string assemblyPath = _resolver.ResolveAssemblyToPath(assemblyName);
        if (assemblyPath != null)
        {
            return LoadFromAssemblyPath(assemblyPath);
        }

        return null;
    }
}

// Método para carregar e registrar os controladores
public void LoadAndRegisterControllers(IApplicationBuilder app, string pluginPath)
{
    var pluginLoadContext = new PluginLoadContext(pluginPath);
    var assembly = pluginLoadContext.LoadFromAssemblyName(new AssemblyName("YourPluginAssembly"));

    var controllerTypes = assembly.GetTypes()
        .Where(t => typeof(ControllerBase).IsAssignableFrom(t) && !t.IsAbstract);

    foreach (var controllerType in controllerTypes)
    {
        app.ApplicationServices.GetRequiredService<IMvcBuilder>()
            .AddApplicationPart(assembly)
            .AddControllersAsServices();
    }

    app.UseEndpoints(endpoints =>
    {
        foreach (var controllerType in controllerTypes)
        {
            endpoints.MapControllerRoute(
                name: controllerType.Name,
                pattern: controllerType.Name.Replace("Controller", "") + "/{action}/{id?}",
                defaults: new { controller = controllerType.Name.Replace("Controller", ""), action = "Index" });
        }
    });
}
```

#### 2. **Descarregando e Desregistrando Controllers**:

Como o ASP.NET Core não suporta nativamente o descarregamento dinâmico de controladores, a remoção das rotas terá que ser feita manualmente. Aqui está um conceito básico:

```csharp
public void UnloadAndDeregisterControllers(IApplicationBuilder app, PluginLoadContext pluginLoadContext)
{
    // Parar as rotas específicas associadas ao módulo
    var assembly = pluginLoadContext.Assemblies.First();
    var controllerTypes = assembly.GetTypes()
        .Where(t => typeof(ControllerBase).IsAssignableFrom(t) && !t.IsAbstract);

    // Aqui seria necessário remover as rotas manualmente, o que depende do roteador específico em uso
    // Isto pode envolver remover endpoints específicos que foram adicionados durante o registro

    pluginLoadContext.Unload(); // Descarregar o contexto do assembly
}
```

### Considerações:

- **Roteamento Dinâmico**: Remover rotas dinamicamente não é trivial e pode envolver mexer com a infraestrutura interna do roteador ASP.NET Core, que não foi projetada para adicionar e remover rotas de forma dinâmica depois que a aplicação está em execução.
- **Isolamento e Segurança**: Certifique-se de que o assembly carregado e descarregado esteja devidamente isolado, para evitar problemas de memória ou estabilidade na aplicação principal.

### Conclusão:

Embora seja possível carregar e registrar controladores ASP.NET Core dinamicamente usando `AssemblyLoadContext`, o processo de descarregamento e desregistro dos controladores requer manipulação direta das rotas e do ciclo de vida dos assemblies, o que pode ser complexo e arriscado em termos de manutenção de longo prazo. Implementar isso requer uma compreensão profunda de como ASP.NET Core gerencia seus controladores e rotas internamente.
