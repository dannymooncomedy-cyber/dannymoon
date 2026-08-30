# Helper script to preview site and commit changes
# Usage: Open PowerShell, navigate to repo root, then run: .\scripts\preview_and_commit.ps1

$dm1 = Join-Path -Path $PSScriptRoot -ChildPath "..\dm1"
Write-Host "Checking for Python and Git..."

# Check for git
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Warning "Git not found. Install Git to enable commit/push from this script."
} else {
  Write-Host "Git is available."
}

# Check for python
if (Get-Command python -ErrorAction SilentlyContinue) {
  Write-Host "Python found. Starting local server at http://localhost:8000"
  Push-Location $dm1
  Start-Process -NoNewWindow python -ArgumentList "-m","http.server","8000"
  Pop-Location
} elseif (Get-Command py -ErrorAction SilentlyContinue) {
  Write-Host "Python launcher found. Starting local server at http://localhost:8000"
  Push-Location $dm1
  Start-Process -NoNewWindow py -ArgumentList "-m","http.server","8000"
  Pop-Location
} else {
  Write-Warning "Python not found. To preview, either open dm1/index.html in a browser or install Python." 
}

# Commit & push helper (will run only if git present)
if (Get-Command git -ErrorAction SilentlyContinue) {
  Push-Location (Resolve-Path .)
  git add -A
  $msg = Read-Host "Enter commit message (or press Enter to use default)"
  if ([string]::IsNullOrWhiteSpace($msg)) { $msg = "Site overhaul: minimal voice-acting portfolio" }
  git commit -m "$msg"
  $currentBranch = git rev-parse --abbrev-ref HEAD
  Write-Host "Current branch: $currentBranch"
  $remote = git remote get-url origin 2>$null
  if (-not $remote) {
    $url = Read-Host "No remote origin configured. Enter remote URL to add (or leave blank to skip push)"
    if ($url) {
      git remote add origin $url
    }
  }
  Write-Host "Pushing to origin/$currentBranch"
  git push -u origin $currentBranch
  Pop-Location
}