
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY BackendApi.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish "BackendApi.csproj" -c Release -o /publish

FROM base AS final
WORKDIR /app
COPY --from=build /publish ./

ENTRYPOINT ["dotnet", "BackendApi.dll"]
