# 🚀 Sample Node.js Azure DevOps CI/CD Tutorial

A complete DevOps tutorial showing how to build, test, and deploy a Node.js + React application using GitHub, Azure DevOps, and Azure Web App.

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Local Development](#local-development)
4. [Docker Setup](#docker-setup)
5. [GitHub Setup](#github-setup)
6. [Azure DevOps Setup](#azure-devops-setup)
7. [Azure Web App Deployment](#azure-web-app-deployment)
8. [Cleanup](#cleanup)
9. [Troubleshooting](#troubleshooting)

## 🎯 Project Overview

This project demonstrates a complete CI/CD pipeline with:

- **Backend**: Node.js + Express with API endpoints
- **Frontend**: React + Vite with modern UI
- **Testing**: Jest + Supertest for API testing
- **Containerization**: Docker with multi-stage builds
- **CI/CD**: GitHub Actions + Azure DevOps pipelines
- **Deployment**: Azure Web App (Linux Container)

### 🏗️ Project Structure

```
sample-node-azure/
├── server/                 # Node.js backend
│   └── index.js           # Express server
├── client/                # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── main.jsx       # App entry point
│   │   └── *.css          # Styling
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
├── tests/                 # Test files
│   ├── server.test.js     # API tests
│   └── setup.js           # Test configuration
├── .github/workflows/     # GitHub Actions
│   └── main.yml           # CI/CD workflow
├── azure-pipelines.yml    # Azure DevOps pipeline
├── Dockerfile             # Docker configuration
├── .dockerignore          # Docker ignore rules
├── package.json           # Root dependencies
└── README.md              # This file
```

## 🔧 Prerequisites

Before starting, ensure you have:

### Required Software
- **Node.js 18+** ([Download here](https://nodejs.org/))
- **Git** ([Download here](https://git-scm.com/))
- **Docker** ([Download here](https://www.docker.com/products/docker-desktop/))
- **Azure CLI** ([Install guide](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli))

### Required Accounts
- **GitHub account** ([Sign up here](https://github.com/))
- **Azure account** ([Free account here](https://azure.microsoft.com/free/))
- **Azure DevOps account** ([Sign up here](https://azure.microsoft.com/services/devops/))

## 🏃‍♂️ Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/sample-node-azure.git
cd sample-node-azure
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 3. Run the Application

```bash
# Start both server and client in development mode
npm run dev

# Or run separately:
npm run server:dev  # Backend only (port 3000)
npm run client:dev  # Frontend only (port 5173)
```

### 4. Build for Production

```bash
# Build the React app
npm run build

# Start production server
npm start
```

### 5. Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

Visit `http://localhost:3000` to see the application running.

## 🐳 Docker Setup

### 1. Build Docker Image

```bash
# Build the Docker image
npm run docker:build

# Or manually:
docker build -t sample-node-azure .
```

### 2. Run Docker Container

```bash
# Run the container
npm run docker:run

# Or manually:
docker run -p 3000:3000 sample-node-azure
```

### 3. Test Docker Container

```bash
# Test the health endpoint
curl http://localhost:3000/api/health

# Expected response:
# {"status":"healthy","timestamp":"2024-01-01T00:00:00.000Z","version":"1.0.0"}
```

## 🔗 GitHub Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `sample-node-azure`
3. Choose "Public" or "Private" based on your preference
4. **Don't** initialize with README (we already have one)

### 2. Push Code to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Node.js + React app with CI/CD"

# Add remote origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/sample-node-azure.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Actions

1. Go to your repository on GitHub
2. Click on the "Actions" tab
3. The workflow will automatically run on push
4. Check the workflow status - it should build and push a Docker image

### 4. Verify Docker Image

1. Go to your repository
2. Click on "Packages" in the right sidebar
3. You should see the `sample-node-azure` package

## ⚙️ Azure DevOps Setup

### 1. Create Azure DevOps Organization

1. Go to [Azure DevOps](https://dev.azure.com/)
2. Sign in with your Azure account
3. Create a new organization or use existing one
4. Create a new project named `sample-node-azure`

### 2. Import Repository from GitHub

1. In Azure DevOps, go to **Repos** > **Import**
2. Select **Git** as source type
3. Enter your GitHub repository URL: `https://github.com/YOUR_USERNAME/sample-node-azure.git`
4. Click **Import**

### 3. Create Service Connections

#### Azure Service Connection
1. Go to **Project Settings** > **Service connections**
2. Click **New service connection**
3. Select **Azure Resource Manager**
4. Choose **Service principal (automatic)**
5. Select your Azure subscription
6. Name it `azure-service-connection`
7. Click **Save**

#### Docker Registry Service Connection
1. Click **New service connection**
2. Select **Docker Registry**
3. Choose **Azure Container Registry**
4. Select your subscription and registry
5. Name it `docker-registry-connection`
6. Click **Save**

### 4. Create Azure Container Registry

```bash
# Login to Azure
az login

# Create resource group
az group create --name rg-sample-node-azure --location "East US"

# Create container registry (name must be unique)
az acr create --resource-group rg-sample-node-azure --name youruniqueacrname --sku Basic
```

### 5. Update Pipeline Variables

Edit `azure-pipelines.yml` and replace placeholders:

```yaml
# Update these variables:
azureServiceConnectionId: 'azure-service-connection'
webAppName: 'your-web-app-name'
environmentName: 'Production'
dockerRegistryServiceConnection: 'docker-registry-connection'
containerRegistry: 'youruniqueacrname.azurecr.io'
```

### 6. Create Pipeline

1. Go to **Pipelines** > **New pipeline**
2. Select **Azure Repos Git**
3. Select your repository
4. Choose **Existing Azure Pipelines YAML file**
5. Select `/azure-pipelines.yml`
6. Click **Continue** and **Save**

## 🌐 Azure Web App Deployment

### 1. Create Azure Web App

```bash
# Create App Service Plan
az appservice plan create \
  --name plan-sample-node-azure \
  --resource-group rg-sample-node-azure \
  --sku B1 \
  --is-linux

# Create Web App (name must be unique)
az webapp create \
  --resource-group rg-sample-node-azure \
  --plan plan-sample-node-azure \
  --name your-unique-web-app-name \
  --deployment-container-image-name youruniqueacrname.azurecr.io/sample-node-azure:latest
```

### 2. Configure Web App Settings

```bash
# Set environment variables
az webapp config appsettings set \
  --resource-group rg-sample-node-azure \
  --name your-unique-web-app-name \
  --settings WEBSITES_PORT=3000 NODE_ENV=production
```

### 3. Enable Container Registry Authentication

```bash
# Get ACR credentials
az acr credential show --name youruniqueacrname

# Configure Web App to use ACR
az webapp config container set \
  --name your-unique-web-app-name \
  --resource-group rg-sample-node-azure \
  --docker-custom-image-name youruniqueacrname.azurecr.io/sample-node-azure:latest \
  --docker-registry-server-url https://youruniqueacrname.azurecr.io \
  --docker-registry-server-user [ACR_USERNAME] \
  --docker-registry-server-password [ACR_PASSWORD]
```

### 4. Create Environment in Azure DevOps

1. Go to **Pipelines** > **Environments**
2. Click **New environment**
3. Name it `Production`
4. Select **None** for resource
5. Click **Create**

### 5. Run the Pipeline

1. Go to **Pipelines** > **Pipelines**
2. Click on your pipeline
3. Click **Run pipeline**
4. Monitor the build and deployment process

### 6. Verify Deployment

1. Wait for the pipeline to complete
2. Visit `https://your-unique-web-app-name.azurewebsites.net`
3. You should see the React app running
4. Test the API: `https://your-unique-web-app-name.azurewebsites.net/api/health`

## 🔄 Making Changes

### 1. Update Code

```bash
# Make changes to your code
# For example, update client/src/App.jsx

# Commit and push changes
git add .
git commit -m "Update: Your changes description"
git push origin main
```

### 2. Automatic Deployment

1. GitHub Actions will automatically build and push new Docker image
2. Azure DevOps pipeline will automatically deploy to Azure Web App
3. Check the deployment status in both platforms

## 🧹 Cleanup

### 1. Delete Azure Resources

```bash
# Delete the entire resource group (this deletes all resources)
az group delete --name rg-sample-node-azure --yes --no-wait
```

### 2. Delete GitHub Repository

1. Go to your repository settings
2. Scroll down to "Danger Zone"
3. Click "Delete this repository"
4. Follow the confirmation steps

### 3. Delete Azure DevOps Project

1. Go to Project Settings
2. Click "Delete" under Project details
3. Follow the confirmation steps

## 🔍 Troubleshooting

### Common Issues

#### 1. Docker Build Fails
```bash
# Check Docker is running
docker --version

# Clean Docker cache
docker system prune -a
```

#### 2. Tests Fail
```bash
# Run tests locally to debug
npm test

# Check test output for specific errors
npm test -- --verbose
```

#### 3. Azure Web App Won't Start
```bash
# Check Web App logs
az webapp log tail --name your-unique-web-app-name --resource-group rg-sample-node-azure

# Check container logs
az webapp log show --name your-unique-web-app-name --resource-group rg-sample-node-azure
```

#### 4. Pipeline Fails
1. Check the pipeline logs in Azure DevOps
2. Verify all service connections are working
3. Check if all placeholders are replaced
4. Ensure container registry permissions are correct

### Useful Commands

```bash
# Check Azure login status
az account show

# List all resource groups
az group list --output table

# Check Web App status
az webapp show --name your-unique-web-app-name --resource-group rg-sample-node-azure

# Restart Web App
az webapp restart --name your-unique-web-app-name --resource-group rg-sample-node-azure
```

## 📚 Additional Resources

- [Azure DevOps Documentation](https://docs.microsoft.com/en-us/azure/devops/)
- [Azure Web Apps Documentation](https://docs.microsoft.com/en-us/azure/app-service/)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🎉 Congratulations!

You've successfully set up a complete CI/CD pipeline with:

✅ **Local Development** - Node.js + React app running locally  
✅ **Testing** - Automated tests with Jest  
✅ **Containerization** - Docker image for consistent deployment  
✅ **Source Control** - GitHub repository with automated workflows  
✅ **CI/CD Pipeline** - Azure DevOps with automated deployment  
✅ **Cloud Hosting** - Azure Web App serving your application  

This is a production-ready setup that you can use as a foundation for your own projects!

---

**Happy Coding!** 🚀

*Need help? Open an issue in the repository or contact the maintainers.* 