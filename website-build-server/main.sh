#!/bin/bash

# Debugging: Print environment variables and paths
echo "GIT_REPOSITORY__URL: $GIT_REPOSITORY__URL"
echo "Current directory: $(pwd)"
ls -la

# Export the Git repository URL environment variable
export GIT_REPOSITORY__URL="$GIT_REPOSITORY__URL"

# Clone the Git repository
git clone "$GIT_REPOSITORY__URL" /home/app/output

# Check if the clone was successful
if [ $? -ne 0 ]; then
  echo "Failed to clone the repository."
  exit 1
fi

# List the contents of the output directory
ls -la /home/app/output

# Execute the compiled Node.js script
exec node dist/index.js