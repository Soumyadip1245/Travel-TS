FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER root
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Add this line to change permissions
RUN mkdir /app/wwwroot && chown -R app:app /app/wwwroot

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy project files and restore dependencies
COPY BackendApi.csproj ./
RUN dotnet restore

# Copy the rest of the files and publish the application
COPY . ./
RUN dotnet publish "BackendApi.csproj" -c Release -o /publish

FROM base AS final
WORKDIR /app
COPY --from=build /publish ./

# Change permissions on the published output
RUN chown -R app:app /app/wwwroot

USER app
ENTRYPOINT ["dotnet", "BackendApi.dll"]
