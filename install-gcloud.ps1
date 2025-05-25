# Download Google Cloud SDK installer
$url = "https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe"
$output = "GoogleCloudSDKInstaller.exe"
Invoke-WebRequest -Uri $url -OutFile $output

# Run the installer
Start-Process -FilePath $output -Wait

# Clean up
Remove-Item $output

Write-Host "Google Cloud SDK installation completed. Please restart your terminal and run 'gcloud init' to continue." 