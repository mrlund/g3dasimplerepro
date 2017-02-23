# NOTES

## Dynamic Loading

* `Page1` does dynamic template loading. Note that the only thing it does is it delegates to `TemplateLoader`.
* `TemplateLoader` compiles the template (see compileAtRuntime). This method can be removed once the compilation is done on the backend. The rest should remain the same.
* The `DynamicTemplate` directive uses `ngComponentOutlet`, which is a preferred way to load components.
* `DynamicLoaderModule` just packages it up nicely.


## Routing

* `AppModule` shows how to configure deeplinker with segments. Page1 has a dynamic segment.
* `MyApp` shows how to handle login by `setRoot.catch`.
* We pass `continueToTarget` to continue the navigation once the user logs in.
* `Page2` is protected. The user has to be logged in to access it.
